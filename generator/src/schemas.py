from pydantic import BaseModel, Field, RootModel
from typing import Optional

class ReviewAnalysisRequest(BaseModel):
    review_text: str

class ReviewAspect(BaseModel):
    item: str
    quotes: list[str] = Field(default_factory=list)  # Allow empty list

class ReviewAnalysisResponse(BaseModel):
    score: int
    label: str
    explanation: str
    positive: dict[str, Optional[list[ReviewAspect]]] = {}
    negative: dict[str, Optional[list[ReviewAspect]]] = {}


class ReviewAnswerResponse(BaseModel):
    answer: str

class InsightsRequest(BaseModel):
    reviews: list[str]

class ExtractionRequest(BaseModel):
    prompt: str
    
