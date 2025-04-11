
from typing import Optional
from pydantic import BaseModel

class LegalDocument(BaseModel):
    title: str
    content: str
    lastUpdated: str

class ContactInfo(BaseModel):
    id: str
    companyName: str
    address: str
    email: str
    phone: str
    supportHours: str
    formSubmissionEmail: str
    lastUpdated: str
