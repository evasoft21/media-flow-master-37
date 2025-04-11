
from fastapi import APIRouter
from data.import_data import platforms, features, faq_items, pricing_plans, mock_user
import time

router = APIRouter()

@router.get("/platforms")
async def get_platforms():
    # Simulate API delay
    time.sleep(0.3)
    return platforms

@router.get("/features")
async def get_features():
    # Simulate API delay
    time.sleep(0.4)
    return features

@router.get("/faq-items")
async def get_faq_items():
    # Simulate API delay
    time.sleep(0.35)
    return faq_items

@router.get("/pricing-plans")
async def get_pricing_plans():
    # Simulate API delay
    time.sleep(0.5)
    return pricing_plans

@router.get("/mock-user")
async def get_mock_user():
    # Simulate API delay
    time.sleep(0.3)
    return mock_user
