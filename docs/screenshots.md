# Plan de capturas para CyberGems

Estado: plan de producción, **revisado el 2026-11-07**. Las nuevas capturas, el selector de imagen por idioma y la galería siguen pendientes. La única imagen publicada hoy (`cyberfeeds-main.png`) es un piloto **rechazado** que hay que rehacer; véase «Piloto: CyberFeeds».

Documento interno de `CyberGems/CyberGems.github.io`. Desde el 2026-11-07 los 24 README de la suite (12 apps × EN/ES) llevan una sección «Screenshots / Capturas» con «Coming soon...» y un comentario HTML invisible que apunta aquí. El emoji de esa sección es `🖼️`, no `📸`: `📸` es el emoji de identidad de CyberSnap y en su TOC quedarían dos cámaras seguidas. Rellenar la sección consiste en sustituir la cita, sin cambiar el título ni la entrada del TOC.

## Alcance y estado real

- La suite tiene **12 apps con README público**. En el sitio hay **10 apps publicadas** (`apps = appEntries.filter(app => app.published)`), **CyberGo** con `published: false` (alpha `0.1.0-alpha.5`) y **CyberFiles** solo con banner (`banner-apps.json`, `0.6.3`, prerelease temprana), sin ficha pública.
- Preparar las mismas vistas en español e inglés, capturadas desde la interfaz de cada app.
- **Primera entrega:** 10 vistas principales, una por app publicada, con **20 imágenes finales** EN/ES.
- **Segunda entrega:** 6 vistas de detalle, con **12 imágenes adicionales**. Publicarlas solo cuando aporten algo distinto de la principal y la función exista en la versión estable.
- **CyberFiles y CyberGo entran en el alcance**, con su vista definida más abajo, pero su producción queda **diferida**: no conviene fijar 4 imágenes EN/ES de una interfaz alpha o sin ficha pública, porque quedarían obsoletas en cuanto se publique. Se capturan cuando tengan versión estable y página en el sitio. Con todo publicado, el total sería 24 principales + 12 detalles = 36 imágenes.
- Empezar con **CyberFeeds como piloto**, rehaciendo la captura existente, y revisar su pareja EN/ES antes de producir toda la tanda.
- **Prerrequisito:** terminar antes las «Adaptaciones del sitio pendientes». Con el código actual, una captura de ventana completa se recorta y se sirve igual en ambos idiomas; producir el lote primero obligaría a rehacerlo.

## Qué mostrar

| App | Principal, primera entrega | Detalle, segunda entrega | Estado |
| --- | --- | --- | --- |
| CyberFeeds | Carpetas y fuentes a la izquierda, lista con artículos y lector abierto con contenido legible. | No es necesario para la primera tanda. | Publicada — piloto |
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

Las 6 vistas de detalle de la segunda entrega son, por ahora, las de CyberSnap, CyberPaste, CyberNotes, CyberManager, CyberWall y CyberClock. Las de las apps diferidas se decidirán al publicarlas.

## Datos de demostración

Usar contenido preparado para las capturas y reutilizarlo entre apps cuando tenga sentido:

- Proyecto ficticio: **Proyecto Orión / Project Orion**.
- CyberNotes: carpetas Proyecto, Ideas y Referencia; entre 6 y 10 notas. Una nota titulada Plan de la semana / Weekly plan con tres tareas y un fragmento de código sencillo.
- CyberPaste: entre 8 y 12 clips de varios tipos. Usar texto, imágenes, archivos y enlaces de demostración.
- CyberFeeds: tres carpetas, varias fuentes y entre 8 y 12 artículos. Abrir un artículo propio de contenido atemporal. **Evitar títulos con número de versión o fechas**: el piloto rechazado mostraba «CyberFeeds 1.21: a calmer way to keep up» con fecha de septiembre de 2026, y hoy la estable es 1.30.0.
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
6. Conservar los originales PNG por separado; **no se publican**. El directorio público del sitio recibe solo las imágenes finales optimizadas.
7. Registrar versión, idioma, tema, escala y fecha en la ficha de producción, sin añadir esos rótulos sobre la imagen.

## Tratamiento para el sitio

- La app debe ocupar la mayor parte de la imagen, con un margen discreto y fondo oscuro neutro cuando haga falta.
- Como punto de partida, componer las principales en 16:9 a 1920 x 1080 px, o 1600 x 900 px si el original no permite más resolución. La legibilidad tiene prioridad sobre el formato. **El 16:9 no es obligatorio:** si la ventana completa no cabe sin recortar, conservar su proporción nativa; el sitio debe dejar de forzar `aspect-video`.
- El original de ventana puede tener otra proporción. Ajustar el lienzo o el marco, manteniendo toda la interfaz y sus proporciones. No estirar controles ni cortar partes de la ventana para llenar el espacio.
- Los detalles y widgets pueden conservar su proporción nativa. Mostrar dos o tres ventanas reales juntas solo cuando eso ayude a entender una función.
- Usar bordes y sombra discretos. Mantener el fondo limpio, con la atención sobre la app. Prescindir de una barra de tareas añadida, titulares incrustados o decoraciones que reduzcan el espacio de la interfaz. **Contraejemplo real:** `cyberfeeds-main.png` tiene fondo de escritorio azul, barra de tareas añadida y la ventana reducida; además pesa 500 KB en PNG frente a los 245 KB del original de ventana.
- Exportar para la web en WebP de alta calidad, preferiblemente sin pérdida para interfaces. Objetivo orientativo: menos de 500 KB por imagen, siempre que el texto conserve nitidez. Medición sobre `cyberfeeds-ui-source.png` (1600 x 1005): PNG 245 KB, WebP sin pérdida 127 KB, WebP q90 99 KB. El objetivo es realista en interfaces oscuras planas; en vistas con gráficas o fotografías puede superarse, y entonces conviene WebP q90 con revisión de la nitidez del texto antes de subir el límite, no volver al PNG.
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

**Estado actual y migración.** Hoy solo existen `public/screenshots/cyberfeeds/cyberfeeds-main.png` (1600 x 900, 500 KB) y `cyberfeeds-ui-source.png` (1600 x 1005, 245 KB). `cyberfeeds.json` referencia el primero como nombre suelto y no hay pareja en español. Al rehacer el piloto se sustituirán por `main-en.webp` / `main-es.webp`; el PNG de interfaz se conserva solo como original de referencia hasta validar la pareja.

`public/admin/config.yml` define `media_folder: public/screenshots` y `public_path: /screenshots`; el campo `screenshot` es un `widget: file` que deja las subidas en la raíz de esa carpeta. Para respetar `public/screenshots/<slug>/` hay que configurar una carpeta por campo o mover/renombrar el archivo tras subirlo. `CyberApp.screenshot` acepta un nombre suelto (se resuelve dentro de `/screenshots/<slug>/`) o una ruta absoluta (lo que escribe el CMS).

## Adaptaciones del sitio pendientes

Estado comprobado el 2026-11-07 en `src/data/apps.ts`, `src/components/AppPage.astro` y `public/admin/config.yml`:

- `CyberApp.screenshot` es `string | null`: **un único archivo compartido por EN y ES**. Las 10 apps publicadas tienen `explainer`, y `AppPage.astro` ya dibuja el bloque conceptual **debajo** de la captura cuando ambos existen, así que conservarlo no requiere trabajo nuevo.
- `shotSrc` resuelve nombre suelto o ruta absoluta. El marco es `aspect-video` con `object-cover` y `width=1280 height=720` fijos: cualquier original que no sea 16:9 se recorta. El `alt` es `` `${app.name} — ${app.tagline[lang]}` ``, localizado pero genérico. No hay pie de imagen ni control para ampliar.
- El CMS (Sveltia CMS 0.216.1) tiene un único campo `screenshot` de tipo `file`, sin variantes EN/ES ni campos de texto alternativo o pie.

Trabajo previo a la primera entrega, en este orden:

1. **Datos:** `screenshot` pasa a objeto `{ en, es }` (o dos campos hermanos), conservando compatibilidad con el string actual; añadir `screenshotAlt` y `screenshotCaption` como `LocalizedText`.
2. **CMS:** campos de imagen, texto alternativo y pie en EN/ES, con la pista de la ruta por slug.
3. **`AppPage.astro`:** elegir imagen, alt y pie según `lang`; sustituir `object-cover` por una presentación de la ventana completa con dimensiones reales y tamaño adaptable; envolver en `<figure>` / `<figcaption>`; añadir ampliación accesible con `<dialog>` nativo (teclado y Escape, sin dependencias nuevas).
4. **Verificación:** en escritorio y móvil comprobar que no hay recorte, que EN y ES muestran su propia imagen y que el bloque conceptual sigue debajo.
5. Solo entonces producir el lote completo.

La segunda entrega añadirá una pequeña galería de detalles con miniaturas y pies de imagen.

## Registro de producción (ficha)

La versión anterior hablaba de una «ficha de producción» sin definir dónde estaba. Para que un lote de 36 imágenes sea verificable, crear `docs/screenshots-log.md` al producir la primera pareja, con una fila por imagen: app, vista, idioma, versión de la app, tema, escala de Windows, fecha, archivo final, peso, texto alternativo, pie y estado (pendiente / capturada / validada / publicada). Es un archivo interno: no se publica y esos rótulos no se añaden sobre la imagen.

## Piloto: CyberFeeds (rehacer)

**Estado: rechazado, no reaprovechar.** Problemas objetivos de los archivos actuales:

1. `cyberfeeds-main.png` es una composición de escaparate: fondo de escritorio azul, barra de tareas añadida y ventana reducida. Incumple «sin barra de tareas añadida ni decoraciones», reduce el espacio de la interfaz y duplica el peso del PNG.
2. El artículo de demo anuncia «CyberFeeds 1.21: a calmer way to keep up» con fecha de 2026. Es contenido fechado y versionado; la estable actual es 1.30.0.
3. Solo hay interfaz en inglés; no existe pareja ES y `cyberfeeds.json` sirve el mismo archivo en ambos idiomas, con un `alt` genérico.
4. El original `cyberfeeds-ui-source.png` (1600 x 1005) sí es la ventana completa, pero no es 16:9: con el `object-cover` actual se recortaría.

**A hacer:** capturar de nuevo desde la versión estable, con datos de demo atemporales, EN y ES en la misma sesión, ventana completa sin fondo ni barra de tareas; exportar a WebP y validar con las adaptaciones del sitio ya aplicadas. Revisar la pareja en la ficha de la app a anchos de escritorio y móvil, además de la vista ampliada: legibilidad, integridad de la ventana, proporciones, idioma y peso. Mantener los dos PNG antiguos solo como referencia hasta validar el piloto; entonces retirar `cyberfeeds-main.png` de los datos y del directorio público.

Una vez validada la muestra, continuar con CyberSnap, CyberPaste y CyberNotes, después con las otras seis apps publicadas y, al final, con CyberFiles y CyberGo cuando se publiquen.

## Valoración de viabilidad (2026-11-07)

- **Viable.** El formato y el peso son alcanzables (WebP sin pérdida 127 KB en el original real). Los cambios del sitio se concentran en tres archivos, sin dependencias nuevas, y ya existe un CMS y un `explainer` de respaldo para todas las apps publicadas.
- **Condicionante.** Las adaptaciones del sitio son prerrequisito, no trabajo paralelo; producir imágenes antes obligaría a repetirlas.
- **Límites de realismo.** 36 imágenes finales con su par de textos es un lote largo para una sola persona: mantener el orden piloto → 3 apps → resto, con la ficha de producción como control. Las versiones cambian rápido, así que capturar cada pareja EN/ES en una sola sesión y no fijar imágenes de apps alpha o sin ficha pública. El 16:9 debe ser orientativo, no una regla que recorte ventanas reales.
- **Correcciones de esta revisión.** Se incorporan CyberFiles y CyberGo (diferidas), se rechaza explícitamente el piloto de CyberFeeds, se documenta el estado real del código y del CMS, se define la ficha de producción, se concretan las migraciones de nombres y se registra que los 24 README ya tienen la sección con placeholder.
