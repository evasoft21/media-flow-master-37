
from typing import List, Optional
from pydantic import BaseModel

class Platform(BaseModel):
    id: str
    name: str
    url: str
    icon: str
    isActive: bool

class Feature(BaseModel):
    id: str
    title: str
    description: str
    icon: str
    isActive: bool

class FAQItem(BaseModel):
    id: str
    question: str
    answer: str
    order: int
    isActive: bool

class SubscriptionPlan(BaseModel):
    id: str
    name: str
    price: float
    currency: str
    description: str
    features: List[str]
    isRecommended: Optional[bool] = None
    createdAt: str
    updatedAt: str
    isActive: Optional[bool] = True
    billingCycle: Optional[str] = "monthly"
