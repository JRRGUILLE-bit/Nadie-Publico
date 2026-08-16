# CODEX PROMPT 07 — `sobre.html` VISUAL V2

Trabajá sobre `main` de `JRRGUILLE-bit/Nadie-Publico`.

## OBJETIVO

Hacer una **recomposición visual seria de `sobre.html`** para que el expediente profesional se sienta parte del mismo universo gráfico que el carrusel y la portada, sin convertirse en una plantilla corporativa genérica.

El contenido editorial ya está aprobado y sincronizado. Esta tarea es **visual, jerárquica y de composición**.

La página debe seguir siendo una página larga con scroll natural. No convertirla en carrusel, tabs, acordeones ni navegación SPA.

## FUENTES OBLIGATORIAS

Antes de tocar nada, leer completos:

- `sobre.html`
- `SITE_CONTENT_SOURCE.md`
- `VISUAL_IDENTITY.md`
- `project-page.css`
- `industrial-sheet.css`
- `market-polish.css`
- `index.html` únicamente como referencia visual del carrusel ya aprobado
- `styles.css` únicamente para entender el lenguaje visual del carrusel

## CONTENIDO CONGELADO

**NO reescribir, resumir, expandir ni corregir copy.**

El texto visible de `sobre.html` queda congelado tal como está en `main` después del PR #54.

No cambiar:

- logline;
- sinopsis;
- target;
- estado;
- materiales;
- recorrido;
- búsqueda;
- roles;
- bios;
- bloque SKA / Nacho;
- Malena;
- mails;
- enlaces;
- metadata/JSON-LD salvo que una modificación HTML estrictamente técnica lo exija, y en ese caso no cambiar valores editoriales.

No tocar `index.html`, `dossier-en.html`, `about.html`, `english.html`, JS ni el carrusel.

## AISLAMIENTO DEL REDISEÑO

Esta pasada es **sólo para `sobre.html`**.

Para no alterar accidentalmente las páginas inglesas que comparten hojas de estilo, preferir:

1. crear una nueva hoja `sobre-visual.css` enlazada únicamente desde `sobre.html` después de las hojas existentes;
2. hacer allí todos los overrides visuales específicos;
3. tocar `sobre.html` sólo para agregar clases/wrappers semánticos mínimos y ese `<link>`.

No modificar globalmente `project-page.css`, `industrial-sheet.css` o `market-polish.css` salvo que exista una razón técnica imprescindible. Si se puede resolver con `sobre-visual.css`, hacerlo allí.

Usar un cachebuster explícito para `sobre-visual.css`, por ejemplo `sobre-visual.css?v=1`.

## DIRECCIÓN VISUAL

La página debe sentirse como un **expediente de industria armado por el mismo proyecto que hizo las siete placas del carrusel**:

- oscuro, cinematográfico, táctil;
- archivo / dossier / papel / máquina de escribir;
- `Special Elite` como voz gráfica;
- `Lekton` para metadata, UI e información secundaria;
- verdes casi negros, crema gastado, oro apagado y rojo expediente;
- líneas, reglas, numeración editorial y textura controlada;
- fuerte jerarquía tipográfica;
- menos “tarjetas web iguales”;
- más composición editorial;
- aire suficiente, pero sin grandes zonas muertas;
- lectura profesional rápida para mercado.

Debe sentirse **más cerca de un dossier/pitch deck desplazándose verticalmente que de una landing corporativa**.

No agregar decoraciones sin función. No usar glassmorphism, gradientes SaaS, tarjetas redondeadas, iconografía genérica, sombras de app, pills excesivas ni colores nuevos.

## ASSETS

Usar sólo assets ya existentes en la repo.

Permitidos y recomendados:

- `assets/ntdqiasa_video_v5_assets/ntdqiasa_video_v5_poster.jpg`
- `assets/ntdqiasa_video_v5_assets/ntdqiasa_video_v5_first_frame.jpg`
- `assets/images/a_full_frame_close_up_flat_lay_of_a_textured_backg_1.png` si sigue siendo necesario
- `assets/logos/ska-films.png` para el bloque SKA, si mejora la composición

No generar imágenes nuevas.

No inventar retratos.

No usar placeholders de personas.

No repetir la cafetera en múltiples secciones sólo para llenar espacio.

---

# COMPOSICIÓN DESKTOP

Diseñar primero para `>= 900px`, pero el resultado debe seguir siendo responsive.

## 1 — APERTURA / HERO DEL EXPEDIENTE

La apertura actual tiene que ganar una jerarquía mucho más clara.

Orden de lectura visual:

1. `Expediente de industria / 2026` + selector de idioma;
2. título `Nadie te dijo que iba a ser así`;
3. metadata de formato;
4. `Creada y escrita por...`;
5. logline;
6. imagen principal.

El título debe ser un verdadero encabezado editorial, no simplemente un `h1` dentro de una caja.

Objetivo:

- título grande y con presencia;
- metadata en Lekton, más seca e industrial;
- logline como pieza editorial destacada, no como “card”; 
- integrar el still principal al hero con una relación más cinematográfica entre texto e imagen;
- evitar que título, logline e imagen parezcan tres módulos independientes apilados.

Se permite introducir un wrapper de hero si hace falta.

No cubrir permanentemente la imagen con un panel opaco grande.

## 2 — FICHA INDUSTRIAL

La ficha debe leerse como **hoja técnica / production sheet**, no como seis tarjetas iguales.

Conservar todos los campos y valores.

Dirección:

- retícula compacta;
- etiquetas pequeñas en Lekton;
- valores claros;
- reglas finas y separación tipo formulario/archivo;
- `Estado` puede tener mayor ancho/peso porque contiene más información;
- eliminar sensación de dashboard.

Puede tomar lenguaje del slide MERCADO del carrusel, pero sin copiarlo literalmente.

## 3 — BLOQUE `FINANCIACIÓN + DISTRIBUCIÓN INTERNACIONAL`

Este es uno de los bloques más importantes de toda la página.

Debe verse claramente al hacer scroll rápido.

Recomposición recomendada:

- eyebrow pequeño `BUSCAMOS AHORA`;
- claim grande `FINANCIACIÓN + DISTRIBUCIÓN INTERNACIONAL`;
- texto de ask debajo o en columna complementaria;
- regla roja / oro o gesto de expediente;
- más contraste y presencia que una sección común.

No agregar CTA aquí; los CTA quedan al final.

## 4 — ÍNDICE / JUMP NAV

Conservar los ocho destinos.

Convertirlo en un **índice editorial compacto**, no ocho botones iguales.

Puede ser:

- línea de índice numerada;
- banda horizontal de expediente;
- dos líneas compactas.

Debe seguir siendo accesible, legible y claramente clickeable.

No hacerlo sticky si termina tapando contenido o dominando la página.

## 5 — SINOPSIS + SEGUNDO STILL

La sinopsis debe ganar ritmo editorial.

No cambiar sus tres párrafos.

En desktop, buscar una composición en la que:

- el texto tenga un ancho de lectura controlado;
- el segundo still dialogue con la sinopsis;
- haya una ruptura visual clara respecto del hero;
- no parezca otra caja rectangular idéntica.

Se puede usar una retícula texto/imagen asimétrica mediante wrappers mínimos.

No reutilizar el still principal aquí; mantener el `first_frame` ya existente.

## 6 — PÚBLICO Y POSICIONAMIENTO

Convertir los dos targets en **datos visuales fuertes**:

`CORE: 18–34`

`SECUNDARIA: 35–44 + públicos hispanohablantes culturalmente próximos.`

No añadir explicación adicional.

Dirección:

- dos zonas de lectura;
- números/edades con mayor escala;
- labels pequeños;
- estructura tipo ficha de mercado, no “dos párrafos bold”.

## 7 — ESTADO DEL DESARROLLO

Es una línea compacta con muchos hitos.

No encerrarla en una caja genérica.

Tratamiento recomendado:

- banda / tira de estado;
- separar visualmente los hitos con reglas o bullets de expediente;
- destacar `teaser en producción` y `SKA Films, coproducción uruguaya` sólo mediante jerarquía gráfica, sin cambiar palabras.

No agregar estados nuevos.

## 8 — MATERIALES DISPONIBLES

Los siete materiales no deben parecer siete “cards SaaS”.

Convertirlos en una **lista/archivo de materiales profesionales**, por ejemplo:

- retícula editorial numerada;
- filas de dossier;
- índice de carpeta;
- 2–3 columnas según ancho.

Todos deben tener el mismo contenido actual.

La sensación debe ser “esto existe y está listo para solicitar”, no catálogo e-commerce.

## 9 — RECORRIDO / RECONOCIMIENTOS

Abandonar la grilla de cuatro cajas iguales.

Usar una **línea temporal horizontal en desktop** o una secuencia editorial clara con cuatro hitos:

- Fondo de Incentivo Cultural;
- Málaga Talent 2025;
- DETOUR Montevideo Cine LAB 2025;
- DETOUR Series Lab 2025 — Second Prize / Teaser Award.

Mantener exactamente los textos actuales.

La línea debe tener presencia real, como el RECORRIDO del carrusel, pero adaptada a página larga.

## 10 — `QUÉ ESTAMOS BUSCANDO`

No repetir visualmente el bloque de mercado de arriba de manera idéntica.

Acá debe funcionar como **recordatorio de estrategia antes del equipo/contacto**.

El claim `FINANCIACIÓN + DISTRIBUCIÓN INTERNACIONAL` tiene que seguir siendo visible, pero en un tratamiento más compacto que el bloque inicial.

## 11 — EQUIPO

Esta sección necesita una jerarquía profesional clara.

### Maite + Guillermo

Deben leerse primero como la **dupla autoral**.

- mismos pesos visuales;
- nombres fuertes;
- roles debajo;
- bios legibles;
- la línea `Guillermo y Maite escribimos la serie juntos y compartimos su autoría.` debe funcionar como cierre compartido de la dupla, no como frase perdida dentro de una tarjeta.

No usar retratos si no existen assets reales y aprobados en repo.

### Malena

Debe leerse como **producción ejecutiva**, con una jerarquía propia y profesional, sin competir con los creadores.

### SKA / Nacho

Debe leerse como **respaldo industrial / coproducción uruguaya**, no como una cuarta tarjeta equivalente.

Usar si conviene el logo real `assets/logos/ska-films.png`, en tamaño controlado.

Jerarquía interna:

1. `SKA FILMS`;
2. `Coproductora uruguaya`;
3. trayectoria institucional;
4. `IGNACIO “NACHO” JAUNSOLO`;
5. `FUNDADOR · DIRECTOR EJECUTIVO · PRODUCTOR`;
6. credential de `Togo`;
7. créditos `Togo · Rada · Sin Aviso · Afilo Mi Gillette`.

No hacer el logo gigante.

No inventar foto de Nacho.

No alterar el texto.

## 12 — CONTACTO / CIERRE

La página debe terminar con una verdadera sensación de **final de dossier + conversión**, no con otra caja más.

Mantener exactamente:

- texto de contacto;
- `Solicitar dossier y materiales`;
- `Coordinar reunión`;
- lista de enlaces;
- footer.

Los dos CTA principales deben tener jerarquía alta y ser cómodos de usar.

El resto de links debe quedar claramente secundario.

La composición debe conducir visualmente a los dos CTA y luego bajar la energía hacia enlaces/firma legal.

No cambiar mailto, CC, subject ni body.

---

# SISTEMA GENERAL DE SECCIONES

Problema a corregir: la página actual repite demasiadas cajas con el mismo peso.

En V2 debe existir **alternancia real** entre:

- bloque abierto;
- ficha técnica;
- banda de estado;
- still cinematográfico;
- timeline;
- texto editorial;
- módulo industrial;
- cierre CTA.

No más de 2–3 secciones consecutivas con el mismo tratamiento de borde/fondo.

Usar numeración editorial (`01`, `02`, etc.) sólo si corresponde a una secuencia real de secciones y se aplica de forma coherente. No colocar números decorativos aislados sin lógica.

---

# RESPONSIVE

Aunque la composición se defina desktop-first, esta PR debe dejar `sobre.html` correctamente responsive.

Validar como mínimo:

- 1440×900
- 1280×800
- 1024×768
- 768×1024
- 430×932
- 390×844
- 360×800

En mobile:

- una columna clara;
- textos no menores a un tamaño legible normal;
- CTA táctiles cómodos;
- timeline pasa a vertical;
- ficha industrial puede pasar a 2 columnas y luego 1 si hace falta;
- targets 18–34 / 35–44 siguen teniendo presencia;
- no provocar overflow horizontal;
- no usar posiciones absolutas que hagan colisionar contenido;
- no esconder copy para que “entre”.

La página larga **sí puede scrollear normalmente**. La prohibición de scroll interno aplica al carrusel, no a esta página.

---

# ACCESIBILIDAD / SEMÁNTICA

Preservar:

- jerarquía de headings;
- todos los `aria-labelledby`;
- navegación por teclado;
- `:focus-visible` claro;
- contraste razonable;
- `alt` de imágenes;
- `target=_blank` + `rel` existentes;
- destinos de todos los links;
- `prefers-reduced-motion`.

No usar CSS `order` para crear un orden visual distinto del DOM si eso rompe el orden de lectura.

Si se necesita cambiar el orden de bloques dentro de EQUIPO, hacerlo también en HTML de forma semántica, pero **sin cambiar copy**.

---

# ARCHIVOS / ALCANCE

Esperado idealmente:

- `sobre.html`
- nuevo `sobre-visual.css`

No tocar otros archivos salvo necesidad técnica estricta y explicarla en el PR.

No tocar:

- `index.html`
- `styles.css`
- `script.js`
- `market-polish.js`
- páginas inglesas
- assets existentes

---

# QA

Ejecutar:

- `git diff --check`
- validación HTML básica de `sobre.html`
- comprobar que los 8 links del `jump-nav` siguen resolviendo a IDs existentes
- comprobar que los dos `mailto:` son byte-for-byte iguales a `main` antes de esta tarea
- comprobar que todos los textos visibles de `sobre.html` permanecen iguales salvo whitespace/wrappers técnicos
- comprobar que no se agregaron assets ni dependencias
- comprobar que `sobre-visual.css` sólo afecta `sobre.html`

Si hay browser disponible:

- renderizar y revisar visualmente todos los tamaños listados;
- incluir capturas desktop y mobile en el PR si el entorno lo permite.

Si NO hay browser disponible, decir explícitamente en el PR:

`No se realizó validación visual real ni se capturaron screenshots porque el entorno no dispone de navegador.`

No afirmar que el diseño fue validado visualmente si no se renderizó.

---

# CRITERIO DE APROBACIÓN

La PR queda bien si:

- `sobre.html` se siente como un dossier audiovisual profesional de la misma serie que el carrusel;
- la apertura tiene impacto;
- la ficha se lee rápido;
- el ask de mercado domina donde corresponde;
- materiales y recorrido dejan de parecer grillas de tarjetas genéricas;
- el equipo tiene jerarquía autoral / producción / respaldo industrial;
- SKA/Nacho tiene peso sin ser un billboard;
- el cierre conduce a solicitar materiales o coordinar reunión;
- no cambió el copy;
- no se rompió mobile;
- las páginas inglesas quedaron intactas.

Crear un PR nuevo contra `main` y reportar el número, archivos cambiados, tests ejecutados y si hubo o no validación visual real.