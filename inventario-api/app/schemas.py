from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class AvailabilityOut(BaseModel):
    sku: str
    available_qty: int
    updated_at: datetime
    source: Literal["cache","db"]
