# CodeQL

## Objetivo

Analizar el repositorio utilizando GitHub CodeQL para identificar posibles problemas de seguridad y calidad del código.

## Workflow utilizado

```text
.github/workflows/codeql.yml
```

## Ejecución

El análisis puede ejecutarse desde:

```text
GitHub -> Actions -> CodeQL -> Run workflow
```

También se ejecuta automáticamente según la configuración del workflow.

## Consulta de resultados

Las alertas y resultados del análisis están disponibles en:

```text
GitHub -> Security -> Code scanning
```

## Beneficios

* Detección temprana de vulnerabilidades.
* Revisión automática de patrones inseguros.
* Integración con Pull Requests.
* Integración con GitHub Actions.
