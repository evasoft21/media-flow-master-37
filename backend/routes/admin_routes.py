
from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from pydantic import BaseModel
from models.admin import AdminStats, Invoice
from models.user import User, DownloadRecord
from models.content import SubscriptionPlan
from data.import_data import admin_stats, mock_invoices, mock_downloads, mock_user, pricing_plans

router = APIRouter()

class PaginatedResponse(BaseModel):
    page: int
    limit: int
    totalCount: int
    totalPages: int

class UsersResponse(PaginatedResponse):
    users: List[User]

class InvoicesResponse(PaginatedResponse):
    invoices: List[Invoice]

class DownloadsResponse(PaginatedResponse):
    downloads: List[DownloadRecord]

class CreateUserRequest(BaseModel):
    name: str
    email: str
    plan: str

class CreatePlanRequest(BaseModel):
    name: str
    price: float
    currency: str
    description: str
    features: List[str]
    isRecommended: Optional[bool] = False

@router.get("/stats", response_model=AdminStats)
async def get_admin_stats(token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    return admin_stats

@router.get("/users", response_model=UsersResponse)
async def get_users(
    page: int = 1, 
    limit: int = 10,
    token: str = None
):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # In a real app, this would fetch from a database with pagination
    # For the mock API, we'll just return a mock user list
    mock_users = [mock_user]
    
    # Add more mock users for demonstration
    for i in range(1, 20):
        new_user = mock_user.copy()
        new_user["id"] = f"user-{i+1}"
        new_user["name"] = f"User {i+1}"
        new_user["email"] = f"user{i+1}@example.com"
        mock_users.append(new_user)
    
    # Calculate pagination
    start_index = (page - 1) * limit
    end_index = start_index + limit
    paginated_users = mock_users[start_index:end_index]
    total_pages = (len(mock_users) + limit - 1) // limit
    
    return {
        "users": paginated_users,
        "totalCount": len(mock_users),
        "page": page,
        "limit": limit,
        "totalPages": total_pages
    }

@router.get("/users/{user_id}", response_model=User)
async def get_user_by_id(user_id: str, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # In a real app, this would fetch from a database
    # For the mock API, we'll just check if it's our mock user
    if user_id == mock_user["id"]:
        return mock_user
    
    # For other IDs, generate a mock user
    if user_id.startswith("user-"):
        try:
            user_num = int(user_id.split("-")[1])
            new_user = mock_user.copy()
            new_user["id"] = user_id
            new_user["name"] = f"User {user_num}"
            new_user["email"] = f"user{user_num}@example.com"
            return new_user
        except:
            pass
    
    raise HTTPException(status_code=404, detail="User not found")

@router.post("/users", response_model=User)
async def add_user(user_data: CreateUserRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # In a real app, this would save to a database
    # For the mock API, we'll just return a new mock user
    new_user = mock_user.copy()
    new_user["id"] = f"user-{int(time.time())}"
    new_user["name"] = user_data.name
    new_user["email"] = user_data.email
    new_user["plan"] = user_data.plan
    new_user["downloads"] = []
    new_user["downloadCount"] = 0
    
    return new_user

@router.delete("/users/{user_id}")
async def delete_user(user_id: str, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # In a real app, this would delete from a database
    # For the mock API, we'll just return success
    return {"success": True}

@router.get("/plans", response_model=List[SubscriptionPlan])
async def get_subscription_plans(token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    return pricing_plans

@router.get("/plans/{plan_id}", response_model=SubscriptionPlan)
async def get_plan_by_id(plan_id: str, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find plan by ID
    for plan in pricing_plans:
        if plan["id"] == plan_id:
            return plan
    
    raise HTTPException(status_code=404, detail="Plan not found")

@router.post("/plans", response_model=SubscriptionPlan)
async def create_plan(plan_data: CreatePlanRequest, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # In a real app, this would save to a database
    # For the mock API, we'll just return a new mock plan
    import time
    new_plan = {
        "id": f"plan-{int(time.time())}",
        "name": plan_data.name,
        "price": plan_data.price,
        "currency": plan_data.currency,
        "description": plan_data.description,
        "features": plan_data.features,
        "isRecommended": plan_data.isRecommended,
        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "isActive": True,
        "billingCycle": "monthly"
    }
    
    return new_plan

@router.put("/plans/{plan_id}", response_model=SubscriptionPlan)
async def update_plan(plan_id: str, plan_data: dict, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find plan by ID
    for plan in pricing_plans:
        if plan["id"] == plan_id:
            # In a real app, this would update in a database
            # For the mock API, we'll just return the updated plan
            updated_plan = plan.copy()
            for key, value in plan_data.items():
                if key in updated_plan:
                    updated_plan[key] = value
            updated_plan["updatedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            return updated_plan
    
    raise HTTPException(status_code=404, detail="Plan not found")

@router.delete("/plans/{plan_id}")
async def delete_plan(plan_id: str, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # In a real app, this would delete from a database
    # For the mock API, we'll just return success
    return {"success": True}

@router.get("/invoices", response_model=InvoicesResponse)
async def get_invoices(
    page: int = 1, 
    limit: int = 10,
    token: str = None
):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Calculate pagination
    start_index = (page - 1) * limit
    end_index = start_index + limit
    paginated_invoices = mock_invoices[start_index:end_index]
    total_pages = (len(mock_invoices) + limit - 1) // limit
    
    return {
        "invoices": paginated_invoices,
        "totalCount": len(mock_invoices),
        "page": page,
        "limit": limit,
        "totalPages": total_pages
    }

@router.get("/invoices/{invoice_id}", response_model=Invoice)
async def get_invoice_by_id(invoice_id: str, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find invoice by ID
    for invoice in mock_invoices:
        if invoice["id"] == invoice_id:
            return invoice
    
    raise HTTPException(status_code=404, detail="Invoice not found")

@router.get("/downloads", response_model=DownloadsResponse)
async def get_downloads(
    page: int = 1, 
    limit: int = 10,
    token: str = None
):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Calculate pagination
    start_index = (page - 1) * limit
    end_index = start_index + limit
    paginated_downloads = mock_downloads[start_index:end_index]
    total_pages = (len(mock_downloads) + limit - 1) // limit
    
    return {
        "downloads": paginated_downloads,
        "totalCount": len(mock_downloads),
        "page": page,
        "limit": limit,
        "totalPages": total_pages
    }

@router.get("/downloads/{download_id}", response_model=DownloadRecord)
async def get_download_by_id(download_id: str, token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find download by ID
    for download in mock_downloads:
        if download["id"] == download_id:
            return download
    
    raise HTTPException(status_code=404, detail="Download record not found")
