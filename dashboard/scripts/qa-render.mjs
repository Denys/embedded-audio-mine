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
const page = await browser.newPage({ viewport: { width: 1905, height: 900 } });
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
await page.waitForTimeout(900);

const title = await page.title();
const bodyText = await page.locator("body").innerText();
if (!title.includes("Embedded Audio Mine")) {
  throw new Error(`Unexpected title: ${title}`);
}
const normalizedBodyText = bodyText.toLowerCase();
for (const expected of ["Project Atlas", "Project Highlights", "Porting Radar", "Codex Weekly", "WebGPT Daily"]) {
  if (!normalizedBodyText.includes(expected.toLowerCase())) throw new Error(`Missing visible text: ${expected}`);
}

const desktopPath = path.join(screenshotDir, "desktop.png");
await page.screenshot({ path: desktopPath, fullPage: false });

const layoutMetrics = await page.evaluate(() => {
  const table = document.querySelector(".table-panel")?.getBoundingClientRect();
  const detail = document.querySelector(".detail-panel")?.getBoundingClientRect();
  const support = document.querySelector(".support-deck")?.getBoundingClientRect();
  const supportElement = document.querySelector(".support-deck");
  return {
    tableTop: table?.top ?? null,
    tableHeight: table?.height ?? null,
    detailTop: detail?.top ?? null,
    supportTop: support?.top ?? null,
    supportClientHeight: supportElement?.clientHeight ?? null,
    supportScrollHeight: supportElement?.scrollHeight ?? null,
    bodyClientHeight: document.documentElement.clientHeight,
    bodyScrollHeight: document.documentElement.scrollHeight
  };
});

if (
  layoutMetrics.tableTop === null ||
  layoutMetrics.detailTop === null ||
  Math.abs(layoutMetrics.tableTop - layoutMetrics.detailTop) > 4
) {
  throw new Error(`Project Atlas and detail panel are not top-aligned: ${JSON.stringify(layoutMetrics)}`);
}
if (!layoutMetrics.tableHeight || layoutMetrics.tableHeight < 360) {
  throw new Error(`Project Atlas pane is too short for 100% desktop view: ${JSON.stringify(layoutMetrics)}`);
}
if (layoutMetrics.bodyScrollHeight > layoutMetrics.bodyClientHeight + 2) {
  throw new Error(`Desktop page should fit without body scroll: ${JSON.stringify(layoutMetrics)}`);
}

await page.getByRole("button", { name: /Hard Blocks/i }).click();
await page.waitForTimeout(150);
const blockedRows = await page.locator("tbody tr").count();
const firstRepeatState = await page.locator("tbody tr .state-chip").first().innerText();
if (blockedRows < 1 || firstRepeatState !== "blocked") {
  throw new Error(`Hard Blocks tile did not filter blocked rows: ${JSON.stringify({ blockedRows, firstRepeatState })}`);
}
await page.getByRole("button", { name: "Clear" }).click();

await page.locator(".left-rail .distribution-panel").filter({ hasText: "Porting Surfaces" }).getByRole("button", { name: /Daisy/ }).click();
await page.waitForTimeout(150);
const platformValue = await page.locator(".filter-select").filter({ hasText: "Platform" }).locator("select").inputValue();
if (platformValue !== "Daisy") throw new Error(`Porting surface bar did not set platform filter: ${platformValue}`);
await page.getByRole("button", { name: "Clear" }).click();

await page.locator(".support-deck .distribution-panel").filter({ hasText: "Lane Mix" }).getByRole("button", { name: /strong/ }).click();
await page.waitForTimeout(150);
const laneActive = await page.locator(".support-deck .distribution-panel").filter({ hasText: "Lane Mix" }).locator(".bar-row.active").innerText();
if (!laneActive.includes("strong")) throw new Error(`Lane Mix row did not activate: ${laneActive}`);
await page.getByRole("button", { name: "Clear" }).click();

await page.locator(".timeline-panel circle[role='button']").first().click();
await page.waitForTimeout(150);
const activeTimelinePoints = await page.locator(".timeline-panel circle.active").count();
if (activeTimelinePoints !== 1) throw new Error(`Timeline point did not activate: ${activeTimelinePoints}`);
await page.getByRole("button", { name: "Clear" }).click();

const firstDetailTag = await page.locator(".detail-panel .tag-cloud button").first().innerText();
await page.locator(".detail-panel .tag-cloud button").first().click();
await page.waitForTimeout(150);
const detailTagPlatformValue = await page.locator(".filter-select").filter({ hasText: "Platform" }).locator("select").inputValue();
if (detailTagPlatformValue !== firstDetailTag) {
  throw new Error(`Detail tag did not apply platform filter: ${JSON.stringify({ firstDetailTag, detailTagPlatformValue })}`);
}

const firstEvidenceFile = await page.locator(".detail-panel .file-list button").first().innerText();
await page.locator(".detail-panel .file-list button").first().click();
await page.waitForTimeout(150);
const searchValueAfterEvidence = await page.getByPlaceholder("Search repos, platforms, firmware notes, source evidence").inputValue();
if (searchValueAfterEvidence !== firstEvidenceFile) {
  throw new Error(`Evidence file did not populate search: ${JSON.stringify({ firstEvidenceFile, searchValueAfterEvidence })}`);
}
await page.getByRole("button", { name: "Clear" }).click();

await page.locator(".support-deck").evaluate((element) => {
  element.scrollTop = 0;
});
await page.waitForTimeout(150);

const initialHighlight = await page.locator(".highlight-title strong").innerText();
await page.getByLabel("Next project highlight").scrollIntoViewIfNeeded();
await page.getByLabel("Next project highlight").click();
await page.waitForTimeout(300);
const nextHighlight = await page.locator(".highlight-title strong").innerText();
if (nextHighlight === initialHighlight) throw new Error("Next highlight did not advance the project");
await page.waitForFunction(
  (repo) => document.querySelector(".detail-panel h2")?.textContent === repo,
  nextHighlight
);
const selectedHighlight = await page.locator(".detail-panel h2").innerText();
if (selectedHighlight !== nextHighlight) {
  throw new Error(`Highlight click did not update detail panel: ${selectedHighlight} !== ${nextHighlight}`);
}
await page.getByLabel("Pause project highlights").click();
await page.waitForTimeout(120);
if (!(await page.getByLabel("Resume project highlights").isVisible())) {
  throw new Error("Pause control did not change to resume state");
}
const highlightPath = path.join(screenshotDir, "highlight-next-paused.png");
await page.screenshot({ path: highlightPath, fullPage: false });

await page.getByPlaceholder("Search repos, platforms, firmware notes, source evidence").fill("teensy");
await page.waitForTimeout(250);
const filteredRows = await page.locator("tbody tr").count();
if (filteredRows < 1) throw new Error("Search for teensy returned no rows");
await page.locator("tbody tr").first().click();
await page.waitForTimeout(250);
const selectedRepo = await page.locator(".detail-panel h2").innerText();
const interactionPath = path.join(screenshotDir, "interaction-teensy.png");
await page.screenshot({ path: interactionPath, fullPage: false });

await page.setViewportSize({ width: 390, height: 900 });
await page.waitForTimeout(500);
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
      layout: layoutMetrics,
      highlight: {
        initial: initialHighlight,
        afterNext: nextHighlight,
        selectedDetail: selectedHighlight
      },
      screenshots: {
        desktop: desktopPath,
        highlight: highlightPath,
        interaction: interactionPath,
        mobile: mobilePath
      },
      consoleIssues: relevantConsole.length
    },
    null,
    2
  )
);
