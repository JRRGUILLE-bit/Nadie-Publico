# CODEX PROMPT 02 — DISEÑO VISUAL DESKTOP DEL MICRO PITCH DE 7 PLACAS

Trabajá sobre el repositorio `JRRGUILLE-bit/Nadie-Publico`, branch `main`.

## 0. CONTEXTO Y REGLA PRINCIPAL

El PR #48 ya dejó cerrada la arquitectura funcional del carrusel de 7 placas. Esta tarea NO es volver a estructurar el carrusel, NO es reescribir copy y NO es tocar la lógica de accesibilidad/foco que acaba de quedar corregida.

La tarea es convertir esa arquitectura ya aprobada en un micro pitch deck visual, con identidad cinematográfica/expediente, claramente más profesional y más cercano a una presentación de mercado que a siete tarjetas web genéricas.

Antes de modificar nada, leer completos:

- `SITE_CONTENT_SOURCE.md`
- `VISUAL_IDENTITY.md`
- `index.html`
- `styles.css`
- `market-polish.css`
- `script.js`
- `market-polish.js`

Además, inspeccionar los assets existentes en:

- `assets/images/`
- `assets/logos/`
- `assets/ntdqiasa_video_v5_assets/`

`SITE_CONTENT_SOURCE.md` sigue siendo la fuente editorial canónica.

## 1. ALCANCE DE ESTA TAREA

Implementar el DISEÑO VISUAL DESKTOP de las siete placas actuales:

1. PROYECTO
2. UNIVERSO
3. TONO
4. MERCADO
5. CREADORES
6. SKA FILMS
7. RECORRIDO

Objetivo principal: viewport desktop/tablet horizontal, aproximadamente `min-width: 900px`.

No hacer todavía el rediseño responsive/mobile definitivo. El mobile actual debe seguir funcionando y no romperse, pero la recomposición móvil fina será una tarea posterior.

## 2. NO TOCAR

No modificar:

- hero/fondo de video;
- assets del hero;
- secuencia de intro/typewriter;
- orden general de la landing;
- `sobre.html`;
- `english.html`;
- `dossier-en.html`;
- metadata, OpenGraph, JSON-LD o SEO;
- mails, mailto o destinatarios;
- copy editorial de las 7 placas;
- orden de las 7 placas;
- navegación manual;
- focus trap;
- `role="dialog"` / `aria-modal`;
- `inert` / `aria-hidden`;
- Escape;
- restauración de foco;
- ausencia de autoplay;
- fuentes Special Elite / Lekton como eje de identidad.

No crear imágenes nuevas. No inventar retratos. No generar logos.

No usar assets externos ni URLs remotas para visuales.

## 3. PRINCIPIO DE DISEÑO

Las siete placas deben sentirse parte del MISMO expediente, pero no deben parecer siete variaciones de la misma card.

Ritmo visual objetivo:

`TAPA → COLLAGE → MANIFIESTO → FICHA INDUSTRIAL → RETRATO DOBLE → MARCA/PRODUCTORA → TIMELINE`

Compartir entre todas:

- textura de papel/expediente;
- grano sutil;
- bordes y líneas de archivo;
- tipografía;
- pequeños códigos, numeración o marcas de dossier si sirven;
- paleta oscura / crema / rojo de emergencia / amarillos envejecidos ya presentes en la identidad;
- navegación inferior coherente.

Pero cada placa debe tener una composición interna distinta.

Evitar look de dashboard, SaaS, cards corporativas, glassmorphism, gradientes azules, UI tecnológica o template genérico.

La referencia conceptual es un dossier audiovisual manipulado físicamente: fotocopias, stills, marcas de cinta, papel rasgado, expediente, anotaciones editoriales, archivo, evidencia.

No saturar con efectos. Debe seguir siendo legible y profesional para mercado.

## 4. ASSETS EXISTENTES QUE SE PUEDEN REUTILIZAR

Priorizar assets ya existentes, entre ellos:

- `assets/ntdqiasa_video_v5_assets/ntdqiasa_video_v5_poster.jpg`
- `assets/images/rippedpapper.png`
- `assets/images/a_full_frame_close_up_flat_lay_of_a_textured_backg_1.png`
- `assets/images/sobre-proyecto-coffee-stain.png`
- `assets/logos/ska-films.png`

Podés usar CSS para recortar, oscurecer, desaturar, aplicar blend modes, máscaras o overlays.

No duplicar archivos sólo para crear variaciones visuales.

## 5. MARCO GENERAL DEL MODAL / MICRO PITCH

En desktop, el carrusel debe sentirse como una presentación 16:9 contenida dentro de un expediente, no como un modal alto de texto.

Objetivo aproximado:

- frame ancho;
- relación visual cercana a 16:9 sin forzar exactamente `aspect-ratio: 16/9` si compromete legibilidad;
- ancho máximo aprox. 1180–1280 px;
- altura suficiente para mostrar cada placa completa sin scroll interno;
- controles y navegación fuera del área principal de contenido o claramente separados de ella;
- `Expediente / Proyecto y equipo` puede funcionar como pequeña pestaña/folio, no como encabezado dominante.

Mantener el fondo del hero perceptible por detrás, pero fuertemente oscurecido cuando el carrusel está abierto.

No agregar scroll vertical dentro de las placas.

## 6. PLACA 01 — PROYECTO

Tipo: TAPA / COVER.

Debe ser la placa visualmente más inmediata.

Desktop:

- aproximadamente 55–60% visual y 40–45% texto;
- usar el poster/still existente de la cafetera/incendio como visual principal;
- composición asimétrica;
- imagen a sangre dentro de una zona de la placa, no como thumbnail/card;
- permitir que textura, rasgado o marco de foto invada sutilmente la división;
- `PROYECTO` pequeño, casi etiqueta de dossier;
- tagline `UNA SERIE DE AMIGOS. HASTA QUE SE PRENDE FUEGO TODO.` como frase de mayor impacto tipográfico;
- logline debajo con lectura cómoda;
- ficha `6 × 20–25 min · Comedia negra / thriller político · Montevideo, Uruguay` como línea técnica de cierre.

No añadir CTA en esta placa.

No convertir el texto en cuatro cajas.

## 7. PLACA 02 — UNIVERSO

Tipo: COLLAGE NARRATIVO.

La placa debe visualizar la colisión entre cotidianeidad presente y memoria/misterio.

Desktop:

- división irregular, no grid simétrico;
- sugerir dos planos visuales: PRESENTE / MONTEVIDEO y MEMORIA / LO ENTERRADO;
- no agregar párrafos nuevos ni titulares narrativos que no existan en el copy;
- usar tratamiento gráfico, etiquetas pequeñas o pseudo-elementos para generar esa lectura sin inventar información factual;
- el texto principal debe ocupar una zona legible, no cubrir toda la placa;
- `AMISTAD · PRECARIEDAD · ORO · MEMORIA` debe funcionar como cuatro conceptos gráficos fuertes;
- `GONZALO · MARÍA · LUIS` deben aparecer como nombres en composición, no como tres cards de personaje;
- puede reutilizarse visualmente la cafetera/incendio como elemento puente entre lo cotidiano y lo oscuro, pero no repetir exactamente el layout de PROYECTO.

Evitar convertir UNIVERSO en una segunda placa de texto con chips.

## 8. PLACA 03 — TONO

Tipo: MANIFIESTO / LENGUAJE AUDIOVISUAL.

Debe ser la placa con más personalidad formal.

Desktop:

- construir una tensión visual fuerte entre `LO COTIDIANO` y `LO EXTRAÑO` mediante composición/tipografía, SIN alterar el copy fuente;
- la frase principal debe dominar;
- la frase secundaria debe funcionar como remate;
- los seis recursos deben aparecer como anotaciones de lenguaje audiovisual:
  - VOZ EN OFF
  - CUARTA PARED
  - FREEZE FRAME
  - REBOBINADO
  - SPLIT SCREEN
  - FLASHBACK
- evitar seis botones/chips idénticos;
- usar papel rasgado, marcas, líneas, timecode o anotaciones sutiles;
- se puede usar un still/fondo existente muy tratado, oscuro/desaturado, siempre subordinado a la legibilidad.

El resultado debe sentirse editorial/cinematográfico, no una lista de features.

## 9. PLACA 04 — MERCADO

Tipo: FICHA INDUSTRIAL.

Debe cambiar deliberadamente el ritmo: es la placa más limpia, sobria y profesional.

Desktop:

- etiqueta pequeña: `EL PROYECTO HOY`;
- status en una franja o bloque compacto, no como nube de tags;
- `FINANCIACIÓN + DISTRIBUCIÓN INTERNACIONAL` debe ser el claim dominante y de lectura inmediata;
- el ask debajo, ancho de lectura controlado;
- puede parecer una hoja importante dentro de un expediente, con sellos/líneas/registro, pero sin teatralidad excesiva;
- más aire que las placas 02 y 03.

No publicar financiación 0.
No inventar porcentajes, fechas, partners ni etapas.

## 10. PLACA 05 — CREADORES

Tipo: RETRATO DOBLE / AUTORÍA.

Objetivo: mostrar dupla creativa, no dos CVs enfrentados.

Desktop:

- composición de dos columnas/personas pero conectadas por una pieza central o línea de autoría;
- `Guillermo y Maite escribimos la serie juntos y compartimos su autoría.` debe unir visualmente ambos lados;
- nombres y roles deben leerse antes que las bios;
- bios con tipografía más pequeña y ancho de lectura controlado;
- evitar que parezca un formulario o directorio de staff.

RETRATOS:

- primero buscar si existen imágenes reales y explícitamente identificables de Maite y Guillermo en el repo;
- si existen, usarlas;
- si no existen, NO inventarlas, NO usar imágenes genéricas y NO extraer automáticamente fotos dudosas de PDFs;
- en ausencia de retratos válidos, mantener `.creator__media` como espacio visual deliberado/abstracto de expediente, sin siluetas falsas ni avatares.

No cambiar el rol de Guillermo a showrunner.

## 11. PLACA 06 — SKA FILMS

Tipo: MARCA / PRODUCTORA.

Desktop:

- `COPRODUCCIÓN URUGUAYA` como etiqueta;
- logo de SKA Films grande y respirado;
- párrafo breve en una zona secundaria;
- créditos `Togo · Rada · Sin Aviso · Afilo Mi Gillette` como cuatro marcas/créditos editoriales, no botones web;
- `Ignacio “Nacho” Jaunsolo · SKA Films` como línea secundaria pequeña.

Esta placa debe sentirse asociada a una productora real y profesional, no como bio de Nacho.

No alterar el logo.
No recolorear el logo de forma destructiva.

## 12. PLACA 07 — RECORRIDO

Tipo: TIMELINE / CIERRE.

Desktop:

- construir una línea de tiempo física/editorial real, no cuatro párrafos apilados;
- cuatro hitos existentes, en el orden actual;
- cada hito debe poder leerse rápido;
- usar líneas, puntos, sellos o marcas de expediente;
- la lectura debe llevar naturalmente al bloque final de acciones.

CTAs sólo aquí:

- Solicitar materiales
- Coordinar reunión
- Conocer el proyecto

Los tres CTAs deben sentirse como acciones de cierre del dossier, no como botones SaaS grandes. Mantener sus destinos actuales.

## 13. NAVEGACIÓN DESKTOP

La navegación inferior de siete labels debe sentirse integrada al pitch deck.

Mejorar visualmente:

- estado activo claramente visible;
- labels legibles pero secundarios;
- flechas visibles sin dominar;
- sensación de índice de expediente / capítulos;
- evitar underline web genérico como único recurso visual si se puede lograr una solución más editorial.

No cambiar comportamiento JS.

## 14. CSS / IMPLEMENTACIÓN

Preferir:

- CSS Grid para las composiciones principales;
- pseudo-elementos para líneas, sellos, textura y marcas;
- variables CSS locales para color/espaciado si mejora mantenimiento;
- `clamp()` para escalado desktop/tablet;
- `object-fit` / `object-position` para stills;
- capas de gradientes sólo como herramienta de legibilidad, no como estilo protagonista.

Evitar:

- inline styles;
- JS para layout;
- nuevas dependencias;
- frameworks;
- librerías externas;
- SVGs inventados como logos;
- exceso de `!important`;
- duplicar reglas en `styles.css` y `market-polish.css`.

Usar `styles.css` como lugar principal del nuevo sistema visual. Tocar `market-polish.css` sólo si hay una regla heredada que interfiera y deba limpiarse.

No tocar `script.js` salvo que aparezca un bloqueo estrictamente técnico de estilo; cualquier cambio allí debe justificarse y no puede modificar la accesibilidad ya aprobada.

## 15. RESPONSIVE EN ESTA FASE

Esta tarea NO es la recomposición mobile final.

Sin embargo:

- no romper `max-width: 720px`;
- no ocultar contenido;
- no introducir anchuras fijas que desborden mobile;
- no depender de hover para comprender nada;
- conservar el indicador mobile actual.

La siguiente tarea se ocupará específicamente de mobile/tablet portrait.

## 16. VERIFICACIÓN OBLIGATORIA

Antes de terminar:

1. `node --check script.js`
2. `node --check market-polish.js`
3. `git diff --check`
4. confirmar que siguen existiendo exactamente 7 `[data-about-slide]` y 7 `[data-about-dot]`;
5. confirmar que no reapareció autoplay ni botón de pausa;
6. confirmar que siguen presentes `role="dialog"`, `aria-modal="true"`, `inert`, focus trap y Escape;
7. revisar que no haya `overflow-y:auto` ni scroll interno en las placas;
8. revisar que los 3 CTA sólo aparezcan en RECORRIDO dentro del carrusel;
9. revisar que no se haya cambiado ningún texto de `SITE_CONTENT_SOURCE.md` usado en las placas.

Si el entorno tiene navegador o Playwright/Chromium, generar capturas al menos en:

- 1440×900
- 1280×800
- 1024×768

Y comprobar visualmente las siete placas.

Si no hay navegador disponible, declararlo como limitación real; no inventar que se verificó visualmente.

## 17. ENTREGA

Entregar:

- archivos modificados;
- resumen corto por placa de lo que se diseñó;
- verificaciones realizadas;
- cualquier limitación real;
- screenshots si el entorno efectivamente puede producirlos.

No hacer mejoras fuera de este alcance.
