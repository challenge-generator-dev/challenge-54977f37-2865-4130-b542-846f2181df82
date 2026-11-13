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