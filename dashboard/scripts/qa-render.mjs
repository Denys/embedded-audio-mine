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
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
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

const initialHighlight = await page.locator(".highlight-title strong").innerText();
await page.getByLabel("Next project highlight").click();
await page.waitForTimeout(300);
const nextHighlight = await page.locator(".highlight-title strong").innerText();
if (nextHighlight === initialHighlight) throw new Error("Next highlight did not advance the project");
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
