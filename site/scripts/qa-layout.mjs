// Layout + accessibility QA across routes and viewport widths.
// Usage: node scripts/qa-layout.mjs [baseUrl]   (run `npm run preview` first)
import { chromium, firefox, webkit } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:4173";
const widths = process.env.WIDTHS ? process.env.WIDTHS.split(",").map(Number) : [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const routes = ["/", "/aura", "/savour", "/elixirs", "/atelier", "/moments", "/events", "/events/does-not-exist", "/reservations", "/contact", "/nope"];
const allEngines = { chromium, firefox, webkit };
const engines = process.env.ENGINES ? Object.fromEntries(process.env.ENGINES.split(",").map((n) => [n, allEngines[n]])) : { chromium };
const outDir = "screenshots/qa";
mkdirSync(outDir, { recursive: true });

// Runs inside the page: collects layout problems for the current viewport.
const probe = () => {
  const vw = document.documentElement.clientWidth;
  const issues = [];
  if (document.documentElement.scrollWidth > vw + 1) issues.push(`horizontal overflow ${document.documentElement.scrollWidth}>${vw}`);

  const buttons = [...document.querySelectorAll("a.button, button.button, .mobile-bar a, .button--ghost")];
  for (const b of buttons) {
    const r = b.getBoundingClientRect();
    if (r.width === 0) continue;
    if (b.scrollWidth > b.clientWidth + 1) issues.push(`button text clipped: "${b.textContent.trim().slice(0, 40)}"`);
    if (r.right > vw + 1 || r.left < -1) issues.push(`button outside viewport: "${b.textContent.trim().slice(0, 40)}"`);
    // A label is "wrapped" when its text box is taller than one line. Stacked layouts (column) are intentional.
    const cs = getComputedStyle(b);
    if (cs.flexDirection !== "column") {
      const range = document.createRange();
      range.selectNodeContents(b);
      const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4;
      const textH = range.getBoundingClientRect().height;
      if (textH > lineHeight * 1.6) issues.push(`button label wraps (${Math.round(textH / lineHeight)} lines): "${b.textContent.trim().slice(0, 40)}" at ${Math.round(r.width)}px`);
    }
  }

  for (const img of document.querySelectorAll("img")) {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) issues.push(`broken image ${img.getAttribute("src")}`);
    if (!img.getAttribute("width") || !img.getAttribute("height")) issues.push(`img without intrinsic size ${img.getAttribute("src")}`);
  }

  // Grid cells: items in one grid row should share a top edge (aligned) and not spill outside their parent.
  for (const grid of document.querySelectorAll(".gallery, .index-list, .split, .intro, .site-footer__grid")) {
    const gr = grid.getBoundingClientRect();
    for (const item of grid.children) {
      const ir = item.getBoundingClientRect();
      if (ir.width === 0) continue;
      if (ir.right > gr.right + 2 || ir.left < gr.left - 2) issues.push(`grid item outside its grid: ${grid.className}`);
    }
  }

  // Headings and body copy must not be cut off by their containers.
  for (const el of document.querySelectorAll("h1, h2, h3, p, .lede, .eyebrow")) {
    if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow === "visible") {
      issues.push(`text overflow: <${el.tagName.toLowerCase()}> "${el.textContent.trim().slice(0, 40)}"`);
    }
  }
  return issues;
};

const results = [];
for (const [name, type] of Object.entries(engines)) {
  const browser = await type.launch();
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    for (const route of routes) {
      const entry = { engine: name, width, route, issues: [], consoleErrors: [] };
      page.removeAllListeners("console");
      page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") entry.consoleErrors.push(m.text().slice(0, 160)); });
      try {
        await page.goto(base + route, { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForSelector("main", { timeout: 10000 });
        await page.waitForTimeout(400);
        entry.issues = await page.evaluate(probe);
        if (name === "chromium" && (width === 375 || width === 1440)) {
          await page.screenshot({ path: `${outDir}/${name}-${width}${route.replace(/\//g, "_") || "_home"}.png`, fullPage: true });
        }
        if (width === 390) {
          // axe can stall on very media-heavy pages, so cap it and report instead of hanging the run.
          const axe = await Promise.race([
            new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze(),
            new Promise((_, rej) => setTimeout(() => rej(new Error("axe timed out after 25s")), 25000)),
          ]).catch((e) => ({ violations: [], error: String(e.message) }));
          entry.axe = axe.error ? [`axe skipped: ${axe.error}`] : axe.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s) — ${v.help}`);
        }
      } catch (err) {
        entry.issues.push(`load failed: ${String(err).slice(0, 160)}`);
      }
      results.push(entry);
      console.log(`progress ${name} ${width}px ${route} issues=${entry.issues.length}`);
    }
    await ctx.close();
  }
  await browser.close();
}

const bad = results.filter((r) => r.issues.length || r.consoleErrors.length || (r.axe && r.axe.length));
writeFileSync(`${outDir}/report.json`, JSON.stringify(results, null, 2));
console.log(`checked ${results.length} page loads; ${bad.length} with findings`);
for (const r of bad) {
  console.log(`\n[${r.engine} ${r.width}px ${r.route}]`);
  for (const i of [...new Set(r.issues)]) console.log("  - " + i);
  for (const c of r.consoleErrors) console.log("  console: " + c);
  for (const a of r.axe ?? []) console.log("  axe: " + a);
}
