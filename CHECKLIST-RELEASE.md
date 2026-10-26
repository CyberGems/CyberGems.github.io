# Checklist de documentación por release

Propósito: verificar que la documentación de una app esté sincronizada antes de publicar un release. Aplicar solo a releases y a cambios que afecten al usuario final (instalación, configuración, breaking changes). No es necesario para cada push interno de features o refactor.

## Cuándo aplicar
- Antes de crear el tag de release de cualquier app (CyberPaste, CyberWall, CyberLauncher, etc.)
- Cuando haya cambios en el instalador, pasos de primera ejecución o requisitos del sistema

## Checklist

| # | Pregunta | Sí / No | Acción si es No |
|---|----------|---------|-----------------|
| 1 | ¿El `README.md` del repo de la app menciona el ejecutable correcto en SmartScreen (paso 1 y paso 2)? | | Editar `README.md` |
| 2 | ¿La versión del `README.md` coincide con el tag del release? | | Actualizar versión |
| 3 | ¿Los enlaces de descarga (`releases/latest`) apuntan al repo correcto? | | Corregir URL |
| 4 | ¿Existe wiki y, de ser así, su documentación está actualizada para esta versión? | | Editar wiki (`../<App>.wiki`) |
| 5 | ¿La página en `_Website/src/data/apps/<app>.json` (EN y ES) refleja cambios de features o requisitos? | | Editar JSON y hacer `npm run build` en `_Website` |
| 6 | ¿Hay cambios de instalación o primeros pasos que deban reflejarse en "Getting Started"? | | Editar `README.md` |
| 7 | ¿Se respetó la regla de no usar em dash (`—`) en la documentación nueva? | | Corregir texto |
| 8 | ¿Los commits están en inglés y se hizo push a `origin`? | | Commit + push |

Si todos los ítems son **Sí**, el release puede publicarse. Si alguno es **No**, corregir antes de crear el tag.

## Notas sobre gasto de tokens
Este checklist es manual y ligero. No requiere leer todo el código, solo verificar los archivos de documentación visibles. No aplicar a cada push de feature para evitar consumo innecesario de tokens.
