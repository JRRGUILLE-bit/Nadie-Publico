# CODEX PROMPT 04 — CARRUSEL DESKTOP V2.1 / PASADA QUIRÚRGICA

Trabajá sobre `main` del repo `JRRGUILLE-bit/Nadie-Publico`.

Antes de tocar nada, leé:
- `SITE_CONTENT_SOURCE.md`
- `VISUAL_IDENTITY.md`
- `index.html`
- `styles.css`
- `market-polish.css`
- `script.js`
- `market-polish.js`

## OBJETIVO

Hacer una última pasada visual **desktop V2.1** sobre el carrusel de 7 placas ya aprobado y mergeado en PR #50.

Esto **NO** es otro rediseño completo. Es una corrección quirúrgica basada en revisión visual real del sitio publicado.

El sistema general ya funciona. Hay placas que quedan congeladas y otras que requieren ajustes precisos de jerarquía, escala y composición.

Viewport objetivo principal: desktop / tablet horizontal, especialmente aprox. 1440×900, 1280×800 y 1024×768.

## REGLAS DE ALCANCE

NO cambiar:
- copy;
- orden de las 7 placas;
- IDs ni `data-slide-key`;
- lógica JS;
- focus trap;
- navegación por teclado;
- `inert` / `aria-hidden`;
- Escape;
- ausencia de autoplay;
- hero;
- video;
- landing;
- `sobre.html`;
- páginas English;
- mailtos;
- mobile;
- identidad tipográfica base;
- estructura general del modal/carrusel.

No agregar assets nuevos.
No inventar información.
No agregar decoración genérica para "llenar" espacio.
No volver a aumentar el tamaño del logo de SKA.

Preferir cambios sólo en `styles.css`. Tocar `index.html` únicamente si es imprescindible para una envolvente semántica o clase necesaria para la composición, sin alterar texto ni accesibilidad.

Si modificás `styles.css`, actualizar el cachebuster correspondiente en `index.html`.

---

# ESTADO VISUAL APROBADO / QUÉ CONGELAR

## TONO — CONGELAR

La placa TONO funciona y no debe rediseñarse.

La jerarquía actual:
- frase contextual pequeña;
- `LO COTIDIANO` grande;
- `LO EXTRAÑO` grande y rojo;
- columna de recursos a la derecha;
- frase final abajo;

está aprobada.

No modificar composición, escala, color ni distribución de TONO salvo que un ajuste global imprescindible afecte técnicamente la placa. Si eso ocurre, mantener el resultado visual equivalente.

## CREADORES — CONGELAR POR AHORA

La solución tipográfica actual sin placeholders es correcta hasta incorporar retratos reales en una etapa posterior.

No reintroducir placeholders.
No agregar retratos generados.
No cambiar nombres, roles, bios ni la frase de autoría.
No rediseñar la composición actual de dos columnas salvo corrección mínima de overflow.

## NAVEGACIÓN / CHROME — CONGELAR

La navegación inferior, flechas en caja, `VOLVER` y `EXPEDIENTE / PROYECTO Y EQUIPO` están suficientemente resueltos.

No volverlos protagonistas.
No achicarlos otra vez.
No rediseñar el sistema de navegación.
Mantener `:focus-visible` explícito.

---

# AJUSTES A IMPLEMENTAR

## 01 — PROYECTO: MICROAJUSTE, NO REDISEÑO

La composición actual foto 56% / panel de copy 44% funciona.
El papel rasgado ya no invade el copy y debe seguir así.
El tagline y la logline quedan como están salvo necesidad de ajuste mínimo de fitting.

Problema restante: la ficha industrial inferior se percibe demasiado tenue y pequeña.

Ajustar únicamente `.project-format` / equivalente actual para:
- subir legibilidad aproximadamente 10–15%;
- aumentar ligeramente tamaño y/o contraste;
- seguir siendo información secundaria;
- no competir con tagline/logline;
- conservar la línea superior y el carácter editorial de ficha.

No mover la foto.
No volver a agrandar el rasgado.
No cambiar la retícula 56/44 salvo corrección mínima indispensable.

---

## 02 — UNIVERSO: RESOLVER LA MITAD DERECHA

La mitad izquierda está aprobada:
- `UNIVERSO`;
- `PRESENTE / MONTEVIDEO`;
- párrafo;
- `AMISTAD · PRECARIEDAD · ORO · MEMORIA` con escala grande.

No rediseñar esa mitad.

Problema actual: la mitad derecha se lee como una fotografía rectangular flotando dentro de una gran caja negra, con `GONZALO / MARÍA / LUIS` como labels sueltos debajo/alrededor.

Objetivo: que el plano derecho se sienta como **un territorio visual completo de memoria / misterio**, no como una imagen insertada.

Implementar:
- hacer que la imagen existente ocupe sustancialmente más del plano derecho, idealmente llenando o casi llenando esa región hasta sus bordes internos;
- mantener el corte diagonal entre presente y memoria;
- integrar `MEMORIA / LO ENTERRADO` dentro del plano derecho sin que parezca un caption de debug;
- integrar `GONZALO / MARÍA / LUIS` con la imagen: pueden superponerse sobre ella, cruzar parcialmente su borde o formar una composición escalonada dentro del plano;
- mantener los nombres legibles y con jerarquía;
- eliminar la sensación de "foto rectangular flotante + nombres debajo";
- conservar oscuridad suficiente para que el texto sea legible;
- no agregar nuevas imágenes.

La cafetera puede aparecer aquí como material del universo, pero no debe competir con PROYECTO como imagen hero. Usar encuadre, oscuridad y tratamiento para que funcione como memoria/atmósfera, no como repetición literal de la tapa.

---

## 03 — MERCADO: MICROAJUSTE DE RELACIÓN VERTICAL

La placa clara, el claim grande y la retícula industrial están aprobados.
No volver a rediseñar esta placa.

Problemas restantes:
- el bloque de estado todavía puede ganar un poco de legibilidad;
- el ask del socio internacional queda algo separado del claim.

Ajustar:
- subir ligeramente tamaño/contraste del bloque de estado, sin convertirlo en protagonista;
- acercar visualmente el párrafo del socio internacional al claim `FINANCIACIÓN + DISTRIBUCIÓN INTERNACIONAL`;
- mantener bastante aire;
- conservar la placa limpia y deliberadamente industrial;
- no llenar el fondo con gráficos, sellos ni decoración adicional;
- conservar el cambio de ritmo que produce la hoja clara.

No reintroducir subrayados múltiples bajo cada línea del claim.

---

## 04 — SKA FILMS: PRIORIDAD ALTA

La dirección general de V2 es correcta, pero todavía necesita una reducción de escala y mejor asociación de información.

### Logo

El raster de SKA sigue viéndose demasiado grande/blando frente al resto de la placa.

Reducir el logo aproximadamente **30–40% respecto de su tamaño actual**.
Como referencia visual, debería sentirse como un sello/membrete de coproductor, no como un bloque protagonista.

Podés apuntar aproximadamente a un ancho máximo visual cercano a 190–220 px en desktop grande, ajustando con `clamp()` si conviene, y sin superar una altura que vuelva a dominar el lienzo.

No deformar el logo.
No aplicar upscale.
No agregar bordes artificiales alrededor del logo.

### Jerarquía

La placa debe leerse en este orden:
1. `COPRODUCCIÓN URUGUAYA`
2. `SKA FILMS`
3. logo como aval / sello
4. texto institucional
5. `Ignacio “Nacho” Jaunsolo · SKA Films`
6. franja de créditos

### Nacho

La línea de Nacho ya está técnicamente en flujo normal y no debe volver a `position:absolute`.

Pero visualmente no debe quedar centrada o flotando en tierra de nadie.

Moverla dentro de la retícula para que quede **inmediatamente asociada al bloque institucional de texto**, idealmente debajo del párrafo y alineada con su mismo borde izquierdo.

Debe ser secundaria, pero suficientemente visible.
No debe tocar ni solaparse con la franja de créditos.

### Créditos

Conservar la franja:
`Togo · Rada · Sin Aviso · Afilo Mi Gillette`

No cambiar copy.
No inventar nuevos créditos.
Mantener la franja como cierre horizontal de la placa.

---

## 05 — RECORRIDO: DARLE CLÍMAX SIN AGREGAR CONTENIDO

La timeline V2 es mejor que la versión anterior y se mantiene como base.
No cambiar los cuatro hitos ni sus textos.

Problema actual: todavía se siente como una banda central dentro de un lienzo demasiado grande y los CTAs siguen pareciendo controles auxiliares.

### Timeline

Aumentar presencia visual aproximadamente 15–20% mediante combinación de:
- tamaño de nombres de hitos;
- tamaño/contraste de descripciones;
- escala de nodos/rombos;
- peso visual de la línea;
- mejor uso vertical del espacio disponible.

Mantener el alternado arriba/abajo.
Mantener el sentido de avance hacia la derecha.
No convertirla en infographic genérico.
No agregar fechas o hitos nuevos.

### CTAs

Los tres CTAs siguen siendo únicamente:
- `SOLICITAR MATERIALES`
- `COORDINAR REUNIÓN`
- `CONOCER EL PROYECTO`

Deben sentirse como el **cierre real del micro pitch**, no como botones administrativos pequeños.

Darles más presencia mediante:
- mayor tamaño de texto y área clickeable;
- separación clara;
- borde/fondo editorial coherente con el expediente;
- jerarquía visual suficiente para que sean el siguiente paso natural.

`SOLICITAR MATERIALES` y `COORDINAR REUNIÓN` pueden tener un peso ligeramente mayor que `CONOCER EL PROYECTO`, pero no cambiar destinos ni copy.

No hacer botones corporativos brillantes.
No usar gradientes modernos/genéricos.
Mantener estética de expediente/dossier.

---

# PRUEBAS / QA OBLIGATORIO

Después de implementar:

1. `node --check script.js`
2. `node --check market-polish.js`
3. `git diff --check`
4. verificar exactamente 7 elementos `[data-about-slide]`
5. verificar exactamente 7 controles `[data-about-dot]`
6. verificar `role="dialog"` y `aria-modal="true"`
7. verificar que `inert`, Escape, Tab/focus trap y restore focus siguen presentes
8. verificar que no se introdujo autoplay/pause
9. verificar que no exista `overflow-y:auto` como workaround del carrusel
10. verificar que los 3 CTAs sigan existiendo sólo en RECORRIDO
11. verificar que TONO no haya sido visualmente rediseñado
12. verificar que CREADORES no recupere placeholders
13. verificar que `.ska-contact` no vuelva a `position:absolute`
14. verificar que mobile no reciba nuevas reglas de recomposición en esta tarea

Si existe navegador disponible, revisar visualmente 1440×900, 1280×800 y 1024×768. Si no existe, declararlo en el PR sin inventar screenshots.

# ENTREGA

Crear una rama nueva desde `main` y un PR nuevo contra `main`.

El PR debe describir esta tarea como **pasada desktop V2.1 quirúrgica**, no como rediseño general.

No hacer mejoras adicionales fuera de este alcance.