
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from models.legal import LegalDocument, ContactInfo
from models.payment import StripeConfig
from data.import_data import terms_of_service, privacy_policy, cookie_policy, contact_info, stripe_config
import time

router = APIRouter()

class UpdateContentRequest(BaseModel):
    content: str

class UpdateContactInfoRequest(BaseModel):
    companyName: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    supportHours: Optional[str] = None
    formSubmissionEmail: Optional[str] = None

class UpdateStripeConfigRequest(BaseModel):
    publishableKey: Optional[str] = None
    webhookSecret: Optional[str] = None
    testMode: Optional[bool] = None
    successUrl: Optional[str] = None
    cancelUrl: Optional[str] = None
    allowPromotionCodes: Optional[bool] = None
    collectBillingAddress: Optional[bool] = None
    collectShippingAddress: Optional[bool] = None

@router.get("/terms")
async def get_terms_of_service():
    # Simulate API delay
    time.sleep(0.6)
    return {"success": True, "data": terms_of_service}

@router.put("/terms")
async def update_terms_of_service(request: UpdateContentRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Simulate API delay
    time.sleep(0.8)
    
    # Update terms of service
    updated_terms = terms_of_service.copy()
    updated_terms["content"] = request.content
    updated_terms["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"success": True, "data": updated_terms, "message": "Terms of Service updated successfully"}

@router.get("/privacy")
async def get_privacy_policy():
    # Simulate API delay
    time.sleep(0.5)
    return {"success": True, "data": privacy_policy}

@router.put("/privacy")
async def update_privacy_policy(request: UpdateContentRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Simulate API delay
    time.sleep(0.7)
    
    # Update privacy policy
    updated_policy = privacy_policy.copy()
    updated_policy["content"] = request.content
    updated_policy["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"success": True, "data": updated_policy, "message": "Privacy Policy updated successfully"}

@router.get("/cookies")
async def get_cookie_policy():
    # Simulate API delay
    time.sleep(0.55)
    return {"success": True, "data": cookie_policy}

@router.put("/cookies")
async def update_cookie_policy(request: UpdateContentRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Simulate API delay
    time.sleep(0.65)
    
    # Update cookie policy
    updated_policy = cookie_policy.copy()
    updated_policy["content"] = request.content
    updated_policy["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"success": True, "data": updated_policy, "message": "Cookie Policy updated successfully"}

@router.get("/contact")
async def get_contact_info():
    # Simulate API delay
    time.sleep(0.4)
    return {"success": True, "data": contact_info}

@router.put("/contact")
async def update_contact_info(request: UpdateContactInfoRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Simulate API delay
    time.sleep(0.6)
    
    # Update contact info
    updated_info = contact_info.copy()
    for key, value in request.dict(exclude_unset=True).items():
        updated_info[key] = value
    
    updated_info["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"success": True, "data": updated_info, "message": "Contact information updated successfully"}

@router.get("/stripe")
async def get_stripe_config(token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Simulate API delay
    time.sleep(0.5)
    return {"success": True, "data": stripe_config}

@router.put("/stripe")
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
    
    return {"success": True, "data": updated_config, "message": "Stripe configuration updated successfully"}
