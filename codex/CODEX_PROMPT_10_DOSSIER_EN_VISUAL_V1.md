# CODEX PROMPT 10 — `dossier-en.html` VISUAL PARITY V1

Work from `main` in `JRRGUILLE-bit/Nadie-Publico`.

## OBJECTIVE

Bring the **English industry dossier `dossier-en.html`** into the same approved visual system as the final Spanish dossier `sobre.html` / `sobre-visual.css` V2.1.

This is **not a new redesign**. The Spanish dossier is the visual reference and should be treated as locked.

The English page should feel like the same dossier in another language: same hierarchy, composition, spacing logic, responsive behavior, archive/dossier texture, market emphasis, team hierarchy and closing contact treatment.

The English copy synchronized in PR #57 is now **editorially frozen**.

## READ FIRST — REQUIRED

Read in full before editing:

- `dossier-en.html`
- `sobre.html`
- `sobre-visual.css`
- `project-page.css`
- `industrial-sheet.css`
- `market-polish.css`
- `VISUAL_IDENTITY.md`

Use the **current `sobre-visual.css` in main after the V2.1 corrections** as the direct visual reference.

Do not reconstruct the Spanish design from memory. Read the current file.

## STRICT EDITORIAL LOCK

Do **not** rewrite, shorten, expand, translate again or otherwise alter visible English copy.

Do not change:

- project definition;
- logline;
- synopsis;
- audience;
- development status;
- materials;
- recognitions;
- market ask;
- team roles or bios;
- SKA / Nacho text;
- contact copy;
- CTA labels;
- footer;
- metadata/SEO values unless a purely technical markup move requires no value change.

The two existing English `mailto:` href values must remain **byte-for-byte identical**.

Do not modify Spanish copy or Spanish layout.

## EXPECTED FILES

Preferred scope:

- `dossier-en.html`
- new `dossier-en-visual.css`

Do not modify `sobre.html` or `sobre-visual.css` unless there is an unavoidable technical reason. There should not be one.

Do not modify:

- `index.html`
- `english.html`
- `about.html`
- `styles.css`
- JS
- shared CSS
- assets
- Spanish pages

## ISOLATION STRATEGY

Create a new page-specific stylesheet:

`dossier-en-visual.css`

Link it only from `dossier-en.html`, after the existing shared stylesheets.

Use a cachebuster such as:

`dossier-en-visual.css?v=1`

Do **not** simply link `sobre-visual.css` from the English page, because the Spanish stylesheet contains selectors scoped to Spanish `aria-labelledby` / IDs and should remain isolated.

Instead:

1. use the current `sobre-visual.css` as the starting visual system;
2. copy/adapt its rules into `dossier-en-visual.css`;
3. change only the selectors that need English IDs;
4. keep the approved V2.1 measurements and visual decisions unless English text wrapping creates a real layout problem.

## SELECTOR MAPPING

Where `sobre-visual.css` targets Spanish section IDs through `aria-labelledby`, adapt them to the English dossier equivalents:

- `publico` → `audience`
- `estado` → `status`
- `materiales` → `materials`
- `recorrido` → `track-record`
- `busqueda` → `partnerships`
- `equipo` → `team`

Keep current English jump-nav IDs intact:

- `#synopsis`
- `#audience`
- `#status`
- `#materials`
- `#track-record`
- `#partnerships`
- `#team`
- `#contact`

Do not rename fragments just to mimic Spanish IDs.

## REQUIRED HTML COMPOSITION PARITY

The English HTML still uses the older flat structure. Apply only the minimal semantic wrappers/classes needed to match the Spanish page.

### 1 — HERO

Recompose the opening to use the same structure as `sobre.html`:

- `<header class="dossier-hero">`
- `<div class="dossier-hero__title">` containing:
  - H1
  - subtitle
  - `dossier-hero__credit`
- logline section in the same hero grid
- main still in the same hero grid

Keep the English H1 id `project`.

Do not change any text.

Use the same approved V2.1 title scale from current `sobre-visual.css`, including the reduced H1 size and line-height. Do not restore the oversized V2 title.

### 2 — INDUSTRY OVERVIEW

Use the same production-sheet treatment as Spanish:

- four-column desktop grid;
- genre spans two columns where the Spanish layout does;
- status spans two columns where the Spanish layout does;
- two columns at tablet;
- readable one-column behavior where required on small screens.

Mirror the current V2.1 rules exactly unless an English string physically requires a small width adjustment.

### 3 — MAIN MARKET BLOCK

Mirror the approved Spanish V2.1 `market-target` composition:

- `Seeking now` eyebrow;
- dominant `FINANCING + INTERNATIONAL DISTRIBUTION` claim;
- explanatory ask in complementary column;
- red/gold archival treatment;
- current V2.1 column ratio, spacing and margins.

Do not create new CTAs here.

### 4 — JUMP NAV

Use the same numbered editorial index treatment as the Spanish dossier.

Keep the eight English labels and existing href targets.

Desktop should remain compact and intentional, not eight generic buttons.

### 5 — SYNOPSIS + SECOND STILL

Wrap the English synopsis section and the existing second still in:

`<div class="synopsis-layout">`

Mirror the Spanish asymmetrical text/image layout.

Do not add any decorative `01 /` prefix. That was explicitly removed in V2.1.

Keep all three synopsis paragraphs unchanged.

### 6 — AUDIENCE

Mirror the Spanish strong data treatment using the English IDs/selectors:

- `CORE: 18–34`
- `SECONDARY: 35–44 + Spanish-speaking audiences with cultural affinity.`

Same visual hierarchy, responsive behavior and border logic as the Spanish dossier.

### 7 — DEVELOPMENT STATUS

Mirror the Spanish red-ruled compact status strip.

The existing English status remains one paragraph.

Do not turn it into cards or a list.

### 8 — AVAILABLE MATERIALS

Mirror the **current V2.1** materials grid exactly:

- 4 columns on wide desktop;
- seven numbered material entries;
- last item spans two columns on wide desktop;
- at `max-width: 1024px`, 2 columns and the last item spans both columns;
- at `max-width: 540px`, 1 column and the last item resets to normal single-column width.

This responsive orphan fix is mandatory; do not regress it.

### 9 — RECOGNITION AND SUPPORT

Mirror the Spanish horizontal timeline treatment on desktop and vertical/2-column responsive behavior at smaller widths.

Keep exactly four current English milestones.

Do not reintroduce category labels such as `Support`, `Lab`, `Award`, `Selection`.

### 10 — WHAT WE ARE LOOKING FOR

Mirror the compact secondary strategy block from Spanish, using English `aria-labelledby="partnerships"` selectors.

This section must remain visually subordinate to the major market block above.

Do not change copy.

### 11 — TEAM

Mirror the Spanish approved hierarchy and composition exactly:

1. Maite + Guillermo side by side on desktop as equal authorial blocks;
2. shared-authorship statement across full width;
3. Malena full-width as production/executive producer block with the approved producer treatment;
4. SKA / Nacho full-width as industrial/coproductive backing.

The English HTML already contains:

- `.team-grid__shared`
- `.team-card--producer`

Preserve them.

Use the same approved Spanish visual system for:

- name hierarchy;
- role labels;
- shared gold authorship statement;
- Malena red production accent;
- SKA / Nacho full-width industrial block;
- responsive single-column behavior.

Do not generate portraits.

Do not add a logo unless the current approved Spanish dossier itself is using it. The goal is parity, not a new enhancement.

### 12 — CONTACT / CLOSING

Mirror the Spanish final dossier treatment:

- strong closing panel;
- two primary CTAs with same hierarchy and interaction treatment;
- secondary link list below;
- footer after energy has dropped.

Keep all English destinations and labels unchanged.

Again: preserve both `mailto:` href values byte-for-byte.

## V2.1 DETAILS THAT MUST BE PRESERVED

The English visual adaptation must include the corrections already approved in Spanish V2.1:

- `.project-file::before` uses `position: absolute`, **not fixed**;
- reduced H1 scale: current Spanish V2.1 value, not the original oversized V2 value;
- no isolated `01 /` before Synopsis;
- current rebalanced market columns;
- compacted V2.1 vertical rhythm;
- 4-column materials grid on wide desktop;
- last material spans 2 columns on wide desktop;
- last material spans 2 columns in the 2-column tablet layout;
- last material resets to `auto` in one-column mobile layout;
- current V2.1 mobile H1 scale.

Do not use the pre-V2.1 version as reference.

## RESPONSIVE QA

The page must work as a natural long-scroll dossier.

Validate at minimum:

- 1440×900
- 1280×800
- 1024×768
- 768×1024
- 430×932
- 390×844
- 360×800

Requirements:

- no horizontal overflow;
- no clipped copy;
- no text hidden to make layouts fit;
- readable normal body sizes;
- touch-friendly CTAs;
- timeline adapts cleanly;
- team becomes one clear column on mobile;
- image aspect ratios remain stable;
- title does not dominate the viewport again;
- English strings can wrap naturally without breaking the grid.

If no browser is available in the Codex environment, explicitly report that visual browser QA was not performed. Static checks do **not** count as visual approval.

## ACCESSIBILITY / SEMANTICS

Preserve:

- heading hierarchy;
- all existing `aria-labelledby` relationships;
- unique IDs;
- keyboard navigation;
- `:focus-visible`;
- reduced-motion behavior;
- image alt text;
- external `target="_blank"` + `rel` values;
- link destinations;
- language switch.

Do not use CSS `order` to create a reading order different from DOM order.

## QA — REQUIRED

Before finishing:

1. run `git diff --check`;
2. parse `dossier-en.html` with a basic HTML parser;
3. verify all 8 jump-nav hrefs resolve to unique IDs;
4. verify the two English `mailto:` href values are byte-for-byte identical before/after;
5. verify visible English text is byte-for-byte unchanged from `main` at the start of this task;
6. verify the same two existing image paths remain unchanged;
7. verify no Spanish page, shared CSS, JS or asset was modified;
8. verify `dossier-en-visual.css` is linked exactly once;
9. verify there is no `position: fixed` override for `.project-file::before` in the new stylesheet;
10. verify the materials responsive orphan fix exists at desktop/tablet/mobile;
11. report whether browser screenshots were actually generated.

## PR

Create a **new PR against `main`**.

Do not merge it.

In the PR description confirm explicitly:

- English dossier content remained frozen;
- Spanish V2.1 dossier was used as the visual source of truth;
- a page-specific `dossier-en-visual.css` was used to avoid affecting Spanish or shared pages;
- V2.1 fixes were preserved;
- the two English `mailto:` href values remained byte-for-byte identical;
- no shared CSS, JS, assets, Spanish pages, `index.html` or `english.html` were changed;
- browser visual QA status and viewport sizes tested.
