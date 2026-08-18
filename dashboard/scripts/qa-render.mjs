import { mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const url = process.env.DASHBOARD_URL || "http://127.0.0.1:5177/";
const screenshotDir =
  process.env.DASHBOARD_SCREENSHOT_DIR ||
  path.join(os.tmpdir(), "embedded-audio-mine-dashboard-qa");

mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleMessages = [];

page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    consoleMessages.push({ type: message.type(), text: message.text() });
  }
});
page.on("pageerror", (error) => {
  consoleMessages.push({ type: "pageerror", text: error.message });
});

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(700);

const title = await page.title();
const bodyText = await page.locator("body").innerText();
if (!title.includes("Embedded Audio Mine")) {
  throw new Error(`Unexpected title: ${title}`);
}
const normalizedBodyText = bodyText.toLowerCase();
for (const expected of ["Repository coverage and engineering facets", "Project atlas", "WebGPT", "Codex", "Analog"]) {
  if (!normalizedBodyText.includes(expected.toLowerCase())) throw new Error(`Missing visible text: ${expected}`);
}

const desktopPath = path.join(screenshotDir, "desktop.png");
await page.screenshot({ path: desktopPath, fullPage: false });

const layoutMetrics = await page.evaluate(() => {
  const table = document.querySelector(".eam-table-card")?.getBoundingClientRect();
  const detail = document.querySelector(".eam-detail")?.getBoundingClientRect();
  return {
    tableTop: table?.top ?? null,
    tableWidth: table?.width ?? null,
    detailTop: detail?.top ?? null,
    detailWidth: detail?.width ?? null,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyClientHeight: document.documentElement.clientHeight,
    bodyScrollHeight: document.documentElement.scrollHeight
  };
});

if (
  layoutMetrics.tableTop === null ||
  layoutMetrics.detailTop === null ||
  Math.abs(layoutMetrics.tableTop - layoutMetrics.detailTop) > 8
) {
  throw new Error(`Project atlas and detail panel are not top-aligned: ${JSON.stringify(layoutMetrics)}`);
}
if (!layoutMetrics.tableWidth || !layoutMetrics.detailWidth) {
  throw new Error(`Dashboard primary panes are missing: ${JSON.stringify(layoutMetrics)}`);
}
if (layoutMetrics.scrollWidth > layoutMetrics.clientWidth + 2) {
  throw new Error(`Desktop dashboard has horizontal page overflow: ${JSON.stringify(layoutMetrics)}`);
}

const filterSelect = (label) => page.locator(".eam-filter").filter({ hasText: label }).locator("select");
const clearFilters = async () => {
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.waitForTimeout(150);
};

await filterSelect("Repeat state").selectOption("blocked");
await page.waitForTimeout(150);
const blockedRows = await page.locator(".eam-table-card tbody tr").count();
const blockedStates = await page.locator(".eam-table-card tbody tr .eam-repeat").allInnerTexts();
if (blockedRows < 1 || blockedStates.some((state) => state.toLowerCase() !== "blocked")) {
  throw new Error(`Repeat-state filter did not isolate blocked rows: ${JSON.stringify({ blockedRows, blockedStates: blockedStates.slice(0, 8) })}`);
}
await clearFilters();

const hardwareSelect = filterSelect("Hardware evidence");
const hardwareValue = await hardwareSelect.locator("option").evaluateAll((options) => {
  const values = options.map((option) => option.value).filter((value) => value !== "all" && value !== "No explicit hardware evidence");
  return values[0] || "";
});
if (!hardwareValue) throw new Error("Hardware evidence filter has no positive evidence options");
await hardwareSelect.selectOption(hardwareValue);
await page.waitForTimeout(150);
const hardwareRows = await page.locator(".eam-table-card tbody tr").count();
if (hardwareRows < 1) throw new Error(`Hardware evidence filter returned no rows for ${hardwareValue}`);
await clearFilters();

const mcuDistribution = page.locator(".eam-distribution").filter({ hasText: "MCU / platform" }).first();
const firstMcuButton = mcuDistribution.locator("button").first();
const firstMcuLabel = await firstMcuButton.locator("span").first().innerText();
await firstMcuButton.click();
await page.waitForTimeout(150);
const mcuValue = await filterSelect("MCU / platform").inputValue();
if (mcuValue !== firstMcuLabel) {
  throw new Error(`MCU distribution did not set its filter: ${JSON.stringify({ firstMcuLabel, mcuValue })}`);
}
await clearFilters();

const search = page.locator(".eam-search input");
await search.fill("teensy");
await page.waitForTimeout(200);
const filteredRows = await page.locator(".eam-table-card tbody tr").count();
if (filteredRows < 1) throw new Error("Search for teensy returned no rows");
const firstRow = page.locator(".eam-table-card tbody tr").first();
const firstRepo = await firstRow.locator("td strong").first().innerText();
await firstRow.click();
await page.waitForTimeout(200);
const selectedRepo = await page.locator(".eam-detail h2").innerText();
if (selectedRepo !== firstRepo) {
  throw new Error(`Project-row selection did not update detail panel: ${JSON.stringify({ firstRepo, selectedRepo })}`);
}
const interactionPath = path.join(screenshotDir, "interaction-teensy.png");
await page.screenshot({ path: interactionPath, fullPage: false });
await clearFilters();

const sourceLedger = page.locator(".eam-detail details");
await sourceLedger.locator("summary").click();
await page.waitForTimeout(80);
if ((await sourceLedger.locator("li").count()) < 1) throw new Error("Selected project source ledger is empty");

await page.setViewportSize({ width: 390, height: 900 });
await page.waitForTimeout(350);
const mobileMetrics = await page.evaluate(() => ({
  clientWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
  controlsVisible: Boolean(document.querySelector(".eam-controls")?.getBoundingClientRect().height),
  tableVisible: Boolean(document.querySelector(".eam-table-card")?.getBoundingClientRect().height),
  detailVisible: Boolean(document.querySelector(".eam-detail")?.getBoundingClientRect().height)
}));
if (mobileMetrics.scrollWidth > mobileMetrics.clientWidth + 2) {
  throw new Error(`Mobile dashboard has horizontal page overflow: ${JSON.stringify(mobileMetrics)}`);
}
if (!mobileMetrics.controlsVisible || !mobileMetrics.tableVisible || !mobileMetrics.detailVisible) {
  throw new Error(`Mobile dashboard is missing primary UI regions: ${JSON.stringify(mobileMetrics)}`);
}
const mobilePath = path.join(screenshotDir, "mobile.png");
await page.screenshot({ path: mobilePath, fullPage: false });

await browser.close();

const relevantConsole = consoleMessages.filter((message) => !/favicon/i.test(message.text));
if (relevantConsole.length) {
  throw new Error(`Console issues: ${JSON.stringify(relevantConsole, null, 2)}`);
}

console.log(
  JSON.stringify(
    {
      url,
      title,
      filteredRows,
      selectedRepo,
      hardwareFilter: hardwareValue,
      mcuDistributionSelection: firstMcuLabel,
      layout: layoutMetrics,
      mobile: mobileMetrics,
      screenshots: {
        desktop: desktopPath,
        interaction: interactionPath,
        mobile: mobilePath
      },
      consoleIssues: relevantConsole.length
    },
    null,
    2
  )
);
