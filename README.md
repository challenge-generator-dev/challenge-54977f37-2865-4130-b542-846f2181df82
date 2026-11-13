# Implementación de operaciones CRUD de ordenes en DynamoDB desde la interfaz

El sistema de gestión de órdenes en la plataforma de comercio electrónico requiere la implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de órdenes en DynamoDB desde la interfaz de usuario. La aplicación debe permitir a los usuarios realizar estas operaciones de manera eficiente y segura, asegurando la integridad de los datos y la consistencia del sistema. Los usuarios autenticados deben poder crear nuevas órdenes, consultar órdenes existentes, actualizar información de órdenes y eliminar órdenes obsoletas. El sistema debe manejar adecuadamente los errores y casos borde, como órdenes duplicadas o intentos de eliminar órdenes que no existen.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 2 semanas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del entorno y creación de la estructura básica

**Objetivo:** Establecer el entorno de desarrollo y crear la estructura básica para las operaciones CRUD de órdenes en DynamoDB.

**Tiempo estimado:** 3 días

**Instrucciones:**

- Configurar el entorno de desarrollo con las herramientas necesarias.
- Crear la estructura básica del proyecto, incluyendo la configuración de DynamoDB y la integración con la interfaz de usuario.
- Asegurar que el sistema pueda conectarse a DynamoDB y realizar operaciones básicas.

**Entregable:** Proyecto configurado con la estructura básica para las operaciones CRUD de órdenes en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para la configuración de la infraestructura.
- Integración de DynamoDB con la aplicación React.

</details>

### Fase 2: Implementación de la creación de órdenes

**Objetivo:** Implementar la funcionalidad para crear nuevas órdenes en DynamoDB desde la interfaz de usuario.

**Tiempo estimado:** 5 días

**Instrucciones:**

- Desarrollar la lógica para crear nuevas órdenes en DynamoDB.
- Integrar la funcionalidad de creación de órdenes con la interfaz de usuario.
- Manejar adecuadamente los errores y casos borde, como órdenes duplicadas.

**Entregable:** Funcionalidad implementada para crear nuevas órdenes en DynamoDB desde la interfaz de usuario.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para la configuración de la infraestructura.
- Manejo de errores y casos borde en la creación de órdenes.

</details>

### Fase 3: Implementación de la consulta de órdenes

**Objetivo:** Implementar la funcionalidad para consultar órdenes existentes en DynamoDB desde la interfaz de usuario.

**Tiempo estimado:** 4 días

**Instrucciones:**

- Desarrollar la lógica para consultar órdenes existentes en DynamoDB.
- Integrar la funcionalidad de consulta de órdenes con la interfaz de usuario.
- Asegurar que la consulta de órdenes sea eficiente y escalable.

**Entregable:** Funcionalidad implementada para consultar órdenes existentes en DynamoDB desde la interfaz de usuario.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para la configuración de la infraestructura.
- Optimización de consultas en DynamoDB.

</details>

### Fase 4: Implementación de la actualización y eliminación de órdenes

**Objetivo:** Implementar la funcionalidad para actualizar y eliminar órdenes en DynamoDB desde la interfaz de usuario.

**Tiempo estimado:** 4 días

**Instrucciones:**

- Desarrollar la lógica para actualizar y eliminar órdenes en DynamoDB.
- Integrar la funcionalidad de actualización y eliminación de órdenes con la interfaz de usuario.
- Manejar adecuadamente los errores y casos borde, como intentos de eliminar órdenes que no existen.

**Entregable:** Funcionalidad implementada para actualizar y eliminar órdenes en DynamoDB desde la interfaz de usuario.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para la configuración de la infraestructura.
- Manejo de errores y casos borde en la actualización y eliminación de órdenes.

</details>

### Fase 5: Versionado de la infraestructura

**Objetivo:** Versionar la infraestructura utilizando Terraform para asegurar la consistencia y reproducibilidad del entorno.

**Tiempo estimado:** 2 días

**Instrucciones:**

- Configurar y versionar la infraestructura utilizando Terraform.
- Asegurar que la infraestructura versionada sea consistente y reproducible.
- Documentar el proceso de versionado y las decisiones tomadas.

**Entregable:** Infraestructura versionada utilizando Terraform, con documentación del proceso y decisiones tomadas.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para la configuración y versionado de la infraestructura.
- Prácticas de documentación y gestión de versiones.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en el sistema de gestión de órdenes?
- **paraQueSirve**: ¿Para qué sirve la integración de DynamoDB con la aplicación React en este contexto?
- **comoSeUsa**: ¿Cómo se utiliza Terraform para la configuración y versionado de la infraestructura en este proyecto?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir durante la implementación de las operaciones CRUD de órdenes en DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica el versionado de la infraestructura utilizando Terraform y cómo se justifican?

## Criterios de Evaluacion

- Implementación correcta de la funcionalidad para crear nuevas órdenes en DynamoDB desde la interfaz de usuario.
- Implementación correcta de la funcionalidad para consultar órdenes existentes en DynamoDB desde la interfaz de usuario.
- Implementación correcta de la funcionalidad para actualizar órdenes en DynamoDB desde la interfaz de usuario.
- Implementación correcta de la funcionalidad para eliminar órdenes en DynamoDB desde la interfaz de usuario.
- Configuración y versionado correcto de la infraestructura utilizando Terraform.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate` — componente `infra` (support).
3. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
4. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
