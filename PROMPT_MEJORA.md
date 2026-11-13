# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/orders/repositories/orders.repository.ts` — La fase "Configuración del entorno y creación de la estructura básica" se implementa aqui: este archivo es el ejercicio.
- `api/src/config/dynamodb.config.ts` — La fase "Implementación de la creación de órdenes" se implementa aqui: este archivo es el ejercicio.

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

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz, Implementa operaciones CRUD de ordenes en DynamoDB desde la interfaz y versiona la infraestructura

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD de ordenes en DynamoDB desde la interfaz
- Tiempo estimado: 2 semanas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno y creación de la estructura básica — objetivo: Establecer el entorno de desarrollo y crear la estructura básica para las operaciones CRUD de órdenes en DynamoDB. — entregable (NO resolver): Proyecto configurado con la estructura básica para las operaciones CRUD de órdenes en DynamoDB.
- Fase 2: Implementación de la creación de órdenes — objetivo: Implementar la funcionalidad para crear nuevas órdenes en DynamoDB desde la interfaz de usuario. — entregable (NO resolver): Funcionalidad implementada para crear nuevas órdenes en DynamoDB desde la interfaz de usuario.
- Fase 3: Implementación de la consulta de órdenes — objetivo: Implementar la funcionalidad para consultar órdenes existentes en DynamoDB desde la interfaz de usuario. — entregable (NO resolver): Funcionalidad implementada para consultar órdenes existentes en DynamoDB desde la interfaz de usuario.
- Fase 4: Implementación de la actualización y eliminación de órdenes — objetivo: Implementar la funcionalidad para actualizar y eliminar órdenes en DynamoDB desde la interfaz de usuario. — entregable (NO resolver): Funcionalidad implementada para actualizar y eliminar órdenes en DynamoDB desde la interfaz de usuario.
- Fase 5: Versionado de la infraestructura — objetivo: Versionar la infraestructura utilizando Terraform para asegurar la consistencia y reproducibilidad del entorno. — entregable (NO resolver): Infraestructura versionada utilizando Terraform, con documentación del proceso y decisiones tomadas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1168.0",
    "@aws-sdk/lib-dynamodb": "3.1168.0",
    "@nestjs/common": "10.4.22",
    "@nestjs/config": "4.0.4",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "@nestjs/swagger": "8.1.1",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2",
    "uuid": "14.0.3"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/orders/repositories/orders.repository.ts ===
import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

export interface OrdersRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class OrdersRepositoryImpl implements OrdersRepository {
  private readonly client: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION') ?? 'us-east-1';
    const endpoint = this.configService.get<string>('DYNAMODB_ENDPOINT');
    
    const dynamoDBClient = new DynamoDBClient({
      region,
      endpoint,
    });
    this.client = DynamoDBDocumentClient.from(dynamoDBClient);
    this.tableName = this.configService.get<string>('ORDERS_TABLE') ?? 'orders';
  }

  async create(order: Order): Promise<Order> {
    // TODO(reto): Implementar la creación de una orden en DynamoDB
    // Usar PutCommand para insertar el registro en la tabla
    // Convertir CreateOrderDto a Order antes de guardar
    // Manejar errores de DynamoDB (ej: ConditionalCheckFailedException)
    throw new Error('Method not implemented');
  }

  async findById(id: string): Promise<Order | null> {
    // TODO(reto): Implementar la consulta de una orden por ID
    // Usar GetCommand para obtener el registro de la tabla
    // Manejar el caso cuando la orden no existe (retornar null)
    // Convertir el resultado de DynamoDB a Order
    throw new Error('Method not implemented');
  }

  async update(id: string, order: Order): Promise<Order> {
    // TODO(reto): Implementar la actualización de una orden
    // Usar UpdateCommand para modificar el registro en la tabla
    // Solo actualizar los campos que vienen en updateOrderDto
    // Manejar errores cuando la orden no existe
    // Retornar la orden actualizada
    throw new Error('Method not implemented');
  }

  async delete(id: string): Promise<void> {
    // TODO(reto): Implementar la eliminación de una orden
    // Usar DeleteCommand para eliminar el registro de la tabla
    // Manejar errores cuando la orden no existe
    throw new Error('Method not implemented');
  }
}

// === ARCHIVO: api/src/orders/services/orders.service.ts ===
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order, OrderItem } from '../entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(@Inject('OrdersRepository') private readonly ordersRepository: OrdersRepository) {}

  private mapToOrderItem(dtoItems: { productId?: string; quantity?: number; price?: number }[]): OrderItem[] {
    return dtoItems.map(item => ({
      productId: item.productId ?? '',
      quantity: item.quantity ?? 0,
      price: item.price ?? 0,
    }));
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order: Order = {
      id: uuidv4(),
      userId: createOrderDto.userId,
      items: this.mapToOrderItem(createOrderDto.items),
      totalAmount: createOrderDto.totalAmount,
      status: createOrderDto.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      return await this.ordersRepository.create(order);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to create order: ${message}`);
    }
  }

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.ordersRepository.findById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const updatedOrder: Order = {
      ...existingOrder,
      ...updateOrderDto,
      items: updateOrderDto.items 
        ? this.mapToOrderItem(updateOrderDto.items)
        : existingOrder.items,
      updatedAt: new Date().toISOString(),
    };

    try {
      return await this.ordersRepository.update(id, updatedOrder);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update order: ${message}`);
    }
  }

  async delete(id: string): Promise<void> {
    const existingOrder = await this.ordersRepository.findById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    try {
      await this.ordersRepository.delete(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete order: ${message}`);
    }
  }
}

// === ARCHIVO: api/src/orders/controllers/orders.controller.ts ===
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully', type: Order })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Order found', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Order updated successfully', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.ordersService.delete(id);
  }
}

// === ARCHIVO: api/src/orders/dto/create-order.dto.ts ===
import { IsString, IsNumber, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ description: 'Product ID', example: 'prod-123' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Price per unit', example: 19.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'User ID', example: 'user-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'List of order items', type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ description: 'Total amount of the order', example: 39.98 })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ description: 'Status of the order', example: 'pending', required: false })
  @IsString()
  status?: string;
}

// === ARCHIVO: api/src/orders/dto/update-order.dto.ts ===
import { IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ description: 'Product ID', example: 'prod-123', required: false })
  @IsString()
  @IsOptional()
  productId?: string;

  @ApiProperty({ description: 'Quantity of the product', example: 2, required: false })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ description: 'Price per unit', example: 19.99, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;
}

export class UpdateOrderDto {
  @ApiProperty({ description: 'List of order items', type: [OrderItemDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsOptional()
  items?: OrderItemDto[];

  @ApiProperty({ description: 'Total amount of the order', example: 39.98, required: false })
  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @ApiProperty({ description: 'Status of the order', example: 'completed', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}

// === ARCHIVO: api/src/orders/entities/order.entity.ts ===
import { IsString, IsNumber, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItem {
  @ApiProperty({ description: 'Product ID', example: 'prod-123' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Price per unit', example: 19.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class Order {
  @ApiProperty({ description: 'Order ID', example: 'order-123' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'User ID', example: 'user-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'List of order items', type: [OrderItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  @ApiProperty({ description: 'Total amount of the order', example: 39.98 })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ description: 'Status of the order', example: 'pending' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'Creation timestamp', example: '2024-01-01T00:00:00.000Z' })
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ description: 'Last update timestamp', example: '2024-01-01T00:00:00.000Z' })
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}

// === ARCHIVO: api/src/config/dynamodb.config.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamodbConfig {
  private readonly client: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const endpoint = this.configService.get<string>('DYNAMODB_ENDPOINT');

    const clientConfig: ConstructorParameters<typeof DynamoDBClient>[0] = {
      region,
    };

    if (endpoint) {
      clientConfig.endpoint = endpoint;
    }

    const dynamoClient = new DynamoDBClient(clientConfig);

    this.client = DynamoDBDocumentClient.from(dynamoClient, {
      marshallOptions: {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    });

    this.tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME', 'orders');
  }

  getClient(): DynamoDBDocumentClient {
    return this.client;
  }

  getTableName(): string {
    return this.tableName;
  }
}

// === ARCHIVO: api/src/orders/orders.module.ts ===
import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrdersRepositoryImpl } from './repositories/orders.repository';
import { DynamodbConfig } from '../config/dynamodb.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'OrdersRepository',
      useClass: OrdersRepositoryImpl,
    },
    DynamodbConfig,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Orders API')
    .setDescription('API para gestión de órdenes en DynamoDB')
    .setVersion('1.0')
    .addTag('orders')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Aplicación corriendo en: http://localhost:${port}`);
  console.log(`Documentación Swagger disponible en: http://localhost:${port}/docs`);
}

bootstrap();

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './shared/theme';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// === ARCHIVO: client/package.json ===
{
  "name": "reto-react",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && vite build"
  },
  "dependencies": {
    "@mui/icons-material": "5.18.0",
    "@mui/material": "5.18.0",
    "@tanstack/react-query": "5.107.1",
    "axios": "1.21.1",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/react": "18.3.31",
    "@types/react-dom": "18.3.7",
    "@vitejs/plugin-react": "4.7.0",
    "typescript": "5.7.3",
    "vite": "5.4.21"
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "strictPropertyInitialization": false,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "useDefineForClassFields": true,
    "types": [
      "vite/client"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/vite-env.d.ts ===
/// <reference types="vite/client" />

// === ARCHIVO: client/src/features/orders/types/order.types.ts ===
export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderDto = {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
};

export type UpdateOrderDto = {
  items?: OrderItem[];
  totalAmount?: number;
  status?: string;
};

// === ARCHIVO: client/src/services/OrderService.ts ===
import axios from 'axios';
import { CreateOrderDto, UpdateOrderDto, Order } from '../features/orders/types/order.types';

const API_BASE_URL = 'http://localhost:3000';

export const OrderService = {
  createOrder: async (orderData: CreateOrderDto): Promise<Order> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error creating order');
      }
      throw new Error('Error creating order');
    }
  },

  getOrder: async (id: string): Promise<Order> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error fetching order');
      }
      throw new Error('Error fetching order');
    }
  },

  updateOrder: async (id: string, orderData: UpdateOrderDto): Promise<Order> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error updating order');
      }
      throw new Error('Error updating order');
    }
  },

  deleteOrder: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error deleting order');
      }
      throw new Error('Error deleting order');
    }
  },
};

// === ARCHIVO: client/src/features/orders/hooks/useOrders.ts ===
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '../../../services/OrderService';
import { CreateOrderDto, UpdateOrderDto, Order } from '../types/order.types';

export const useOrders = () => {
  const queryClient = useQueryClient();

  const {
    data: orders,
    error,
    isLoading,
  } = useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: async () => {
      throw new Error('Get all orders endpoint not implemented');
    },
    retry: false,
  });

  const createOrderMutation = useMutation<Order, Error, CreateOrderDto>({
    mutationFn: OrderService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const updateOrderMutation = useMutation<Order, Error, { id: string; data: UpdateOrderDto }>({
    mutationFn: ({ id, data }) => OrderService.updateOrder(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['orders', id] });
    },
  });

  const deleteOrderMutation = useMutation<void, Error, string>({
    mutationFn: OrderService.deleteOrder,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.removeQueries({ queryKey: ['orders', id] });
    },
  });

  const getOrderQuery = (id: string) => {
    return useQuery<Order, Error>({
      queryKey: ['orders', id],
      queryFn: () => OrderService.getOrder(id),
      enabled: !!id,
    });
  };

  const handleDelete = async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      deleteOrderMutation.mutate(id, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  return {
    orders,
    error,
    isLoading,
    createOrder: createOrderMutation.mutate,
    createOrderAsync: createOrderMutation.mutateAsync,
    createOrderStatus: createOrderMutation,
    updateOrder: updateOrderMutation.mutate,
    updateOrderAsync: updateOrderMutation.mutateAsync,
    updateOrderStatus: updateOrderMutation,
    deleteOrder: handleDelete,
    deleteOrderMutation: deleteOrderMutation.mutate,
    deleteOrderStatus: deleteOrderMutation,
    getOrder: getOrderQuery,
  };
};

// === ARCHIVO: client/src/features/orders/components/OrderList.tsx ===
import React from 'react';
import { Order } from '../types/order.types';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';

interface OrderListProps {
  isLoading: boolean;
  error: Error | null;
  orders: Order[] | undefined;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => Promise<void>;
}

export const OrderList: React.FC<OrderListProps> = ({ isLoading, error, orders, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <Paper elevation={2} sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={2} sx={{ p: 3 }}>
        <Alert severity="error">
          Error al cargar las órdenes: {error.message}
        </Alert>
      </Paper>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3 }}>
        <Alert severity="info">
          No hay órdenes para mostrar.
        </Alert>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} hover>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {order.status}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => onEdit(order)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onDelete(order.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// === ARCHIVO: client/src/features/orders/components/CreateOrderForm.tsx ===
import React, { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { CreateOrderDto, OrderItem } from '../types/order.types';
import { Button, TextField, Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';

interface CreateOrderFormProps {
  onSuccess: () => void;
}

export const CreateOrderForm: React.FC<CreateOrderFormProps> = ({ onSuccess }) => {
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([{ productId: '', quantity: 1, price: 0 }]);
  const [status, setStatus] = useState('pending');
  const { createOrder, createOrderStatus } = useOrders();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const orderData: CreateOrderDto = {
      userId,
      items,
      totalAmount,
      status,
    };
    await createOrder(orderData);
    onSuccess();
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <Paper elevation={3} style={{ padding: '24px', marginBottom: '24px' }}>
      <Typography variant="h6" gutterBottom>
        Create New Order
      </Typography>
      {createOrderStatus.error && (
        <Alert severity="error" style={{ marginBottom: '16px' }}>
          {createOrderStatus.error.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          Items
        </Typography>
        {items.map((item, index) => (
          <Box key={index} mb={2} display="flex" gap={2}>
            <TextField
              label="Product ID"
              value={item.productId}
              onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
              required
            />
            <TextField
              label="Quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
              required
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Price"
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
              required
              inputProps={{ min: 0, step: 0.01 }}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeItem(index)}
              disabled={items.length <= 1}
            >
              Remove
            </Button>
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={addItem}
          style={{ marginBottom: '16px' }}
        >
          Add Item
        </Button>
        <Box mb={2}>
          <TextField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={createOrderStatus.isPending}
        >
          {createOrderStatus.isPending ? <CircularProgress size={24} /> : 'Create Order'}
        </Button>
      </form>
    </Paper>
  );
};

// === ARCHIVO: client/src/features/orders/components/UpdateOrderForm.tsx ===
import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { Order, UpdateOrderDto, OrderItem } from '../types/order.types';
import { useOrders } from '../hooks/useOrders';

interface UpdateOrderFormProps {
  order: Order;
  onSuccess: () => void;
  onCancel: () => void;
}

const STATUS_OPTIONS = ['pending', 'processing', 'completed', 'cancelled'];

export const UpdateOrderForm: React.FC<UpdateOrderFormProps> = ({
  order,
  onSuccess,
  onCancel
}) => {
  const { updateOrder } = useOrders();
  
  const [formData, setFormData] = useState<UpdateOrderDto>({
    items: [...order.items],
    totalAmount: order.totalAmount,
    status: order.status
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newItem, setNewItem] = useState({ productId: '', quantity: 1, price: 0 });

  useEffect(() => {
    setFormData({
      items: [...order.items],
      totalAmount: order.totalAmount,
      status: order.status
    });
  }, [order]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.status) {
      newErrors.status = 'El estado es requerido';
    }

    if (!formData.items || formData.items.length === 0) {
      newErrors.items = 'Debe tener al menos un artículo';
    }

    const calculatedTotal = formData.items?.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    ) || 0;
    
    if (formData.totalAmount !== calculatedTotal) {
      newErrors.totalAmount = 'El total no coincide con la suma de los artículos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UpdateOrderDto, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddItem = () => {
    if (!newItem.productId.trim()) {
      setErrors(prev => ({ ...prev, newItem: 'El ID del producto es requerido' }));
      return;
    }
    if (newItem.quantity <= 0) {
      setErrors(prev => ({ ...prev, newItem: 'La cantidad debe ser mayor a 0' }));
      return;
    }
    if (newItem.price <= 0) {
      setErrors(prev => ({ ...prev, newItem: 'El precio debe ser mayor a 0' }));
      return;
    }

    const item: OrderItem = {
      productId: newItem.productId,
      quantity: newItem.quantity,
      price: newItem.price
    };

    const updatedItems = [...(formData.items || []), item];
    const newTotal = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      totalAmount: newTotal
    }));
    
    setNewItem({ productId: '', quantity: 1, price: 0 });
    setErrors(prev => ({ ...prev, newItem: '' }));
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = formData.items?.filter((_, i) => i !== index) || [];
    const newTotal = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      totalAmount: newTotal
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsUpdating(true);
      await updateOrder({ id: order.id, data: formData });
      onSuccess();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al actualizar la orden');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Actualizar Orden
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Orden ID: {order.id}
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSubmitError(null)}>
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.status}>
          <InputLabel id="status-label">Estado</InputLabel>
          <Select
            labelId="status-label"
            value={formData.status}
            label="Estado"
            onChange={(e) => handleInputChange('status', e.target.value)}
          >
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </Select>
          {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
        </FormControl>

        <TextField
          fullWidth
          label="Monto Total"
          type="number"
          value={formData.totalAmount}
          onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value) || 0)}
          error={!!errors.totalAmount}
          helperText={errors.totalAmount}
          sx={{ mb: 3 }}
          InputProps={{
            readOnly: true,
            inputProps: { step: '0.01' }
          }}
        />

        <Typography variant="h6" gutterBottom>
          Artículos
        </Typography>
        
        {errors.items && (
          <Alert severity="warning" sx={{ mb: 2 }}>{errors.items}</Alert>
        )}

        <List sx={{ mb: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          {formData.items?.map((item, index) => (
            <ListItem key={`${item.productId}-${index}`} divider>
              <ListItemText
                primary={`Producto: ${item.productId}`}
                secondary={`Cantidad: ${item.quantity} | Precio: $${item.price.toFixed(2)} | Subtotal: $${(item.quantity * item.price).toFixed(2)}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="eliminar"
                  onClick={() => handleRemoveItem(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {(!formData.items || formData.items.length === 0) && (
            <ListItem>
              <ListItemText primary="No hay artículos en la orden" />
            </ListItem>
          )}
        </List>

        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Agregar Artículo
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <TextField
              label="ID Producto"
              value={newItem.productId}
              onChange={(e) => setNewItem(prev => ({ ...prev, productId: e.target.value }))}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Cantidad"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
              size="small"
              sx={{ width: 100 }}
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Precio"
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              size="small"
              sx={{ width: 120 }}
              inputProps={{ step: 0.01, min: 0 }}
            />
            <Button
              variant="contained"
              onClick={handleAddItem}
              startIcon={<AddIcon />}
              sx={{ height: 40 }}
            >
              Agregar
            </Button>
          </Box>
          {errors.newItem && (
            <FormHelperText error>{errors.newItem}</FormHelperText>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isUpdating}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isUpdating}
            startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isUpdating ? 'Actualizando...' : 'Actualizar Orden'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

// === ARCHIVO: client/src/features/orders/OrdersPage.tsx ===
import { useState } from 'react';
import { Container, Typography, Box, Alert, Snackbar } from '@mui/material';
import { CreateOrderForm } from './components/CreateOrderForm';
import { OrderList } from './components/OrderList';
import { UpdateOrderForm } from './components/UpdateOrderForm';
import { useOrders } from './hooks/useOrders';
import type { Order } from './types/order.types';

export function OrdersPage() {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const {
    orders,
    isLoading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
  } = useOrders();

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setNotification({
      open: true,
      message: 'Orden creada exitosamente',
      severity: 'success',
    });
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
  };

  const handleUpdateSuccess = () => {
    setEditingOrder(null);
    setNotification({
      open: true,
      message: 'Orden actualizada exitosamente',
      severity: 'success',
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id);
      setNotification({
        open: true,
        message: 'Orden eliminada exitosamente',
        severity: 'success',
      });
    } catch (err) {
      setNotification({
        open: true,
        message: 'Error al eliminar la orden',
        severity: 'error',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Órdenes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Administra las órdenes de tu sistema de comercio electrónico
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error al cargar las órdenes: {error.message}
        </Alert>
      )}

      {showCreateForm ? (
        <CreateOrderForm onSuccess={handleCreateSuccess} />
      ) : editingOrder ? (
        <UpdateOrderForm
          order={editingOrder}
          onSuccess={handleUpdateSuccess}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <CreateOrderForm onSuccess={handleCreateSuccess} />
          </Box>
          <OrderList
            orders={orders}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

// === ARCHIVO: client/src/shared/theme.ts ===
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
});

// === ARCHIVO: client/src/App.tsx ===
import { Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { OrdersPage } from './features/orders/OrdersPage';

function App() {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <ShoppingCartIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestión de Órdenes
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <OrdersPage />
      </Container>
    </Box>
  );
}

export default App;

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.100.0"
    }
  }
}

// === ARCHIVO: infra/providers.tf ===
provider "aws" {
  region = "us-east-1"
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Variables para el entorno de desarrollo
# Configuración específica para DynamoDB y otros recursos necesarios

# Configuración de DynamoDB
dynamodb_table_name = "orders-dev"
dynamodb_billing_mode = "PAY_PER_REQUEST"
dynamodb_hash_key = "orderId"
dynamodb_range_key = "userId"
dynamodb_attributes = [
  {
    name = "orderId"
    type = "S"
  },
  {
    name = "userId"
    type = "S"
  },
  {
    name = "orderDate"
    type = "S"
  },
  {
    name = "status"
    type = "S"
  }
]

# Índices secundarios globales (GSI)
dynamodb_global_secondary_indexes = [
  {
    name               = "UserOrderIndex"
    hash_key           = "userId"
    range_key          = "orderDate"
    projection_type    = "INCLUDE"
    non_key_attributes = ["status", "totalAmount"]
  },
  {
    name               = "StatusIndex"
    hash_key           = "status"
    range_key          = "orderDate"
    projection_type    = "KEYS_ONLY"
    non_key_attributes = []
  }
]

# Tags para los recursos
tags = {
  Environment = "dev"
  Project     = "ecommerce-platform"
  Owner       = "frontend-team"
}

# Configuración de throughput (opcional para PROVISIONED)
dynamodb_read_capacity  = 5
dynamodb_write_capacity = 5

# Configuración de TTL (opcional)
dynamodb_ttl_attribute = "expirationTime"
dynamodb_ttl_enabled   = false

# Configuración de streams (opcional)
dynamodb_stream_enabled   = true
dynamodb_stream_view_type = "NEW_AND_OLD_IMAGES"

# Configuración de cifrado
dynamodb_server_side_encryption_enabled = true
dynamodb_kms_key_arn                    = ""

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
# Módulo DynamoDB para la tabla de órdenes
# Este módulo crea una tabla DynamoDB con los atributos y configuraciones necesarios
# para soportar las operaciones CRUD de órdenes desde la interfaz de usuario.

resource "aws_dynamodb_table" "orders_table" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.hash_key
  range_key      = var.range_key != "" ? var.range_key : null

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name               = global_secondary_index.value.name
      hash_key           = global_secondary_index.value.hash_key
      range_key          = global_secondary_index.value.range_key != "" ? global_secondary_index.value.range_key : null
      projection_type    = global_secondary_index.value.projection_type
      non_key_attributes = global_secondary_index.value.non_key_attributes

      # Configuración de throughput para índices (solo aplica si billing_mode es PROVISIONED)
      read_capacity  = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
      write_capacity = var.billing_mode == "PROVISIONED" ? var.write_capacity : null
    }
  }

  # Configuración de throughput (solo aplica si billing_mode es PROVISIONED)
  read_capacity  = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
  write_capacity = var.billing_mode == "PROVISIONED" ? var.write_capacity : null

  # Configuración de TTL
  ttl {
    attribute_name = var.ttl_enabled ? var.ttl_attribute : ""
    enabled        = var.ttl_enabled
  }

  # Configuración de streams
  stream_enabled   = var.stream_enabled
  stream_view_type = var.stream_enabled ? var.stream_view_type : null

  # Configuración de cifrado
  server_side_encryption {
    enabled     = var.server_side_encryption_enabled
    kms_key_arn = var.server_side_encryption_enabled && var.kms_key_arn != "" ? var.kms_key_arn : null
  }

  # Tags para el recurso
  tags = merge(
    var.tags,
    {
      Name        = var.table_name
      Description = "Tabla DynamoDB para almacenar órdenes del sistema de comercio electrónico"
    }
  )

  # Configuración de punto de tiempo de recuperación (opcional)
  point_in_time_recovery {
    enabled = var.point_in_time_recovery_enabled
  }
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
# Variables para el módulo DynamoDB
# Estas variables permiten configurar la tabla DynamoDB según las necesidades del entorno

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PAY_PER_REQUEST o PROVISIONED)"
  type        = string
  default     = "PAY_PER_REQUEST"

  validation {
    condition     = contains(["PAY_PER_REQUEST", "PROVISIONED"], var.billing_mode)
    error_message = "El modo de facturación debe ser PAY_PER_REQUEST o PROVISIONED."
  }
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB (opcional)"
  type        = string
  default     = ""
}

variable "attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    projection_type    = string
    non_key_attributes = list(string)
  }))
  default = []
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "ttl_attribute" {
  description = "Atributo para Time To Live (TTL)"
  type        = string
  default     = ""
}

variable "ttl_enabled" {
  description = "Habilitar Time To Live (TTL)"
  type        = bool
  default     = false
}

variable "stream_enabled" {
  description = "Habilitar streams para la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista para el stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"

  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "El tipo de vista del stream debe ser KEYS_ONLY, NEW_IMAGE, OLD_IMAGE o NEW_AND_OLD_IMAGES."
  }
}

variable "server_side_encryption_enabled" {
  description = "Habilitar cifrado del lado del servidor"
  type        = bool
  default     = true
}

variable "kms_key_arn" {
  description = "ARN de la clave KMS para cifrado (opcional)"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Tags para los recursos"
  type        = map(string)
  default     = {}
}

variable "point_in_time_recovery_enabled" {
  description = "Habilitar recuperación a un punto en el tiempo"
  type        = bool
  default     = true
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
# Outputs del módulo DynamoDB
# Estos outputs exponen los recursos creados para ser utilizados por otros módulos

output "table_name" {
  description = "Nombre de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.orders_table.name
}

output "table_arn" {
  description = "ARN de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.orders_table.arn
}

output "table_id" {
  description = "ID de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.orders_table.id
}

output "stream_arn" {
  description = "ARN del stream de la tabla DynamoDB (si está habilitado)"
  value       = aws_dynamodb_table.orders_table.stream_arn
}

output "stream_label" {
  description = "Etiqueta del stream de la tabla DynamoDB (si está habilitado)"
  value       = aws_dynamodb_table.orders_table.stream_label
}

output "global_secondary_index_names" {
  description = "Nombres de los índices secundarios globales creados"
  value       = [for gsi in aws_dynamodb_table.orders_table.global_secondary_index : gsi.name]
}

output "table_tags" {
  description = "Tags aplicados a la tabla DynamoDB"
  value       = aws_dynamodb_table.orders_table.tags
}

// === ARCHIVO: infra/README.md ===
# Infraestructura Terraform - Sistema de Gestión de Órdenes

## Descripción General

Este proyecto contiene la infraestructura como código (IaC) para el sistema de gestión de órdenes en una plataforma de comercio electrónico. La infraestructura está construida con Terraform y utiliza AWS DynamoDB como almacenamiento persistente para las órdenes de los usuarios.

La arquitectura sigue el patrón de módulos reutilizables, separando la configuración en entornos (desarrollo, producción) y componentes genéricos (DynamoDB). Este enfoque permite mantener la consistencia entre entornos y facilitar la replicación de recursos.

## Estructura del Proyecto

```
├── environments/              # Configuraciones por entorno
│   └── dev/                   # Entorno de desarrollo
│       ├── main.tf            # Definición de recursos del entorno
│       ├── variables.tf       # Variables específicas del entorno
│       ├── outputs.tf         # Outputs del entorno
│       └── terraform.tfvars   # Valores de variables
├── modules/                   # Módulos reutilizables
│   └── dynamodb/              # Módulo para tablas DynamoDB
│       ├── main.tf            # Recurso de tabla DynamoDB
│       ├── variables.tf       # Variables del módulo
│       └── outputs.tf         # Outputs del módulo
├── versions.tf                # Versiones de Terraform y providers
├── providers.tf               # Configuración de providers
└── README.md                  # Este archivo
```

## Requisitos

Para utilizar esta infraestructura necesitas:

- **Terraform** versión 1.9.0 o superior (compatible con versiones menores a 2.0.0)
- **AWS CLI** configurado con credenciales válidas
- **Cuenta de AWS** con permisos suficientes para crear recursos de DynamoDB

La configuración de credenciales de AWS puede realizarse mediante variables de entorno (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`), archivo de credenciales (`~/.aws/credentials`) o perfil nombrado (`AWS_PROFILE`).

## Uso Básico

### Inicialización del entorno

Para comenzar a trabajar con Terraform, primero debes inicializar el directorio de trabajo. Este paso descarga los providers necesarios y prepara el estado local.

```bash
cd environments/dev
terraform init
```

El comando `terraform init` realiza las siguientes operaciones: descarga el provider de AWS especificado en `versions.tf`, inicializa el backend de estado y valida la estructura de los archivos de configuración.

### Validación de la configuración

Antes de aplicar cualquier cambio, es recomendable validar que la configuración no contiene errores de sintaxis o referencias incorrectas.

```bash
terraform validate
```

Este comando analiza todos los archivos `.tf` del directorio actual y reporta cualquier error encontrado sin modificar el estado de la infraestructura.

### Planificación de cambios

Para ver qué recursos se crearán, modificarán o eliminarán sin aplicar los cambios, utiliza el comando plan.

```bash
terraform plan -out=tfplan
```

El comando genera un plan de ejecución que muestra todas las acciones que Terraform realizará. El argumento `-out=tfplan` guarda el plan en un archivo para su posterior aplicación, lo cual es una práctica recomendada para entornos de producción.

### Aplicación de cambios

Una vez revisado el plan y confirmado que los cambios son correctos, puedes aplicar la infraestructura.

```bash
terraform apply tfplan
```

Alternativamente, puedes aplicar directamente sin guardar el plan:

```bash
terraform apply
```

Terraform solicitará confirmación antes de crear, modificar o eliminar recursos. Responde `yes` para continuar.

### Destrucción de recursos

Para eliminar todos los recursos creados por esta configuración:

```bash
terraform destroy
```

Este comando muestra los recursos que se eliminarán y solicita confirmación. Utilízalo con precaución en entornos de producción.

## Configuración de Variables

### Variables del Entorno (dev)

El archivo `environments/dev/terraform.tfvars` contiene los valores específicos para el entorno de desarrollo. Los valores actuales incluyen:

- **Región AWS**: us-east-1
- **Nombre de la tabla**: orders-table
- **Modo de facturación**: PAY_PER_REQUEST (sob demanda)
- **Clave hash**: order_id
- **Habilitación de streams**: true
- **Tipo de vista del stream**: NEW_AND_OLD_IMAGES

Puedes modificar estos valores según las necesidades del entorno. Para crear un nuevo entorno, duplica la carpeta `environments/dev` y ajusta los valores en el archivo `.tfvars` correspondiente.

### Variables del Módulo DynamoDB

El módulo de DynamoDB acepta las siguientes variables configurables:

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| table_name | Nombre de la tabla DynamoDB | (requerido) |
| billing_mode | Modo de facturación (PAY_PER_REQUEST o PROVISIONED) | PAY_PER_REQUEST |
| hash_key | Clave hash de la tabla | (requerido) |
| range_key | Clave de rango (opcional) | "" |
| read_capacity | Capacidad de lectura (solo PROVISIONED) | 5 |
| write_capacity | Capacidad de escritura (solo PROVISIONED) | 5 |
| ttl_enabled | Habilitar Time To Live | false |
| stream_enabled | Habilitar streams de DynamoDB | false |
| server_side_encryption_enabled | Cifrado del lado del servidor | true |
| point_in_time_recovery_enabled | Recuperación a punto en el tiempo | true |

## Outputs Disponibles

Después de aplicar la configuración, Terraform expone los siguientes outputs que pueden ser utilizados por otros componentes del sistema:

- **table_name**: Nombre de la tabla DynamoDB creada
- **table_arn**: ARN de la tabla para referencias en otras configuraciones
- **table_id**: ID único de la tabla
- **stream_arn**: ARN del stream (si está habilitado)
- **global_secondary_index_names**: Lista de nombres de índices secundarios globales

Para consultar los outputs después de aplicar:

```bash
terraform output
```

## Consideraciones de Seguridad

La tabla DynamoDB está configurada con cifrado del lado del servidor utilizando AWS managed keys. Para entornos de producción, se recomienda utilizar claves KMS personalizadas proporcionando el ARN en la variable `kms_key_arn`.

La recuperación a punto en el tiempo está habilitada por defecto, permitiendo restaurar la tabla a cualquier punto en los últimos 35 días.

Los streams están habilitados para capturar cambios en la tabla, lo cual es útil para implementar patrones de event sourcing o sincronización con otros sistemas.

## Mantenimiento y Versionado

Para actualizar la infraestructura:

1. Modifica los archivos de configuración según sea necesario
2. Ejecuta `terraform plan` para revisar los cambios
3. Aplica los cambios con `terraform apply`
4. Committea los cambios al repositorio de código

Se recomienda utilizar workspaces de Terraform para manejar múltiples entornos (desarrollo, staging, producción) desde la misma configuración.

## Troubleshooting

### Error de autenticación

Si recibes errores de autenticación, verifica que las credenciales de AWS estén correctamente configuradas:

```bash
aws sts get-caller-identity
```

Este comando muestra la identidad actual de AWS y confirma que las credenciales son válidas.

### Error de estado bloqueado

Si el estado de Terraform está bloqueado, puedes desbloquearlo manualmente eliminando el archivo `.terraform.lock.hcl` y ejecutando `terraform init` nuevamente. En entornos distribuidos, verifica que no haya múltiples ejecuciones simultáneas.

### Cambios fuera de Terraform

Si los recursos se modifican manualmente fuera de Terraform, el estado queda desincronizado. Utiliza `terraform refresh` para actualizar el estado con los valores actuales de los recursos.

## Referencias

- [Documentación oficial de Terraform](https://www.terraform.io/docs)
- [Provider AWS de Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Documentación de DynamoDB](https://docs.aws.amazon.com/dynamodb/)
- [Mejores prácticas de Terraform](https://www.terraform.io/docs/cloud/guides/recommended-practices.html)

// === ARCHIVO: infra/environments/dev/variables.tf ===
# Variables específicas del entorno de desarrollo
# Estas variables permiten personalizar la infraestructura para el entorno de desarrollo

variable "environment" {
  description = "Nombre del entorno (desarrollo, staging, producción)"
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "Región de AWS donde se desplegará la infraestructura"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre del proyecto para identificar recursos"
  type        = string
  default     = "orders-platform"
}

variable "vpc_cidr" {
  description = "CIDR block para la VPC del entorno de desarrollo"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Zonas de disponibilidad para el entorno de desarrollo"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks para las subredes públicas"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks para las subredes privadas"
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

variable "enable_dynamodb_streams" {
  description = "Habilitar streams de DynamoDB para capturar cambios en tiempo real"
  type        = bool
  default     = true
}

variable "dynamodb_stream_view_type" {
  description = "Tipo de vista para el stream de DynamoDB"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"

  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.dynamodb_stream_view_type)
    error_message = "El tipo de vista del stream debe ser KEYS_ONLY, NEW_IMAGE, OLD_IMAGE o NEW_AND_OLD_IMAGES."
  }
}

variable "enable_point_in_time_recovery" {
  description = "Habilitar recuperación a un punto en el tiempo para DynamoDB"
  type        = bool
  default     = true
}

variable "table_throughput" {
  description = "Configuración de throughput para la tabla DynamoDB"
  type = object({
    read_capacity  = number
    write_capacity = number
    billing_mode   = string
  })
  default = {
    read_capacity  = 5
    write_capacity = 5
    billing_mode   = "PAY_PER_REQUEST"
  }
}

variable "tags" {
  description = "Tags comunes para todos los recursos del entorno"
  type        = map(string)
  default = {
    Environment = "dev"
    ManagedBy   = "Terraform"
    Project     = "orders-platform"
  }
}

# Variables para el módulo de DynamoDB
variable "dynamodb_table_name" {
  description = "Nombre de la tabla de DynamoDB para órdenes"
  type        = string
  default     = "orders"
}

variable "dynamodb_hash_key" {
  description = "Nombre del atributo de clave de partición para la tabla DynamoDB"
  type        = string
  default     = "orderId"
}

variable "dynamodb_range_key" {
  description = "Nombre del atributo de clave de ordenación para la tabla DynamoDB"
  type        = string
  default     = "createdAt"
}

variable "dynamodb_attributes" {
  description = "Definición de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "orderId"
      type = "S"
    },
    {
      name = "createdAt"
      type = "S"
    },
    {
      name = "customerId"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    }
  ]
}

variable "dynamodb_gsi" {
  description = "Índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = string
    projection_type = string
    read_capacity   = number
    write_capacity  = number
  }))
  default = [
    {
      name            = "CustomerIdIndex"
      hash_key        = "customerId"
      range_key       = "createdAt"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    },
    {
      name            = "StatusIndex"
      hash_key        = "status"
      range_key       = "createdAt"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    }
  ]
}

variable "dynamodb_read_capacity" {
  description = "Capacidad de lectura para la tabla DynamoDB"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "Capacidad de escritura para la tabla DynamoDB"
  type        = number
  default     = 5
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB"
  type        = string
  default     = "PAY_PER_REQUEST"
  validation {
    condition     = contains(["PAY_PER_REQUEST", "PROVISIONED"], var.dynamodb_billing_mode)
    error_message = "El modo de facturación debe ser PAY_PER_REQUEST o PROVISIONED."
  }
}

variable "dynamodb_ttl_attribute" {
  description = "Nombre del atributo TTL para la tabla DynamoDB"
  type        = string
  default     = "expiresAt"
}

variable "dynamodb_ttl_enabled" {
  description = "Habilitar TTL para la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "dynamodb_stream_enabled" {
  description = "Habilitar streams de DynamoDB"
  type        = bool
  default     = true
}

variable "dynamodb_server_side_encryption_enabled" {
  description = "Habilitar cifrado del lado del servidor para DynamoDB"
  type        = bool
  default     = true
}

variable "dynamodb_kms_key_arn" {
  description = "ARN de la clave KMS para cifrar la tabla DynamoDB"
  type        = string
  default     = ""
}

variable "dynamodb_point_in_time_recovery_enabled" {
  description = "Habilitar recuperación a un punto en el tiempo"
  type        = bool
  default     = true
}

# Variables para buckets S3
variable "logs_bucket_name" {
  description = "Nombre del bucket de logs"
  type        = string
  default     = "orders-platform-logs"
}

variable "logs_bucket_versioning" {
  description = "Habilitar versionado en el bucket de logs"
  type        = bool
  default     = true
}

variable "logs_retention_days" {
  description = "Días de retención para los logs"
  type        = number
  default     = 90
}

variable "backups_bucket_name" {
  description = "Nombre del bucket de backups"
  type        = string
  default     = "orders-platform-backups"
}

variable "backups_versioning" {
  description = "Habilitar versionado en el bucket de backups"
  type        = bool
  default     = true
}

variable "backups_retention_days" {
  description = "Días de retención para los backups"
  type        = number
  default     = 365
}

variable "enable_cross_region_replication" {
  description = "Habilitar replicación entre regiones para los buckets"
  type        = bool
  default     = false
}

variable "replication_destination_region" {
  description = "Región de destino para replicación de buckets"
  type        = string
  default     = "us-west-2"
}

// === ARCHIVO: infra/environments/dev/main.tf ===
# Configuración principal del entorno de desarrollo
# Este archivo orquesta la creación de todos los recursos de infraestructura para el entorno de desarrollo

# Módulo de DynamoDB para almacenar órdenes
# Se configura con los parámetros del entorno de desarrollo definidos en variables.tf y terraform.tfvars

module "dynamodb_orders" {
  source = "../../modules/dynamodb"

  # Nombre de la tabla - usa variable del archivo tfvars o valor por defecto
  table_name = var.dev_variables.table_name

  # Clave de partición requerida
  hash_key = "orderId"

  # Clave de ordenamiento para consultas eficientes
  range_key = "customerId"

  # Modo de facturación - usa el configurado en el entorno
  billing_mode = var.table_throughput.billing_mode

  # Capacidad de lectura (solo si es PROVISIONED)
  read_capacity = var.table_throughput.read_capacity

  # Capacidad de escritura (solo si es PROVISIONED)
  write_capacity = var.table_throughput.write_capacity

  # Atributos de la tabla - definición del esquema
  attributes = [
    {
      name = "orderId"
      type = "S"
    },
    {
      name = "customerId"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    },
    {
      name = "createdAt"
      type = "S"
    }
  ]

  # Índices secundarios globales para consultas eficientes
  global_secondary_indexes = [
    {
      name               = "customerId-status-index"
      hash_key           = "customerId"
      range_key          = "status"
      projection_type    = "ALL"
      non_key_attributes = ["orderId", "createdAt", "totalAmount"]
    },
    {
      name               = "status-createdAt-index"
      hash_key           = "status"
      range_key          = "createdAt"
      projection_type    = "ALL"
      non_key_attributes = ["orderId", "customerId", "totalAmount"]
    }
  ]

  # Configuración de streams para capturar cambios
  stream_enabled    = var.enable_dynamodb_streams
  stream_view_type  = var.dynamodb_stream_view_type

  # Configuración de TTL para limpieza automática de datos antiguos
  ttl_attribute = "expiresAt"
  ttl_enabled   = true

  # Cifrado del lado del servidor
  server_side_encryption_enabled = true

  # Recuperación a un punto en el tiempo
  point_in_time_recovery_enabled = var.enable_point_in_time_recovery

  # Tags específicos para el entorno de desarrollo
  tags = merge(var.tags, {
    Environment = "dev"
    Component   = "dynamodb"
    Table       = "orders"
  })
}

# Recurso local para almacenar información de referencia del entorno
locals {
  environment_name = var.environment
  project_name     = var.project_name
  aws_region       = var.aws_region

  # Tags comunes para todos los recursos
  common_tags = merge(var.tags, {
    Environment = local.environment_name
    Region      = local.aws_region
  })

  # Nombre completo de la tabla DynamoDB
  dynamodb_table_name = module.dynamodb_orders.table_name

  # ARN de la tabla DynamoDB para referencias en otros recursos
  dynamodb_table_arn = module.dynamodb_orders.table_arn
}

# Recurso adicional: Bucket de S3 para logs del entorno de desarrollo
resource "aws_s3_bucket" "logs" {
  bucket = "${var.project_name}-${var.environment}-logs"

  tags = local.common_tags
}

# Recurso adicional: Bucket de S3 para backups de DynamoDB
resource "aws_s3_bucket" "backups" {
  bucket = "${var.project_name}-${var.environment}-backups"

  tags = local.common_tags
}

# Configuración de lifecycle para los buckets
resource "aws_s3_bucket_lifecycle_configuration" "logs_lifecycle" {
  bucket = aws_s3_bucket.logs.id

  rule {
    id     = "expire-old-logs"
    status = "Enabled"

    expiration {
      days = 30
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "backups_lifecycle" {
  bucket = aws_s3_bucket.backups.id

  rule {
    id     = "archive-old-backups"
    status = "Enabled"

    transition {
      days          = 7
      storage_class = "GLACIER"
    }

    expiration {
      days = 90
    }
  }
}

// === ARCHIVO: infra/environments/dev/outputs.tf ===
# Outputs del entorno de desarrollo
# Estos outputs exponen la información de los recursos creados para consumo externo

# Información general del entorno
output "environment_name" {
  description = "Nombre del entorno de desarrollo"
  value       = var.environment
}

output "aws_region" {
  description = "Región de AWS donde está desplegado el entorno"
  value       = var.aws_region
}

output "project_name" {
  description = "Nombre del proyecto"
  value       = var.project_name
}

# Outputs de DynamoDB - tabla de órdenes
output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_name
}

output "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_arn
}

output "dynamodb_table_id" {
  description = "ID de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.table_id
}

output "dynamodb_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.stream_arn
}

output "dynamodb_stream_label" {
  description = "Etiqueta del stream de la tabla DynamoDB de órdenes"
  value       = module.dynamodb_orders.stream_label
}

output "dynamodb_gsi_names" {
  description = "Nombres de los índices secundarios globales de la tabla de órdenes"
  value       = module.dynamodb_orders.global_secondary_index_names
}

# Outputs de S3 - buckets de soporte
output "logs_bucket_name" {
  description = "Nombre del bucket de S3 para logs"
  value       = aws_s3_bucket.logs.id
}

output "logs_bucket_arn" {
  description = "ARN del bucket de S3 para logs"
  value       = aws_s3_bucket.logs.arn
}

output "backups_bucket_name" {
  description = "Nombre del bucket de S3 para backups"
  value       = aws_s3_bucket.backups.id
}

output "backups_bucket_arn" {
  description = "ARN del bucket de S3 para backups"
  value       = aws_s3_bucket.backups.arn
}

# Tags aplicados a los recursos
output "applied_tags" {
  description = "Tags aplicados a los recursos del entorno"
  value       = var.tags
}

# Resumen de recursos creados
output "resources_summary" {
  description = "Resumen de los recursos creados en el entorno de desarrollo"
  value = {
    dynamodb_table = module.dynamodb_orders.table_name
    logs_bucket    = aws_s3_bucket.logs.id
    backups_bucket = aws_s3_bucket.backups.id
    region         = var.aws_region
    environment    = var.environment
  }
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.

Tablas de DynamoDB: `orders` (pk `id`).


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "orders" "id"

```
