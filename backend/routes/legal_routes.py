
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from models.legal import LegalDocument, ContactInfo
from data.import_data import terms_of_service, privacy_policy, cookie_policy, contact_info
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

@router.get("/terms")
async def get_terms_of_service():
    # Simulate API delay
    time.sleep(0.6)
    return {"data": terms_of_service, "success": True}

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
    
    return {"data": updated_terms, "success": True}

@router.get("/privacy")
async def get_privacy_policy():
    # Simulate API delay
    time.sleep(0.55)
    return {"data": privacy_policy, "success": True}

@router.put("/privacy")
async def update_privacy_policy(request: UpdateContentRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Simulate API delay
    time.sleep(0.75)
    
    # Update privacy policy
    updated_policy = privacy_policy.copy()
    updated_policy["content"] = request.content
    updated_policy["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"data": updated_policy, "success": True}

@router.get("/cookies")
async def get_cookie_policy():
    # Simulate API delay
    time.sleep(0.5)
    return {"data": cookie_policy, "success": True}

@router.put("/cookies")
async def update_cookie_policy(request: UpdateContentRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Simulate API delay
    time.sleep(0.7)
    
    # Update cookie policy
    updated_policy = cookie_policy.copy()
    updated_policy["content"] = request.content
    updated_policy["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"data": updated_policy, "success": True}

@router.get("/contact")
async def get_contact_info():
    # Simulate API delay
    time.sleep(0.45)
    return {"data": contact_info, "success": True}

@router.put("/contact")
async def update_contact_info(request: UpdateContactInfoRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Simulate API delay
    time.sleep(0.65)
    
    # Update contact info
    updated_info = contact_info.copy()
    for key, value in request.dict(exclude_unset=True).items():
        updated_info[key] = value
    
    return {"data": updated_info, "success": True}
