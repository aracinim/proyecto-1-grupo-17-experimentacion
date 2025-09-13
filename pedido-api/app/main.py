from fastapi import FastAPI, Depends
from app.schemas import OrderIn, Ack
from app.publisher import publish_order
from app.worker_push import router as push_router

app = FastAPI(title="API de Pedido")

@app.get("/health")
async def health():
    return {"status": "ok"}

# Ingreso de pedido: publica en Pub/Sub y retorna 202-like (aquí 200 con 'accepted')
@app.post("/pedido", response_model=Ack)
async def crear_pedido(pedido: OrderIn):
    await publish_order(pedido.model_dump())
    return Ack(status="accepted")

# Endpoint para suscripción PUSH de Pub/Sub
app.include_router(push_router)
