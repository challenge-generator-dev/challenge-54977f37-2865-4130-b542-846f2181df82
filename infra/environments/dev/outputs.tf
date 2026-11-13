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