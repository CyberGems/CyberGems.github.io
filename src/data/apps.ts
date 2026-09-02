export type Lang = 'en' | 'es';

export interface LocalizedText {
  en: string;
  es: string;
}

export interface CyberApp {
  /** URL slug, e.g. "cybersnap" -> /apps/cybersnap */
  slug: string;
  name: string;
  emoji: string;
  /** Hex accent color used for gradients & highlights */
  accent: string;
  /** Tech stack label */
  stack: string;
  license: string;
  tagline: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
  repo: string;
  /** GitHub wiki URL (empty string if the repo has no wiki) */
  wiki: string;
  /** winget package id, if published */
  winget?: string;
  /** Path (relative to /screenshots/) of the app screenshot, or null to show the placeholder */
  screenshot: string | null;
}

export const apps: CyberApp[] = [
  {
    slug: 'cybersnap',
    name: 'CyberSnap',
    emoji: '📸',
    accent: '#00F2FF',
    stack: 'C# · WPF · .NET 9',
    license: 'GPLv3',
    tagline: {
      en: 'Capture anything. Edit everything. Share anywhere.',
      es: 'Captura cualquier cosa. Edítalo todo. Comparte donde quieras.',
    },
    description: {
      en: 'A full-featured screenshot, annotation, OCR, translation, screen-recording and sharing tool for Windows. A floating capture widget, a rich annotation editor, multilingual text recognition, local full-text search and multi-destination upload — all in one .NET 9 / WPF application.',
      es: 'Una herramienta completa de captura de pantalla, anotación, OCR, traducción, grabación de pantalla y compartido para Windows. Widget de captura flotante, editor de anotaciones rico, reconocimiento de texto multilingüe, búsqueda local de texto completo y subida multi-destino — todo en una sola aplicación .NET 9 / WPF.',
    },
    features: [
      { en: 'Area, window, full screen & scroll capture', es: 'Captura de área, ventana, pantalla completa y desplazamiento' },
      { en: 'Screen recording to MP4 or GIF with built-in trimming', es: 'Grabación de pantalla a MP4 o GIF con recorte integrado' },
      { en: 'Annotation editor with shapes, text, rulers and frames', es: 'Editor de anotaciones con formas, texto, reglas y marcos' },
      { en: 'Multilingual OCR (Tesseract) with integrated translation', es: 'OCR multilingüe (Tesseract) con traducción integrada' },
      { en: 'Local gallery with full-text search across OCR content', es: 'Galería local con búsqueda de texto completo sobre el OCR' },
      { en: 'Upload to FTP, SFTP, S3, ImgBB, Imgur, Webhook & CyberSnap Share', es: 'Subida a FTP, SFTP, S3, ImgBB, Imgur, Webhook y CyberSnap Share' },
    ],
    repo: 'https://github.com/CyberGems/CyberSnap',
    wiki: 'https://github.com/CyberGems/CyberSnap/wiki',
    screenshot: null,
  },
  {
    slug: 'cybermanager',
    name: 'CyberManager',
    emoji: '💻',
    accent: '#4FC3F7',
    stack: 'C# · WPF · .NET 10',
    license: 'GPLv3',
    tagline: {
      en: 'Ultra-light task manager that stays smooth at 3000+ processes.',
      es: 'Gestor de tareas ultraligero que sigue fluido con más de 3000 procesos.',
    },
    description: {
      en: 'An ultra-lightweight, virtualized task manager for Windows built as a premium alternative to the Task Manager. It handles machines with 3000+ processes at 144fps with zero lag, using native Windows NT API calls, and features real-time CPU/RAM sparklines and a cyberpunk glassmorphic interface.',
      es: 'Un gestor de tareas ultraligero y virtualizado para Windows, creado como alternativa premium al Administrador de tareas. Maneja máquinas con más de 3000 procesos a 144fps sin lag, usando llamadas nativas a la API NT de Windows, con sparklines de CPU/RAM en tiempo real e interfaz glassmórfica cyberpunk.',
    },
    features: [
      { en: 'Virtualized grid — 3000+ processes at 144fps, zero lag', es: 'Cuadrícula virtualizada — más de 3000 procesos a 144fps, sin lag' },
      { en: 'NT-native engine (NtQuerySystemInformation, no WMI overhead)', es: 'Motor NT-nativo (NtQuerySystemInformation, sin sobrecarga de WMI)' },
      { en: 'Adaptive CPU/RAM heatmap with live sparklines', es: 'Mapa de calor adaptativo de CPU/RAM con sparklines en vivo' },
      { en: 'Full process control: end tree, suspend/resume, priority', es: 'Control total de procesos: fin de árbol, suspender/reanudar, prioridad' },
      { en: 'System Information window with 4 tabs', es: 'Ventana de Información del sistema con 4 pestañas' },
      { en: 'System tray, global hotkey, 3 themes, bilingual EN/ES', es: 'Bandeja del sistema, hotkey global, 3 temas, bilingüe EN/ES' },
    ],
    repo: 'https://github.com/CyberGems/CyberManager',
    wiki: 'https://github.com/CyberGems/CyberManager/wiki',
    screenshot: null,
  },
  {
    slug: 'cybertray',
    name: 'CyberTray',
    emoji: '⚡',
    accent: '#FFB74D',
    stack: 'Electron · TypeScript',
    license: 'GPLv3',
    tagline: {
      en: 'A cyberpunk shelf that slides out from your screen edge — launch anything in milliseconds.',
      es: 'Una estantería cyberpunk que se desliza desde el borde de tu pantalla: lanza cualquier cosa en milisegundos.',
    },
    description: {
      en: 'A cyberpunk-themed system tray shortcut launcher and dock for Windows. CyberTray provides a sleek, animated shelf that slides out from the top or bottom of the screen, letting you organize, search and launch applications, files and URLs — plus system monitoring, process management and a secure file vault.',
      es: 'Un lanzador de accesos y dock para la bandeja del sistema con estética cyberpunk. CyberTray ofrece una estantería animada que se desliza desde la parte superior o inferior de la pantalla para organizar, buscar y lanzar aplicaciones, archivos y URLs — además de monitoreo del sistema, gestión de procesos y una bóveda de archivos segura.',
    },
    features: [
      { en: 'Animated shelf with search, categories and drag & drop import', es: 'Estantería animada con búsqueda, categorías e importación por arrastre' },
      { en: 'Cyber-Handle bar, hot corners and global hotkey (Alt+T)', es: 'Barra Cyber-Handle, esquinas activas y hotkey global (Alt+T)' },
      { en: 'Real-time RAM, CPU, disk and VRAM telemetry', es: 'Telemetría en tiempo real de RAM, CPU, disco y VRAM' },
      { en: 'Process viewer with kill functionality', es: 'Visor de procesos con capacidad de finalizarlos' },
      { en: 'PIN-protected Cyber-Vault with desktop sweep', es: 'Cyber-Vault protegido con PIN y barrido del escritorio' },
      { en: '5 neon themes, custom backgrounds, multi-monitor', es: '5 temas neón, fondos personalizados, multi-monitor' },
    ],
    repo: 'https://github.com/CyberGems/CyberTray',
    wiki: 'https://github.com/CyberGems/CyberTray/wiki',
    screenshot: null,
  },
  {
    slug: 'cyberfeeds',
    name: 'CyberFeeds',
    emoji: '📢',
    accent: '#29B6F6',
    stack: 'Electron · React · TypeScript',
    license: 'GPLv3',
    tagline: {
      en: 'A local-first RSS & Atom reader built for speed, privacy and clean reading.',
      es: 'Un lector RSS y Atom local-first creado para la velocidad, la privacidad y la lectura limpia.',
    },
    description: {
      en: 'A performance-first, full-featured RSS/Atom feed reader. Subscribe to feeds, read articles with full-content extraction, manage your reading flow with star/read/unread/trash, and get smart notifications when new articles are published — all backed by a local SQLite database.',
      es: 'Un lector de feeds RSS/Atom completo y orientado al rendimiento. Suscríbete a feeds, lee artículos con extracción de contenido completo, gestiona tu lectura con favoritos/leído/no leído/papelera y recibe notificaciones inteligentes cuando se publiquen artículos — todo respaldado por una base de datos SQLite local.',
    },
    features: [
      { en: 'RSS, Atom, XML and native Reddit feeds', es: 'RSS, Atom, XML y feeds de Reddit nativos' },
      { en: 'Full-content extraction via worker threads', es: 'Extracción de contenido completo mediante worker threads' },
      { en: 'Smart notifications with keyword filtering and snooze', es: 'Notificaciones inteligentes con filtrado por palabras y posposición' },
      { en: 'Star/read/unread/trash with virtualized lists', es: 'Favoritos/leído/no leído/papelera con listas virtualizadas' },
      { en: 'OPML import/export with folder structure preserved', es: 'Importación/exportación OPML conservando las carpetas' },
      { en: 'Local SQLite database — no cloud, no accounts', es: 'Base de datos SQLite local — sin nube, sin cuentas' },
    ],
    repo: 'https://github.com/CyberGems/CyberFeeds',
    wiki: 'https://github.com/CyberGems/CyberFeeds/wiki',
    screenshot: null,
  },
  {
    slug: 'cybernotes',
    name: 'CyberNotes',
    emoji: '📝',
    accent: '#81C784',
    stack: 'Electron · React · TypeScript',
    license: 'GPLv3',
    tagline: {
      en: 'Privacy-focused notes with rich text and bcrypt-protected local storage.',
      es: 'Notas centradas en la privacidad, con texto enriquecido y almacenamiento local protegido con bcrypt.',
    },
    description: {
      en: 'A modern, privacy-focused desktop note-taking application with a cyberpunk aesthetic. Rich editing, powerful organization and rock-solid security — all 100% offline, stored locally with SQL.js (SQLite WASM). Your notes never leave your device.',
      es: 'Una aplicación moderna de notas para escritorio, centrada en la privacidad y con estética cyberpunk. Edición rica, organización potente y seguridad sólida — todo 100% sin conexión, almacenado localmente con SQL.js (SQLite WASM). Tus notas nunca salen de tu dispositivo.',
    },
    features: [
      { en: 'TipTap rich editor with markdown shortcuts and code blocks', es: 'Editor rico TipTap con atajos markdown y bloques de código' },
      { en: 'Folders with icons & colors, multi-tabs, drag & drop', es: 'Carpetas con iconos y colores, multi-pestañas, arrastrar y soltar' },
      { en: 'Master password (bcrypt) with auto-lock and privacy shield', es: 'Contraseña maestra (bcrypt) con bloqueo automático y escudo de privacidad' },
      { en: 'Instant full-text search across titles and content', es: 'Búsqueda instantánea de texto completo en títulos y contenido' },
      { en: 'Autosave, session restore, global hotkey and system tray', es: 'Autoguardado, restauración de sesión, hotkey global y bandeja del sistema' },
      { en: '6 themes, custom backgrounds, glass effects, UI scaling', es: '6 temas, fondos personalizados, efectos glass y escala de la interfaz' },
    ],
    repo: 'https://github.com/CyberGems/CyberNotes',
    wiki: 'https://github.com/CyberGems/CyberNotes/wiki',
    screenshot: null,
  },
  {
    slug: 'cyberpaste',
    name: 'CyberPaste',
    emoji: '⚡',
    accent: '#FFD54F',
    stack: 'Tauri · React · Rust',
    license: 'GPLv3',
    tagline: {
      en: 'Recall anything you have ever copied — text, code, images, files — 100% local.',
      es: 'Recupera todo lo que hayas copiado — texto, código, imágenes, archivos — 100% local.',
    },
    description: {
      en: 'A beautiful, privacy-focused clipboard history manager for Windows. CyberPaste stores everything you copy — text, code, images, files, URLs — in a local SQLite database, so you can recall any clip at any time. Search, organize, pin, edit and paste instantly, with optional AI-powered actions.',
      es: 'Un gestor de historial del portapapeles elegante y centrado en la privacidad para Windows. CyberPaste guarda todo lo que copias — texto, código, imágenes, archivos, URLs — en una base de datos SQLite local, para que recuperes cualquier clip en cualquier momento. Busca, organiza, fija, edita y pega al instante, con acciones de IA opcionales.',
    },
    features: [
      { en: 'Rich content: text, code (syntax highlighting), images (OCR), HTML, RTF, files, URLs', es: 'Contenido rico: texto, código (resaltado de sintaxis), imágenes (OCR), HTML, RTF, archivos, URLs' },
      { en: 'Instant full-text search with quick filter chips', es: 'Búsqueda instantánea de texto completo con filtros rápidos' },
      { en: 'AI actions — summarize, translate, explain code — with any OpenAI-compatible provider', es: 'Acciones de IA — resumir, traducir, explicar código — con cualquier proveedor compatible con OpenAI' },
      { en: 'Folders, favorites, bulk management and dual view modes', es: 'Carpetas, favoritos, gestión por lotes y dos modos de vista' },
      { en: 'Global hotkey, auto-paste injection, multi-monitor aware', es: 'Hotkey global, auto-pegado, consciente de multi-monitor' },
      { en: 'Local SQLite — zero analytics, zero telemetry', es: 'SQLite local — cero analíticas, cero telemetría' },
    ],
    repo: 'https://github.com/CyberGems/CyberPaste',
    wiki: 'https://github.com/CyberGems/CyberPaste/wiki',
    winget: 'CyberGems.CyberPaste',
    screenshot: null,
  },
  {
    slug: 'cyberwall',
    name: 'CyberWall',
    emoji: '🛡️',
    accent: '#E57373',
    stack: 'C# · WPF · .NET 10',
    license: 'GPLv3',
    tagline: {
      en: 'A per-application firewall powered by the WFP kernel engine. Default deny, real-time prompts.',
      es: 'Un firewall por aplicación impulsado por el motor kernel WFP. Denegación por defecto, avisos en tiempo real.',
    },
    description: {
      en: 'A modern, high-performance per-application firewall for Windows powered by the Windows Filtering Platform (WFP). Built on a strict default-deny (whitelist) architecture, CyberWall intercepts unknown network connections and shows interactive real-time prompts per executable — turning your PC into an impenetrable network fortress.',
      es: 'Un firewall por aplicación moderno y de alto rendimiento para Windows, impulsado por la Windows Filtering Platform (WFP). Con una arquitectura estricta de denegación por defecto (lista blanca), CyberWall intercepta las conexiones de red desconocidas y muestra avisos interactivos en tiempo real por ejecutable — convirtiendo tu PC en una fortaleza de red inexpugnable.',
    },
    features: [
      { en: 'Strict default-deny (whitelist) architecture', es: 'Arquitectura estricta de denegación por defecto (lista blanca)' },
      { en: 'Real-time WFP drop interception at the kernel layer', es: 'Intercepción de descartes WFP en tiempo real a nivel kernel' },
      { en: 'Interactive per-executable connection prompts', es: 'Avisos interactivos de conexión por ejecutable' },
      { en: 'Stops spyware, ransomware, C2 beacons and reverse shells', es: 'Detiene spyware, ransomware, beacons C2 y shells inversas' },
      { en: 'Native WFP — no third-party drivers, no BSOD risk', es: 'WFP nativo — sin drivers de terceros, sin riesgo de BSOD' },
      { en: 'Persistent per-app rules with auto-block timeouts', es: 'Reglas persistentes por aplicación con bloqueo automático por tiempo' },
    ],
    repo: 'https://github.com/CyberGems/CyberWall',
    wiki: 'https://github.com/CyberGems/CyberWall/wiki',
    screenshot: null,
  },
  {
    slug: 'cyberviewer',
    name: 'CyberViewer',
    emoji: '💫',
    accent: '#BA68C8',
    stack: 'Electron · JavaScript',
    license: 'MIT',
    tagline: {
      en: 'A fast, lightweight image viewer with the essential editing tools built in.',
      es: 'Un visor de imágenes rápido y ligero con las herramientas de edición esenciales integradas.',
    },
    description: {
      en: 'A fast, lightweight Windows image viewer — open, browse folders, zoom/pan and perform light edits (rotate, crop, resize, adjust colors). Built with Electron and vanilla JavaScript, it delivers instant loading, smooth browsing and a sleek, distraction-free interface.',
      es: 'Un visor de imágenes rápido y ligero para Windows: abre, navega por carpetas, haz zoom/pan y realiza ediciones ligeras (rotar, recortar, redimensionar, ajustar colores). Construido con Electron y JavaScript vanilla, ofrece apertura instantánea, navegación fluida y una interfaz elegante sin distracciones.',
    },
    features: [
      { en: 'Lightning-fast open — custom streaming protocol, no full RAM load', es: 'Apertura ultrarrápida — protocolo de streaming propio, sin cargar todo en RAM' },
      { en: 'Folder browsing with lazy-loading thumbnails', es: 'Navegación de carpetas con miniaturas de carga diferida' },
      { en: 'Zoom 5%–2000%, pan, animated GIF playback', es: 'Zoom 5%–2000%, paneo, reproducción de GIF animados' },
      { en: 'Rotate, crop, resize, flip and color adjustments with live preview', es: 'Rotar, recortar, redimensionar, voltear y ajustes de color con vista previa en vivo' },
      { en: 'Fullscreen immersive mode and slideshow with loop', es: 'Modo inmersivo a pantalla completa y diapositivas con bucle' },
      { en: 'System tray, auto-start, global hotkey, Explorer context menu', es: 'Bandeja del sistema, auto-inicio, hotkey global, menú contextual del Explorer' },
    ],
    repo: 'https://github.com/CyberGems/CyberViewer',
    wiki: 'https://github.com/CyberGems/CyberViewer/wiki',
    screenshot: null,
  },
  {
    slug: 'cyberlauncher',
    name: 'CyberLauncher',
    emoji: '🚀',
    accent: '#FF8A65',
    stack: 'Electron · React · TypeScript',
    license: 'GPLv3',
    tagline: {
      en: 'Replace the Start Menu: type to search, hotkey to summon, click to launch.',
      es: 'Reemplaza el menú Inicio: escribe para buscar, invócalo con una tecla y lanza con un clic.',
    },
    description: {
      en: 'A full-screen, glassmorphic application launcher for Windows. CyberLauncher reimagines app launching — type to search, hotkey to summon, click to launch — with fuzzy search, system-wide file indexing, UWP support and a sleek cyberpunk interface.',
      es: 'Un lanzador de aplicaciones a pantalla completa y glassmórfico para Windows. CyberLauncher reinventa el lanzamiento de apps — escribe para buscar, invócalo con una tecla, lanza con un clic — con búsqueda difusa, indexación de archivos en todo el sistema, soporte UWP y una interfaz cyberpunk elegante.',
    },
    features: [
      { en: 'Full-screen, keyboard-driven launcher with instant fuzzy search', es: 'Lanzador a pantalla completa guiado por teclado con búsqueda difusa instantánea' },
      { en: 'Hybrid indexing engine — system-wide file search across all drives', es: 'Motor de indexación híbrido — búsqueda de archivos en todo el sistema y todas las unidades' },
      { en: 'UWP / Microsoft Store apps supported natively', es: 'Apps UWP / Microsoft Store soportadas de forma nativa' },
      { en: 'Color-coded categories, favorites bar, taskbar pins', es: 'Categorías con colores, barra de favoritos, fijados en la barra' },
      { en: 'Console mode — type > to run shell commands directly', es: 'Modo consola — escribe > para ejecutar comandos shell directamente' },
      { en: 'Hot corners, per-app global shortcuts, multi-monitor', es: 'Esquinas activas, atajos globales por app, multi-monitor' },
    ],
    repo: 'https://github.com/CyberGems/CyberLauncher',
    wiki: 'https://github.com/CyberGems/CyberLauncher/wiki',
    screenshot: null,
  },
  {
    slug: 'cyberclock',
    name: 'CyberClock',
    emoji: '🕐',
    accent: '#90CAF9',
    stack: 'Tauri · Rust',
    license: 'GPLv3',
    tagline: {
      en: 'Clock, calendar, timer, stopwatch — plus a relaxation module with ambient soundscapes.',
      es: 'Reloj, calendario, temporizador, cronómetro — más un módulo de relajación con sonidos ambientales.',
    },
    description: {
      en: 'A feature-rich desktop clock with a futuristic cyber-neon aesthetic. CyberClock combines practical utilities — analog & digital clock, full calendar, timer and stopwatch — with a wellness module featuring procedural ambient sound synthesis for relaxation and mindfulness.',
      es: 'Un reloj de escritorio lleno de funciones con una estética cyber-neon futurista. CyberClock combina utilidades prácticas — reloj analógico y digital, calendario completo, temporizador y cronómetro — con un módulo de bienestar que incluye síntesis procedural de sonidos ambientales para relajarse y practicar mindfulness.',
    },
    features: [
      { en: 'Canvas-rendered analog clock + digital display (12H/24H)', es: 'Reloj analógico renderizado en canvas + pantalla digital (12H/24H)' },
      { en: 'Full calendar with agenda, day notes, statistics and moon phase', es: 'Calendario completo con agenda, notas del día, estadísticas y fase lunar' },
      { en: 'Countdown timer with presets + precision stopwatch with laps', es: 'Temporizador con presets + cronómetro de precisión con vueltas' },
      { en: '6 procedurally-synthesized ambient soundscapes with breathing guide', es: '6 paisajes sonoros ambientales sintetizados proceduralmente con guía de respiración' },
      { en: 'Mini mode — compact always-on-top clock bar with 12 skins', es: 'Modo mini — barra de reloj compacta siempre visible con 12 skins' },
      { en: 'Alarms, chimes, CRT scanlines, transparency and multi-monitor', es: 'Alarmas, campanadas, líneas CRT, transparencia y multi-monitor' },
    ],
    repo: 'https://github.com/CyberGems/CyberClock',
    wiki: 'https://github.com/CyberGems/CyberClock/wiki',
    screenshot: null,
  },
];

export function getApp(slug: string): CyberApp | undefined {
  return apps.find((a) => a.slug === slug);
}