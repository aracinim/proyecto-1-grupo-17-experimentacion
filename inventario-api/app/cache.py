import os
from redis.asyncio import Redis

REDIS_HOST = os.environ["REDIS_HOST"]
REDIS_PORT = int(os.environ.get("REDIS_PORT", "6379"))
REDIS_TTL = int(os.environ.get("REDIS_TTL_SECONDS", "300"))
CACHE_NS = os.environ.get("CACHE_NAMESPACE", "inventory:")

redis_client: Redis | None = None

async def get_redis() -> Redis:
    global redis_client
    if redis_client is None:
        redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
    return redis_client

def key_for_sku(sku: str) -> str:
    return f"{CACHE_NS}{sku}"
