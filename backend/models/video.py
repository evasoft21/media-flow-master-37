
from typing import List, Optional
from pydantic import BaseModel

class VideoFormat(BaseModel):
    format: str
    quality: str
    url: str
    fileSize: Optional[str] = None
    id: str

class VideoInfo(BaseModel):
    title: str
    author: str
    duration: int
    thumbnail: str
    formats: List[VideoFormat]
    id: str
    platform: Optional[str] = None
    viewCount: Optional[int] = None
