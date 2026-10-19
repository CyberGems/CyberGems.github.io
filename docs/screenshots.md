# Plan de capturas para CyberGems

Estado: plan de producción. Las nuevas capturas, el selector de imagen por idioma y la galería todavía están pendientes.

## Alcance acordado

- Preparar las mismas vistas en español e inglés, capturadas desde la interfaz de cada app.
- Primera entrega: 10 vistas principales, una por app pública, con 20 imágenes finales.
- Segunda entrega: 6 vistas de detalle, con 12 imágenes adicionales. Publicarlas cuando aporten algo distinto de la principal.
- CyberGo continúa fuera de esta tanda mientras sea un borrador.
- Empezar con CyberFeeds como piloto y revisar su pareja EN/ES antes de producir toda la tanda.

## Qué mostrar

| App | Principal, primera entrega | Detalle, segunda entrega |
| --- | --- | --- |
| CyberFeeds | Carpetas y fuentes a la izquierda, lista con artículos y lector abierto con contenido legible. | No es necesario para la primera tanda. |
| CyberSnap | Editor de anotaciones con una captura de demo, dos flechas, un recuadro y un texto breve. Mantener las herramientas visibles. | Resultado de OCR con el texto reconocido y sus controles visibles. |
| CyberPaste | Historial con texto, código, imagen, URL y archivo; carpetas y un clip fijado visibles. | Visor de un clip de imagen con su texto OCR. |
| CyberNotes | Carpetas de colores, varias notas y pestañas; una nota abierta con título, lista y un bloque de código breve. | Una nota flotante junto a la ventana principal. |
| CyberManager | Lista de procesos, columnas de consumo y gráficas de CPU/memoria con actividad real moderada. | Vista de rendimiento de discos con sus gráficas y métricas. |
| CyberViewer | Una imagen propia o autorizada grande, miniaturas de la carpeta y controles de visualización visibles. | No es necesario para la primera tanda. |
| CyberLauncher | Una búsqueda corta con resultados reconocibles y categorías visibles. Si CyberBot está activo, conservar un mensaje breve en el idioma de la toma. | No es necesario para la primera tanda. |
| CyberTray | Estantería con accesos a apps, carpetas y enlaces, categorías y el estado del sistema visible. | No es necesario para la primera tanda. |
| CyberWall | Panel de actividad con conexiones y decisiones de permiso/bloqueo reconocibles en un entorno de demo. | Aviso de conexión de una app de prueba con las opciones de decisión visibles. |
| CyberClock | Modo completo con el reloj como protagonista y los controles de sus herramientas visibles. | Una composición de dos o tres widgets flotantes reales, por ejemplo temporizador, cronómetro y calendario. |

## Datos de demostración

Usar contenido preparado para las capturas y reutilizarlo entre apps cuando tenga sentido:

- Proyecto ficticio: **Proyecto Orión / Project Orion**.
- CyberNotes: carpetas Proyecto, Ideas y Referencia; entre 6 y 10 notas. Una nota titulada Plan de la semana / Weekly plan con tres tareas y un fragmento de código sencillo.
- CyberPaste: entre 8 y 12 clips de varios tipos. Usar texto, imágenes, archivos y enlaces de demostración.
- CyberFeeds: tres carpetas, varias fuentes y entre 8 y 12 artículos. Abrir un artículo propio de contenido atemporal; evitar títulos que anuncien una versión antigua.
- CyberLauncher y CyberTray: accesos reconocibles y ordenados. Mostrar únicamente apps y archivos aptos para publicación.
- CyberViewer y CyberSnap: reutilizar una imagen propia y un pequeño documento de demo, para que la suite comparta un lenguaje visual.
- CyberManager y CyberWall: usar una sesión de prueba con nombres y rutas aptos para publicación. Las métricas deben proceder de la app y pueden variar entre tomas.
- CyberClock: nombres genéricos para alarmas, tareas o notas del calendario.

Preparar los datos antes de capturar. Revisar que no aparezcan correos personales, claves, documentos privados o rutas que identifiquen al usuario.

## Cómo obtener los originales

1. Usar la versión estable publicada de cada app y anotar su versión. Mantener esa versión en la pareja de imágenes EN/ES.
2. Elegir el tema oscuro nativo de cada app y conservar la misma escala de Windows, tamaño de ventana y disposición entre idiomas.
3. Ajustar la ventana para que el contenido importante se lea bien. Las ventanas compactas y los widgets deben conservar su tamaño y proporción naturales.
4. Capturar la ventana completa en PNG, con sus bordes y controles. Para mostrar un menú o aviso se puede usar una captura con retardo. La herramienta [Recortes de Windows](https://support.microsoft.com/es-es/windows/apps/use-snipping-tool-to-capture-screenshots) permite capturar una ventana o un área y usar retardo; también sirve para capturar la propia interfaz de CyberSnap.
5. Cambiar el idioma dentro de la app y repetir el mismo encuadre y contenido de demo. Traducir también el contenido preparado cuando sea parte importante de la escena.
6. Conservar los originales PNG por separado. El directorio público del sitio debe recibir las imágenes finales optimizadas.

## Tratamiento para el sitio

- La app debe ocupar la mayor parte de la imagen, con un margen discreto y fondo oscuro neutro cuando haga falta.
- Como punto de partida, componer las principales en 16:9 a 1920 x 1080 px, o 1600 x 900 px si el original no permite más resolución. La legibilidad tiene prioridad sobre el formato.
- El original de ventana puede tener otra proporción. Ajustar el lienzo o el marco, manteniendo toda la interfaz y sus proporciones. No estirar controles ni cortar partes de la ventana para llenar el espacio.
- Los detalles y widgets pueden conservar su proporción nativa. Mostrar dos o tres ventanas reales juntas solo cuando eso ayude a entender una función.
- Usar bordes y sombra discretos. Mantener el fondo limpio, con la atención sobre la app. Prescindir de una barra de tareas añadida, titulares incrustados o decoraciones que reduzcan el espacio de la interfaz.
- Exportar para la web en WebP de alta calidad, preferiblemente sin pérdida para interfaces. Objetivo orientativo: menos de 500 KB por imagen, siempre que el texto conserve nitidez. Mantener PNG cuando sea la mejor opción para esa captura.
- Preparar un texto alternativo y un pie de imagen breves en EN/ES, describiendo la acción visible. Guardar versión, idioma, tema y fecha en la ficha de producción, sin añadir esos rótulos sobre la imagen.

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

## Adaptaciones del sitio pendientes

Actualmente `CyberApp.screenshot` admite un único archivo compartido por ambas lenguas. `AppPage.astro` lo presenta en un marco 16:9 con `object-cover`. La primera entrega necesita:

1. Selección de captura, texto alternativo y pie según el idioma, conservando compatibilidad con la imagen compartida existente.
2. Presentación de la ventana completa, sin recorte automático, con dimensiones reales y tamaño adaptable.
3. Un control accesible para ampliar la captura y leer la interfaz a tamaño completo, especialmente en móvil.
4. Campos EN/ES correspondientes en el CMS.

La segunda entrega añadirá una pequeña galería de detalles con miniaturas y pies de imagen. El bloque conceptual puede conservarse cuando explique un flujo que la captura no muestre.

## Piloto: CyberFeeds

Ya existen `cyberfeeds-main.png` (1600 x 900) y `cyberfeeds-ui-source.png` (1600 x 1005). La interfaz en inglés es una candidata a reaprovechar tras compararla con la versión estable actual. Preparar su equivalente en español y aplicar el tratamiento común a partir del original de ventana.

Revisar la pareja en la ficha de la app a anchos de escritorio y móvil, además de la vista ampliada. Confirmar legibilidad, integridad de la ventana, proporciones, idioma y peso del archivo. Una vez validada esa muestra, continuar con CyberSnap, CyberPaste y CyberNotes, y después con las otras seis apps.
