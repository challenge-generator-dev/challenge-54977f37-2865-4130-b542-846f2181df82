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