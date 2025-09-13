# Variables para el proyecto
# RECUERDA PRIMERO HACER BUILD Y PUSH DE LA IMAGEN DE DOCKER CON EL TAG
project_id      = "misw4301-g26"
region          = "us-central1"

inventory_image = "us-central1-docker.pkg.dev/misw4301-g26/experiments/inventario-api:1.4"
order_image     = "us-central1-docker.pkg.dev/misw4301-g26/experiments/pedido-api:1.3"

db_instance_name = "inventory-sql"
db_name          = "inventorydb"
db_user          = "app_user"
db_password      = "supersecreto"   # Usa Secret Manager en producción

redis_name               = "inventory-redis"
vpc_network              = "default"
serverless_connector_name = "serverless-conn"
vpc_connector_range      = "10.8.0.0/28"
vpc_min_capacity         = 200
vpc_max_capacity         = 300

pubsub_topic = "orders-topic"
artifact_repo = "experiments"

cache_ttl_seconds = 300