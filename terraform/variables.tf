variable "project_id" {
  description = "ID del proyecto GCP"
  type        = string
}

variable "region" {
  description = "Región GCP"
  type        = string
  default     = "us-central1"
}

variable "inventory_image" {
  description = "Imagen de contenedor para inventario-api en Artifact Registry"
  type        = string
  # ej: us-central1-docker.pkg.dev/PROJECT/experiments/inventario-api:1.0
}

variable "order_image" {
  description = "Imagen de contenedor para pedido-api en Artifact Registry"
  type        = string
  # ej: us-central1-docker.pkg.dev/PROJECT/experiments/pedido-api:1.0
}

variable "db_instance_name" {
  description = "Nombre de la instancia de Cloud SQL"
  type        = string
  default     = "inventory-sql"
}

variable "db_name" {
  description = "Nombre de la base de datos PostgreSQL"
  type        = string
  default     = "inventorydb"
}

variable "db_user" {
  description = "Usuario de aplicación para PostgreSQL"
  type        = string
  default     = "app_user"
}

variable "db_password" {
  description = "Password del usuario de aplicación (usa Secret Manager en prod)"
  type        = string
  sensitive   = true
}

variable "redis_name" {
  description = "Nombre de la instancia de Redis"
  type        = string
  default     = "inventory-redis"
}

variable "pubsub_topic" {
  description = "Nombre del tópico de Pub/Sub para pedidos"
  type        = string
  default     = "orders-topic"
}

variable "serverless_connector_name" {
  description = "Nombre del conector VPC Access"
  type        = string
  default     = "serverless-conn"
}

variable "vpc_network" {
  description = "Red VPC donde crear el conector y Memorystore"
  type        = string
  default     = "default"
}

variable "vpc_connector_range" {
  description = "Rango CIDR para el conector VPC Access"
  type        = string
  default     = "10.8.0.0/28"
}

variable "vpc_min_capacity" {
  description = "Capacidad mínima del conector VPC Access"
  type        = number
  default     = 200
}

variable "vpc_max_capacity" {
  description = "Capacidad máxima del conector VPC Access"
  type        = number
  default     = 300
}

variable "cache_ttl_seconds" {
  description = "TTL por defecto para claves de inventario en Redis"
  type        = number
  default     = 300
}

variable "artifact_repo" {
  description = "Nombre del repositorio Artifact Registry (Docker)"
  type        = string
  default     = "experiments"
}
