# CODEX PROMPT 03 — SEGUNDA COMPOSICIÓN VISUAL DESKTOP DEL MICRO PITCH

Trabajá sobre el repositorio `JRRGUILLE-bit/Nadie-Publico`, branch `main`.

## 0. CONTEXTO

El PR #49 ya implementó una primera versión visual desktop del carrusel de 7 placas. Esa versión fue renderizada y revisada visualmente en escritorio.

La revisión concluyó que la arquitectura general y varias ideas de composición sirven, pero el resultado todavía no se percibe como un pitch deck terminado. Hay problemas reales de jerarquía, escala, balance, uso del vacío y repetición visual. Esta tarea NO es una pasada de microajustes: es una segunda composición desktop completa sobre la base existente.

No reestructures el carrusel ni reescribas copy. Conservá lo que ya funciona técnicamente y recompone visualmente cada placa con criterio editorial.

Antes de tocar nada, leer completos:

- `SITE_CONTENT_SOURCE.md`
- `VISUAL_IDENTITY.md`
- `index.html`
- `styles.css`
- `market-polish.css`
- `script.js`
- `market-polish.js`
- `codex/CODEX_PROMPT_02_CARRUSEL_DISENO_DESKTOP.md`

Inspeccionar también los assets reales en:

- `assets/images/`
- `assets/logos/`
- `assets/ntdqiasa_video_v5_assets/`

`SITE_CONTENT_SOURCE.md` sigue siendo la única fuente editorial canónica.

## 1. OBJETIVO

Recomponer visualmente el carrusel desktop para que se sienta como un micro pitch deck audiovisual profesional y no como siete layouts CSS con estética de expediente.

La nueva versión debe:

- mejorar jerarquía tipográfica;
- usar mejor el espacio disponible;
- evitar grandes zonas vacías sin intención;
- evitar saltos arbitrarios entre elementos microscópicos y elementos gigantes;
- mantener una escala intermedia coherente entre títulos, copy, navegación y elementos visuales;
- hacer que cada placa tenga una composición propia;
- reducir la sensación de “template web”;
- reforzar la identidad de dossier audiovisual manipulado físicamente sin teatralidad excesiva;
- mantener el conjunto profesional para mercado.

No tocar mobile en esta tarea salvo para no romperlo. La recomposición mobile final sigue siendo una tarea posterior.

## 2. NO TOCAR

No modificar:

- hero ni video de fondo;
- secuencia typewriter;
- orden general de la landing;
- `sobre.html`;
- `english.html`;
- `dossier-en.html`;
- metadata/SEO;
- mails, mailto o destinatarios;
- copy editorial de las siete placas;
- orden de las siete placas;
- IDs/keys semánticos;
- navegación manual;
- focus trap;
- `role="dialog"` / `aria-modal`;
- `inert` / `aria-hidden`;
- Escape;
- restauración de foco;
- ausencia de autoplay;
- fuentes Special Elite / Lekton como eje identitario;
- focus-visible ya corregido en PR #49.

No crear imágenes nuevas.
No inventar retratos.
No descargar assets externos.
No usar URLs remotas.
No generar logos.

## 3. PROBLEMAS GLOBALES DETECTADOS EN LOS RENDERS

La primera versión tiene estos problemas de conjunto:

1. El lienzo es grande pero gran parte del contenido aparece demasiado pequeño.
2. Varias placas tienen vacío inerte, no aire editorial.
3. PROYECTO, TONO y SKA tienen elementos sobredimensionados; otras placas tienen elementos demasiado chicos.
4. La misma imagen de la cafetera/incendio aparece como protagonista en demasiadas placas y empieza a comunicar falta de material visual.
5. El chrome exterior (`EXPEDIENTE / PROYECTO Y EQUIPO`, `VOLVER`, navegación inferior) queda demasiado chico y separado del objeto principal.
6. La navegación inferior es elegante pero demasiado microscópica en escritorio.
7. El sistema visual debe sentirse menos HUD / interfaz y más objeto editorial.

La segunda versión debe corregir estos problemas de forma explícita.

## 4. PLACA 01 — PROYECTO

Esta placa es actualmente el problema visual principal.

### Qué conservar

- foto de cafetera/incendio como imagen protagónica;
- división asimétrica imagen/texto;
- `PROYECTO` como etiqueta pequeña;
- tagline como frase principal;
- logline;
- ficha técnica al cierre.

### Qué está mal ahora

- `rippedpapper.png` invade la mitad derecha y tapa tagline/logline;
- la columna textual es demasiado angosta;
- el tagline rompe en demasiadas líneas y se siente forzado;
- la logline queda pequeña;
- la composición derecha parece un sobrante del bloque de imagen.

### Nueva dirección

- mantener aproximadamente 55–58% imagen y 42–45% texto;
- la transición rasgada debe funcionar SOLO como borde físico irregular entre foto y panel textual, no como una hoja blanca cubriendo media placa;
- limitar visualmente el rasgado a una franja estrecha, aprox. 30–60 px de invasión;
- el rasgado debe quedar por detrás del contenido y nunca cruzar copy;
- panel textual predominantemente oscuro;
- tagline con composición de 2–3 líneas, no 4–5 líneas apretadas;
- aumentar ancho útil del texto y cuerpo de logline;
- controlar `max-width` para lectura cómoda;
- ficha técnica clara abajo, secundaria pero legible;
- evitar cajas y chips.

La foto debe seguir siendo lo primero que entra por el ojo, pero el bloque textual debe sentirse tan diseñado como la imagen.

## 5. PLACA 02 — UNIVERSO

### Qué conservar

- idea de división presente/memoria;
- corte diagonal/irregular;
- concepto de cotidianeidad invadida por algo oscuro;
- nombres GONZALO / MARÍA / LUIS;
- frase `AMISTAD · PRECARIEDAD · ORO · MEMORIA`.

### Qué está mal ahora

- demasiado vacío verde a la izquierda;
- el párrafo flota sin anclaje compositivo fuerte;
- los cuatro conceptos parecen un subtítulo, no un gesto visual;
- los nombres parecen tres labels puestos manualmente;
- la anotación `PRESENTE / MONTEVIDEO ... MEMORIA / LO ENTERRADO` está demasiado pequeña y parece texto de debug/editor.

### Nueva dirección

- mantener dos masas claras, pero hacer que dialoguen físicamente;
- reducir el vacío sin simplemente llenar con decoración;
- hacer que `AMISTAD · PRECARIEDAD · ORO · MEMORIA` tenga más jerarquía y tensión gráfica;
- integrar GONZALO / MARÍA / LUIS como parte de la composición, no como tres rótulos flotantes;
- si se mantiene la anotación PRESENTE/MEMORIA, convertirla en dos marcas editoriales legibles y separadas, no una sola línea minúscula;
- no repetir el mismo tratamiento de cafetera que PROYECTO;
- si se usa la imagen, tratarla como contexto/memoria, no como segundo hero.

La lectura debe ser: vida cotidiana reconocible → algo enterrado se mete adentro.

## 6. PLACA 03 — TONO

Esta placa tiene la mejor idea gráfica actual, pero la jerarquía todavía puede mejorar.

### Qué conservar

- estructura izquierda/derecha;
- bloque expresivo de lenguaje audiovisual;
- columna técnica de recursos;
- fondo oscuro tratado;
- uso de rojo y crema.

### Qué está mal ahora

- todo el párrafo principal fue convertido en un titular gigante;
- visualmente se percibe como una pared de texto;
- `LO COTIDIANO` / `LO EXTRAÑO`, que son la oposición conceptual principal, no emergen lo suficiente;
- la columna derecha está demasiado uniformemente espaciada.

### Nueva dirección

Sin cambiar una sola palabra del copy:

- construir jerarquía dentro de la frase para que `LO COTIDIANO` y `LO EXTRAÑO` sean los anclajes visuales dominantes;
- el resto de la frase puede funcionar en una escala secundaria dentro del mismo bloque;
- evitar que todo tenga el mismo cuerpo tipográfico enorme;
- mantener `El tono nace del choque entre la normalidad y el absurdo.` como remate claro;
- conservar los seis recursos como anotaciones técnicas, pero introducir una irregularidad editorial controlada: no deben parecer seis opciones equidistantes de un menú;
- no sacrificar legibilidad.

TONO debe seguir siendo una de las placas más expresivas, pero con mayor control.

## 7. PLACA 04 — MERCADO

### Qué conservar

- fondo claro como cambio de ritmo;
- `EL PROYECTO HOY`;
- status compacto;
- claim `FINANCIACIÓN + DISTRIBUCIÓN INTERNACIONAL`;
- ask debajo.

### Qué está mal ahora

- demasiada superficie vacía sin función;
- status, claim y ask parecen tres objetos flotando sin relación;
- la composición parece una slide aún sin cerrar;
- el subrayado repetido de cada línea del claim se siente decorativo y literal.

### Nueva dirección

- usar una retícula fuerte, aprox. 35/65 o similar;
- izquierda: ficha/status con más presencia y mejor cuerpo;
- derecha: claim dominante con el ask inmediatamente asociado;
- reducir vacío inerte;
- conservar aire, pero que sea aire estructurado;
- evitar subrayar cada línea del claim como si fueran tres links;
- puede haber una sola marca roja, línea editorial, sello o subrayado parcial si ayuda;
- el ask debe quedar claramente conectado al claim, no perdido abajo.

La placa debe sentirse como una hoja industrial importante dentro del dossier.

## 8. PLACA 05 — CREADORES

Esta placa NO está presentable en su forma actual.

### Qué conservar

- Maite y Guillermo con mismo peso autoral;
- nombres y roles;
- bios exactas;
- frase de autoría conjunta.

### Qué está mal ahora

- los rectángulos `.creator__media` parecen imágenes faltantes;
- son demasiado altos y angostos;
- generan sensación de placeholder o asset roto;
- las bios quedan pequeñas;
- hay demasiado vacío;
- la frase de autoría conjunta parece footer y no tesis de la placa.

### Nueva dirección SIN retratos reales

Hasta que existan retratos reales y explícitamente válidos en el repo:

- eliminar visualmente los falsos placeholders;
- NO reemplazarlos por siluetas, avatares, iniciales decorativas, stock, fotos genéricas o recortes dudosos;
- hacer una placa tipográfica deliberada de dupla creativa;
- Maite y Guillermo en dos zonas de igual peso;
- nombres significativamente más importantes que ahora;
- roles inmediatamente visibles;
- bios con mejor cuerpo y medida de línea;
- la frase `Guillermo y Maite escribimos la serie juntos y compartimos su autoría.` debe conectar físicamente ambas mitades: central, transversal o como eje entre columnas;
- evitar directorio de staff / ficha de RRHH.

Si el repo ya contiene retratos reales claramente identificables y autorizados, se pueden usar. Si no, mantener la solución tipográfica limpia.

No cambiar `desarrollo creativo` por `showrunner`.

## 9. PLACA 06 — SKA FILMS

La primera versión quedó visualmente desbalanceada.

### Qué conservar

- `COPRODUCCIÓN URUGUAYA`;
- `SKA FILMS`;
- logo real existente;
- párrafo institucional;
- créditos `Togo · Rada · Sin Aviso · Afilo Mi Gillette`;
- línea de Nacho.

### Qué está mal ahora

- el logo ocupa una superficie gigantesca;
- a ese tamaño se ve blando y pierde calidad percibida;
- el logo domina la placa por encima de la información;
- la zona gris a la derecha parece corporate deck viejo;
- el párrafo queda perdido;
- la línea de Nacho tiene contraste insuficiente y casi desaparece.

### Nueva dirección

- reducir el logo drásticamente;
- objetivo aproximado: que ocupe 25–35% de la superficie útil, no 50%+;
- usarlo como sello/membrete/aval industrial, no como gigantografía;
- ubicarlo cerca de `COPRODUCCIÓN URUGUAYA / SKA FILMS`, preferentemente en el cuadrante superior/izquierdo;
- dar más presencia al párrafo institucional;
- hacer visible la línea de Nacho sin volverla protagonista;
- mantener una franja clara de créditos abajo;
- evitar un gran degradado gris genérico si no aporta;
- conservar coherencia con la paleta dossier del resto.

La lectura deseada es:

`SKA Films → coproductor uruguayo → trayectoria → créditos`

NO:

`LOGO GIGANTE → resto`.

## 10. PLACA 07 — RECORRIDO

### Qué conservar

- timeline;
- cuatro hitos en orden;
- CTAs solamente al final;
- cierre de dossier.

### Qué está mal ahora

- la timeline ocupa una franja demasiado angosta en el centro;
- hay muchísimo vacío arriba y abajo;
- hitos y descripciones son demasiado pequeños;
- no se siente avance narrativo;
- los CTAs parecen pequeños botones administrativos.

### Nueva dirección

- mantener timeline horizontal si funciona, pero darle mucha más presencia;
- aumentar escala de hitos y descripciones;
- alternar arriba/abajo de la línea si mejora movimiento y legibilidad;
- permitir pequeños sellos/códigos/marcas de expediente sin inventar información;
- hacer que la línea conduzca visualmente hacia el bloque de acciones;
- los CTAs deben seguir sobrios/editoriales, pero ser claramente visibles como cierre real;
- evitar botones SaaS grandes;
- mejorar jerarquía de `RECORRIDO` y del conjunto sin llenar con decoración gratuita.

La placa tiene que sentirse como culminación y siguiente paso.

## 11. CHROME / NAVEGACIÓN / MARCO GENERAL

La primera versión dejó el sistema exterior demasiado pequeño.

Corregir en desktop:

- aumentar ligeramente la escala de `EXPEDIENTE / PROYECTO Y EQUIPO`;
- aumentar legibilidad de `VOLVER` sin volverlo dominante;
- aumentar aprox. 10–15% la escala/contraste de los labels inferiores;
- conservar los rombos/estado activo si siguen funcionando, pero evitar que todo parezca HUD de videojuego;
- mantener foco visible y diferenciado del estado activo;
- no volver la navegación protagonista;
- integrar visualmente controles y frame para que se perciban como un mismo objeto editorial.

## 12. REGLA SOBRE LA CAFETERA / REPETICIÓN DE ASSETS

La imagen de cafetera/incendio NO debe sentirse como el único asset del proyecto.

- PROYECTO puede usarla como visual protagónico.
- UNIVERSO puede reutilizarla sólo de forma secundaria/tratada si aporta al concepto.
- TONO no debería repetirla de forma evidente como tercera gran aparición si se puede resolver con textura, crop abstracto, oscuridad o tratamiento mucho menos reconocible.
- evitar tres placas seguidas con la misma cafetera reconocible a gran escala.

No inventar otras imágenes. Resolver con composición, crop, oscuridad, textura y tipografía cuando no haya más material.

## 13. SISTEMA DE ESCALA

Revisar toda la composición con una escala tipográfica más coherente.

Objetivo:

- títulos/claims fuertes;
- copy de lectura real, no microscópico;
- microcopy sólo donde realmente corresponde;
- navegación secundaria pero legible;
- evitar saltos extremos entre 0.6rem y 4rem sin niveles intermedios;
- usar `clamp()` con criterio;
- preservar lectura en 1440×900, 1280×800 y 1024×768.

## 14. IMPLEMENTACIÓN

Preferir CSS.

Se puede modificar `index.html` SOLO si hace falta introducir wrappers semánticos puramente de layout para lograr la nueva composición, siempre que:

- no cambie copy;
- no cambie orden;
- no cambien IDs/keys;
- no se rompa accesibilidad;
- no se añadan datos nuevos.

No modificar `script.js` salvo bloqueo técnico imprescindible.

No añadir dependencias.
No usar frameworks.
No usar JS para layout.
No usar inline styles.
No duplicar reglas sin necesidad.

Si la sección desktop agregada por Prompt 2 resulta más limpio reescribirla que seguir acumulando overrides, hacelo. Preferir una capa CSS clara a 40 parches superpuestos.

## 15. RESPONSIVE

Esta tarea sigue siendo desktop V2.

- aplicar la nueva composición principalmente en `@media (min-width: 900px)`;
- no rehacer mobile todavía;
- no romper `max-width: 720px`;
- no ocultar contenido móvil;
- no introducir anchos fijos que desborden;
- conservar indicador mobile actual;
- no introducir scroll interno en placas.

## 16. VERIFICACIONES OBLIGATORIAS

Antes de terminar:

1. `node --check script.js`
2. `node --check market-polish.js`
3. `git diff --check`
4. confirmar exactamente 7 `[data-about-slide]` y 7 `[data-about-dot]`;
5. confirmar ausencia de autoplay y botón de pausa;
6. confirmar `role="dialog"`, `aria-modal="true"`, `inert`, focus trap y Escape;
7. confirmar ausencia de `overflow-y:auto` o scroll interno de placas;
8. confirmar que los 3 CTAs siguen sólo en RECORRIDO;
9. confirmar que no cambió ningún copy fuente;
10. confirmar que el focus-visible de controles sigue inequívocamente visible;
11. confirmar que CREADORES no muestra placeholders visuales que parezcan imágenes faltantes si no hay retratos reales;
12. confirmar que el logo de SKA ya no domina la placa ni se rasteriza visualmente por tamaño excesivo;
13. confirmar que `rippedpapper.png` no tapa copy en PROYECTO.

## 17. VALIDACIÓN VISUAL

Si el entorno dispone de navegador, Playwright, Chromium, Firefox o equivalente, renderizar las 7 placas al menos en:

- 1440×900
- 1280×800
- 1024×768

Revisar específicamente:

- cortes de tagline/logline en PROYECTO;
- rasgado sin invasión de copy;
- balance presente/memoria en UNIVERSO;
- jerarquía cotidiano/extraño en TONO;
- vacío estructurado en MERCADO;
- legibilidad de bios en CREADORES;
- escala/calidad percibida del logo SKA;
- tamaño de hitos/CTAs en RECORRIDO;
- navegación inferior legible;
- ausencia de solapamientos.

Si no hay navegador real, declararlo. No inventar validación visual.

## 18. ENTREGA

Entregar:

- archivos modificados;
- resumen por placa de qué se recompuso;
- checks ejecutados;
- limitaciones reales;
- screenshots si efectivamente se pudieron generar;
- PR nuevo contra `main`.

No abrir cambios fuera de este alcance.
