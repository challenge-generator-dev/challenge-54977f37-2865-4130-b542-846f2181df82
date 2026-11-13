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