# TODO — Mejora de la web pública

Objetivo: convertir la página pública de **Nadie te dijo que iba a ser así** en una herramienta más eficaz para continuar conversaciones con coproductores, inversores, fondos, mercados y socios de desarrollo, sin perder su identidad audiovisual.

## Cambios aprobados

- [x] 1. Agregar un bloque visible de **Estado del proyecto**.
  - Serie de ficción de 6 × 20–25 minutos.
  - Proyecto en desarrollo.
  - Guion piloto disponible.
  - Dossier, biblia y arco de temporada disponibles.
  - Teaser realizado.
  - Implementado en la primera placa de “Sobre nosotros”.

- [x] 2. Agregar un bloque de **Qué estamos buscando**.
  - Coproductores.
  - Socios de desarrollo.
  - Financiamiento y fondos.
  - Alianzas internacionales.
  - Distribución o ventas, cuando corresponda.
  - Implementado debajo del estado del proyecto, dentro de la primera placa.

- [x] 3. Incorporar una llamada a la acción principal: **Solicitar dossier y materiales**.
  - Implementada sobre el acceso de contacto por correo.
  - Destacada visualmente como acción principal sin alterar la identidad de la portada.

- [x] 4. Mejorar los nombres de los accesos profesionales.
  - El acceso principal muestra “Solicitar dossier y materiales” y lo identifica como “Contacto de producción”.
  - “Sobre nosotros” pasó a “Proyecto y equipo”.
  - Se agregó “Conversar sobre coproducción” como acceso independiente.
  - Ambos correos abren con asunto y cuerpo prearmados según la intención del visitante.

- [x] 5. Hacer más concreta la presentación de la historia.
  - Se identifican Gonzalo, Luis y María con sus edades.
  - Se introduce el robo de oro como detonante.
  - Se establece su vínculo con un episodio político de 1980, durante la dictadura.
  - Se explican las consecuencias sobre la convivencia y las decisiones de los protagonistas.
  - Implementado como bloque “La historia” en la primera placa del proyecto.

- [x] 6. Agregar una logline clara y breve.
  - Implementada antes del bloque “La historia”.
  - Resume protagonistas, oro, dictadura y escalada del conflicto en una sola frase.

- [x] 7. Reordenar la página de proyecto y equipo.
  1. Logline.
  2. Sinopsis.
  3. Formato y género.
  4. Estado del desarrollo.
  5. Materiales disponibles.
  6. Reconocimientos y apoyos.
  7. Búsqueda de socios.
  8. Equipo.
  9. Contacto.
  - Se agregó navegación interna para acceder directamente a cada sección.
  - La página completa conserva la estética de expediente y prioriza la lectura de industria.

- [x] 8. Reducir repeticiones en las biografías y concentrarlas en trayectoria y función.
  - Las fichas de la página completa ya quedaron concentradas durante la reorganización.
  - Las cuatro placas biográficas del carrusel fueron reducidas a función, trayectoria y aporte concreto al proyecto.
  - Se eliminaron repeticiones del género, la sinopsis y la identidad general de la serie.

- [x] 9. Mostrar los materiales disponibles sin publicarlos directamente.
  - Guion piloto.
  - Dossier.
  - Biblia de serie y arco de temporada.
  - Teaser.
  - Presupuesto.
  - Plan de desarrollo.
  - La lista aparece en la página completa y en la primera placa de la portada.
  - Se aclara que los materiales no son públicos y se comparten bajo solicitud profesional.

- [x] 10. Permitir acceder al contacto desde el inicio, sin esperar a que termine la secuencia animada.
  - Los accesos profesionales son visibles y clickeables desde que carga la portada.
  - Durante la presentación mantienen una opacidad discreta y alcanzan su presencia final al terminar las placas.
  - Se ocultan y desactivan correctamente cuando se abre el expediente de Proyecto y equipo.

- [x] 11. Agregar una opción discreta de **Saltar presentación**.
  - Implementada como control flotante al estilo de una plataforma de streaming.
  - Al activarla se interrumpe el tipeo y se reconstruyen todas las placas en su estado final.
  - La navegación profesional alcanza inmediatamente su estado completo.
  - El botón desaparece después de usarlo o cuando la presentación termina normalmente.
  - Tiene posición y tamaño adaptados para escritorio, celular y pantallas bajas.

- [x] 12. Diferenciar apoyos, premios, laboratorios, mercados y selecciones.
  - La página completa presenta cada antecedente con una categoría independiente.
  - La placa animada ahora separa: apoyo, laboratorio, premio y selección.
  - No se utiliza la categoría “mercado” para instancias que no estén confirmadas como tales.
  - Las nuevas cuatro líneas fueron ajustadas para escritorio y celular.

- [x] 13. Agregar una línea clara sobre público objetivo y posicionamiento.
  - Se agregó una sección específica después de Formato y género.
  - Define un público joven adulto y adulto interesado en ficción serial de autor, comedia negra y thriller político.
  - Posiciona la serie como una propuesta rioplatense de identidad local, conflicto universal y potencial de circulación regional e internacional.
  - Se incorporó un acceso directo “Público” en la navegación interna.

- [x] 14. Crear una versión en inglés.
  - Se creó `about.html` con logline, sinopsis, formato, público, estado, materiales, recorrido, búsqueda de socios, equipo y contacto profesional en inglés.
  - Las versiones española e inglesa incluyen selectores visibles para cambiar de idioma.
  - Se agregaron metadatos, URL canónica, `hreflang`, Open Graph y datos estructurados propios para cada idioma.
  - Ambas páginas comparten `project-page.css` para mantener la misma identidad visual y evitar divergencias futuras.
  - Los correos de la versión inglesa abren con asunto y cuerpo prearmados en inglés.

- [x] 15. Agregar una ficha industrial resumida.
  - Incluye país, idioma, género, formato, duración, estado, productora y creadores.
  - Se muestra cerca del inicio de las páginas española e inglesa, antes de la logline.
  - Tiene navegación interna propia: “Ficha” en español y “Overview” en inglés.
  - Usa una grilla compacta de cuatro columnas en escritorio, dos en tablet y una en celular.
  - La ficha comparte estilos mediante `industrial-sheet.css` para mantener ambas versiones sincronizadas.

- [ ] 16. Mantener la identidad visual de la portada.
  - No eliminar la cafetera.
  - No eliminar el video, el grano ni la máquina de escribir.
  - No convertir la página en una plantilla institucional genérica.
  - Priorizar claridad industrial y conversión profesional sin perder atmósfera.

## Método de implementación

Cada cambio se realizará y verificará por separado, con un commit específico. Al terminar cada punto se marcará como completado en este archivo.