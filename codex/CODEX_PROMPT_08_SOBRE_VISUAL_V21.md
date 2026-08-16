# CODEX PROMPT 08 — `sobre.html` VISUAL V2.1

Trabajá sobre `main` de `JRRGUILLE-bit/Nadie-Publico`.

## OBJETIVO

Hacer una **pasada visual quirúrgica V2.1 de `sobre.html`** sobre el rediseño ya mergeado del PR #55.

No es otro rediseño. La dirección general de V2 queda.

Esta tarea existe para corregir problemas concretos detectados al renderizar la página real en desktop:

- el H1 domina demasiado la apertura y ocupa demasiada altura;
- el sello/agua de archivo quedó fijado al viewport y no debería acompañar todo el scroll;
- aparece una numeración `01 / SINOPSIS` aislada sin sistema equivalente en el resto de la página;
- el párrafo del bloque principal de mercado queda demasiado angosto frente al claim;
- la grilla de materiales deja una última pieza visualmente huérfana;
- el ritmo vertical puede compactarse levemente sin perder aire editorial.

El resultado tiene que sentirse como **la misma V2, mejor calibrada**, no como una V3.

## LEER ANTES DE TOCAR

Leer completos:

- `sobre.html`
- `sobre-visual.css`
- `project-page.css`
- `industrial-sheet.css`
- `market-polish.css`
- `VISUAL_IDENTITY.md`
- `SITE_CONTENT_SOURCE.md`

Usar `index.html` y `styles.css` sólo como referencia del lenguaje visual ya aprobado.

## COPY Y CONTENIDO — CONGELADO

No cambiar ni una palabra de texto visible.

No reescribir, resumir, expandir, corregir ni traducir nada.

No cambiar:

- logline;
- sinopsis;
- público;
- estado;
- materiales;
- recorrido;
- búsqueda;
- equipo;
- bios;
- bloque SKA/Nacho;
- Malena;
- mails;
- links;
- metadata;
- JSON-LD;
- alt text.

No tocar `index.html`, páginas inglesas, JS ni assets.

## ALCANCE DE ARCHIVOS

Idealmente modificar sólo:

- `sobre-visual.css`
- `sobre.html` únicamente para subir el cachebuster de `sobre-visual.css` de `?v=1` a `?v=2`.

No tocar otras hojas compartidas.

---

# CORRECCIONES OBLIGATORIAS

## 1 — H1: REDUCIR ESCALA Y ALTURA DE APERTURA

Problema observado en render desktop: el título `Nadie te dijo que iba a ser así` ocupa una proporción excesiva del primer viewport y desplaza demasiado pronto el contenido industrial importante.

Mantener el H1 protagonista, pero reducirlo de forma clara.

Objetivo desktop:

- que siga siendo el mayor elemento tipográfico de la página;
- que no se sienta como un póster ocupando medio viewport;
- que en 1440px aprox. tienda a resolverse en **dos líneas equilibradas**, no tres líneas gigantes;
- preservar `Special Elite` como voz gráfica;
- mantener buena relación con metadata, crédito, logline e imagen.

Dirección de escala recomendada:

- bajar el máximo actual de `7.2rem` hacia aprox. `5.2–5.6rem`;
- bajar la componente fluida actual `8.4vw` hacia aprox. `5.8–6.4vw`;
- line-height aprox. `0.92–0.96` en vez de `0.87` si mejora la legibilidad.

No hace falta usar exactamente esos valores si otra combinación produce mejor resultado, pero el efecto debe ser inequívocamente más contenido.

En mobile también evitar un H1 excesivo. No producir overflow ni una palabra por línea. Mantener un máximo aproximado de `3.2–3.5rem` en teléfonos.

## 2 — `ARCHIVO / NTDQIASA`: NO FIJO AL VIEWPORT

En `sobre-visual.css` existe actualmente:

```css
.project-file::before {
  position: fixed;
  opacity: 0.7;
}
```

Quitar el comportamiento `fixed`.

El sello/agua `ARCHIVO / NTDQIASA` debe pertenecer al expediente/apertura, no quedarse pegado a la pantalla mientras el usuario hace scroll.

Preferir restaurar el comportamiento absoluto heredado de `project-page.css` o explicitar `position: absolute` si hace falta.

Conservar el sello y su baja jerarquía. No eliminarlo.

## 3 — ELIMINAR NUMERACIÓN AISLADA `01 / SINOPSIS`

Actualmente `sobre-visual.css` agrega:

```css
.synopsis h2::before { content: "01 / "; ... }
```

Eliminar esa numeración.

No existe un sistema equivalente `02 /`, `03 /`, etc. en el resto de la página, por lo que `01 /` funciona como dato decorativo arbitrario.

El título debe volver a leerse simplemente como `SINOPSIS`.

No agregar numeración nueva al resto de la página en esta pasada.

## 4 — BLOQUE PRINCIPAL DE MERCADO: DAR MÁS AIRE AL TEXTO DE ASK

El bloque `FINANCIACIÓN + DISTRIBUCIÓN INTERNACIONAL` funciona y debe conservar su composición general.

Problema: en desktop el claim ocupa mucho ancho y la columna del párrafo queda demasiado estrecha, generando una caja de texto muy alta y comprimida.

Ajustar sin rediseñar:

- equilibrar la retícula hacia algo más cercano a `1.1fr / 0.9fr` o equivalente;
- asegurar que el párrafo tenga un ancho cómodo de lectura;
- mantener el claim claramente dominante;
- mantener la regla vertical oro del párrafo;
- no agrandar el bloque global de forma significativa;
- no agregar CTA aquí.

El texto del ask debe poder leerse rápido sin parecer una nota marginal.

## 5 — MATERIALES DISPONIBLES: RESOLVER EL ÚLTIMO ÍTEM HUÉRFANO

Hay 7 materiales. La grilla desktop actual de 3 columnas deja `Teaser en producción` solo en una tercera fila, visualmente débil.

Recomponer sólo la grilla, sin cambiar orden ni copy.

Dirección recomendada para desktop ancho:

- usar 4 columnas;
- primera fila de 4;
- segunda fila con los dos primeros ítems normales y el séptimo ocupando las dos columnas finales (`span 2`), o una solución equivalente que cierre visualmente la retícula.

En breakpoints tablet/mobile, resetear spans cuando corresponda:

- 2 columnas en tablet si conviene;
- 1 columna en teléfono si la lectura lo necesita;
- no dejar huecos estructurales raros.

No convertirlo en cards nuevas ni resaltar editorialmente `Teaser en producción` como si fuera más importante que el resto; el span es sólo composición.

## 6 — RITMO VERTICAL: COMPACTAR LEVEMENTE

La V2 ya tiene una buena lógica de respiración, pero el conjunto puede ser un poco más compacto en desktop.

Reducir **moderadamente** algunos `margin-top` grandes, especialmente:

- entrada a ficha industrial;
- entrada a bloque de mercado;
- separación genérica entre `dossier-section`;
- separación antes de contacto.

Objetivo:

- reducir alrededor de 10–20% los vacíos verticales más amplios;
- mantener clara separación entre módulos;
- evitar que vuelva a sentirse como una página web apretada;
- no tocar el orden de secciones.

No reducir tamaños de cuerpo de texto para conseguirlo.

---

# COSAS QUE DEBEN QUEDAR COMO ESTÁN

No rehacer:

- la retícula hero logline + still;
- la ficha industrial más allá de cualquier ajuste indirecto de ritmo;
- público/posicionamiento;
- la línea de estado;
- timeline/reconocimientos;
- jerarquía Maite + Guillermo;
- banda compartida de autoría;
- posición de Malena como producción ejecutiva;
- bloque SKA/Nacho;
- composición del cierre/contacto;
- CTAs;
- paleta;
- tipografías;
- textura general;
- lenguaje archivo/dossier.

No agregar nuevas imágenes.

No agregar logo, íconos, adornos, números, labels ni copy nuevos.

No introducir otro sistema visual.

---

# RESPONSIVE

La V2.1 debe conservar la responsive existente y no introducir regresiones.

Revisar como mínimo:

- 1440×900
- 1280×800
- 1024×768
- 768×1024
- 430×932
- 390×844
- 360×800

En particular:

- H1 no debe overflowear;
- `market-target` debe pasar limpiamente a una columna cuando corresponda;
- materiales debe reorganizarse sin huecos;
- no debe existir overflow horizontal;
- CTA deben seguir siendo cómodos en mobile;
- no esconder copy.

## ACCESSIBILIDAD

Preservar:

- headings actuales;
- IDs;
- `aria-labelledby`;
- alt text;
- `:focus-visible`;
- contraste;
- links y mailto;
- `prefers-reduced-motion`.

---

# QA OBLIGATORIO

Ejecutar:

- `git diff --check`
- validación HTML básica de `sobre.html`
- comprobar que `sobre-visual.css?v=2` está enlazado exactamente una vez
- comprobar que los 8 links del jump-nav siguen resolviendo
- comprobar que no cambió ningún nodo de texto visible de `sobre.html`
- comprobar que los dos `mailto:` siguen byte-for-byte iguales
- comprobar que no se tocaron páginas inglesas, `index.html`, JS ni assets

Si el entorno tiene navegador, revisar visualmente al menos 1440×900 y 390×844.

Si no tiene navegador, decirlo explícitamente en el PR y no afirmar validación visual.

## ENTREGA

Al terminar:

1. crear un **PR nuevo contra `main`**;
2. no mergearlo;
3. indicar número de PR;
4. resumir cambios exactos;
5. listar tests ejecutados;
6. confirmar explícitamente que el copy quedó intacto.
