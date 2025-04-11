
from typing import List, Optional
from pydantic import BaseModel

class ColorScheme(BaseModel):
    id: str
    name: str
    primaryColor: str
    secondaryColor: str
    accentColor: str
    backgroundColor: str
    textColor: str
    isDarkMode: bool

class SocialMediaConfig(BaseModel):
    id: str
    platform: str
    url: str
    isActive: bool
    icon: str

class LandingPageSection(BaseModel):
    id: str
    title: str
    subtitle: Optional[str] = None
    content: str
    order: int
    isActive: bool
    imageUrl: Optional[str] = None
    buttonText: Optional[str] = None
    buttonUrl: Optional[str] = None

class SiteConfig(BaseModel):
    id: str
    siteName: str
    siteDescription: str
    logoUrl: str
    faviconUrl: str
    colorScheme: ColorScheme
    socialMedia: List[SocialMediaConfig]
    landingSections: List[LandingPageSection]
    faqItems: List[FAQItem]
    lastUpdated: str
