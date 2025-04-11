
from typing import List, Optional
from pydantic import BaseModel

class AdminStats(BaseModel):
    totalUsers: int
    activeUsers: int
    newUsersThisMonth: int
    totalDownloads: int
    totalRevenue: float
    averageDownloadsPerUser: float

class Invoice(BaseModel):
    id: str
    userId: str
    userName: str
    userEmail: str
    planName: str
    amount: float
    currency: str
    createdAt: str
    status: str
    paymentMethod: Optional[str] = None
    transactionId: Optional[str] = None
