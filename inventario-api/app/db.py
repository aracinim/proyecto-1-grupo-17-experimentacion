import os
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Conexión por UNIX socket a Cloud SQL
# Formato: postgresql+asyncpg:///DBNAME?host=/cloudsql/INSTANCE
PG_DB = os.environ["PG_DB"]
PG_INSTANCE = os.environ["PG_INSTANCE_CONNECTION_NAME"]
DB_URL = f"postgresql+asyncpg:///{PG_DB}?host=/cloudsql/{PG_INSTANCE}"

engine: AsyncEngine = create_async_engine(DB_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

async def get_session() -> AsyncSession:
    async with SessionLocal() as session:
        yield session