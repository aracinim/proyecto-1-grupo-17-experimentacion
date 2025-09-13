from pydantic import BaseModel, Field, field_validator

class OrderIn(BaseModel):
    order_id: str = Field(min_length=1)
    sku: str = Field(min_length=1)
    qty: int = Field(gt=0)
    customer_id: str = Field(min_length=1)

    @field_validator("order_id","sku","customer_id")
    @classmethod
    def no_spaces(cls, v: str):
        if not v.strip():
            raise ValueError("no puede ser vacío")
        return v.strip()

class Ack(BaseModel):
    status: str = "accepted"
