# Plan de capturas para CyberGems

Estado: plan de producción **en espera**, **actualizado el 2026-11-16**. Ya no hay capturas publicadas: los dos PNG del piloto rechazado de CyberFeeds y el script que lo componía se retiraron del repositorio, y `cyberfeeds.json` volvió a `screenshot: null`. Las fichas públicas muestran de nuevo su explicación conceptual, ahora con una línea visible que anuncia que las capturas reales llegan pronto. El selector de imagen por idioma, la galería y la producción de capturas siguen pendientes; véanse «Momento de producción» y «Piloto: CyberFeeds».

**Lo que cambió el 2026-11-16:** las adaptaciones del sitio que este plan exigía antes de producir nada **quedan aplicadas** («Adaptaciones del sitio aplicadas»): captura por idioma en los datos y en el CMS, presentación sin recorte con pie y ampliación accesible, y el aviso visible en las fichas. El bloqueo técnico desaparece; el único condicionante que queda es la estabilidad de las interfaces.

Todo el estado citado en este documento se ha vuelto a comprobar **contra el código el 2026-11-15**: los 11 JSON de apps con `screenshot: null`, `public/screenshots/` con solo `.gitkeep`, el CMS en Sveltia 0.216.1 con un único campo `screenshot` de tipo `file`, `shotSrc` y el marco `aspect-video` / `object-cover` en `AppPage.astro`, y los 24 README con su sección «Screenshots / Capturas» en placeholder. Nada de lo que se describe como pendiente se ha resuelto por separado.

Documento interno de `CyberGems/CyberGems.github.io`. Desde el 2026-11-07 los 24 README de la suite (12 apps × EN/ES) llevan una sección «Screenshots / Capturas» con «Coming soon...» / «Próximamente...» y un comentario HTML invisible que apunta aquí. El emoji de esa sección es `🖼️`, no `📸`: `📸` es el emoji de identidad de CyberSnap y en su TOC quedarían dos cámaras seguidas. Rellenar la sección consiste en sustituir la cita, sin cambiar el título ni la entrada del TOC.

## Momento de producción

Todas las apps han pasado por una fase larga de transformación y perfeccionamiento de sus interfaces. Actualizar capturas en cada release añadiría trabajo innecesario y dejaría imágenes obsoletas. Este plan **no está activo**: se reanudará cuando cada app alcance la que se considere su versión final de interfaz y solo se prevean cambios menores a medio plazo. Hasta entonces se mantienen los bloques conceptuales del sitio y los placeholders «Coming soon...» / «Próximamente...» en los README.

**La condición de inicio no se cumple, y ahora se puede medir.** Entre el 2026-11-07 y el 2026-11-15 publicaron versión **8 de las 12 apps**: CyberPaste `v1.31.0` (11-nov), CyberFiles `v0.9.0` (12-nov), CyberWall `v2.5.0` (13-nov), CyberClock `v1.16.1` y CyberLauncher `v1.15.0` (14-nov), y CyberSnap `v1.25.1`, CyberViewer `v1.23.0` y CyberFeeds `v1.32.0` (15-nov). Las cuatro que no se movieron en esa ventana son CyberTray (`v1.9.0`, 30-oct), CyberNotes (`v1.19.0`, 6-nov), CyberManager (`v1.7.0`, 16-oct) y CyberGo (`v0.1.0-alpha.5`, 20-oct). Con ese ritmo, un lote de 36 imágenes iniciado hoy quedaría anticuado en la mayoría de las apps antes de terminarlo.

Cuando llegue ese momento, revalidar versiones, idiomas disponibles, capturas de ejemplo y este documento antes de producir nada. Las «Adaptaciones del sitio pendientes» siguen siendo un prerrequisito para la primera entrega, no una tarea que obligue a fabricar imágenes antes de tiempo.

## Alcance y estado real

- La suite tiene **12 apps con README público**. En el sitio hay **10 apps publicadas** (`apps = appEntries.filter(app => app.published)`), **CyberGo** con `published: false` (alpha `0.1.0-alpha.5`, sin cambios desde el 20-oct) y **CyberFiles** solo con banner (`banner-apps.json`, sin ficha pública y sin versión en el JSON; su último tag es `v0.9.0`, 12-nov, ya fuera de la prerrelease temprana en que estaba cuando se escribió este plan).
- Preparar las mismas vistas en español e inglés, capturadas desde la interfaz de cada app.
- El sitio es **bilingüe desde sus orígenes** (2-sep-2026): `/apps/<slug>/` y `/es/apps/<slug>/` sirven la misma ficha con `lang="en"` y `lang="es"`, y las rutas `/es/docs/...` existen para las 10 apps publicadas. Una captura publicada aparece, por tanto, en la página EN y en la página ES de la misma app: el par de idiomas no es un requisito opcional del sitio, es la mitad de cada entrega.
- Las wikis de la suite están **completamente bilingües desde el 15-nov-2026** (138 páginas `-es` en las 12 apps). Los README en español enlazan ya a la guía `-es` y a las rutas `/es/` del sitio, de modo que la galería de capturas debe seguir esa misma línea: cada vista necesita su versión en español.
- **Primera entrega:** 10 vistas principales, una por app publicada, con **20 imágenes finales** EN/ES.
- **Segunda entrega:** 6 vistas de detalle, con **12 imágenes adicionales**. Publicarlas solo cuando aporten algo distinto de la principal y la función exista en la versión estable.
- **CyberFiles y CyberGo entran en el alcance**, con su vista definida más abajo, pero su producción queda **diferida**: no conviene fijar 4 imágenes EN/ES de una interfaz alpha o sin ficha pública, porque quedarían obsoletas en cuanto se publique. Se capturan cuando tengan versión estable y página en el sitio. Con todo publicado, el total sería 24 principales + 12 detalles = 36 imágenes.
- Cuando se reanude, empezar con **CyberFeeds como piloto desde cero**, con pareja EN/ES, antes de producir toda la tanda. La captura anterior fue rechazada y retirada; no sirve como base.
- **Estado del sitio hoy:** las 10 apps publicadas tienen `screenshot: null` y `explainer`; no hay ninguna imagen real publicada. CyberFeeds vuelve a mostrar `feed-flow`. Desde el 2026-11-16 cada ficha añade bajo la ilustración el aviso «Ilustración conceptual arriba — capturas reales próximamente.» para que no se confunda con una captura real.
- **Prerrequisito:** terminar antes de producir imágenes las «Adaptaciones del sitio pendientes». Con el código actual, una captura de ventana completa se recorta y se sirve igual en ambos idiomas; producir el lote primero obligaría a rehacerlo.

## Qué mostrar

| App | Principal, primera entrega | Detalle, segunda entrega | Estado |
| --- | --- | --- | --- |
| CyberFeeds | Carpetas y fuentes a la izquierda, lista con artículos y lector abierto con contenido legible. | No es necesario para la primera tanda. | **Publicada — sin captura**; piloto pendiente |
| CyberSnap | Editor de anotaciones con una captura de demo, dos flechas, un recuadro y un texto breve. Mantener las herramientas visibles. | Resultado de OCR con el texto reconocido y sus controles visibles. | Publicada |
| CyberPaste | Historial con texto, código, imagen, URL y archivo; carpetas y un clip fijado visibles. | Visor de un clip de imagen con su texto OCR. | Publicada |
| CyberNotes | Carpetas de colores, varias notas y pestañas; una nota abierta con título, lista y un bloque de código breve. | Una nota flotante junto a la ventana principal. | Publicada |
| CyberManager | Lista de procesos, columnas de consumo y gráficas de CPU/memoria con actividad real moderada. | Vista de rendimiento de discos con sus gráficas y métricas. | Publicada |
| CyberViewer | Una imagen propia o autorizada grande, miniaturas de la carpeta y controles de visualización visibles. | No es necesario para la primera tanda. | Publicada |
| CyberLauncher | Una búsqueda corta con resultados reconocibles y categorías visibles. Si CyberBot está activo, conservar un mensaje breve en el idioma de la toma. | No es necesario para la primera tanda. | Publicada |
| CyberTray | Estantería con accesos a apps, carpetas y enlaces, categorías y el estado del sistema visible. | No es necesario para la primera tanda. | Publicada |
| CyberWall | Panel de actividad con conexiones y decisiones de permiso/bloqueo reconocibles en un entorno de demo. | Aviso de conexión de una app de prueba con las opciones de decisión visibles. | Publicada |
| CyberClock | Modo completo con el reloj como protagonista y los controles de sus herramientas visibles. | Una composición de dos o tres widgets flotantes reales, por ejemplo temporizador, cronómetro y calendario. | Publicada |
| CyberFiles | Doble panel con pestañas independientes, árbol de ubicaciones, barra de direcciones y vista de detalles con columnas; una selección o transferencia entre paneles visible. | A decidir cuando se publique. | **Diferida** — sin ficha pública |
| CyberGo | Lista o calendario con tareas y eventos de demo, grupos y colores, y Quick Add con una frase natural visible en el idioma de la toma. | A decidir cuando se publique. | **Diferida** — alpha |

Las 6 vistas de detalle de la segunda entrega son, por ahora, las de CyberSnap, CyberPaste, CyberNotes, CyberManager, CyberWall y CyberClock. Las de las apps diferidas se decidirán al publicarlas. «Publicada» se refiere a la ficha de la app en el sitio, no a que exista una captura: hoy ninguna ficha muestra una imagen real.

## Datos de demostración

Usar contenido preparado para las capturas y reutilizarlo entre apps cuando tenga sentido:

- Proyecto ficticio: **Proyecto Orión / Project Orion**.
- CyberNotes: carpetas Proyecto, Ideas y Referencia; entre 6 y 10 notas. Una nota titulada Plan de la semana / Weekly plan con tres tareas y un fragmento de código sencillo.
- CyberPaste: entre 8 y 12 clips de varios tipos. Usar texto, imágenes, archivos y enlaces de demostración.
- CyberFeeds: tres carpetas, varias fuentes y entre 8 y 12 artículos. Abrir un artículo propio de contenido atemporal. **Evitar títulos con número de versión o fechas**: el piloto retirado mostraba «CyberFeeds 1.21: a calmer way to keep up» con fecha de septiembre de 2026, una referencia que quedó desactualizada en cuanto avanzó la versión estable.
- CyberFiles: carpetas y archivos de Proyecto Orión con nombres aptos para publicación, en ambos paneles; sin rutas personales.
- CyberGo: tareas y eventos de Proyecto Orión creados con Quick Add en el idioma de la toma; nombres genéricos en recordatorios.
- CyberLauncher y CyberTray: accesos reconocibles y ordenados. Mostrar únicamente apps y archivos aptos para publicación.
- CyberViewer y CyberSnap: reutilizar una imagen propia y un pequeño documento de demo, para que la suite comparta un lenguaje visual.
- CyberManager y CyberWall: usar una sesión de prueba con nombres y rutas aptos para publicación. Las métricas deben proceder de la app y pueden variar entre tomas.
- CyberClock: nombres genéricos para alarmas, tareas o notas del calendario.

Preparar los datos antes de capturar. Revisar que no aparezcan correos personales, claves, documentos privados o rutas que identifiquen al usuario. **No incluir cadenas de versión en el contenido visible**: las versiones cambian y el dato se registra fuera de la imagen.

Confirmar antes de cada pareja que la versión estable permite cambiar el idioma desde la propia interfaz. Si una app no ofrece español en esa versión, registrar la incidencia y aplazar la pareja; no fabricar una traducción.

## Cómo obtener los originales

1. Usar la versión estable publicada de cada app y anotar su versión en la ficha de producción. Capturar EN y ES en la misma sesión y con la misma versión.
2. Elegir el tema oscuro nativo de cada app y conservar la misma escala de Windows, tamaño de ventana y disposición entre idiomas.
3. Ajustar la ventana para que el contenido importante se lea bien. Las ventanas compactas y los widgets deben conservar su tamaño y proporción naturales.
4. Capturar la ventana completa en PNG, con sus bordes y controles. Para mostrar un menú o aviso se puede usar una captura con retardo. La herramienta [Recortes de Windows](https://support.microsoft.com/es-es/windows/apps/use-snipping-tool-to-capture-screenshots) permite capturar una ventana o un área y usar retardo; también sirve para capturar la propia interfaz de CyberSnap.
5. Cambiar el idioma dentro de la app y repetir el mismo encuadre y contenido de demo. Traducir también el contenido preparado cuando sea parte importante de la escena.
6. Conservar los originales PNG por separado, fuera de `public/`; **no se publican** ni se dejan allí como referencia temporal. El directorio público del sitio recibe solo las imágenes finales optimizadas.
7. Registrar versión, idioma, tema, escala y fecha en la ficha de producción, sin añadir esos rótulos sobre la imagen.

## Tratamiento para el sitio

- La app debe ocupar la mayor parte de la imagen, con un margen discreto y fondo oscuro neutro cuando haga falta.
- Como punto de partida, componer las principales en 16:9 a 1920 x 1080 px, o 1600 x 900 px si el original no permite más resolución. La legibilidad tiene prioridad sobre el formato. **El 16:9 no es obligatorio:** si la ventana completa no cabe sin recortar, conservar su proporción nativa; el sitio debe dejar de forzar `aspect-video`.
- El original de ventana puede tener otra proporción. Ajustar el lienzo o el marco, manteniendo toda la interfaz y sus proporciones. No estirar controles ni cortar partes de la ventana para llenar el espacio.
- Los detalles y widgets pueden conservar su proporción nativa. Mostrar dos o tres ventanas reales juntas solo cuando eso ayude a entender una función.
- Usar bordes y sombra discretos. Mantener el fondo limpio, con la atención sobre la app. Prescindir de una barra de tareas añadida, titulares incrustados o decoraciones que reduzcan el espacio de la interfaz. **Contraejemplo histórico (piloto retirado):** la antigua `cyberfeeds-main.png` tenía fondo de escritorio azul, barra de tareas añadida y la ventana reducida; además pesaba 500 KB en PNG frente a los 245 KB del original de ventana.
- Exportar para la web en WebP de alta calidad, preferiblemente sin pérdida para interfaces. Objetivo orientativo: menos de 500 KB por imagen, siempre que el texto conserve nitidez. Medición previa sobre el original de ventana retirado `cyberfeeds-ui-source.png` (1600 x 1005): PNG 245 KB, WebP sin pérdida 127 KB, WebP q90 99 KB. Sirve como estimación, no como archivo disponible en el repositorio. El objetivo es realista en interfaces oscuras planas; en vistas con gráficas o fotografías puede superarse, y entonces conviene WebP q90 con revisión de la nitidez del texto antes de subir el límite, no volver al PNG.
- Preparar un texto alternativo y un pie de imagen breves en EN/ES, describiendo la acción visible. Hoy no existen campos para eso en el sitio.

## Nombres y ubicación

Las principales finales irán en:

```text
public/screenshots/<slug>/main-en.webp
public/screenshots/<slug>/main-es.webp
```

Para los detalles, usar el mismo sufijo de idioma:

| App | Nombre base |
| --- | --- |
| CyberSnap | `ocr-en.webp`, `ocr-es.webp` |
| CyberPaste | `clip-detail-en.webp`, `clip-detail-es.webp` |
| CyberNotes | `floating-note-en.webp`, `floating-note-es.webp` |
| CyberManager | `disk-performance-en.webp`, `disk-performance-es.webp` |
| CyberWall | `connection-prompt-en.webp`, `connection-prompt-es.webp` |
| CyberClock | `floating-widgets-en.webp`, `floating-widgets-es.webp` |

La extensión puede ser `.png` si se mantiene ese formato.

**Estado actual (2026-11-15).** No hay capturas publicadas. `public/screenshots/` conserva solo `.gitkeep`; `cyberfeeds-main.png`, `cyberfeeds-ui-source.png` y `scripts/compose-cyberfeeds-screenshot.mjs` se eliminaron, y `cyberfeeds.json` volvió a `screenshot: null`. Los 11 JSON de apps tienen `screenshot: null`, incluidas las 10 apps publicadas y CyberGo; CyberFiles no tiene ficha pública. Si hiciera falta consultar el piloto, puede recuperarse del historial de Git, pero no se reutilizará ni volverá a dejarse en `public/`. El punto de partida de la primera pareja será `main-en.webp` / `main-es.webp`; no queda ninguna migración de archivos antiguos pendiente.

`public/admin/config.yml` define `media_folder: public/screenshots` y `public_path: /screenshots` a nivel global. Desde el 2026-11-16 la colección `apps` **anula esos valores** con `media_folder: public/screenshots/{{slug}}` y `public_folder: /screenshots/{{slug}}`: las subidas caen directamente en la carpeta de su app y el valor guardado en el JSON es la ruta pública. `CyberApp.screenshot` acepta un nombre suelto (se resuelve dentro de `/screenshots/<slug>/`) o una ruta absoluta (lo que escribe el CMS).

## Adaptaciones del sitio aplicadas

**Aplicadas el 2026-11-16.** El bloqueo técnico del lote queda resuelto: el sitio ya está preparado para recibir capturas por idioma, sin recortes y con ampliación accesible. Falta solo producir las imágenes.

- **Datos:** `CyberApp.screenshot` pasa a `screenshot?: { en: string | null; es: string | null } | null`. Los 11 JSON siguen con `null`, así que no hubo migración de strings. Se añaden `screenshotAlt?: LocalizedText` y `screenshotCaption?: LocalizedText`.
- **CMS:** el campo `screenshot` es ahora un objeto con `en` y `es` (`widget: file`), más `screenshotAlt` y `screenshotCaption` por idioma (`widget: string`). La colección `apps` usa `media_folder` con `{{slug}}`.
- **`AppPage.astro`:** elige la imagen según `lang` (un idioma sin imagen conserva la ilustración conceptual, no muestra la del otro idioma); envuelve en `<figure>` / `<figcaption>`; **elimina `object-cover` y las dimensiones fijas `1280x720`**, de modo que la ventana completa se ve con su proporción natural y nunca se recorta; el `alt` usa `screenshotAlt` y cae a `${app.name} — ${app.tagline[lang]}`; la ampliación usa `<dialog>` nativo (teclado y Escape sin dependencias). El bloque conceptual se conserva **debajo** de la imagen cuando existen ambas.
- **Aviso visible:** mientras no haya captura, la ficha muestra bajo la ilustración la línea «Conceptual illustration above — real screenshots coming soon.» / «Ilustración conceptual arriba — capturas reales próximamente.». Sin ella, la ilustración conceptual parecía una captura real y no había señal de que las capturas estuvieran previstas.

Verificado el 2026-11-16 con una captura de prueba en CyberClock solo en inglés: la página EN muestra la imagen completa sin recorte, con su pie y su diálogo; la página ES, sin imagen en ese idioma, mantiene la ilustración conceptual con su aviso. Build de 528 páginas, `verify-publication` y `verify-doc-anchors` sin errores.

Cuando se reanude el plan, el orden restante es:

1. **Producir** las imágenes con el proceso de «Cómo obtener los originales».
2. **Publicar** cada pareja EN/ES desde el CMS: subir `main-en.webp` y `main-es.webp` a la carpeta del slug, rellenar el `alt` y el pie en los dos idiomas.
3. **Verificar** en escritorio y móvil que no hay recorte, que EN y ES muestran su propia imagen y que el bloque conceptual sigue debajo.
4. Solo entonces, la galería de detalles de la segunda entrega.

La segunda entrega añadirá una pequeña galería de detalles con miniaturas y pies de imagen.

## Registro de producción (ficha)

La versión anterior hablaba de una «ficha de producción» sin definir dónde estaba. Para que un lote de 36 imágenes sea verificable, crear `docs/screenshots-log.md` al producir la primera pareja, con una fila por imagen: app, vista, idioma, versión de la app, tema, escala de Windows, fecha, archivo final, peso, texto alternativo, pie y estado (pendiente / capturada / validada / publicada). Es un archivo interno: no se publica y esos rótulos no se añaden sobre la imagen.

## Piloto: CyberFeeds (retirado y pendiente de rehacer)

**Estado: rechazado y retirado del sitio; no reaprovechar.** Problemas objetivos del piloto anterior:

1. La antigua `cyberfeeds-main.png` era una composición de escaparate: fondo de escritorio azul, barra de tareas añadida y ventana reducida. Incumplía «sin barra de tareas añadida ni decoraciones», reducía el espacio de la interfaz y duplicaba el peso del PNG.
2. El artículo de demo anunciaba «CyberFeeds 1.21: a calmer way to keep up» con fecha de 2026. Era contenido fechado y versionado, que quedó desactualizado al avanzar la versión estable. **Medido el 2026-11-15: CyberFeeds va por `v1.32.0`**, once versiones por encima de la 1.21 del piloto; la advertencia queda confirmada por los datos, no solo por la razón.
3. Solo había interfaz en inglés; no existía pareja ES y `cyberfeeds.json` servía el mismo archivo en ambos idiomas, con un `alt` genérico.
4. El original `cyberfeeds-ui-source.png` (1600 x 1005) era la ventana completa, pero no 16:9: con el `object-cover` de entonces se habría recortado.

**Retirada realizada el 2026-11-07.** Se eliminaron `public/screenshots/cyberfeeds/cyberfeeds-main.png`, `public/screenshots/cyberfeeds/cyberfeeds-ui-source.png` y `scripts/compose-cyberfeeds-screenshot.mjs`; `cyberfeeds.json` volvió a `screenshot: null` y la ficha pública muestra de nuevo `feed-flow`. No queda ningún PNG de trabajo en `public/screenshots/`. Si hace falta consultar el piloto, puede recuperarse del historial de Git, pero no se reutilizará.

**Cuando se reanude:** esperar a que la interfaz de CyberFeeds se considere estable, aplicar antes las adaptaciones del sitio y capturar desde la versión estable, con datos de demo atemporales, EN y ES en la misma sesión, ventana completa sin fondo ni barra de tareas; exportar a WebP. Revisar la pareja en la ficha de la app a anchos de escritorio y móvil, además de la vista ampliada: legibilidad, integridad de la ventana, proporciones, idioma y peso. No devolver los archivos antiguos al directorio público.

Cuando las interfaces estén estables, la muestra esté validada y las adaptaciones del sitio estén aplicadas, continuar con CyberSnap, CyberPaste y CyberNotes, después con las otras seis apps publicadas y, al final, con CyberFiles y CyberGo cuando se publiquen.

## Valoración de viabilidad (actualizada el 2026-11-15)

- **Viable, pero no activo.** El formato y el peso son alcanzables (WebP sin pérdida 127 KB en la medición previa). Los cambios del sitio se concentran en tres archivos, sin dependencias nuevas, y ya existe un CMS y un `explainer` de respaldo para todas las apps publicadas.
- **Condicionante técnico. Resuelto el 2026-11-16.** Las adaptaciones del sitio ya están aplicadas: la imagen se elige por idioma, se muestra sin recorte con su pie y su ampliación accesible, y el CMS sube cada archivo a la carpeta de su app. Producir imágenes ya no obliga a rehacer nada del sitio.
- **Condicionante de calendario.** La condición principal para empezar es que las interfaces se consideren finales y solo queden cambios menores a medio plazo. Medido el 2026-11-15: **8 de las 12 apps publicaron versión en los 8 días siguientes al 7 de noviembre**. La condición está lejos de cumplirse y conviene decirlo sin rodeos: el plan se reanuda con el ritmo de releases, no antes. Hasta entonces, el plan sirve como referencia, el sitio usa bloques conceptuales y los README mantienen su placeholder.
- **Límites de realismo.** 36 imágenes finales con su par de textos es un lote largo para una sola persona: mantener el orden piloto → 3 apps → resto, con la ficha de producción como control. Las versiones cambian rápido, así que capturar cada pareja EN/ES en una sola sesión y no fijar imágenes de apps alpha o sin ficha pública. El 16:9 debe ser orientativo, no una regla que recorte ventanas reales.
- **Actualización de esta revisión (2026-11-15).** Se vuelve a comprobar todo el estado contra el código, se corrige la versión de CyberFiles (`0.6.3` → `v0.9.0`), se documenta que el sitio es bilingüe desde sus orígenes y que por tanto el archivo único es un bloqueo real, se registra el ritmo de releases de la primera quincena de noviembre como evidencia cuantificada de que la condición de inicio no se cumple, y se confirma que la advertencia sobre cadenas de versión se ha materializado (CyberFeeds `v1.21` → `v1.32.0`). Sin cambios en el alcance: 24 principales + 12 detalles = 36 imágenes. Hoy no queda ninguna captura publicada.
- **Actualización de esta revisión (2026-11-16).** Se aplican las adaptaciones del sitio que el plan exigía: `screenshot` por idioma en los datos y en el CMS, `screenshotAlt` y `screenshotCaption`, presentación de la ventana completa sin `object-cover` ni dimensiones fijas, `<figure>`/`<figcaption>` y ampliación con `<dialog>` nativo, y un aviso visible en las fichas que aclara que la ilustración es conceptual y que las capturas reales llegan pronto. Verificado con una captura de prueba en CyberClock (solo EN): la imagen sale entera, con pie y con diálogo; la ficha ES mantiene la ilustración y su aviso. El único condicionante vivo es la estabilidad de las interfaces.
