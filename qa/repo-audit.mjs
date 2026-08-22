import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';

const root = process.cwd();
const baseURL = process.env.QA_BASE_URL || 'http://127.0.0.1:4173';
const outDir = process.env.QA_OUT_DIR || 'qa-repo-audit-results';
fs.mkdirSync(outDir, { recursive: true });

const issues = [];
const add = (severity, code, file, message, details = {}) => issues.push({ severity, code, file, message, details });

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', outDir].includes(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p)); else out.push(p);
  }
  return out;
}

const allFiles = walk(root);
const rel = p => path.relative(root, p).replaceAll(path.sep, '/');
const textExt = new Set(['.html','.css','.js','.mjs','.md','.txt','.xml','.json','.yml','.yaml','.vcf']);
const textFiles = allFiles.filter(p => textExt.has(path.extname(p).toLowerCase()));
const htmlFiles = allFiles.filter(p => path.extname(p).toLowerCase() === '.html' && !rel(p).startsWith('qa/'));
const jsFiles = allFiles.filter(p => ['.js','.mjs'].includes(path.extname(p).toLowerCase()) && !rel(p).startsWith('qa/'));
const cssFiles = allFiles.filter(p => path.extname(p).toLowerCase() === '.css');
const textMap = new Map(textFiles.map(p => [rel(p), fs.readFileSync(p, 'utf8')]));

// 1) JS syntax.
for (const p of jsFiles) {
  try { execFileSync(process.execPath, ['--check', p], { stdio: 'pipe' }); }
  catch (err) { add('FAIL','js-syntax',rel(p),'JavaScript syntax check failed.',{ stderr: String(err.stderr || err.message).slice(0,1200) }); }
}

// 2) CSS structural sanity.
for (const p of cssFiles) {
  const s = fs.readFileSync(p, 'utf8');
  let depth = 0, min = 0, inComment = false, quote = null;
  for (let i=0;i<s.length;i++) {
    const c=s[i], n=s[i+1];
    if (inComment) { if (c==='*'&&n==='/'){inComment=false;i++;} continue; }
    if (!quote && c==='/'&&n==='*'){inComment=true;i++;continue;}
    if (quote) { if (c==='\\'){i++;continue;} if(c===quote)quote=null; continue; }
    if (c==='"'||c==="'"){quote=c;continue;}
    if (c==='{') depth++; if(c==='}') {depth--; min=Math.min(min,depth);} 
  }
  if (depth !== 0 || min < 0) add('FAIL','css-braces',rel(p),`CSS braces are unbalanced (depth=${depth}, min=${min}).`);
}

function attrsFrom(tag) {
  const attrs = {};
  for (const m of tag.matchAll(/\s([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  return attrs;
}
function idsIn(html) { return [...html.matchAll(/\sid\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]); }
function resolveLocal(from, value) {
  if (!value || /^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(value)) return null;
  const clean = value.split('#')[0].split('?')[0];
  if (!clean) return null;
  let decoded = clean;
  try { decoded = decodeURIComponent(clean); } catch {}
  return path.posix.normalize(path.posix.join(path.posix.dirname(from), decoded));
}

// 3) Static HTML integrity: resources, ids, anchors, basic a11y/meta.
const htmlIds = new Map();
for (const p of htmlFiles) htmlIds.set(rel(p), new Set(idsIn(fs.readFileSync(p,'utf8'))));

for (const p of htmlFiles) {
  const file = rel(p), html = fs.readFileSync(p,'utf8');
  const ids = idsIn(html);
  const dup = ids.filter((id,i)=>ids.indexOf(id)!==i);
  if (dup.length) add('FAIL','duplicate-id',file,'Duplicate HTML id(s).',{ ids:[...new Set(dup)] });

  if (!/<html\b[^>]*\blang\s*=/i.test(html)) add('WARN','missing-lang',file,'Missing html[lang].');
  if (!/<title>[^<]+<\/title>/i.test(html) && !file.startsWith('google')) add('WARN','missing-title',file,'Missing non-empty <title>.');
  if (!/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+/i.test(html) && !file.startsWith('google') && file !== 'about.html') add('WARN','missing-description',file,'Missing meta description.');

  for (const m of html.matchAll(/<(img)\b[^>]*>/gi)) {
    const a = attrsFrom(m[0]);
    if (!('alt' in a)) add('FAIL','img-missing-alt',file,`Image missing alt: ${a.src || '(no src)'}`);
  }

  const refTags = [...html.matchAll(/<(?:a|link|script|img|source)\b[^>]*>/gi)];
  for (const m of refTags) {
    const tag = m[0].match(/^<([a-z]+)/i)?.[1]?.toLowerCase();
    const a = attrsFrom(m[0]);
    const v = a.href ?? a.src;
    if (!v) continue;
    const target = resolveLocal(file, v);
    if (target && !fs.existsSync(path.join(root,target))) add('FAIL','missing-local-resource',file,`Local ${tag} target does not exist: ${v}`,{ resolved:target });

    if (tag === 'a' && v.includes('#') && !/^(?:https?:|mailto:|tel:|javascript:)/i.test(v)) {
      const [before,fragRaw] = v.split('#');
      if (!fragRaw) continue;
      let frag=fragRaw; try{frag=decodeURIComponent(fragRaw)}catch{}
      const targetFile = before ? resolveLocal(file,before) : file;
      if (targetFile && htmlIds.has(targetFile) && !htmlIds.get(targetFile).has(frag)) add('FAIL','broken-fragment',file,`Anchor points to missing #${frag} in ${targetFile}.`);
    }
  }
}

// 4) Sitemap / robots consistency.
const sitemap = textMap.get('sitemap.xml') || '';
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
for (const loc of sitemapLocs) {
  try {
    const u = new URL(loc); let pathname = u.pathname.replace(/^\/Nadie-Publico\/?/,'');
    if (!pathname) pathname='index.html';
    if (!fs.existsSync(path.join(root,pathname))) add('FAIL','sitemap-missing-target','sitemap.xml',`Sitemap URL has no matching file: ${loc}`,{ expected:pathname });
  } catch { add('FAIL','sitemap-invalid-url','sitemap.xml',`Invalid sitemap URL: ${loc}`); }
}
const robots = textMap.get('robots.txt') || '';
if (sitemap && !/sitemap:/i.test(robots)) add('WARN','robots-no-sitemap','robots.txt','robots.txt does not advertise sitemap.xml.');

// 5) Content-state consistency around SKA production wording.
for (const [file,s] of textMap) {
  if (file.startsWith('codex/')) continue;
  const hits = [];
  for (const phrase of ['coproducción con SKA Films','Coproduction with SKA Films','coproducción uruguaya','Uruguayan coproduction','Coproduction: SKA Films','coproducción de SKA Films']) {
    if (s.toLowerCase().includes(phrase.toLowerCase())) hits.push(phrase);
  }
  if (hits.length) add('WARN','stale-ska-coproduction-copy',file,'Still contains SKA “coproduction” wording while the cover now says SKA production.',{ hits });
}

// 6) Large/unreferenced assets and public-root hygiene.
const searchableText = [...textMap.values()].join('\n');
for (const p of allFiles) {
  const r=rel(p), stat=fs.statSync(p);
  if (stat.size > 2_000_000 && !r.startsWith('qa/')) {
    const base=path.basename(r);
    const referenced = searchableText.includes(r) || searchableText.includes(base);
    if (!referenced) add('WARN','large-unreferenced-file',r,`Large file (${(stat.size/1048576).toFixed(2)} MiB) appears unreferenced by text/code.`);
  }
}
for (const r of ['CV_Guillermo_Barbeito_Temporada_Cero_2026 (1).pdf','CV_Maite Piñeyrúa Segura.pdf','TODO.md','SITE_CONTENT_SOURCE.md','VISUAL_IDENTITY.md']) {
  if (fs.existsSync(path.join(root,r))) add('WARN','public-repo-hygiene',r,'File is directly exposed in the public repository root; verify that public exposure is intentional.');
}

// 7) Browser runtime + responsive smoke across every HTML page.
const browser = await chromium.launch();
const viewports = [{name:'desktop',width:1366,height:768},{name:'mobile',width:390,height:844}];
for (const p of htmlFiles) {
  const file=rel(p);
  if (file.startsWith('google')) continue;
  for (const vp of viewports) {
    const context=await browser.newContext({viewport:{width:vp.width,height:vp.height}});
    const page=await context.newPage();
    const runtime=[];
    page.on('pageerror',e=>runtime.push({type:'pageerror',text:e.message}));
    page.on('console',m=>{ if(m.type()==='error') runtime.push({type:'console',text:m.text()}); });
    page.on('requestfailed',req=>runtime.push({type:'requestfailed',text:`${req.url()} :: ${req.failure()?.errorText||''}`}));
    let resp=null;
    try { resp=await page.goto(`${baseURL}/${file}`,{waitUntil:'domcontentloaded',timeout:15000}); await page.waitForTimeout(1200); }
    catch(e){ add('FAIL','navigation-failed',file,`${vp.name}: ${e.message}`); await context.close(); continue; }
    if (resp && !resp.ok()) add('FAIL','http-status',file,`${vp.name}: HTTP ${resp.status()}`);
    for (const e of runtime) add(e.type==='pageerror'?'FAIL':'WARN',`runtime-${e.type}`,file,`${vp.name}: ${e.text}`);

    const snap=await page.evaluate(()=>({
      w:innerWidth, h:innerHeight,
      scrollW:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),
      duplicateIds:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((v,i,a)=>a.indexOf(v)!==i),
      namelessControls:[...document.querySelectorAll('button,a,input,select,textarea')].filter(el=>{
        const visible=!!(el.offsetWidth||el.offsetHeight||el.getClientRects().length); if(!visible)return false;
        const label=(el.getAttribute('aria-label')||el.getAttribute('title')||el.textContent||'').trim();
        const imgAlt=el.querySelector?.('img')?.getAttribute('alt')?.trim()||'';
        return !label&&!imgAlt;
      }).slice(0,10).map(e=>({tag:e.tagName,id:e.id,cls:e.className})),
      links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(Boolean),
    }));
    if (snap.scrollW > snap.w + 4) add('FAIL','page-horizontal-overflow',file,`${vp.name}: document is ${Math.round(snap.scrollW-snap.w)}px wider than viewport.`,snap);
    if (snap.duplicateIds.length) add('FAIL','runtime-duplicate-id',file,`${vp.name}: duplicate ids present.`,{ids:[...new Set(snap.duplicateIds)]});
    if (snap.namelessControls.length) add('WARN','nameless-control',file,`${vp.name}: visible interactive controls without an accessible name.`,{controls:snap.namelessControls});

    // Local href HTTP check through the served site.
    for (const href of [...new Set(snap.links)]) {
      if (!href || /^(?:#|mailto:|tel:|javascript:|https?:)/i.test(href)) continue;
      const target = new URL(href, `${baseURL}/${file}`);
      const rr = await context.request.get(target.toString());
      if (!rr.ok()) add('FAIL','broken-served-link',file,`${vp.name}: ${href} returned HTTP ${rr.status()}.`);
    }

    await context.close();
  }
}

// 8) Landing carousel interaction smoke, both languages.
for (const file of ['index.html','english.html']) {
  const context=await browser.newContext({viewport:{width:1366,height:768}});
  const page=await context.newPage();
  await page.goto(`${baseURL}/${file}`,{waitUntil:'domcontentloaded'}); await page.waitForTimeout(1200);
  const skip=page.locator('.skip-intro-button');
  if (await skip.count()) { try { await skip.click({timeout:4000}); } catch {} }
  await page.waitForTimeout(900);
  const trigger=page.locator('#about-trigger');
  if (await trigger.count()) {
    try {
      await trigger.click({timeout:4000}); await page.waitForTimeout(500);
      const opened=await page.evaluate(()=>({aboutOpen:document.body.classList.contains('about-open'),aria:document.querySelector('#about-carousel')?.getAttribute('aria-hidden'),inert:document.querySelector('#about-carousel')?.hasAttribute('inert')}));
      if(!opened.aboutOpen||opened.aria!=='false'||opened.inert) add('FAIL','carousel-open-state',file,'Carousel open state/ARIA/inert are inconsistent.',opened);
      for(let i=0;i<8;i++){ await page.locator('#about-next').click(); await page.waitForTimeout(250); }
      await page.keyboard.press('Escape'); await page.waitForTimeout(350);
      const closed=await page.evaluate(()=>({aboutOpen:document.body.classList.contains('about-open'),aria:document.querySelector('#about-carousel')?.getAttribute('aria-hidden'),inert:document.querySelector('#about-carousel')?.hasAttribute('inert')}));
      if(closed.aboutOpen||closed.aria!=='true'||!closed.inert) add('FAIL','carousel-close-state',file,'Carousel close state/ARIA/inert are inconsistent after Escape.',closed);
    } catch(e){ add('FAIL','carousel-interaction',file,e.message); }
  } else add('FAIL','missing-about-trigger',file,'Missing #about-trigger.');
  await context.close();
}
await browser.close();

const counts = issues.reduce((a,i)=>(a[i.severity]=(a[i.severity]||0)+1,a),{});
const byCode = issues.reduce((a,i)=>(a[i.code]=(a[i.code]||0)+1,a),{});
const report={generatedAt:new Date().toISOString(),counts,byCode,filesScanned:allFiles.length,htmlFiles:htmlFiles.map(rel),issues};
fs.writeFileSync(path.join(outDir,'repo-audit.json'),JSON.stringify(report,null,2));
let md=`# Repository audit\n\nFiles scanned: ${allFiles.length}\n\nFAIL: ${counts.FAIL||0}  WARN: ${counts.WARN||0}\n\n## Counts by code\n`;
for(const [k,v] of Object.entries(byCode).sort((a,b)=>b[1]-a[1])) md+=`- ${k}: ${v}\n`;
md+='\n## Findings\n';
for(const i of issues) md+=`- **${i.severity} ${i.code}** — \`${i.file}\`: ${i.message}\n`;
fs.writeFileSync(path.join(outDir,'repo-audit.md'),md);
console.log(`Repository audit: ${allFiles.length} files, ${counts.FAIL||0} FAIL, ${counts.WARN||0} WARN.`);
for(const [k,v] of Object.entries(byCode).sort((a,b)=>b[1]-a[1])) console.log(`${k}: ${v}`);
if ((counts.FAIL||0)>0) process.exitCode=1;
