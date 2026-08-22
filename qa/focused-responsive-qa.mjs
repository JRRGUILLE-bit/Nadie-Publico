import fs from 'node:fs';
import path from 'node:path';
import { chromium, firefox, webkit } from 'playwright';

const baseURL = process.env.QA_BASE_URL || 'http://127.0.0.1:4173';
const outDir = process.env.QA_OUT_DIR || 'qa-focused-results';
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, 'screenshots'), { recursive: true });

const languages = [
  { key: 'spanish', page: 'index.html' },
  { key: 'english', page: 'english.html' },
];

const coverScenarios = [
  { name: 'laptop-1536x864', width: 1536, height: 864, dpr: 1 },
  { name: 'laptop-1366x768', width: 1366, height: 768, dpr: 1 },
  { name: 'legacy-1024x768', width: 1024, height: 768, dpr: 1 },
];

const engines = { chromium, firefox, webkit };
const results = [];

function rectOverlap(a, b) {
  const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return { width, height };
}

async function settleCover(page) {
  await page.waitForTimeout(1100);
  const skip = page.locator('.skip-intro-button');
  if (await skip.count()) {
    try {
      await skip.click({ timeout: 5000, force: true });
    } catch {
      // If the animation already completed, measurement below is still authoritative.
    }
  }
  await page.waitForTimeout(900);
}

async function runCover(engineName, browserType, language, scenario) {
  const issues = [];
  const browser = await browserType.launch();
  const context = await browser.newContext({
    viewport: { width: scenario.width, height: scenario.height },
    deviceScaleFactor: scenario.dpr,
    locale: language.key === 'english' ? 'en-US' : 'es-UY',
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/${language.page}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await settleCover(page);

  const snap = await page.evaluate(() => {
    const read = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    };
    const guard = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .map((el) => el.getAttribute('href') || '')
      .find((href) => href.startsWith('responsive-guard.css')) || null;
    return {
      width: innerWidth,
      height: innerHeight,
      format: read('.format-line'),
      credits: read('.plate--credits'),
      guard,
    };
  });

  if (!snap.guard?.includes('v=3')) {
    issues.push({ severity: 'FAIL', code: 'guard-version', message: `Expected responsive-guard.css?v=3, got ${snap.guard}` });
  }
  if (!snap.format || !snap.credits) {
    issues.push({ severity: 'FAIL', code: 'cover-elements-missing', message: 'Could not measure format or credits.' });
  } else {
    const hit = rectOverlap(snap.format, snap.credits);
    if (hit.height >= 5) {
      issues.push({ severity: 'FAIL', code: 'format-credits-collision', message: `Format overlaps credits by ${hit.height.toFixed(1)}px.`, details: { hit, snap } });
    }
    for (const [key, r] of [['format', snap.format], ['credits', snap.credits]]) {
      if (r.left < -3 || r.right > snap.width + 3 || r.top < -3 || r.bottom > snap.height + 3) {
        issues.push({ severity: 'FAIL', code: 'cover-offscreen', message: `${key} extends outside viewport.`, details: { key, rect: r, viewport: [snap.width, snap.height] } });
      }
    }
  }

  if (issues.length) {
    await page.screenshot({ path: path.join(outDir, 'screenshots', `${engineName}__${language.key}__${scenario.name}__cover.png`) });
  }

  results.push({ type: 'cover', engine: engineName, language: language.key, scenario: scenario.name, issues, snapshot: snap });
  await context.close();
  await browser.close();
}

async function runWebkitLandscape(language) {
  const issues = [];
  const browser = await webkit.launch();
  const context = await browser.newContext({
    viewport: { width: 844, height: 390 },
    deviceScaleFactor: 3,
    hasTouch: true,
    isMobile: true,
    locale: language.key === 'english' ? 'en-US' : 'es-UY',
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/${language.page}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await settleCover(page);

  await page.locator('#about-trigger').click({ timeout: 5000, force: true });
  await page.waitForTimeout(500);

  for (let i = 0; i < 7; i += 1) {
    const snap = await page.evaluate(() => {
      const card = document.querySelector('.about-card.is-active');
      const viewport = document.querySelector('.about-carousel__viewport');
      const current = document.querySelector('.about-carousel__current')?.textContent?.trim() || '';
      if (!card || !viewport) return { missing: true, current, width: innerWidth, height: innerHeight };
      const c = card.getBoundingClientRect();
      const v = viewport.getBoundingClientRect();
      const cs = getComputedStyle(card);
      return {
        missing: false,
        current,
        width: innerWidth,
        height: innerHeight,
        card: { left: c.left, right: c.right, top: c.top, bottom: c.bottom, width: c.width, height: c.height },
        viewport: { left: v.left, right: v.right, top: v.top, bottom: v.bottom, width: v.width, height: v.height },
        transform: cs.transform,
        translate: cs.translate,
      };
    });

    if (snap.missing) {
      issues.push({ severity: 'FAIL', code: 'carousel-missing', message: `Slide ${i + 1}: active card missing.` });
    } else {
      const screenOverflowLeft = Math.max(0, -snap.card.left);
      const screenOverflowRight = Math.max(0, snap.card.right - snap.width);
      const leftDelta = Math.abs(snap.card.left - snap.viewport.left);
      const rightDelta = Math.abs(snap.card.right - snap.viewport.right);

      if (screenOverflowLeft > 4 || screenOverflowRight > 4) {
        issues.push({ severity: 'FAIL', code: 'carousel-card-offscreen', message: `${snap.current} exceeds screen bounds.`, details: { screenOverflowLeft, screenOverflowRight, snap } });
      }
      if (leftDelta > 2 || rightDelta > 2) {
        issues.push({ severity: 'FAIL', code: 'carousel-viewport-offset', message: `${snap.current} is not pinned to carousel viewport (L ${leftDelta.toFixed(1)}px / R ${rightDelta.toFixed(1)}px).`, details: { leftDelta, rightDelta, snap } });
      }
      if (snap.transform !== 'none') {
        issues.push({ severity: 'FAIL', code: 'carousel-transform-residual', message: `${snap.current} retains transform ${snap.transform}.`, details: snap });
      }
    }

    if (issues.length) {
      await page.screenshot({ path: path.join(outDir, 'screenshots', `webkit__${language.key}__844x390__slide-${String(i + 1).padStart(2, '0')}.png`) });
    }

    if (i < 6) {
      await page.locator('#about-next').click({ timeout: 5000, force: true });
      await page.waitForTimeout(350);
    }
  }

  results.push({ type: 'webkit-landscape', engine: 'webkit', language: language.key, scenario: 'iphone-landscape-844x390', issues });
  await context.close();
  await browser.close();
}

for (const [engineName, browserType] of Object.entries(engines)) {
  for (const language of languages) {
    for (const scenario of coverScenarios) {
      await runCover(engineName, browserType, language, scenario);
    }
  }
}

for (const language of languages) {
  await runWebkitLandscape(language);
}

const failures = results.flatMap((r) => r.issues.map((issue) => ({ ...issue, engine: r.engine, language: r.language, scenario: r.scenario, type: r.type }))).filter((i) => i.severity === 'FAIL');
const summary = {
  generatedAt: new Date().toISOString(),
  runs: results.length,
  failures: failures.length,
  results,
};

fs.writeFileSync(path.join(outDir, 'focused-results.json'), JSON.stringify(summary, null, 2));
const lines = [
  '# Focused responsive QA',
  '',
  `- Runs: ${summary.runs}`,
  `- FAIL: ${summary.failures}`,
  '',
];
if (!failures.length) {
  lines.push('PASS — targeted format/credits and WebKit landscape regressions are clear.');
} else {
  lines.push('## Failures', '');
  for (const f of failures) lines.push(`- ${f.engine} / ${f.language} / ${f.scenario}: ${f.code} — ${f.message}`);
}
fs.writeFileSync(path.join(outDir, 'focused-summary.md'), `${lines.join('\n')}\n`);

console.log(`Focused QA: ${summary.runs} runs, ${summary.failures} failures.`);
if (failures.length) process.exit(1);
