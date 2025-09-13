import json
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db import get_session
from app.models import Inventory
from app.schemas import AvailabilityOut
from app.cache import get_redis, key_for_sku, REDIS_TTL

app = FastAPI(title="API de Inventario")

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/inventario/{sku}/disponibilidad", response_model=AvailabilityOut)
async def disponibilidad(sku: str, session: AsyncSession = Depends(get_session)):
    r = await get_redis()
    k = key_for_sku(sku)

    # 1) Intento en caché
    cached = await r.get(k)
    if cached:
        data = json.loads(cached)
        data["source"] = "cache"
        return data

    # 2) Fallback a BD
    result = await session.execute(select(Inventory).where(Inventory.sku == sku))
    row = result.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="SKU no existe")

    payload = {
        "sku": row.sku,
        "available_qty": row.available_qty,
        "updated_at": row.updated_at.isoformat(),
    }

    # 3) Backfill caché
    await r.set(k, json.dumps(payload), ex=REDIS_TTL)

    payload["source"] = "db"
    return payload
