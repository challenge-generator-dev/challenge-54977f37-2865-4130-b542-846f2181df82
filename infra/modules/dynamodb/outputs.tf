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