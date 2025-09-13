# inventario-api/app/db.py
import os
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

PG_DB   = os.getenv("PG_DB")
PG_USER = os.getenv("PG_USER")
PG_PASS = os.getenv("PG_PASSWORD")
PG_INST = os.getenv("PG_INSTANCE_CONNECTION_NAME")  # <project>:<region>:<instance>

missing = [k for k, v in {
    "PG_DB": PG_DB, "PG_USER": PG_USER, "PG_PASSWORD": PG_PASS, "PG_INSTANCE_CONNECTION_NAME": PG_INST
}.items() if not v]
if missing:
    raise RuntimeError(f"Faltan env vars requeridas: {', '.join(missing)}")

DB_URL = f"postgresql+asyncpg://{PG_USER}:{PG_PASS}@/{PG_DB}?host=/cloudsql/{PG_INST}"

engine: AsyncEngine = create_async_engine(
    DB_URL,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=2,
)
SessionLocal = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

async def get_session() -> AsyncSession:
    async with SessionLocal() as session:
        yield session
