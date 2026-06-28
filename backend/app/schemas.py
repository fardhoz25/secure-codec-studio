from pydantic import BaseModel

class ProcessResponse(BaseModel):
    status: str
    media_type: str
    original_size: int
    processed_size: int
    compression_ratio: float
    processing_time_ms: int
    message: str | None = None