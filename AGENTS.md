# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de operaciones CRUD de ordenes en DynamoDB desde la interfaz**.

| | |
|---|---|
| Tema | Persistir ordenes en DynamoDB desde la interfaz |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 11 |
| Patron arquitectonico | capas estándar (controller-service-repository) |
| Tiempo estimado | 2 semanas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @aws-sdk/client-dynamodb 3.1168.0
- @aws-sdk/lib-dynamodb 3.1168.0
- @nestjs/common 10.4.22
- @nestjs/config 4.0.4
- @nestjs/core 10.4.22
- @nestjs/platform-express 10.4.22
- @nestjs/swagger 8.1.1
- class-transformer 0.5.1
- class-validator 0.15.1
- reflect-metadata 0.2.2
- rxjs 7.8.2
- uuid 14.0.3
- @types/express 4.17.25
- @types/node 22.20.5
- typescript 5.7.3

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración del entorno y creación de la estructura básica**: Proyecto configurado con la estructura básica para las operaciones CRUD de órdenes en DynamoDB.
- **Fase 2 — Implementación de la creación de órdenes**: Funcionalidad implementada para crear nuevas órdenes en DynamoDB desde la interfaz de usuario.
- **Fase 3 — Implementación de la consulta de órdenes**: Funcionalidad implementada para consultar órdenes existentes en DynamoDB desde la interfaz de usuario.
- **Fase 4 — Implementación de la actualización y eliminación de órdenes**: Funcionalidad implementada para actualizar y eliminar órdenes en DynamoDB desde la interfaz de usuario.
- **Fase 5 — Versionado de la infraestructura**: Infraestructura versionada utilizando Terraform, con documentación del proceso y decisiones tomadas.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `api/src/orders/repositories/orders.repository.ts` — La fase "Configuración del entorno y creación de la estructura básica" se implementa aqui: este archivo es el ejercicio.
- [ ] `api/src/config/dynamodb.config.ts` — La fase "Implementación de la creación de órdenes" se implementa aqui: este archivo es el ejercicio.

## Lo que falta y tenes que completar

No se detectaron huecos: estan los archivos declarados, el boilerplate del stack y ninguna referencia quedo colgando. Igual corre el comando de verificacion — que los archivos existan no garantiza que compilen.

### Presentes (40)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/orders/repositories/orders.repository.ts`
- `api/src/orders/services/orders.service.ts`
- `api/src/orders/controllers/orders.controller.ts`
- `api/src/orders/dto/create-order.dto.ts`
- `api/src/orders/dto/update-order.dto.ts`
- `api/src/orders/entities/order.entity.ts`
- `api/src/config/dynamodb.config.ts`
- `api/src/orders/orders.module.ts`
- `api/src/main.ts`
- `api/src/app.module.ts`
- `client/src/main.tsx`
- `client/package.json`
- `client/tsconfig.json`
- `client/vite.config.ts`
- `client/index.html`
- `client/src/vite-env.d.ts`
- `client/src/features/orders/types/order.types.ts`
- `client/src/services/OrderService.ts`
- `client/src/features/orders/hooks/useOrders.ts`
- `client/src/features/orders/components/OrderList.tsx`
- `client/src/features/orders/components/CreateOrderForm.tsx`
- `client/src/features/orders/components/UpdateOrderForm.tsx`
- `client/src/features/orders/OrdersPage.tsx`
- `client/src/shared/theme.ts`
- `client/src/App.tsx`
- `infra/versions.tf`
- `infra/providers.tf`
- `infra/environments/dev/terraform.tfvars`
- `infra/modules/dynamodb/main.tf`
- `infra/modules/dynamodb/variables.tf`
- `infra/modules/dynamodb/outputs.tf`
- `infra/README.md`
- `infra/environments/dev/variables.tf`
- `infra/environments/dev/main.tf`
- `infra/environments/dev/outputs.tf`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`

### Capas del patron declarado

Son las capas que la propuesta arquitectonica plantea, marcadas segun existan hoy en el repo. Orientan donde poner el codigo nuevo; no son una condicion para compilar.

- `api` (presente)
- `api/src/orders` (presente)
- `api/src/orders/dto` (presente)
- `api/src/orders/entities` (presente)
- `api/src/orders/interfaces` (ausente)
- `api/src/orders/repositories` (presente)
- `api/src/config` (presente)
- `client` (presente)
- `client/src/features/orders` (presente)
- `client/src/features/orders/components` (presente)
- `client/src/features/orders/hooks` (presente)
- `client/src/features/orders/types` (presente)
- `client/src/services` (presente)
- `infra` (presente)
- `infra/modules/dynamodb` (presente)
- `infra/environments/dev` (presente)

## Verificacion

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **capas estándar (controller-service-repository)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2
- Brecha que el reto ataca: CRUD de ordenes en DynamoDB desde la interfaz, Implementa operaciones CRUD de ordenes en DynamoDB desde la interfaz y versiona la infraestructura
- Mision: Gestionar ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
