import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const baseURL = process.env.QA_BASE_URL || 'http://127.0.0.1:4173';
const outDir = process.env.QA_OUT_DIR || 'qa-repo-audit-results';
fs.mkdirSync(outDir, { recursive: true });

const findings = [];
const browser = await chromium.launch();

for (const spec of [
  { file: 'index.html', lang: 'es', credit: 'Creada por', production: 'Una producción de SKA Films' },
  { file: 'english.html', lang: 'en', credit: 'Created by', production: 'A production by SKA Films' },
]) {
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    reducedMotion: 'reduce',
    locale: spec.lang === 'en' ? 'en-US' : 'es-UY',
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/${spec.file}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(600);
  const snap = await page.evaluate(() => ({
    credit: document.querySelector('.plate--credits .plate__line--1')?.textContent?.trim() || '',
    production: document.querySelector('.plate--coproduction')?.textContent?.replace(/\s+/g,' ')?.trim() || '',
    skipExists: !!document.querySelector('.skip-intro-button'),
    complete: document.body.classList.contains('intro-complete'),
  }));
  if (snap.credit !== spec.credit) findings.push({ severity:'FAIL', code:'reduced-motion-credit-copy', file:spec.file, expected:spec.credit, actual:snap.credit });
  if (snap.production !== spec.production) findings.push({ severity:'FAIL', code:'reduced-motion-production-copy', file:spec.file, expected:spec.production, actual:snap.production });
  if (snap.skipExists) findings.push({ severity:'WARN', code:'reduced-motion-skip-visible', file:spec.file });
  if (!snap.complete) findings.push({ severity:'FAIL', code:'reduced-motion-not-complete', file:spec.file });
  await context.close();
}

// Legacy /about.html should at least resolve cleanly; record where it actually lands.
{
  const context = await browser.newContext({ viewport:{ width:1366, height:768 } });
  const page = await context.newPage();
  const resp = await page.goto(`${baseURL}/about.html`, { waitUntil:'domcontentloaded', timeout:15000 });
  await page.waitForTimeout(300);
  findings.push({ severity:'INFO', code:'about-redirect-target', file:'about.html', target:new URL(page.url()).pathname, status:resp?.status() });
  await context.close();
}

await browser.close();
const failCount = findings.filter(f=>f.severity==='FAIL').length;
fs.writeFileSync(path.join(outDir,'reduced-motion-audit.json'), JSON.stringify({failCount,findings},null,2));
console.log(`Reduced-motion audit: ${failCount} FAIL.`);
for (const f of findings) console.log(`${f.severity} ${f.code} ${f.file} ${f.expected ? `expected=${JSON.stringify(f.expected)} actual=${JSON.stringify(f.actual)}` : JSON.stringify(f)}`);
if (failCount) process.exitCode=1;
