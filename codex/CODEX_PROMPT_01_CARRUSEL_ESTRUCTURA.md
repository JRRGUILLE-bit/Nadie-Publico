# CODEX PROMPT 01 — ESTRUCTURA DEL MICRO PITCH DE 7 PLACAS

Trabajá sobre el repo `JRRGUILLE-bit/Nadie-Publico`, branch `main`.

## OBJETIVO DE ESTA TAREA

Reemplazar la arquitectura actual del carrusel/modal de “Proyecto y equipo” de la landing española por una estructura semántica de **7 placas temáticas**, manteniendo el sitio funcional y preparando la base para un rediseño visual posterior.

**Esta tarea NO es el rediseño visual final.** No intentes “hacerlo lindo” por tu cuenta ni rehacer la identidad gráfica. Quiero una implementación estructural limpia, funcional, accesible y fácil de estilizar en el siguiente paso.

## FUENTE DE VERDAD DEL COPY

Antes de tocar nada, leé completo:

- `SITE_CONTENT_SOURCE.md`
- `VISUAL_IDENTITY.md`
- `index.html`
- `script.js`
- `market-polish.js`
- `styles.css`
- `market-polish.css`

`SITE_CONTENT_SOURCE.md` es la fuente editorial pública. **No inventes, mejores, amplíes ni “profesionalices” el copy.** Si necesitás acortar, usá solamente los recortes exactos indicados abajo. No agregues premios, cargos, bios, comparables, estado del teaser, materiales ni claims que no estén en esa fuente.

## MUY IMPORTANTE — NO TOCAR EN ESTA TAREA

No modificar:

- el video/fondo del hero ni sus assets;
- la animación de apertura / máquina de escribir;
- el orden general de la portada;
- `sobre.html`;
- `english.html` ni `dossier-en.html`;
- los botones inferiores de contacto/Instagram todavía;
- metadata, OpenGraph, JSON-LD ni SEO todavía;
- fuentes Special Elite / Lekton;
- la identidad de expediente/archivo;
- mailtos existentes;
- comportamiento mobile del video;
- ningún asset de imagen o video.

Si encontrás código viejo del carrusel que contradice esta nueva estructura, adaptalo sólo en la medida necesaria para que las 7 placas funcionen. No hagas limpieza general del repo.

---

# NUEVA ARQUITECTURA DEL CARRUSEL

El carrusel debe pasar de 5 fichas personales a estas 7 placas, en este orden exacto:

1. `PROYECTO`
2. `UNIVERSO`
3. `TONO`
4. `MERCADO`
5. `CREADORES`
6. `SKA FILMS`
7. `RECORRIDO`

Conservar el trigger actual `#about-trigger` y el contenedor/modal `#about-carousel` si no hay una razón técnica fuerte para cambiarlos. Preferir refactor quirúrgico antes que reemplazo total.

Cada placa debe ser un `<article>` semántico con:

- `data-about-slide`
- un identificador estable (`id` o `data-slide-key`)
- heading propio
- estructura interna específica para poder diseñar cada placa de manera diferente en el próximo prompt

No usar siete cards con exactamente la misma estructura interna.

---

# COPY EXACTO POR PLACA

## 01 — PROYECTO

Label / título:
`PROYECTO`

Tagline:
`UNA SERIE DE AMIGOS. HASTA QUE SE PRENDE FUEGO TODO.`

Logline, exacta:

`Entre mates, milanesas y discusiones, tres jóvenes con un pie en la adultez comparten departamento en Montevideo. Pero todo cambia tras un incendio en una oficina que los lanza, casi sin querer, a investigar un crimen olvidado, un tesoro perdido durante la dictadura y los secretos que sus propias familias intentaron enterrar.`

Ficha:
`6 × 20–25 min · Comedia negra / thriller político · Montevideo, Uruguay`

No incluir en esta placa listas de materiales, estado de desarrollo, búsqueda de socios ni CTAs repetidos.

Estructura interna sugerida para poder estilizar luego:
- bloque visual reservado (`project-visual` o equivalente; no agregar asset nuevo)
- bloque de copy
- tagline
- logline
- ficha compacta

---

## 02 — UNIVERSO

Label / título:
`UNIVERSO`

Texto exacto:

`Una Montevideo contemporánea, cotidiana y reconocible, atravesada por la adultez joven, los vínculos familiares y una memoria que todavía pesa. En este universo, el misterio se cuela entre apartamentos compartidos, trabajos, bares y vecinos, mientras lo absurdo convive con lo íntimo y lo oscuro.`

Conceptos gráficos, en este orden:
`AMISTAD · PRECARIEDAD · ORO · MEMORIA`

Incluir los nombres `GONZALO`, `MARÍA`, `LUIS` sólo como elementos breves/semánticos que luego puedan integrarse al diseño. No pegar sus bios completas en esta placa.

Preparar estructura interna diferenciada para que después pueda representarse PRESENTE / PASADO o cotidiano / misterio, pero **no diseñar todavía ese collage**.

---

## 03 — TONO

Label / título:
`TONO`

Frase principal exacta:

`La dirección de Nadie te dijo que iba a ser así se sostiene en una tensión constante entre lo cotidiano y lo extraño.`

Frase secundaria exacta:

`El tono nace del choque entre la normalidad y el absurdo.`

Recursos, en este orden:
- `VOZ EN OFF`
- `CUARTA PARED`
- `FREEZE FRAME`
- `REBOBINADO`
- `SPLIT SCREEN`
- `FLASHBACK`

No escribir explicaciones nuevas de cada recurso en esta placa. La fuente editorial contiene las explicaciones largas para otros usos.

La estructura HTML debe permitir que estos seis recursos se conviertan después en grilla / anotaciones / sellos visuales sin cambiar el markup de fondo.

---

## 04 — MERCADO

Label superior:
`EL PROYECTO HOY`

Estado, exacto:

`Piloto completo · temporada estructurada · Málaga Talent · DETOUR Montevideo Cine LAB · Premio Teaser · FIC · teaser en producción · SKA Films, coproducción uruguaya`

Claim industrial principal:
`FINANCIACIÓN + DISTRIBUCIÓN INTERNACIONAL`

Texto exacto:

`Un socio internacional que pueda entrar antes del rodaje y hacer que financiación y distribución formen parte del mismo plan: commission/pre-buy, coproducción estratégica o estudio/distribuidor con capacidad real de circulación.`

No incluir:
- financiación monetaria confirmada 0;
- “productora principal: en búsqueda”;
- listas administrativas largas;
- claims nuevos.

Estructurar esta placa de forma distinta a las anteriores: status compacto + claim central + párrafo de búsqueda.

---

## 05 — CREADORES

Label / título:
`CREADORES`

### Maite
Nombre:
`Maite Piñeyrúa Segura`

Rol exacto para esta implementación:
`Cocreadora · coguionista · dirección`

Bio exacta:

`Maite Piñeyrúa Segura es directora, guionista y fotógrafa uruguaya, licenciada en Comunicación Audiovisual por la UCU. Dirigió Tumbero, premiado en FIEC, Dodecá y La Floresta, y escribió y dirigió Una vez casi hice un gol. Es cocreadora, coguionista y directora de Nadie te dijo que iba a ser así. Fue seleccionada para Málaga Talent 2025.`

### Guillermo
Nombre:
`Guillermo Barbeito Rodríguez`

Rol exacto para esta implementación:
`Cocreador · coguionista · desarrollo creativo`

Bio exacta:

`Guillermo Barbeito Rodríguez es cocreador y coguionista de Nadie te dijo que iba a ser así. Su trabajo en la serie comprende la construcción del universo narrativo, la estructura de temporada y el desarrollo del tono que articula comedia negra, thriller político y absurdo cotidiano.`

Línea conjunta exacta:

`Guillermo y Maite escribimos la serie juntos y compartimos su autoría.`

IMPORTANTE:
- No cambiar `desarrollo creativo` por `showrunner` en esta tarea.
- No inventar nuevas bios.
- No agregar fotos falsas, avatares generados ni headshots de terceros.
- Los retratos reales se incorporarán en una tarea posterior; prepará contenedores semánticos/slots de media sólo si pueden permanecer correctamente vacíos o no visibles hasta entonces.

---

## 06 — SKA FILMS

Label:
`COPRODUCCIÓN URUGUAYA`

Título:
`SKA FILMS`

Texto exacto:

`SKA Films tiene más de 20 años de trayectoria y ha realizado películas documentales y de ficción. La productora ha estrenado comercialmente sus películas en cines, cable o plataformas.`

Créditos seleccionados para la estructura visual:
- `Togo`
- `Rada`
- `Sin Aviso`
- `Afilo Mi Gillette`

Identificación secundaria:
`Ignacio “Nacho” Jaunsolo · SKA Films`

Usar el logo de SKA ya existente en `assets/logos/`; no cambiarlo ni generar uno nuevo.

La placa es sobre SKA Films. No convertirla en una bio completa de Nacho ni en una placa genérica de producción.

---

## 07 — RECORRIDO

Label / título:
`RECORRIDO`

Hitos, en este orden:

1. `FONDO DE INCENTIVO CULTURAL` — `Apoyo al proyecto`
2. `MÁLAGA TALENT 2025` — `Proyecto seleccionado`
3. `DETOUR MONTEVIDEO CINE LAB 2025` — `Desarrollo de estructura, personajes, tono e identidad audiovisual`
4. `PREMIO TEASER / SEGUNDO PREMIO` — `DETOUR Series Lab 2025`

Preparar markup de timeline real: lista ordenada o estructura semántica equivalente, no cuatro párrafos sueltos.

Al final de esta placa preparar un contenedor de acciones finales. Por ahora reutilizar los tres destinos existentes:
- `Solicitar materiales`
- `Coordinar reunión`
- enlace a `sobre.html`

Para el enlace a `sobre.html`, usar temporalmente el texto neutral:
`Conocer el proyecto`

No repetir estos tres CTAs en las placas 1–6.

---

# NAVEGACIÓN

Reemplazar los cinco dots anónimos por una navegación que ya tenga la estructura final, aunque el estilizado vendrá después.

Desktop debe poder mostrar estos labels:

`PROYECTO · UNIVERSO · TONO · MERCADO · CREADORES · SKA FILMS · RECORRIDO`

Mobile debe tener una salida semántica preparada para algo equivalente a:

`03 / 07 — TONO`

Requisitos funcionales desde ya:
- flecha anterior;
- flecha siguiente;
- navegación directa a cada placa en desktop;
- indicador actual correcto;
- teclado;
- `aria-current` o equivalente en la sección activa;
- foco razonable al abrir/cambiar/cerrar;
- conservar Escape para cerrar si ya existe;
- **sin autoplay**;
- no crear botón de pausa porque no habrá autoplay.

Si la lógica de autoplay vive en `script.js`, neutralizarla de manera limpia para este carrusel en vez de depender exclusivamente de `market-polish.js` para frenarla después.

No romper la animación automática de las placas de INTRO del hero: “sin autoplay” se refiere exclusivamente al carrusel de proyecto.

---

# FIT / SCROLL

Desde la estructura, evitar contenido innecesario que haga imposible el objetivo posterior:

- ninguna placa debe depender conceptualmente de scroll vertical interno;
- no agregar wrappers con `overflow-y:auto` como solución;
- el contenido está deliberadamente limitado para caber;
- no achicar copy ni cambiarlo para resolver layout en esta tarea.

El CSS final de viewport se hará en el próximo prompt, pero no introduzcas ahora decisiones estructurales que obliguen a scroll.

---

# COMPATIBILIDAD Y REGRESIONES

Al terminar:

1. La portada debe seguir cargando y reproduciendo su intro como antes.
2. `Ver proyecto` debe abrir el carrusel.
3. Deben existir exactamente 7 placas y poder recorrerse manualmente.
4. No debe quedar ningún dot o contador hardcodeado a 5.
5. No debe quedar ninguna tarjeta individual de Maite, Guillermo, Nacho/SKA o Malena del carrusel viejo.
6. Malena no forma parte de las 7 placas nuevas; no borres información sobre ella de otras páginas.
7. No modificar `sobre.html`.
8. No tocar inglés todavía.
9. No inventar assets faltantes.
10. No cambiar el video.

Buscá referencias a `about-card`, cantidad de slides, dots, autoplay, índices y selectores antes de editar, para no dejar lógica vieja apuntando a cinco elementos.

---

# ENTREGA / REPORTE

Implementá los cambios, no te limites a describirlos.

Al final informame solamente:
- archivos modificados;
- resumen corto de qué cambió;
- cómo verificaste que hay 7 placas y navegación manual;
- cualquier conflicto real que haya impedido cumplir una instrucción.

No agregues mejoras no pedidas.
