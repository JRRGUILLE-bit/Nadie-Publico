# CODEX PROMPT 05 — CARRUSEL MOBILE V1 / RECOMPOSICIÓN POR PLACA

## OBJETIVO

Trabajá sobre `main` de `JRRGUILLE-bit/Nadie-Publico` y construí la **versión mobile intencional** del carrusel / micro pitch deck de 7 placas.

Desktop ya fue trabajado y aprobado. **NO escales el desktop hacia abajo.** Mobile tiene que sentirse como una composición vertical propia, diseñada para teléfono, conservando la misma identidad de expediente / archivo / dossier.

Este prompt es una fase de **diseño mobile**, no una excusa para tocar el resto del sitio.

## LEER ANTES DE EDITAR

Leé primero:

- `SITE_CONTENT_SOURCE.md`
- `VISUAL_IDENTITY.md`
- `index.html`
- `styles.css`
- `market-polish.css`
- `script.js`
- `market-polish.js`

Tomá el `main` actual como fuente de verdad para la estructura final de las 7 placas y para el nuevo bloque SKA / Ignacio “Nacho” Jaunsolo.

## ALCANCE ESTRICTO

Modificar únicamente lo necesario para la experiencia del carrusel en teléfono, principalmente reglas CSS responsive y, sólo si fuera imprescindible para una composición mobile robusta, clases/containers semánticos mínimos en `index.html`.

### NO TOCAR

- hero, video, poster ni intro/typewriter;
- desktop `@media (min-width: 900px)` salvo una corrección absolutamente necesaria para evitar una regresión causada por este mismo PR;
- copy público salvo separación semántica mínima sin reescritura;
- orden de las 7 placas;
- navegación manual;
- focus trap;
- `inert` / `aria-hidden`;
- Escape;
- restauración de foco;
- mailtos y destinos;
- `sobre.html`;
- páginas en inglés;
- assets existentes;
- identidad tipográfica Special Elite + Lekton;
- lógica de intro;
- ausencia de autoplay;
- TONO desktop;
- CREADORES desktop;
- composición desktop en general.

No agregar imágenes generadas, fotos falsas, iconos nuevos, librerías, frameworks ni dependencias.

---

# PRINCIPIOS MOBILE NO NEGOCIABLES

## 1. NO ES DESKTOP APILADO

Cada placa debe tener una composición portrait propia. No resolver simplemente con `display:block` de los elementos desktop.

## 2. SIN SCROLL INTERNO

No introducir:

- `overflow-y:auto`;
- scroll dentro de `.about-card`;
- scroll dentro del viewport del carrusel;
- áreas textuales scrolleables.

Cada placa debe entrar completa en la ventana mobile mediante jerarquía, retícula, tamaños y espaciado.

## 3. TARGETS DE VALIDACIÓN

Diseñar y revisar pensando, como mínimo, en:

- 360 × 800;
- 390 × 844;
- 430 × 932;
- 390 × 700 como caso de altura corta.

Usar `svh` y safe-area cuando corresponda.

## 4. DESKTOP INTACTO

La experiencia `>= 900px` debe quedar visualmente igual a la actual.

Este PR no es otra pasada desktop.

## 5. NAVEGACIÓN MOBILE

Mantener:

- flecha anterior;
- flecha siguiente;
- indicador del tipo `03 / 07 — TONO`;
- botón `VOLVER`;
- navegación por teclado existente;
- focus trap.

En teléfono NO mostrar los siete labels desktop a la vez.

Los targets táctiles de flechas y `VOLVER` deben ser razonables (aprox. 44 px de área interactiva cuando sea posible).

`VOLVER` puede recolocarse visualmente mediante CSS dentro del frame mobile —por ejemplo arriba a la derecha— si eso recupera espacio vertical y mejora la composición, sin cambiar su semántica ni su comportamiento.

El eyebrow `EXPEDIENTE / PROYECTO Y EQUIPO` debe seguir existiendo pero ser realmente secundario.

---

# COMPOSICIÓN MOBILE POR PLACA

## 01 — PROYECTO

Objetivo: **tapa vertical del pitch**.

No convertirla en una tarjeta de texto.

### Composición

- Imagen / cafetera arriba ocupando aprox. 34–40% de la placa.
- Copy debajo ocupando el resto.
- El borde rasgado puede transformarse en una transición horizontal muy estrecha entre foto y texto; nunca debe convertirse en una gran masa clara ni tapar copy.
- Mantener fondo oscuro.

### Jerarquía

1. `PROYECTO` pequeño/editorial.
2. `UNA SERIE DE AMIGOS. HASTA QUE SE PRENDE FUEGO TODO.` grande, idealmente 2–4 líneas bien controladas.
3. Logline completa, legible.
4. Ficha industrial al pie con contraste suficiente:
   `6 × 20–25 min · Comedia negra / thriller político · Montevideo, Uruguay`

No esconder la logline y no meter scroll.

---

## 02 — UNIVERSO

Objetivo: **presente cotidiano invadido por memoria / misterio**.

No intentar conservar el split horizontal desktop.

### Composición portrait

- Mitad / zona superior: bloque `PRESENTE / MONTEVIDEO`, párrafo de universo y conceptos.
- Zona inferior aprox. 38–45%: imagen a ancho completo de esa zona, no un rectángulo chico flotante.
- Usar degradado para unir texto e imagen.
- `MEMORIA / LO ENTERRADO` debe vivir asociado a la zona visual inferior.
- `GONZALO / MARÍA / LUIS` deben superponerse o integrarse al plano de imagen, con buena lectura; no dejarlos como labels flotando fuera de la escena.

### Conceptos

`AMISTAD · PRECARIEDAD · ORO · MEMORIA`

Debe conservar peso gráfico. Puede resolverse en 2 líneas o composición compacta, no como microtexto.

---

## 03 — TONO

Objetivo: conservar la placa con más identidad, pero recompuesta para portrait.

No cambiar su idea ni su copy.

### Composición

- Parte superior / central: oposición tipográfica.
- Deben descubrirse inmediatamente:
  `LO COTIDIANO`
  `LO EXTRAÑO`
- El resto de la frase funciona como contexto menor.
- `El tono nace del choque entre la normalidad y el absurdo.` queda como línea secundaria.
- Recursos audiovisuales al pie en una matriz compacta **2 × 3**:
  - VOZ EN OFF
  - CUARTA PARED
  - FREEZE FRAME
  - REBOBINADO
  - SPLIT SCREEN
  - FLASHBACK

No hacer una lista vertical de seis filas porque roba demasiada altura.

No meter imagen/cafetera de fondo en mobile.

---

## 04 — MERCADO

Objetivo: **hoja industrial clara y rápida de escanear**.

Mantener el cambio de ritmo al fondo claro.

### Composición portrait

- `EL PROYECTO HOY` + `MERCADO` arriba, compactos.
- El claim es el gran gesto de la placa:
  `FINANCIACIÓN + DISTRIBUCIÓN INTERNACIONAL`
- Debe ocupar 2–4 líneas, con tamaño fuerte pero sin forzar overflow.
- Estado del proyecto en un bloque compacto legible.
- Ask inmediatamente relacionado con el claim, no perdido al fondo.

No llenar el aire con decoración.

No agregar datos de financiación ni información nueva.

---

## 05 — CREADORES

Objetivo: mantener la dupla autoral sin convertir la placa en un CV infinito.

Actualmente NO hay retratos reales integrados en la repo para esta placa. **No inventar placeholders ni retratos.**

### Composición mobile

Usar una composición tipográfica **de dos columnas compactas**, no una pila vertical interminable:

- Maite a izquierda.
- Guillermo a derecha.
- Nombres con suficiente presencia pero tamaños compatibles con 360 px.
- Roles visibles.
- Bios completas existentes, con cuerpo pequeño pero legible y line-height controlado.
- Separación central editorial sutil.
- La frase conjunta debe cerrar a ancho completo:
  `Guillermo y Maite escribimos la serie juntos y compartimos su autoría.`

No eliminar hechos del copy y no reescribir biografías.

Priorizar una medida de columna compacta y consistente. Evitar bajar a tamaños ilegibles sólo para “hacer entrar”. Si hace falta, reducir paddings/gaps antes que destruir la tipografía.

---

## 06 — SKA FILMS

Usar la versión actual de `main`, que ya contiene el bloque institucional de SKA y el perfil de Ignacio “Nacho” Jaunsolo.

Objetivo: **coproductor + persona responsable + credential industrial**.

### Composición portrait

1. Arriba: `COPRODUCCIÓN URUGUAYA`, `SKA FILMS` y logo pequeño/mediano.
2. Texto institucional debajo, compacto.
3. Regla / separación editorial.
4. Bloque de Nacho:
   - `IGNACIO “NACHO” JAUNSOLO`
   - `FUNDADOR · DIRECTOR EJECUTIVO · PRODUCTOR`
   - credential de `Togo`.
5. Créditos al pie en una matriz **2 × 2**:
   - TOGO
   - RADA
   - SIN AVISO
   - AFILO MI GILLETTE

### Logo

No volver a agrandarlo.

En mobile debe ser suficientemente chico para no comerse la placa y para no exponer más la limitación de resolución del raster.

No agregar foto de Nacho.

---

## 07 — RECORRIDO

Objetivo: **cierre vertical con sensación de avance y acciones claras**.

### Timeline

En mobile convertir la timeline horizontal desktop en **timeline vertical compacta**.

Los cuatro hitos siguen exactamente en el mismo orden y con el mismo copy:

1. FONDO DE INCENTIVO CULTURAL
2. MÁLAGA TALENT 2025
3. DETOUR MONTEVIDEO CINE LAB 2025
4. PREMIO TEASER / SEGUNDO PREMIO

Usar línea, nodos y ritmo vertical. No hacer cuatro tarjetas independientes.

### CTAs

Al pie deben sentirse como cierre real del pitch:

- `SOLICITAR MATERIALES`
- `COORDINAR REUNIÓN`
- `CONOCER EL PROYECTO`

En mobile preferir botones de ancho completo o casi completo y altura táctil clara.

En el caso corto 390×700 pueden compactarse verticalmente, pero los tres deben seguir visibles sin scroll interno.

---

# FRAME / ALTURA / ESPACIO DISPONIBLE

La placa y sus controles tienen que entrar dentro de `100svh` considerando safe areas.

No asumir 900 px de alto.

Optimizar:

- padding exterior;
- gap entre eyebrow / viewport / controles;
- posición de `VOLVER`;
- padding interno de cada placa;
- tamaños fluidos con `clamp()`;
- variantes para altura corta.

Agregar una variante de altura corta, por ejemplo combinando:

`@media (max-width: 720px) and (max-height: 720px)`

y, si realmente hace falta, una protección adicional alrededor de 640 px.

La variante short-height debe **compactar**, no activar scroll.

---

# ACCESIBILIDAD

No romper nada de lo ya resuelto.

Verificar:

- `role="dialog"`;
- `aria-modal="true"`;
- 7 slides;
- 7 controles `data-about-dot`;
- slides inactivas `inert` / `aria-hidden`;
- Tab / Shift+Tab atrapados dentro del modal;
- Escape cierra;
- cierre restaura foco a `#about-trigger`;
- ArrowLeft / ArrowRight siguen navegando;
- click/touch en controles sigue funcionando;
- `prefers-reduced-motion` sigue respetado;
- no reaparece autoplay.

No cambiar la lógica de foco si no es imprescindible.

---

# CSS / ORGANIZACIÓN

Preferir una sección claramente delimitada, por ejemplo:

`/* Micro pitch — mobile portrait V1 */`

con reglas específicas bajo `@media (max-width: 720px)` después de la base pertinente, cuidando especificidad respecto de CSS heredado.

No duplicar cientos de reglas sin necesidad.

No usar `!important` de forma indiscriminada.

No generar una nueva hoja CSS salvo razón técnica fuerte.

Actualizar el cachebuster de `styles.css` en `index.html` si se modifica `styles.css`.

---

# PRUEBAS OBLIGATORIAS

Ejecutar:

```bash
node --check script.js
node --check market-polish.js
git diff --check
```

Verificar estáticamente:

- exactamente 7 `[data-about-slide]`;
- exactamente 7 `[data-about-dot]`;
- no existe autoplay del carrusel;
- no existe `overflow-y:auto` aplicado al carrusel / cards;
- no aparecen placeholders de retratos;
- las 3 CTAs sólo están en RECORRIDO;
- SKA conserva el bloque Nacho y los cuatro créditos;
- desktop V2/V2.1 no fue reescrito.

## VALIDACIÓN VISUAL

Si el entorno tiene navegador, renderizar y revisar al menos:

- 360×800
- 390×844
- 430×932
- 390×700

Revisar las 7 placas, no sólo la primera.

Si el entorno NO tiene navegador disponible, decirlo explícitamente en el PR y NO afirmar que mobile fue validado visualmente. En ese caso dejar el código listo para revisión con screenshots humanos.

---

# CRITERIO DE TERMINACIÓN

El trabajo está terminado cuando:

- las siete placas tienen una composición mobile portrait deliberada;
- ninguna depende de scroll interno;
- ninguna parece simplemente el desktop apilado;
- los textos importantes son legibles;
- PROYECTO funciona como tapa;
- UNIVERSO integra imagen/personajes;
- TONO conserva su personalidad;
- MERCADO se lee como hoja industrial;
- CREADORES funciona como dupla autoral;
- SKA funciona como respaldo industrial + perfil de Nacho;
- RECORRIDO cierra con timeline + acciones;
- desktop permanece intacto;
- accesibilidad y navegación siguen funcionando.

Crear un **PR nuevo contra `main`**.

No mergear automáticamente.

Al terminar, reportar:

1. número del PR;
2. archivos modificados;
3. resumen por placa;
4. checks ejecutados;
5. si hubo o no validación visual real con navegador.