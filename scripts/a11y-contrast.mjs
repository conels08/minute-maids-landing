import { spawn } from "node:child_process";
import process from "node:process";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) return;
    } catch {
      // Keep polling until timeout.
    }
    await new Promise((r) => setTimeout(r, 750));
  }
  throw new Error(`Server did not become ready within ${timeoutMs}ms`);
}

async function run() {
  const dev = spawn("npm", ["run", "dev", "--", "--port", String(PORT)], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  let browser;
  try {
    await waitForServer(BASE_URL);
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    const scopes = [
      { name: "hero", selector: "#top" },
      { name: "specials", selector: "button[aria-label='Preview Valentine’s flyer image']" },
      { name: "services", selector: "#services" },
      { name: "estimate", selector: "#estimate" },
      { name: "pricing-guide", selector: "#pricing-guide" },
      { name: "gallery", selector: "#gallery" },
      { name: "reviews", selector: "#reviews" },
      { name: "about", selector: "#about" },
      { name: "faq", selector: "#faq" },
      { name: "contact", selector: "#contact" },
    ];

    const findings = [];

    for (const scope of scopes) {
      const result = await new AxeBuilder({ page })
        .include(scope.selector)
        .withRules(["color-contrast"])
        .analyze();

      for (const violation of result.violations) {
        findings.push({
          scope: scope.name,
          id: violation.id,
          impact: violation.impact ?? "unknown",
          nodes: violation.nodes.length,
          help: violation.help,
        });
      }
    }

    if (findings.length === 0) {
      console.log("A11y contrast audit: no color-contrast violations found.");
      return;
    }

    console.log("A11y contrast audit findings:");
    for (const f of findings) {
      console.log(
        `- [${f.scope}] ${f.id} (${f.impact}) nodes=${f.nodes} :: ${f.help}`
      );
    }

    const criticalOrSerious = findings.filter(
      (f) => f.impact === "critical" || f.impact === "serious"
    );
    if (criticalOrSerious.length > 0) {
      process.exitCode = 1;
    }
  } finally {
    if (browser) await browser.close();
    if (dev && !dev.killed) {
      dev.kill("SIGTERM");
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
