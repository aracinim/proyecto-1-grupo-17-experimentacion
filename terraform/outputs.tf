output "artifact_registry_repo" {
  value = google_artifact_registry_repository.docker_repo.repository_id
}

output "cloud_run_inventory_url" {
  value = google_cloud_run_v2_service.inventory_api.uri
}

output "cloud_run_order_url" {
  value = google_cloud_run_v2_service.order_api.uri
}

output "cloud_sql_connection_name" {
  value = "${var.project_id}:${var.region}:${google_sql_database_instance.pg.name}"
}

output "redis_host" {
  value = google_redis_instance.redis.host
}

output "pubsub_topic" {
  value = google_pubsub_topic.orders.name
}

output "pubsub_push_subscription" {
  value = google_pubsub_subscription.orders_push.name
}
