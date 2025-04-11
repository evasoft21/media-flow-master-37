
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth_routes import router as auth_router
from routes.video_routes import router as video_router
from routes.admin_routes import router as admin_router
from routes.config_routes import router as config_router
from routes.legal_routes import router as legal_router
from routes.payment_routes import router as payment_router
from routes.settings_routes import router as settings_router
from routes.mockdata_routes import router as mockdata_router

app = FastAPI(title="OmniVideo API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, you should specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(video_router, prefix="/api/videos", tags=["Videos"])
app.include_router(admin_router, prefix="/api/admin", tags=["Admin"])
app.include_router(config_router, prefix="/api/config", tags=["Configuration"])
app.include_router(legal_routes, prefix="/api/legal", tags=["Legal"])
app.include_router(payment_router, prefix="/api/payments", tags=["Payments"])
app.include_router(settings_router, prefix="/api/settings", tags=["Settings"])
app.include_router(mockdata_router, prefix="/api/data", tags=["Mock Data"])

@app.get("/")
async def root():
    return {"message": "Welcome to OmniVideo API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
