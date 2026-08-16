# CODEX PROMPT 11 — ENGLISH LANDING / 7-SLIDE CAROUSEL SYNC

Work from current `main` in `JRRGUILLE-bit/Nadie-Publico`.

## OBJECTIVE

Bring `english.html` into structural and editorial parity with the current approved Spanish landing `index.html`, specifically the **7-slide “Project & team” carousel**, while preserving the existing hero/background-video experience and the shared visual system.

This is primarily an **English content + structure synchronization task**, not a redesign.

The current English landing still contains the obsolete 5-card carousel and outdated project claims (`Old City`, `Active development`, `Teaser completed`, budget/development-plan materials, old team order, etc.). Replace that old carousel with the current seven-slide architecture used by `index.html`.

The English should read as natural professional film/TV industry English, not literal machine translation.

## READ FIRST — REQUIRED

Before editing, read in full:

- `index.html` — PRIMARY structure/content source for the current landing/carousel
- `english.html` — file to update
- `dossier-en.html` — PRIMARY source for already-approved English wording where content overlaps
- `SITE_CONTENT_SOURCE.md` — supporting public source
- `styles.css` — current carousel/mobile visual system
- `script.js` — current 7-slide interaction/accessibility behavior
- `market-polish-en.js` — English intro/skip-control overrides

Do not use old `english.html` carousel copy as a factual source when it conflicts with `index.html` or `dossier-en.html`.

## STRICT SCOPE

Expected changed files:

- `english.html`
- `script.js` ONLY if needed for safe language-aware UI localization described below

Do NOT modify:

- `index.html`
- `sobre.html`
- `dossier-en.html`
- `sobre-visual.css`
- `dossier-en-visual.css`
- shared visual CSS unless a genuine implementation blocker is discovered
- assets
- Spanish visible copy
- hero video assets or behavior

Do not create or generate any new images.

## HERO / COVER — FREEZE VISUAL EXPERIENCE

The cover/hero remains as-is:

- same background video
- same poster/fallback
- same overlays
- same title/intro plate behavior
- same contact buttons
- same legal line

Do not redesign or restyle the hero.

Keep `market-polish-en.js` because it provides English intro plate/skip-control text.

The English landing should use the current shared `styles.css` version used by Spanish (`styles.css?v=20` unless `main` has advanced by execution time).

## CAROUSEL ARCHITECTURE — EXACTLY 7 SLIDES

Replace the obsolete five English cards with the same semantic architecture as current Spanish `index.html`:

1. PROJECT
2. UNIVERSE
3. TONE
4. MARKET
5. CREATORS
6. SKA FILMS
7. TRACK RECORD

Use the same structural classes as Spanish:

- `.about-card--project`
- `.about-card--universe`
- `.about-card--tone`
- `.about-card--market`
- `.about-card--creators`
- `.about-card--ska`
- `.about-card--journey`

Use the same IDs and internal `data-slide-key` values as the Spanish architecture where practical so the shared CSS/JS behavior stays identical. Internal keys may remain Spanish (`proyecto`, `universo`, `tono`, `mercado`, `creadores`, `ska-films`, `recorrido`); they are implementation details, not visible text.

The carousel must be:

- `role="dialog"`
- `aria-modal="true"`
- no autoplay
- keyboard-operable
- Escape closes
- Left/Right changes slide
- inactive slides use existing `inert` behavior from `script.js`
- no internal vertical scrolling as a layout solution

There must be exactly:

- 7 elements with `data-about-slide`
- 7 controls with `data-about-dot`

Use labeled desktop controls and the existing `.about-carousel__current` output pattern.

## APPROVED ENGLISH COPY

### Slide 1 — PROJECT

Heading:

`PROJECT`

Tagline:

`A SERIES ABOUT FRIENDS. UNTIL EVERYTHING CATCHES FIRE.`

Logline — use the approved dossier wording exactly:

`Over mate, milanesas and arguments, three young people with one foot in adulthood share an apartment in Montevideo. But everything changes after an office fire sends them, almost by accident, to investigate a forgotten crime, a treasure lost during the dictatorship and the secrets their own families tried to bury.`

Format:

`6 × 20–25 min · Black comedy / political thriller · Montevideo, Uruguay`

This slide must NOT contain the old embedded status list, partner-search list, materials note, budget, development plan or CTA block.

### Slide 2 — UNIVERSE

Heading:

`UNIVERSE`

Body:

`A contemporary, everyday, recognizable Montevideo shaped by young adulthood, family ties and a memory that still carries weight. In this world, mystery slips into shared apartments, jobs, bars and neighbors, while the absurd coexists with the intimate and the dark.`

Concept line:

`FRIENDSHIP · PRECARITY · GOLD · MEMORY`

Character labels:

- `GONZALO`
- `MARÍA`
- `LUIS`

Accessible label for the character list:

`Main characters`

### Slide 3 — TONE

Heading:

`TONE`

Main quote:

`The direction of Nadie te dijo que iba a ser así is built on a constant tension between the everyday and the strange.`

Preserve the same emphasis structure as Spanish so `the everyday` and `the strange` receive the visual emphasis through the existing markup.

Supporting line:

`The tone comes from the collision between normality and absurdity.`

Resources:

- `VOICE-OVER`
- `FOURTH WALL`
- `FREEZE FRAME`
- `REWIND`
- `SPLIT SCREEN`
- `FLASHBACK`

### Slide 4 — MARKET

Header eyebrow:

`THE PROJECT TODAY`

Heading:

`MARKET`

Status — use the approved English dossier wording exactly:

`Pilot complete · season structured · Málaga Talent · DETOUR Montevideo Cine LAB · Teaser Award · FIC · teaser in production · SKA Films, Uruguayan coproduction`

Claim:

`FINANCING + INTERNATIONAL DISTRIBUTION`

Ask — use exactly:

`An international partner who can come on board before shooting and make financing and distribution part of the same plan: commission/pre-buy, strategic coproduction, or a studio/distributor with genuine distribution reach.`

Do not restore the old multi-item partner list.

### Slide 5 — CREATORS

Heading:

`CREATORS`

Maite Piñeyrúa Segura role:

`Co-creator · co-writer · director`

Maite bio — use approved dossier English exactly:

`Maite Piñeyrúa Segura is a Uruguayan director, screenwriter and photographer, with a degree in Audiovisual Communication from UCU. She directed Tumbero, awarded at FIEC, Dodecá and La Floresta, and wrote and directed Una vez casi hice un gol. She is co-creator, co-writer and director of Nadie te dijo que iba a ser así. She was selected for Málaga Talent 2025.`

Guillermo Barbeito Rodríguez role:

`Co-creator · co-writer · creative development`

Guillermo bio — use approved dossier English exactly:

`Guillermo Barbeito Rodríguez is co-creator and co-writer of Nadie te dijo que iba a ser así. His work on the series includes building the narrative world, shaping the season structure and developing the tone that brings together black comedy, political thriller and everyday absurdity.`

Shared authorship line:

`Guillermo and Maite write the series together and share its authorship.`

Do not create separate Malena or Nacho slides.

### Slide 6 — SKA FILMS

Brand eyebrow:

`URUGUAYAN COPRODUCTION`

Heading:

`SKA FILMS`

Keep the existing verified asset:

`assets/logos/ska-films.png`

Institutional paragraph — approved English dossier wording:

`SKA Films has more than 20 years of experience and has developed documentaries, fiction, animated films and series, producing from Uruguay for Latin America and other markets.`

Producer heading:

`IGNACIO “NACHO” JAUNSOLO`

Role:

`FOUNDER · EXECUTIVE DIRECTOR · PRODUCER`

Credential:

`Founder and executive director of SKA Films. Executive producer of Togo, Netflix’s first Uruguayan film.`

Keep the same emphasis structure as the Spanish slide where appropriate.

Credits, exactly:

- `Togo`
- `Rada`
- `Sin Aviso`
- `Afilo Mi Gillette`

Do not add credentials or generate a portrait.

### Slide 7 — TRACK RECORD

Heading:

`TRACK RECORD`

Timeline, exactly four entries:

1. `FONDO DE INCENTIVO CULTURAL`
   `Project support`

2. `MÁLAGA TALENT 2025`
   `Project selected`

3. `DETOUR MONTEVIDEO CINE LAB 2025`
   `Development of structure, characters, tone and audiovisual identity`

4. `TEASER AWARD / SECOND PRIZE`
   `DETOUR Series Lab 2025`

Only this final slide may contain the carousel CTA row.

CTA labels:

- `Request materials`
- `Schedule a meeting`
- `View full project file`

The third CTA must link to:

`dossier-en.html`

For the first two carousel CTA mailto links, preserve/reuse the existing English subject-only carousel hrefs already present in `english.html` if they are still available in the base file. Do not replace them with Spanish mailto values.

## CAROUSEL NAVIGATION LABELS

The seven dot/button labels must be:

- `PROJECT`
- `UNIVERSE`
- `TONE`
- `MARKET`
- `CREATORS`
- `SKA FILMS`
- `TRACK RECORD`

Initial current-slide output:

`01 / 07 — PROJECT`

English accessible labels:

- carousel controls: `Project and team carousel controls`
- previous arrow: `Previous slide`
- next arrow: `Next slide`
- dot navigation: `Go to a slide`
- close button: `Back`

## TOP-LEVEL PROFESSIONAL LINKS / MAILTO

Preserve the two existing full English top-level contact `mailto:` href values in `english.html` byte-for-byte:

- Request materials
- Schedule meeting

Do not replace them with Spanish mailto values.

Keep the language switch to Spanish.

## REMOVE OBSOLETE ENGLISH CAROUSEL CONTENT

The following old content must not survive in the carousel:

- `Montevideo's Old City`
- old gold-robbery logline
- `Active development`
- `Teaser completed`
- budget material
- development-plan material
- old multi-item partner search
- separate individual cards for Maite, Guillermo, Nacho/SKA and Malena
- old 5-dot navigation

The resulting carousel is seven thematic plates, not five biography/cards.

## SHARED JS — LANGUAGE-AWARE MAIL UI

Current `script.js` contains a Spanish `window.confirm` message for choosing Gmail vs the default mail app. Because `script.js` is shared, this currently appears in Spanish on the English landing.

If that is still true in current `main`, make the smallest safe change in `script.js` so the confirmation copy is selected from `document.documentElement.lang`:

Spanish (`es` / `es-UY`) must remain exactly as it currently reads.

English should read naturally, for example:

`How would you like to send the email?\n\nOK: open Gmail in your browser.\nCancel: use your default mail app.`

Do not change mail behavior, Gmail URL construction, recipients, subjects or bodies.

If `main` has already localized this by execution time, do not touch `script.js`.

## VISUAL RULE

Do not redesign the carousel. Use the current shared visual system already approved on Spanish.

Do not add generic cards, modals, internal scrolling or a new design language.

Do not create an English-specific stylesheet in this task unless the seven-slide architecture literally cannot render with the current shared CSS. If a visual overflow is suspected but cannot be proven without browser QA, leave it for the visual QA pass rather than guessing.

## RESPONSIVE / ACCESSIBILITY

Preserve current Spanish behavior for:

- desktop wide carousel
- mobile portrait composition
- 100svh handling
- safe areas
- short-height mobile fallback
- focus management
- `aria-hidden`
- `inert`
- keyboard arrows
- Escape
- reduced motion

No autoplay.

No internal `overflow-y:auto` workaround.

## QA — REQUIRED

Before finishing:

1. run `git diff --check`;
2. validate `english.html` with an HTML parser;
3. verify exactly 7 `data-about-slide` elements;
4. verify exactly 7 `data-about-dot` controls;
5. verify slide order is PROJECT / UNIVERSE / TONE / MARKET / CREATORS / SKA FILMS / TRACK RECORD;
6. verify all carousel headings that receive programmatic focus have `tabindex="-1"` as in Spanish;
7. verify `about-carousel` has `role="dialog" aria-modal="true"`;
8. verify the two full top-level English `mailto:` hrefs are byte-for-byte unchanged;
9. verify the two English carousel mailto targets are not replaced by Spanish values;
10. verify `dossier-en.html` is the final project-file CTA target;
11. verify these obsolete visible strings are absent from the carousel:
   - `Old City`
   - `Active development`
   - `Teaser completed`
   - `Budget`
   - `Development plan`
12. verify required strings are present:
   - `A SERIES ABOUT FRIENDS. UNTIL EVERYTHING CATCHES FIRE.`
   - `FINANCING + INTERNATIONAL DISTRIBUTION`
   - `Co-creator · co-writer · director`
   - `Co-creator · co-writer · creative development`
   - `IGNACIO “NACHO” JAUNSOLO`
   - `TRACK RECORD`
13. run `node --check script.js` if `script.js` changed;
14. verify no Spanish visible copy was changed;
15. report any source ambiguity instead of inventing a resolution.

Browser visual QA is desirable but not sufficient by itself. If unavailable, say so explicitly. We will perform external Chromium visual QA after the PR is created.

## PR

Create a NEW pull request against `main`.

Do not merge it.

In the PR description explicitly confirm:

- current Spanish `index.html` was used as the structural source;
- approved `dossier-en.html` wording was reused where content overlaps;
- English carousel changed from obsolete 5-card structure to the current 7-slide thematic structure;
- hero/video experience was not redesigned;
- top-level English mailto hrefs were preserved byte-for-byte;
- no Spanish visible copy was changed;
- any shared JS change was limited to language-aware confirmation UI.
