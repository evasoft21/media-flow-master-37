
# OmniVideo FastAPI Backend

This is the FastAPI backend for the OmniVideo application.

## Setup and Installation

1. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the server:
   ```bash
   python main.py
   ```

The server will run at http://localhost:8000 by default.

## API Documentation

Once the server is running, you can view the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

- `/routes` - API route handlers
- `/models` - Pydantic models for request/response validation
- `/data` - Mock data and data handling functions

## API Endpoints

The API is organized into the following modules:
- Authentication (/api/auth)
- Video management (/api/videos)
- Admin functionality (/api/admin)
- Site configuration (/api/config)
- Legal documents (/api/legal)
- Payment processing (/api/payments)
- Settings management (/api/settings)
- Mock data retrieval (/api/data)
