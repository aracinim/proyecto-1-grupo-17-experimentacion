from sqlalchemy.orm import declarative_base, Mapped, mapped_column
from sqlalchemy import Integer, Text, TIMESTAMP, func

Base = declarative_base()

class Inventory(Base):
    __tablename__ = "inventory"
    sku: Mapped[str] = mapped_column(Text, primary_key=True)
    available_qty: Mapped[int] = mapped_column(Integer, nullable=False)
    updated_at: Mapped[str] = mapped_column(TIMESTAMP, nullable=False, server_default=func.now())
