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