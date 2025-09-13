# pedido-api/app/publisher.py
import os, json
from google.cloud import pubsub_v1
import google.auth

publisher = pubsub_v1.PublisherClient()

project_id = (
    os.getenv("GOOGLE_CLOUD_PROJECT")
    or os.getenv("PROJECT_ID")
    or google.auth.default()[1]   # ← fallback automático dentro de Cloud Run
)
if not project_id:
    raise RuntimeError("No se pudo determinar el Project ID")

topic_id = os.getenv("PUBSUB_TOPIC")
if not topic_id:
    raise RuntimeError("PUBSUB_TOPIC no está definido")

topic_path = publisher.topic_path(project_id, topic_id)

def _to_bytes(obj: dict) -> bytes:
    return json.dumps(obj).encode("utf-8")

async def publish_order(payload: dict) -> None:
    future = publisher.publish(topic_path, data=_to_bytes(payload))
    future.result(timeout=10)  # lanza si hay error
