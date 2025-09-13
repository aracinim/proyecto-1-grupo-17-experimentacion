import os
import json
from google.cloud import pubsub_v1

# Publisher client usa las credenciales del servicio de Cloud Run
publisher = pubsub_v1.PublisherClient()
PROJECT = os.environ.get("GOOGLE_CLOUD_PROJECT")
TOPIC = os.environ["PUBSUB_TOPIC"]
topic_path = publisher.topic_path(PROJECT, TOPIC)

async def publish_order(payload: dict) -> None:
    # publish es sync pero no bloquea significativamente; alternativamente usar run_in_executor
    future = publisher.publish(topic_path, json.dumps(payload).encode("utf-8"))
    future.result(timeout=10)  # asegurar publicación o lanzar
