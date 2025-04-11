
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

class DownloadRecord(BaseModel):
    id: str
    userId: str
    userName: str
    videoUrl: str
    downloadDate: str
    fileSize: str
    resolution: str
    format: str

class User(BaseModel):
    id: str
    name: str
    email: str
    registrationDate: str
    plan: str = Field(..., pattern="^(Free|Pro|Unlimited)$")
    downloads: List[DownloadRecord] = []
    downloadCount: int = 0

class LoginRequest(BaseModel):
    email: str
    password: str
    rememberMe: Optional[bool] = False

class SignupRequest(BaseModel):
    email: str
    password: str
    confirmPassword: str
    name: Optional[str] = None

class AuthResponse(BaseModel):
    token: str
    user: User
