import type { LocalizedText } from './apps';

export const catalogGroups = [
  { id: 'all', label: { en: 'All apps', es: 'Todas las apps' } },
  { id: 'productivity', label: { en: 'Productivity', es: 'Productividad' } },
  { id: 'media', label: { en: 'Capture & media', es: 'Capturas y contenido' } },
  { id: 'system', label: { en: 'System & security', es: 'Sistema y seguridad' } },
];

const tasks: Record<string, { group: string; label: LocalizedText }> = {
  cybersnap: { group: 'media', label: { en: 'Screen capture', es: 'Capturas de pantalla' } },
  cybermanager: { group: 'system', label: { en: 'PC performance', es: 'Rendimiento del PC' } },
  cybertray: { group: 'productivity', label: { en: 'Quick access', es: 'Accesos rápidos' } },
  cyberfeeds: { group: 'media', label: { en: 'RSS & reading', es: 'RSS y lectura' } },
  cybernotes: { group: 'productivity', label: { en: 'Notes & ideas', es: 'Notas e ideas' } },
  cyberpaste: { group: 'productivity', label: { en: 'Clipboard history', es: 'Historial del portapapeles' } },
  cyberwall: { group: 'system', label: { en: 'Firewall', es: 'Firewall' } },
  cyberviewer: { group: 'media', label: { en: 'Images & editing', es: 'Imágenes y edición' } },
  cyberlauncher: { group: 'productivity', label: { en: 'App launcher', es: 'Lanzador de aplicaciones' } },
  cyberclock: { group: 'productivity', label: { en: 'Clock & timers', es: 'Reloj y temporizadores' } },
};

export function appTask(slug: string) {
  return tasks[slug] ?? { group: 'other', label: { en: 'Windows tool', es: 'Herramienta para Windows' } };
}
