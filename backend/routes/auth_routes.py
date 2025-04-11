
from fastapi import APIRouter, HTTPException, Depends
from models.user import LoginRequest, SignupRequest, AuthResponse, User
from data.import_data import mock_user

router = APIRouter()

# Mock database tables
users_db = {"user@example.com": mock_user}
tokens_db = {}

@router.post("/login", response_model=AuthResponse)
async def login(credentials: LoginRequest):
    if not credentials.email or not credentials.password:
        raise HTTPException(status_code=400, detail="Email and password are required")
    
    # Check if credentials match our mock user
    if credentials.email != "user@example.com":
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if credentials.password != "password":
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Create mock token
    token = f"mock-jwt-token-{credentials.email}"
    tokens_db[token] = credentials.email
    
    return {
        "token": token,
        "user": users_db[credentials.email]
    }

@router.post("/signup", response_model=AuthResponse)
async def signup(signup_data: SignupRequest):
    # Validate input
    if not signup_data.email or not signup_data.password or not signup_data.confirmPassword:
        raise HTTPException(status_code=400, detail="All fields are required")
    
    if signup_data.password != signup_data.confirmPassword:
        raise HTTPException(
            status_code=400, 
            detail="Passwords do not match",
        )
    
    if signup_data.password and len(signup_data.password) < 6:
        raise HTTPException(
            status_code=400, 
            detail="Password must be at least 6 characters",
        )
    
    # Check if user already exists
    if signup_data.email in users_db:
        raise HTTPException(status_code=409, detail="User already exists with this email")
    
    # Create new user (based on mock user but with submitted data)
    new_user = mock_user.copy()
    new_user["email"] = signup_data.email
    new_user["name"] = signup_data.name or signup_data.email.split("@")[0]
    
    # Save user (in a real app, this would save to a database)
    users_db[signup_data.email] = new_user
    
    # Create mock token
    token = f"mock-jwt-token-{signup_data.email}"
    tokens_db[token] = signup_data.email
    
    return {
        "token": token,
        "user": new_user
    }

@router.post("/logout")
async def logout():
    # In a real app, this would invalidate the token
    return {"success": True}

@router.get("/me", response_model=User)
async def get_current_user(token: str = None):
    if not token or token not in tokens_db:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    email = tokens_db[token]
    if email not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    return users_db[email]
