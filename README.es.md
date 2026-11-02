<p align="center">
  <a href="./README.md">English</a> · Español
</p>

<div align="center">

# 💎 Sitio web de CyberGems

**cybergems.org — Sitio web oficial de la suite CyberGems.**

*Aplicaciones de Windows de alta calidad y código abierto — Gratis, sin anuncios, sin rastreo.*

[![Website](https://img.shields.io/badge/Website-cybergems.org-0a66c2?style=for-the-badge&logo=google-chrome&logoColor=white)](https://cybergems.org)
[![Astro](https://img.shields.io/badge/Astro-5.12-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge&logo=gnu&logoColor=white)](https://www.gnu.org/licenses/gpl-3.0)

![Bilingual](https://img.shields.io/badge/Bilingual-EN%20%2F%20ES-00b894?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Web-0078D6?style=flat-square&logo=google-chrome&logoColor=white)
![No Tracking](https://img.shields.io/badge/Privacy-No%20Tracking-success?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white)

</div>

---

### ✨ Acerca de

> **CyberGems** crea aplicaciones de Windows gratuitas y de código abierto que respetan tu privacidad. Las apps usan almacenamiento local y no tienen telemetría oculta. Las funciones en línea opcionales siguen bajo tu control. Todos los proyectos tienen licencia **GPLv3**.

Este repositorio alimenta **[cybergems.org](https://cybergems.org)** — la página de inicio oficial de la suite. Muestra las apps publicadas, las páginas de detalle por app, un changelog agregado entre repos y documentación auto-sincronizada, con navegación del sitio en inglés y español. Los artículos wiki usan las traducciones al español disponibles y muestran su idioma de origen.

🌐 **Sitio en vivo:** [cybergems.org](https://cybergems.org) &nbsp;|&nbsp; 👨‍💻 **Org:** [github.com/CyberGems](https://github.com/CyberGems) &nbsp;|&nbsp; 📦 **Repo del perfil:** [CyberGems/CyberGems](https://github.com/CyberGems/CyberGems)

---

### 🖥️ Qué hace el sitio

| Área | Ruta | Descripción |
|---|---|---|
| **Inicio** | `/` (EN) · `/es/` (ES) | Vitrina del planeta, cuadrícula de la suite buscable con filtros por tarea, principios y enlaces de descarga |
| **Páginas de app** | `/apps/[slug]` · `/es/apps/[slug]` | Seis destacados principales, funciones y casos de uso expandibles, explicaciones conceptuales o capturas opcionales, enlaces de descarga y documentación |
| **Changelog** | `/changelog` · `/es/changelog` | Últimas versiones agregadas desde GitHub Releases de toda la suite |
| **Docs** | `/docs` · `/docs/[app]` · `/es/docs/...` | Guías wiki sincronizadas en tiempo de compilación, con menú móvil plegable, barra lateral de escritorio y etiquetas de idioma del artículo |

La página de inicio presenta un planeta circular recortado con resplandor atmosférico, etiquetas de apps y barridos de luz cian/violeta a lo largo de su borde. Una pista giratoria y unos iconos contrarrotatorios comparten el centro del planeta, con una separación fija respecto a su radio adaptable. Los ángulos se calculan a partir del número de apps publicadas, manteniendo los iconos erguidos y uniformemente espaciados sin rutas de movimiento CSS. Las preferencias de movimiento reducido muestran una disposición estática.

El campo de estrellas neutro del encabezado usa tres capas SVG con parpadeo suave, paralaje al puntero y estrellas más brillantes cerca del cursor. Permanece estático sin JavaScript o con el movimiento reducido activado, ignora los gestos táctiles y se pausa fuera del viewport o en una pestaña oculta. El cielo no añade descargas de imágenes ni dependencias.

Todas las páginas son estáticas, amigables con SEO y se sirven desde un dominio propio. El sitio usa analíticas agregadas de Umami y respeta las señales Do Not Track y Global Privacy Control; consulta la [página de privacidad](https://cybergems.org/privacy/).

---

### 🛠️ Stack tecnológico

<div align="center">

![Astro](https://img.shields.io/badge/Astro-5.12-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Marked](https://img.shields.io/badge/Marked-Markdown-black?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)

</div>

* **Framework:** [Astro 5](https://astro.build) con enrutado basado en archivos
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com) vía `@tailwindcss/vite`, con controles daisyUI 5 prefijados y el tema oscuro personalizado de CyberGems
* **Lenguaje:** TypeScript (`astro.config.mjs`, `src/data/*`, `src/components/*`)
* **Markdown:** [`marked`](https://github.com/markedjs/marked) para el renderizado de wikis
* **Alojamiento:** GitHub Pages (dominio propio `cybergems.org`), también compatible con Cloudflare Pages

---

### 📁 Estructura del proyecto

```
.
├── public/
│   ├── favicon.svg
│   ├── icons/apps/<slug>.png # iconos canónicos de las apps sincronizados en tiempo de compilación
│   ├── screenshots/<slug>/   # capturas opcionales por app (servidas tal cual)
│   └── wikis/<slug>/         # activos de wiki copiados en tiempo de compilación
├── wikis/<slug>/             # repos wiki clonados (gitignored, generados)
├── scripts/sync-app-icons.mjs # obtiene los iconos oficiales de cada repo de app
├── scripts/fetch-wikis.mjs   # clona cada <App>.wiki.git antes de dev/build
├── src/
│   ├── components/Landing.astro
│   ├── data/
│   │   ├── apps/             # un JSON por app — editable en el CMS (/admin)
│   │   ├── apps.ts           # tipos + loader para los archivos JSON
│   │   ├── ui.json           # cadenas de UI compartidas (EN/ES) — editables en el CMS
│   ├── admin/                # public/admin — panel Decap CMS
│   └── pages/
│       ├── index.astro       # → /
│       ├── es/index.astro    # → /es/
│       ├── apps/[slug].astro # → /apps/* + /es/apps/*
│       ├── changelog.astro   # → /changelog + /es/changelog
│       └── docs/             # → /docs + /docs/[app]
├── astro.config.mjs          # site: https://cybergems.org
└── .github/workflows/deploy.yml
```

---

### 🧩 Modelo de contenido

* **`src/data/apps/`** — un archivo JSON por app (`published`, `slug`, `name`, `emoji`, `accent`, `stack`, `license`, `tagline`/`description`/`features` bilingües, `repo`, `wiki`, `winget` opcional, `screenshot`). Las capturas son opcionales: define `screenshot` con un archivo dentro de `/public/screenshots/<slug>/` (o una ruta absoluta `/screenshots/...`, como la escribe el CMS) o déjalo en `null` para renderizar su explicación conceptual, cuando esté configurada, o el marcador de posición de gradiente.
* **Publicación:** toda app pública debe definir explícitamente `published: true`. Si falta o es false, se considera borrador. El CMS define las entradas nuevas como false por defecto. Los archivos fuente de borradores permanecen disponibles para edición, mientras que las páginas de app, la documentación, la navegación, los releases, las imágenes sociales, los activos wiki generados, los iconos de app y `suite.json` los excluyen. `npm run build` audita la salida completa en busca de referencias a borradores antes del despliegue.
* **`src/data/catalog.ts`** define las etiquetas de tarea y los grupos de descubrimiento de las diez apps. Actualiza este mapeo de presentación al añadir una app.
* **`src/data/ui.json`** — cadenas de UI compartidas para navegación, encabezado, secciones y pie de página (`en` / `es`), editables en el CMS.
* **`src/pages/`** — `/` (inglés) y `/es/` (español), más `/apps/[slug]` páginas por app en ambos idiomas, más `changelog` y `docs`.
* **`public/screenshots/`** contiene capturas estáticas opcionales. Se usa una explicación conceptual configurada hasta que se aporte una captura real.
* **Producción de capturas:** el [plan de captura bilingüe](docs/screenshots.md) define las escenas requeridas, el contenido de demostración, la preparación de imágenes y el trabajo pendiente de galería localizada.
* **`wikis/` + `public/wikis/`** — generados; no editar a mano (ver abajo).

Para actualizar una app: edita su JSON en `src/data/apps/` o usa el CMS visual en `/admin` — la página de inicio, las páginas de app, el changelog y los docs lo recogen automáticamente.

---

### 🎛️ Edición visual (Sveltia CMS)

Hay un gestor de contenido disponible en **`/admin`** (`https://cybergems.org/admin`):

* Edita los archivos `src/data/apps/*.json` y sube capturas a `public/screenshots/`
* También editable: `❓ FAQs` (`src/data/faqs.json`), `⚙️ Ajustes` (enlaces de donación + cripto en `src/data/site.json`), `🌐 Cadenas de UI` (textos de navegación, encabezado y pie en `src/data/ui.json`) y `📄 Páginas` (Acerca de, Privacidad, texto de descarga en `src/data/pages.json`)
* Cada guardado es un commit a `main` → el flujo de despliegue reconstruye el sitio automáticamente
* Inicio de sesión: **Sign In with Token** — pega un PAT de granularidad fina ([crea uno aquí](https://github.com/settings/tokens?type=beta)) con acceso a este repo y `Contents: Read and write`. Sin OAuth App, sin servidor de autenticación. Solo las cuentas con acceso de escritura al repo pueden iniciar sesión.
* Desarrollo local: Sveltia CMS tiene un flujo de trabajo local integrado — no necesita servidor proxy

---

### ⚡ Comandos

| Comando           | Acción                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Instalar dependencias                        |
| `npm run dev`     | Iniciar el servidor de desarrollo local en `localhost:4321` |
| `npm run build`   | Compilar el sitio de producción en `./dist/` |
| `npm run preview` | Previsualizar la compilación de producción localmente |
| `npm run sync-icons` | Actualizar los iconos de las apps sin una compilación completa |

> `predev` y `prebuild` sincronizan los iconos y wikis automáticamente. No se necesita ningún paso manual de copia.

---

### 🎨 Sincronización de iconos de app

Cada página de app y el banner README generado leen el mismo archivo en `public/icons/apps/<slug>.png`. Antes del desarrollo local y de las compilaciones de producción, `scripts/sync-app-icons.mjs` actualiza esos archivos desde el PNG oficial rastreado en cada repositorio de app.

Las compilaciones locales prefieren los repos hermanos bajo `C:\CyberGems`. La CI descarga los archivos canónicos directamente desde GitHub. Todo candidato debe ser un PNG cuadrado válido de al menos 128×128 píxeles; las descargas fallidas o corruptas dejan intacto el respaldo existente. El flujo de Pages por hora significa que un icono enviado a un repositorio de app llega tanto a su hero web como al banner README sin otro commit de README ni del sitio.

| App | Icono canónico |
|---|---|
| CyberClock | `master: src/assets/images/icon.png` |
| CyberFeeds | `main: resources/icon.png` |
| CyberGo | `main: public/icon.png` |
| CyberLauncher | `main: public/icon.png` |
| CyberManager | `main: src/CyberManager.UI/Assets/CyberManager.png` |
| CyberNotes | `main: public/icon.png` |
| CyberPaste | `main: src-tauri/icons/icon.png` |
| CyberSnap | `main: src/CyberSnap/Assets/CyberSnap_square.png` |
| CyberTray | `main: public/icon.png` |
| CyberViewer | `main: assets/icon.png` |
| CyberWall | `master: src/CyberWall.UI/Assets/CyberWall.png` |

---

### 📚 Sincronización de documentación

Las wikis viven como repos git separados (`https://github.com/CyberGems/<slug>.wiki.git`). En cada `dev` y `build`:

1. `scripts/fetch-wikis.mjs` lee los slugs publicados desde `src/data/apps/*.json` y elimina las copias generadas de wikis en borrador sin cambiar los repos fuente hermanos
2. Usa el repositorio hermano `<App>.wiki` cuando existe localmente (por ejemplo `../CyberViewer.wiki`); en CI, clona de forma superficial la wiki desde GitHub en `wikis/<slug>/`
3. Copia los activos que no son markdown en `public/wikis/<slug>/` para que las imágenes referenciadas en markdown se sirvan como archivos estáticos
4. Astro renderiza el markdown vía `marked` en rutas `/docs` a través de los componentes compartidos `DocsPage.astro` y `DocsNav.astro`
5. Las rutas en español prefieren artículos `*-es.md` coincidentes cuando están disponibles. De lo contrario, la guía muestra un aviso en inglés. Las URLs de wiki existentes siguen disponibles; las traducciones comparten una entrada de navegación

Para actualizar las wikis localmente sin una compilación completa: `node scripts/fetch-wikis.mjs`.

---

### 🚀 Despliegue

* **Salida:** sitio estático en `dist/` (`astro build`)
* **CI:** `.github/workflows/deploy.yml`: `withastro/action@v3` al hacer push a `main`, más una compilación programada por hora que actualiza iconos, releases y wikis, más `workflow_dispatch`
* **Alojamiento:** GitHub Pages con dominio propio `cybergems.org` (también listo para Cloudflare Pages). Sin servidor, sin runtime — solo activos estáticos.

---

### 📄 Licencia

El sitio web de CyberGems se distribuye bajo los términos de la Licencia Pública General GNU v3.0. Consulta [`LICENSE`](LICENSE) para el texto completo de la licencia.

Copyright (C) 2026 CyberGems

---

### 🤝 Contribuir y soporte

Todas las apps de CyberGems son **GPLv3** — gratis para siempre. ¡Son bienvenidas las contribuciones, los reportes de errores y las estrellas!

* ⭐ Dale una estrella a este repo o a cualquier app que te guste — ayuda mucho
* 🐛 Abre un issue si encuentras un error
* 🔀 Los PR son bienvenidos — mantén los cambios enfocados y las cadenas bilingües sincronizadas (`src/data/apps/` + `src/data/ui.json`)

<div align="center">

**[🌐 cybergems.org](https://cybergems.org) • [📦 Todos los repositorios](https://github.com/CyberGems?tab=repositories) • [💎 Repo del perfil](https://github.com/CyberGems/CyberGems)**

*Gratis • Sin anuncios • Sin rastreo • Código abierto*

</div>
