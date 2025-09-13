# ----------------------------
# Habilitar APIs necesarias
# ----------------------------
locals {
  apis = [
    "run.googleapis.com",
    "sqladmin.googleapis.com",
    "artifactregistry.googleapis.com",
    "redis.googleapis.com",
    "pubsub.googleapis.com",
    "vpcaccess.googleapis.com",
    "monitoring.googleapis.com",
    "logging.googleapis.com"
  ]
}

resource "google_project_service" "services" {
  for_each           = toset(local.apis)
  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

# ----------------------------
# Artifact Registry (repositorio)
# ----------------------------
resource "google_artifact_registry_repository" "docker_repo" {
  location      = var.region
  repository_id = var.artifact_repo
  description   = "Repositorio Docker para experimentos"
  format        = "DOCKER"
  depends_on    = [google_project_service.services]
}

# ----------------------------
# IAM: cuentas de servicio
# ----------------------------
resource "google_service_account" "sa_inventory" {
  account_id   = "inventory-api-sa"
  display_name = "SA Inventario API"
}

resource "google_service_account" "sa_order" {
  account_id   = "pedido-api-sa"
  display_name = "SA Pedido API (publisher + push receiver)"
}

# SA para Pub/Sub Push (OIDC); puede ser la misma que pedido-api o separada
resource "google_service_account" "sa_pubsub_push" {
  account_id   = "pubsub-push-sa"
  display_name = "SA para Pub/Sub Push OIDC"
}

# ----------------------------
# IAM: bindings de roles
# ----------------------------
# Acceso a Artifact Registry (solo lectura de imágenes)
resource "google_project_iam_member" "artifact_reader_inventory" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.sa_inventory.email}"
}

resource "google_project_iam_member" "artifact_reader_order" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.sa_order.email}"
}

# Cloud SQL Client para ambas APIs
resource "google_project_iam_member" "sql_client_inventory" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.sa_inventory.email}"
}

resource "google_project_iam_member" "sql_client_order" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.sa_order.email}"
}

# Pub/Sub Publisher para pedido-api
resource "google_project_iam_member" "pubsub_publisher_order" {
  project = var.project_id
  role    = "roles/pubsub.publisher"
  member  = "serviceAccount:${google_service_account.sa_order.email}"
}

# Run Invoker: permitir que Pub/Sub Push invoque pedido-api (OIDC)
# => En Cloud Run v2 se recomienda IAM a nivel de servicio con run.invoker
# Lo aplicaremos después de crear el servicio (depende de service URL).

# ----------------------------
# VPC Access Connector
# ----------------------------
resource "google_vpc_access_connector" "serverless" {
  name          = var.serverless_connector_name
  region        = var.region
  network       = var.vpc_network
  ip_cidr_range = var.vpc_connector_range

  min_throughput = var.vpc_min_capacity
  max_throughput = var.vpc_max_capacity

  depends_on = [google_project_service.services]
}

# ----------------------------
# Cloud SQL (PostgreSQL)
# ----------------------------
resource "google_sql_database_instance" "pg" {
  name             = var.db_instance_name
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = "db-f1-micro"

    ip_configuration {
      ipv4_enabled = true
    }
    availability_type = "ZONAL"
  }

  deletion_protection = false
  depends_on          = [google_project_service.services]
}

resource "google_sql_user" "pg_user" {
  instance = google_sql_database_instance.pg.name
  name     = var.db_user
  password = var.db_password
}

resource "google_sql_database" "pg_db" {
  name     = var.db_name
  instance = google_sql_database_instance.pg.name
}

# ----------------------------
# Memorystore (Redis)
# ----------------------------
resource "google_redis_instance" "redis" {
  name           = var.redis_name
  tier           = "BASIC"
  memory_size_gb = 1
  region         = var.region
  # Usa la VPC "default". Si tienes una VPC propia, cámbiala aquí:
  authorized_network = "projects/${var.project_id}/global/networks/${var.vpc_network}"

  depends_on = [google_project_service.services]
}

# ----------------------------
# Pub/Sub
# ----------------------------
resource "google_pubsub_topic" "orders" {
  name       = var.pubsub_topic
  depends_on = [google_project_service.services]
}

# ----------------------------
# Cloud Run (APIs)
# ----------------------------
# Inventario API
resource "google_cloud_run_v2_service" "inventory_api" {
  name     = "inventario-api"
  location = var.region
  template {
    service_account = google_service_account.sa_inventory.email

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = ["${var.project_id}:${var.region}:${google_sql_database_instance.pg.name}"]
      }
    }

    containers {
      image = var.inventory_image
      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }
      env {
        name  = "PG_DB"
        value = var.db_name
      }
      env {
        name  = "PG_USER"
        value = var.db_user
      }
      env {
        name  = "PG_PASSWORD"
        value = var.db_password
      }
      env {
        name  = "PG_INSTANCE_CONNECTION_NAME"
        value = "${var.project_id}:${var.region}:${google_sql_database_instance.pg.name}"
      }
      env {
        name  = "REDIS_HOST"
        value = google_redis_instance.redis.host
      }
      env {
        name  = "REDIS_PORT"
        value = "6379"
      }
      env {
        name  = "REDIS_TTL_SECONDS"
        value = tostring(var.cache_ttl_seconds)
      }
      env {
        name  = "CACHE_NAMESPACE"
        value = "inventory:"
      }
    }
    vpc_access {
      connector = google_vpc_access_connector.serverless.id
      egress    = "PRIVATE_RANGES_ONLY"
    }
    scaling {
      min_instance_count = 0
      max_instance_count = 50
    }
  }
  ingress = "INGRESS_TRAFFIC_ALL"
  depends_on = [
    google_project_service.services,
    google_sql_database_instance.pg,
    google_redis_instance.redis,
    google_vpc_access_connector.serverless
  ]
}

# Pedido API (publica y recibe push)
resource "google_cloud_run_v2_service" "order_api" {
  name     = "pedido-api"
  location = var.region
  template {
    service_account = google_service_account.sa_order.email

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = ["${var.project_id}:${var.region}:${google_sql_database_instance.pg.name}"]
      }
    }

    containers {
      image = var.order_image

      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }

      env {
        name  = "PG_DB"
        value = var.db_name
      }
      env {
        name  = "PG_USER"
        value = var.db_user
      }
      env {
        name  = "PG_PASSWORD"
        value = var.db_password
      }
      env {
        name  = "PG_INSTANCE_CONNECTION_NAME"
        value = "${var.project_id}:${var.region}:${google_sql_database_instance.pg.name}"
      }
      env {
        name  = "PUBSUB_TOPIC"
        value = google_pubsub_topic.orders.name
      }
    }
    scaling {
      min_instance_count = 0
      max_instance_count = 200
    }
  }
  ingress = "INGRESS_TRAFFIC_ALL"
  depends_on = [
    google_project_service.services,
    google_sql_database_instance.pg
  ]
}

# ----------------------------
# Cloud Run IAM: permitir invocar a pedido-api desde Pub/Sub Push (OIDC)
# ----------------------------
resource "google_cloud_run_v2_service_iam_member" "order_invoker_for_pubsub" {
  name     = google_cloud_run_v2_service.order_api.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "serviceAccount:${google_service_account.sa_pubsub_push.email}"
}

# ----------------------------
# Suscripción PUSH con OIDC para /_pubsub/push
# ----------------------------
resource "google_pubsub_subscription" "orders_push" {
  name  = "${var.pubsub_topic}-push"
  topic = google_pubsub_topic.orders.name

  push_config {
    push_endpoint = "${google_cloud_run_v2_service.order_api.uri}/_pubsub/push"

    oidc_token {
      service_account_email = google_service_account.sa_pubsub_push.email
      # (opcional) audience: coincide con la URL del servicio o un valor esperado por tu app
      audience = google_cloud_run_v2_service.order_api.uri
    }
  }

  depends_on = [
    google_cloud_run_v2_service.order_api,
    google_cloud_run_v2_service_iam_member.order_invoker_for_pubsub
  ]
}
