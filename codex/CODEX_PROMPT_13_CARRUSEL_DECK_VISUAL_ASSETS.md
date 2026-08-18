# CODEX PROMPT 13 — CARRUSEL: INTEGRACIÓN VISUAL DEL PITCH DECK + ASSETS APROBADOS

## OBJETIVO

Refinar visualmente el carrusel público de 7 placas de `index.html` y `english.html` para acercarlo a la identidad gráfica del pitch deck de Ventana Sur: collage editorial, papel, grunge, halftone, magenta/violeta/teal, expediente e investigación, SIN convertirlo en un collage caótico y SIN alterar el contenido editorial ya aprobado.

Este trabajo es principalmente de DIRECCIÓN DE ARTE / CSS. Los cinco assets que deben integrarse ya están en `main`, en la raíz del repositorio, con nombres generados automáticamente. NO renombrarlos, NO moverlos y NO reemplazarlos.

## ASSETS APROBADOS — MAPEO EXACTO

Usar exactamente estos archivos y estas funciones:

1. `8bcb8f86-c15e-4389-9630-592dba67af4d.png`
   - PLACA: PROYECTO / PROJECT.
   - Es un frame/overlay grunge magenta + teal + violeta con centro oscuro/limpio.
   - Debe funcionar como capa gráfica sobre la composición existente.
   - La cafetera/poster actual SIGUE siendo el ancla visual de la placa. No reemplazarla.

2. `98567b0c-25bc-412e-b2eb-7afb8dc4d2e5.png`
   - PLACA: UNIVERSO / UNIVERSE.
   - Interior de apartamento ilustrado/editorial con living, cafetera, mesa, Montevideo y gran zona crema limpia.
   - Debe convertirse en el ambiente principal de la placa.

3. `1bdf704c-0bab-4cef-8f9a-f72624396b23.png`
   - PLACA: MERCADO / MARKET.
   - Collage tipo dossier/industry board con zona central crema.
   - IMPORTANTE: contiene microtexto/gráficos generados dentro de la imagen. Son DECORATIVOS, NO DATOS del proyecto. Deben quedar subordinados/atenuados y jamás presentarse visualmente como evidencia, estadísticas o comparables oficiales.

4. `efba8b06-0da4-4000-af6d-52489eb810e9.png`
   - PLACA: SKA FILMS.
   - Fondo collage de productora / producción audiovisual.
   - IMPORTANTE: contiene elementos tipográficos/gráficos generados dentro del asset. Deben tratarse sólo como textura ambiental. El logo REAL y la información REAL de SKA que ya existen en HTML tienen que dominar con claridad.
   - NO usar `07ddbb16-770d-4722-81dc-32b68bb2cfd3.png`: fue una prueba anterior y queda fuera de esta implementación.

5. `90e10c94-859b-43c2-b4cc-65353aa5f1d1.png`
   - PLACA: RECORRIDO / TRACK RECORD.
   - Fondo oscuro de expediente con líneas/nodos, huellas, película, mapas y acentos magenta/teal.
   - Debe funcionar detrás del timeline existente, no reemplazarlo.

## REGLAS NO NEGOCIABLES

- NO cambiar copy visible en español ni inglés.
- NO cambiar datos, cargos, créditos, loglines, market ask, reconocimientos, links, mailtos ni metadata.
- NO cambiar la arquitectura de 7 placas:
  `PROYECTO · UNIVERSO · TONO · MERCADO · CREADORES · SKA FILMS · RECORRIDO`
  y su equivalente inglés.
- NO cambiar comportamiento JS del carrusel.
- NO autoplay.
- Mantener teclado, flechas, Escape, focus, `inert`, accesibilidad y semántica existentes.
- NO tocar hero/video de portada ni sus overlays.
- NO tocar `sobre.html`, `dossier-en.html`, `sobre-visual.css` ni `dossier-en-visual.css`.
- NO generar ni descargar assets nuevos.
- NO usar la prueba SKA `07ddbb16-770d-4722-81dc-32b68bb2cfd3.png`.
- NO crear scroll vertical interno dentro de las placas.
- No esconder contenido editorial para hacer entrar el diseño.
- El carrusel desktop debe seguir sintiéndose pitch deck horizontal.
- Mobile debe seguir siendo una composición portrait intencional, no un desktop reducido.

## IMPLEMENTACIÓN PREFERIDA

Crear un nuevo stylesheet aislado:

`carousel-deck-assets.css`

Y cargarlo como ÚLTIMA hoja de estilos en `index.html` y `english.html`:

`carousel-deck-assets.css?v=1`

La intención es que este archivo sea una capa de dirección de arte que sobrescriba lo mínimo necesario sobre la composición existente.

Preferir NO modificar `styles.css`, `market-polish.css`, JS ni otros CSS existentes. Si encontrás una imposibilidad técnica real, mantené el cambio mínimo y explicalo en el PR.

## DIRECCIÓN DE ARTE GLOBAL

El sistema visual debe sentirse emparentado con el pitch deck de Ventana Sur:

- materialidad de papel / tinta / grunge;
- halftone y desgaste controlados;
- negro / verde petróleo / crema como bases;
- magenta, violeta y teal como acentos;
- Special Elite para voz gráfica y Lekton para información funcional, como ya está definido;
- capas de collage concentradas en bordes/esquinas;
- contenido principal limpio y legible;
- menos “panel web corporativo”, más “expediente audiovisual / collage editorial”.

No saturar todas las placas por igual. Los assets ya son ricos: evitar sumar adornos CSS innecesarios encima.

## PLACA 1 — PROYECTO / PROJECT

Estado actual: cafetera/poster a la izquierda + copy editorial a la derecha.

Objetivo:

- PRESERVAR la cafetera/poster actual exactamente como imagen narrativa principal.
- Integrar `8bcb8f86-c15e-4389-9630-592dba67af4d.png` como capa de borde/intervención de pitch deck.
- El negro del centro del asset debe comportarse visualmente como zona neutra; usar mezcla/opacidad/gradientes de forma que NO tape la cafetera ni el copy.
- Preferir un pseudo-elemento full-card o layer absoluto con `pointer-events:none` y un blend apropiado (`screen`, `lighten` o equivalente si funciona mejor).
- Mantener el título, tagline, logline y formato exactamente legibles.
- Que se perciba “cafetera actual + lenguaje gráfico del deck”, no una imagen completamente distinta.

Mobile:

- conservar la solución portrait actual;
- mantener la cafetera como bloque visual superior;
- usar el overlay como atmósfera de bordes, con menor densidad si hace falta;
- no cubrir texto ni controles.

## PLACA 2 — UNIVERSO / UNIVERSE

Usar `98567b0c-25bc-412e-b2eb-7afb8dc4d2e5.png` como ambiente visual principal.

Objetivo:

- El living/apartamento debe comunicar inmediatamente el universo cotidiano de la serie.
- Aprovechar la zona crema central para alojar la información editorial.
- El copy puede pasar a tinta oscura sobre papel/crema si mejora la lectura.
- Mantener visibles, pero secundarios, sofá, cafetera, mesa y Montevideo.
- Los conceptos y nombres de personajes existentes deben seguir presentes y legibles.
- Evitar sumar otro gran panel opaco si la zona crema del propio asset ya resuelve la lectura.

Mobile:

- tratar el background-position/background-size de manera específica;
- no confiar en el mismo crop de desktop;
- priorizar zona crema + lectura y conservar al menos indicios del living/Montevideo;
- sin scroll interno.

## PLACA 3 — TONO / TONE

No hay asset nuevo específico.

Objetivo CSS-only:

- acercar la placa al deck sin alterar su estructura ni copy;
- reforzar el contraste “fondo oscuro + fichas/papeles” como en la página TONO Y LENGUAJE del pitch;
- recursos narrativos pueden sentirse como pequeñas fichas de papel/editorial, pero sin aumentar densidad ni altura;
- conservar la jerarquía actual y el protagonismo tipográfico.

No rehacer la placa desde cero.

## PLACA 4 — MERCADO / MARKET

Usar `1bdf704c-0bab-4cef-8f9a-f72624396b23.png` como fondo principal o capa visual principal.

Objetivo:

- sensación de opportunity board / dossier industrial;
- mantener la zona central como espacio claro para claim, estado y ask reales;
- preservar el sistema crema/tinta oscura de la placa actual;
- los bordes del asset deben aportar investigación, papeles, magenta/teal y cultura de pitch deck.

MUY IMPORTANTE:

El asset contiene texto, gráficos y porcentajes generados. NO son contenido editorial ni research aprobado. Deben quedar como textura secundaria: lavados, velados, parcialmente cubiertos o con contraste/opacidad suficiente para que NADIE los lea como información factual de la serie.

La única información de mercado que debe leerse claramente es la que ya existe como HTML.

## PLACA 5 — CREADORES / CREATORS

No hay asset nuevo específico.

Objetivo CSS-only:

- conservar las dos columnas y la autoría compartida;
- acercar las bios a fichas editoriales/papel del deck mediante textura, bordes o planos sutiles;
- NO convertir las dos bios en tarjetas corporativas;
- mantener la jerarquía Maite / Guillermo exactamente equivalente;
- no reducir texto hasta niveles incómodos para “hacer entrar” decoración.

## PLACA 6 — SKA FILMS

Usar `efba8b06-0da4-4000-af6d-52489eb810e9.png` como capa/fondo ambiental.

Objetivo:

- conservar y jerarquizar el logo REAL existente `assets/logos/ska-films.png`;
- mantener el bloque real de SKA, el bloque de Ignacio “Nacho” Jaunsolo y los créditos existentes;
- llevar la placa a una estética de productora audiovisual + collage del deck;
- más institucional que PROYECTO/UNIVERSO, pero sin volverla corporativa/genérica.

MUY IMPORTANTE:

- cualquier logo, texto, categoría o frase que venga rasterizada dentro del PNG generado NO debe competir ni parecer información oficial;
- oscurecer, velar o cubrir esas zonas cuando sea necesario;
- el logo real HTML debe ser inequívocamente el logo principal;
- el contenido HTML real debe ser el único texto claramente legible.

## PLACA 7 — RECORRIDO / TRACK RECORD

Usar `90e10c94-859b-43c2-b4cc-65353aa5f1d1.png` como fondo.

Objetivo:

- conservar el timeline HTML/CSS existente y sus cuatro hitos;
- el asset debe aportar expediente, huellas, mapas y movimiento visual;
- la línea/nodos decorativos rasterizados del asset son fondo; la timeline funcional HTML sigue siendo la estructura principal;
- mantener los CTA finales existentes sin alterar hrefs ni comportamiento;
- aumentar el contraste detrás de texto/nodos cuando sea necesario.

Mobile:

- mantener la timeline vertical actual;
- usar el asset como atmósfera, no intentar preservar todo el encuadre 16:9;
- CTA completamente visibles y táctiles.

## RESPONSIVE / QA VISUAL

Validar al menos:

- Desktop: 1440×900.
- Tablet: 1024×768.
- Mobile: 390×844.

Revisar las siete placas en ESPAÑOL e INGLÉS.

Criterios obligatorios:

- cero overflow horizontal;
- cero scroll vertical interno;
- cero clipping de copy;
- títulos completos;
- SKA logo real nítido;
- CTAs finales completos;
- nav inferior y flechas siempre operables;
- ningún elemento del asset tapa controles;
- inglés no queda más denso de lo que permite la placa;
- background crops intencionales en mobile.

Si el entorno de Codex permite browser QA, hacer screenshots reales. Si no lo permite, indicarlo explícitamente en el PR; el review visual final se hará después fuera de Codex.

## ARCHIVOS ESPERADOS EN EL DIFF

Idealmente sólo:

- `carousel-deck-assets.css` (nuevo)
- `index.html` (link al CSS, cachebuster)
- `english.html` (link al CSS, cachebuster)

No tocar JS.
No tocar dossiers.
No tocar copy.
No mover assets.

## VALIDACIONES FINALES

Ejecutar:

- `git diff --check`
- confirmar que las rutas de los cinco assets aprobados resuelven exactamente;
- confirmar que `07ddbb16-770d-4722-81dc-32b68bb2cfd3.png` NO se referencia;
- confirmar que ES y EN cargan el mismo stylesheet nuevo;
- confirmar que no se modificaron mailtos ni enlaces;
- confirmar que no se modificó el hero/video.

## ENTREGA

Crear un PR nuevo contra `main`.

No mergearlo.

En el cuerpo del PR resumir:

1. qué asset se aplicó a cada placa;
2. qué se hizo en TONO y CREADORES sin assets;
3. comportamiento desktop/mobile;
4. si se pudo o no hacer QA en browser;
5. lista exacta de archivos modificados.
