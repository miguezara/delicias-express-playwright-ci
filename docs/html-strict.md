# HTML Validate - Modo Estricto

## Objetivo

Ejecutar HTML Validate utilizando una configuración estricta para identificar problemas adicionales que no aparecen en la configuración calibrada del laboratorio.

## Comando ejecutado

```powershell
npx html-validate "web/**/*.html" --config .htmlvalidate.strict.json
```

## Resultado

Se identificaron advertencias y/o errores adicionales respecto a la configuración utilizada habitualmente en el proyecto.

La configuración calibrada del laboratorio permite centrarse en la automatización Playwright y CI/CD sin bloquear la práctica por cuestiones de estilo HTML.

## Evidencia

Ver fichero:

html-validate-strict.txt
