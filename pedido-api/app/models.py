from sqlalchemy.orm import declarative_base, Mapped, mapped_column
from sqlalchemy import Integer, Text, TIMESTAMP, func, UniqueConstraint

Base = declarative_base()

class Order(Base):
    __tablename__ = "orders"
    __table_args__ = (UniqueConstraint("order_id", name="uq_orders_order_id"),)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    order_id: Mapped[str] = mapped_column(Text, nullable=False)
    sku: Mapped[str] = mapped_column(Text, nullable=False)
    qty: Mapped[int] = mapped_column(Integer, nullable=False)
    customer_id: Mapped[str] = mapped_column(Text, nullable=False)
    received_at: Mapped[str] = mapped_column(TIMESTAMP, nullable=False, server_default=func.now())
