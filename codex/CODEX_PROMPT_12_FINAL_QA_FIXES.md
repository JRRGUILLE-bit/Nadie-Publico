# CODEX PROMPT 12 — FINAL QA FIXES

## Objetivo

Aplicar una pasada **quirúrgica de QA final** sobre el sitio ya aprobado y mergeado. No rediseñar. No reescribir copy visible. No tocar assets ni dossiers salvo los metadatos expresamente indicados.

Trabajar desde `main` y crear un PR nuevo contra `main`. No mergearlo.

## Scope permitido

Modificar únicamente:

- `index.html`
- `english.html`
- `script.js`
- `market-polish-en.js`
- `sobre.html`

No modificar:

- CSS
- assets
- `dossier-en.html`
- `about.html`
- `SITE_CONTENT_SOURCE.md`
- copy visible del carrusel o dossier
- estructura visual aprobada
- mailto hrefs existentes

## 1. Preservar CC al abrir Gmail

Problema detectado en QA:

`buildGmailComposeUrl()` toma `to`, `subject` y `body`, pero no copia el parámetro `cc` del `mailto:`. Como consecuencia, en los CTA de reunión el camino “abrir Gmail” pierde `nacho@skafilms.com.uy`, aunque el `mailto:` original sí lo incluye.

Corregir `script.js` para que, si el `mailto:` contiene `cc`, la URL de composición de Gmail incluya también `cc` con el mismo valor.

Requisitos:

- no cambiar ningún `mailto:`;
- no cambiar destinatario principal, subject ni body;
- no alterar el comportamiento Cancel / app de correo;
- no inventar CC donde no existe;
- preservar exactamente `nacho@skafilms.com.uy` cuando está presente.

Implementación esperada: leer `mailtoUrl.searchParams.get('cc')` y, sólo si existe, incorporarlo a `URLSearchParams` con clave `cc`.

## 2. English landing + prefers-reduced-motion

Problema detectado en QA:

`script.js` se ejecuta antes de `market-polish-en.js`. En modo normal esto funciona porque la intro espera antes de renderizar y el override inglés llega a tiempo. Pero con `prefers-reduced-motion: reduce`, `script.js` llama inmediatamente a `renderCompletedPlates()` usando la secuencia española; después `market-polish-en.js` traduce `plateSequence`, pero no vuelve a renderizarla.

Resultado: un usuario de `english.html` con reduced motion puede recibir las placas introductorias en español.

Corregir `market-polish-en.js` de forma mínima:

- mantener todos los overrides ingleses actuales;
- después de aplicar los overrides, si `window.matchMedia('(prefers-reduced-motion: reduce)').matches` es `true`, volver a ejecutar `renderCompletedPlates()` para que las placas ya completas se regeneren en inglés;
- no reiniciar animaciones;
- no tocar la lógica española;
- no introducir autoplay.

## 3. El carrusel cerrado no debe quedar en el tab order

Problema detectado en QA de accesibilidad:

`.about-carousel` se cierra con `aria-hidden="true"` y `pointer-events: none`, pero eso no quita sus controles y links del orden de tabulación por teclado. El slide activo y los controles pueden seguir siendo focusables aunque el modal esté visualmente cerrado.

Corregirlo con `inert` en ambos landings.

### HTML

En `index.html` y `english.html`, el `<section id="about-carousel" ...>` debe arrancar con atributo `inert`, además de `aria-hidden="true"`.

### JS

En `openAbout()`:

1. quitar `inert` del carrusel;
2. marcar `aria-hidden="false"`;
3. mantener la lógica actual de slide/foco.

En `closeAbout()`:

1. marcar `aria-hidden="true"`;
2. volver a aplicar `inert` al carrusel;
3. devolver el foco a `aboutTrigger` como actualmente.

No cambiar navegación por flechas, Escape, focus trap, `aria-current`, slides inactivos ni comportamiento visual.

## 4. Eliminar metadata vieja de Ciudad Vieja en `index.html`

El copy público aprobado y `SITE_CONTENT_SOURCE.md` fijan la localización pública general como `Montevideo, Uruguay`. La landing española todavía conserva dos menciones antiguas de `Ciudad Vieja` en metadata no visible.

Cambiar exclusivamente:

### Open Graph description

Reemplazar:

`Comedia negra y thriller político desde Ciudad Vieja, Montevideo. Serie 6×20–25 min en desarrollo. Coproducción con SKA Films; búsqueda activa de financiación y distribución internacional.`

por:

`Comedia negra y thriller político desde Montevideo. Serie 6×20–25 min en desarrollo. Coproducción con SKA Films; búsqueda activa de financiación y distribución internacional.`

### JSON-LD TVSeries description

Reemplazar la descripción que dice que la serie está situada en `Ciudad Vieja, Montevideo` por:

`Serie uruguaya de ficción en desarrollo, de 6 episodios de 20 a 25 minutos. Comedia negra y thriller político situada en Montevideo, Uruguay.`

No tocar la ficha externa del Fondo de Incentivo Cultural ni ninguna URL externa.

## 5. Alinear metadata semántica de Nacho en `sobre.html`

La copy visible aprobada de `sobre.html` presenta a SKA Films como `Coproductora uruguaya` y a Ignacio “Nacho” Jaunsolo como:

`FUNDADOR · DIRECTOR EJECUTIVO · PRODUCTOR`

Sin embargo, el JSON-LD todavía tiene:

`"jobTitle": "Coproductor ejecutivo"`

Actualizar únicamente ese `jobTitle` del objeto Person de Ignacio Jaunsolo a:

`"jobTitle": "Fundador, director ejecutivo y productor"`

Mantener `worksFor` apuntando a SKA Films. No alterar la copy visible ni otros campos JSON-LD.

## 6. Cache busting

Como `script.js` cambia de nuevo:

- en `index.html`, cargar `script.js?v=17`;
- en `english.html`, cargar `script.js?v=17`.

Como `market-polish-en.js` cambia:

- en `english.html`, cargar `market-polish-en.js?v=4`.

No cambiar otros cachebusters.

## QA obligatorio

Ejecutar como mínimo:

1. `git diff --check`
2. `node --check script.js`
3. `node --check market-polish-en.js`
4. verificar que `index.html` y `english.html` contienen exactamente 7 `[data-about-slide]` y 7 `[data-about-dot]`;
5. verificar que ambos `#about-carousel` arrancan con `aria-hidden="true"` e `inert`;
6. verificar por inspección/assert que `openAbout()` remueve `inert` y `closeAbout()` lo repone;
7. verificar que los `mailto:` originales de ambos landings son byte-for-byte idénticos a `main` antes de este cambio;
8. verificar que el constructor Gmail conserva `cc=nacho@skafilms.com.uy` para un mailto de reunión y no añade `cc` para uno de solicitud de materiales;
9. verificar que en `english.html`, simulando `prefers-reduced-motion: reduce` si hay navegador disponible, las placas completas contienen `Created by`, `SUPPORT`, `A coproduction with SKA Films` y no `Creado por`, `APOYO`, `Una coproducción con SKA Films`;
10. verificar que `index.html` ya no contiene la cadena `Ciudad Vieja`;
11. verificar que `sobre.html` JSON-LD contiene `"jobTitle": "Fundador, director ejecutivo y productor"` para Ignacio Jaunsolo;
12. confirmar que no cambió ningún CSS, asset, `dossier-en.html`, `about.html` ni copy visible.

Si Playwright/Chromium está disponible, hacer smoke test rápido de desktop y mobile comprobando:

- abrir/cerrar carrusel;
- Escape;
- ArrowLeft/ArrowRight;
- ningún elemento interno del carrusel recibe foco cuando el carrusel está cerrado;
- reduced motion en `english.html` muestra intro completa en inglés.

## Entrega

- un único PR nuevo contra `main`;
- no mergear;
- describir los cinco bugs corregidos y las pruebas ejecutadas;
- no introducir ningún cambio fuera del scope.
