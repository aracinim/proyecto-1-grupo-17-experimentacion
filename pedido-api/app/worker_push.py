import os
import base64
import json
from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert as pg_insert
from app.db import get_session
from app.models import Order

router = APIRouter()

PUSH_AUTH_TOKEN = os.environ.get("PUSH_AUTH_TOKEN")  # opcional

def _verify_token(req: Request):
    if PUSH_AUTH_TOKEN:
        token = req.headers.get("X-PubSub-Token")
        if token != PUSH_AUTH_TOKEN:
            raise HTTPException(status_code=401, detail="Invalid push token")

def _decode_push_body(data: dict) -> dict:
    """
    Soporta formato 'legacy push' (message.data base64).
    Si usas CloudEvents, adapta aquí para extraer los campos.
    """
    if "message" not in data:
        raise HTTPException(status_code=400, detail="Bad push payload")
    msg = data["message"]
    b64 = msg.get("data")
    if not b64:
        return {}
    raw = base64.b64decode(b64).decode("utf-8")
    return json.loads(raw)

@router.post("/_pubsub/push")
async def pubsub_push(request: Request, session: AsyncSession = Depends(get_session)):
    _verify_token(request)
    body = await request.json()
    order = _decode_push_body(body)

    if not order:
        # ack igualmente para evitar reintentos infinitos cuando no hay payload
        return {"status": "no-op"}

    # Idempotencia por order_id (constraint única en BD)
    stmt = pg_insert(Order).values(
        order_id=order["order_id"],
        sku=order["sku"],
        qty=order["qty"],
        customer_id=order["customer_id"],
    )

    # Idempotencia por order_id único
    stmt = stmt.on_conflict_do_nothing(index_elements=[Order.order_id])  # o ["order_id"]

    await session.execute(stmt)
    await session.commit()
    # Responder 200 para que Pub/Sub marque el mensaje como entregado
    return {"status": "processed"}
