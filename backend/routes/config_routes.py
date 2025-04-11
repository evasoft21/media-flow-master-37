
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from models.config import SiteConfig, ColorScheme, SocialMediaConfig, LandingPageSection
from models.content import FAQItem
from data.import_data import platforms, features, faq_items, pricing_plans
import time

router = APIRouter()

# Mock site configuration
color_scheme = {
    "id": "1",
    "name": "Default Theme",
    "primaryColor": "#8B5CF6",
    "secondaryColor": "#1A1F2C",
    "accentColor": "#1EAEDB",
    "backgroundColor": "#1A1F2C",
    "textColor": "#FFFFFF",
    "isDarkMode": True
}

social_media = [
    {
        "id": "1",
        "platform": "Facebook",
        "url": "https://facebook.com/omnivideo",
        "isActive": True,
        "icon": "Facebook"
    },
    {
        "id": "2",
        "platform": "Instagram",
        "url": "https://instagram.com/omnivideo",
        "isActive": True,
        "icon": "Instagram"
    },
    {
        "id": "3",
        "platform": "Twitter",
        "url": "https://twitter.com/omnivideo",
        "isActive": True,
        "icon": "Twitter"
    },
    {
        "id": "4",
        "platform": "YouTube",
        "url": "https://youtube.com/omnivideo",
        "isActive": False,
        "icon": "Youtube"
    },
    {
        "id": "5",
        "platform": "LinkedIn",
        "url": "https://linkedin.com/company/omnivideo",
        "isActive": False,
        "icon": "Linkedin"
    }
]

landing_sections = [
    {
        "id": "1",
        "title": "Download Videos From Any Platform",
        "subtitle": "Fast, Easy, and Secure",
        "content": "OmniVideo allows you to download videos from popular platforms like YouTube, TikTok, Instagram, and more. Get started right away with no software to install.",
        "order": 1,
        "isActive": True,
        "imageUrl": "/placeholder.svg",
        "buttonText": "Try Now",
        "buttonUrl": "#download"
    },
    {
        "id": "2",
        "title": "Multiple Quality Options",
        "subtitle": "From SD to 4K",
        "content": "Choose the perfect quality for your needs. Our platform supports downloads from 240p all the way up to 4K resolutions, depending on the source video.",
        "order": 2,
        "isActive": True,
        "imageUrl": "/placeholder.svg"
    },
    {
        "id": "3",
        "title": "Subscription Plans for Every Need",
        "content": "Whether you're a casual user or a power downloader, we have plans to suit your needs. Free users can get started immediately, while premium plans unlock advanced features.",
        "order": 3,
        "isActive": True,
        "buttonText": "See Plans",
        "buttonUrl": "/pricing"
    },
    {
        "id": "4",
        "title": "Company Values",
        "subtitle": "Our Mission",
        "content": "We believe in providing easy access to online content while respecting copyright laws. Our mission is to build tools that empower users to save content for personal use.",
        "order": 4,
        "isActive": False
    }
]

site_config = {
    "id": "1",
    "siteName": "OmniVideo",
    "siteDescription": "Download videos from any platform",
    "logoUrl": "/placeholder.svg",
    "faviconUrl": "/favicon.ico",
    "colorScheme": color_scheme,
    "socialMedia": social_media,
    "landingSections": landing_sections,
    "faqItems": faq_items,
    "lastUpdated": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
}

class UpdateSiteConfigRequest(BaseModel):
    siteName: Optional[str] = None
    siteDescription: Optional[str] = None
    logoUrl: Optional[str] = None
    faviconUrl: Optional[str] = None

@router.get("/site")
async def get_site_config():
    # Simulate API delay
    time.sleep(0.5)
    return {"data": site_config, "success": True}

@router.put("/site")
async def update_site_config(config_data: UpdateSiteConfigRequest):
    # Simulate API delay
    time.sleep(0.8)
    
    # Update site config with the provided data
    for key, value in config_data.dict(exclude_unset=True).items():
        site_config[key] = value
    
    site_config["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"data": site_config, "success": True, "message": "Site configuration updated successfully"}

@router.put("/social-media")
async def update_social_media(social_media_data: List[dict]):
    # Simulate API delay
    time.sleep(0.6)
    
    # Update social media settings
    site_config["socialMedia"] = social_media_data
    site_config["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"data": site_config, "success": True, "message": "Social media settings updated successfully"}

@router.put("/landing-sections")
async def update_landing_sections(sections_data: List[dict]):
    # Simulate API delay
    time.sleep(0.7)
    
    # Sort sections by order
    sorted_sections = sorted(sections_data, key=lambda x: x.get("order", 999))
    
    # Update landing sections
    site_config["landingSections"] = sorted_sections
    site_config["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"data": site_config, "success": True, "message": "Landing page sections updated successfully"}

@router.put("/faqs")
async def update_faqs(faqs_data: List[dict]):
    # Simulate API delay
    time.sleep(0.5)
    
    # Update FAQ items
    site_config["faqItems"] = faqs_data
    site_config["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"data": site_config, "success": True, "message": "FAQ items updated successfully"}

@router.put("/color-scheme")
async def update_color_scheme(color_scheme_data: dict):
    # Simulate API delay
    time.sleep(0.6)
    
    # Update color scheme
    site_config["colorScheme"] = color_scheme_data
    site_config["lastUpdated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    return {"data": site_config, "success": True, "message": "Color scheme updated successfully"}
