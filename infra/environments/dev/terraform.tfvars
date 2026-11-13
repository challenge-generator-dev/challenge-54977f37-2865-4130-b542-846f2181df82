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