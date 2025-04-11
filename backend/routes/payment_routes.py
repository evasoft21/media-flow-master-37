
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from models.payment import StripeConfig, PaymentSession
from data.import_data import stripe_config
import time
import random
import string

router = APIRouter()

# Mock payment sessions
payment_sessions = [
    {
        "id": "cs_test_mock_session_123",
        "customerId": "cus_mock_customer_123",
        "customerEmail": "user@example.com",
        "amount": 999,
        "currency": "usd",
        "status": "succeeded",
        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(time.time() - 86400)),
        "paymentMethod": "card",
        "planId": "pro"
    },
    {
        "id": "cs_test_mock_session_456",
        "customerId": "cus_mock_customer_456",
        "customerEmail": "another@example.com",
        "amount": 1999,
        "currency": "usd",
        "status": "succeeded",
        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(time.time() - 172800)),
        "paymentMethod": "paypal",
        "planId": "unlimited"
    }
]

class CreateCheckoutRequest(BaseModel):
    planId: str

class UpdateStripeConfigRequest(BaseModel):
    publishableKey: Optional[str] = None
    webhookSecret: Optional[str] = None
    testMode: Optional[bool] = None
    successUrl: Optional[str] = None
    cancelUrl: Optional[str] = None
    allowPromotionCodes: Optional[bool] = None
    collectBillingAddress: Optional[bool] = None
    collectShippingAddress: Optional[bool] = None

@router.post("/checkout-session")
async def create_checkout_session(request: CreateCheckoutRequest):
    # Simulate API delay
    time.sleep(0.6)
    
    # Generate a random session ID
    letters = string.ascii_lowercase + string.digits
    session_id = 'cs_test_' + ''.join(random.choice(letters) for i in range(12))
    
    return {
        "data": {
            "sessionId": session_id,
            "url": f"/payment-success?session_id={session_id}&plan_id={request.planId}"
        },
        "success": True
    }

@router.get("/payment-session/{session_id}")
async def get_payment_session(session_id: str):
    # Simulate API delay
    time.sleep(0.5)
    
    # Find existing session or create a mock one
    session = next((s for s in payment_sessions if s["id"] == session_id), None)
    if not session:
        letters = string.ascii_lowercase + string.digits
        customer_id = 'cus_mock_' + ''.join(random.choice(letters) for i in range(12))
        
        session = {
            "id": session_id,
            "customerId": customer_id,
            "customerEmail": "customer@example.com",
            "amount": 999,
            "currency": "usd",
            "status": "succeeded",
            "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "paymentMethod": "card",
            "planId": "pro"
        }
    
    return {"data": session, "success": True}

@router.get("/stripe-config")
async def get_stripe_config():
    # Simulate API delay
    time.sleep(0.4)
    return {"data": stripe_config, "success": True}

@router.put("/stripe-config")
async def update_stripe_config(request: UpdateStripeConfigRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Simulate API delay
    time.sleep(0.7)
    
    # Update Stripe config
    updated_config = stripe_config.copy()
    for key, value in request.dict(exclude_unset=True).items():
        updated_config[key] = value
    
    updated_config["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"data": updated_config, "success": True, "message": "Stripe configuration updated successfully"}
