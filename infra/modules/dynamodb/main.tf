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