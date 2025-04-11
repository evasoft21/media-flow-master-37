
from typing import List, Optional
from pydantic import BaseModel

class StripeConfig(BaseModel):
    id: str
    publishableKey: str
    webhookSecret: str
    testMode: bool
    successUrl: str
    cancelUrl: str
    allowPromotionCodes: bool
    collectBillingAddress: bool
    collectShippingAddress: bool
    lastUpdated: str

class PaymentSession(BaseModel):
    id: str
    customerId: str
    customerEmail: str
    amount: int
    currency: str
    status: str
    createdAt: str
    paymentMethod: str
    planId: str
