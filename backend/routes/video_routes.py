
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Dict, Any
import random
from models.video import VideoInfo, VideoFormat
from data.import_data import platforms, mock_user, mock_downloads
import re
import time

router = APIRouter()

# Simple in-memory storage for video info
video_info_cache = {}

class VideoUrlRequest(BaseModel):
    url: str

class DownloadRequest(BaseModel):
    videoId: str
    formatId: str
    token: str = None

class UserDownload(BaseModel):
    id: str
    videoInfo: Dict[str, Any]
    downloadDate: str
    format: Dict[str, Any]
    status: str

def generate_video_info(url: str) -> VideoInfo:
    # Extract domain to determine platform
    domain_match = re.search(r"(?:https?:\/\/)?(?:www\.)?([^\/\s]+)", url)
    domain = domain_match.group(1) if domain_match else "youtube.com"
    
    # Determine platform name based on domain
    platform_name = "YouTube"
    if "tiktok" in domain:
        platform_name = "TikTok"
    elif "instagram" in domain:
        platform_name = "Instagram"
    elif "facebook" in domain:
        platform_name = "Facebook"
    elif "twitter" in domain or "x.com" in domain:
        platform_name = "Twitter"
    elif "vimeo" in domain:
        platform_name = "Vimeo"
    
    # Generate a video ID from the URL
    video_id = str(abs(hash(url)) % 10000)
    
    # Create formats with IDs
    formats = []
    qualities = ["240p", "360p", "480p", "720p", "1080p", "2K", "4K"]
    file_sizes = ["8.5 MB", "15.2 MB", "25.7 MB", "42.3 MB", "78.6 MB", "120.4 MB", "250.8 MB"]
    
    for i, quality in enumerate(qualities):
        if i >= len(file_sizes):
            break
            
        format_id = f"format-{quality}-{video_id}"
        formats.append({
            "format": "MP4",
            "quality": quality,
            "url": f"https://example.com/download/{video_id}/{quality}",
            "fileSize": file_sizes[i],
            "id": format_id
        })
    
    # Generate random title and author based on platform
    if platform_name == "YouTube":
        title_prefix = "How to"
        authors = ["TechGuru", "DIY Master", "Cooking Pro", "Science Explained"]
    elif platform_name == "TikTok":
        title_prefix = "Watch this"
        authors = ["@viral_creator", "@dance_star", "@funny_moments", "@life_hacks"]
    else:
        title_prefix = "Check out"
        authors = ["FashionInfluencer", "TravelDreams", "FitnessMaster", "ArtisticView"]
    
    keywords = ["amazing", "incredible", "awesome", "unbelievable", "fantastic", "easy", "quick", "fun"]
    subjects = ["recipe", "tutorial", "trick", "hack", "review", "guide", "experience", "reveal"]
    
    title = f"{title_prefix} {random.choice(keywords)} {random.choice(subjects)}!"
    author = random.choice(authors)
    duration = random.randint(30, 900)  # 30 seconds to 15 minutes
    
    # Create Video Info
    video_info = {
        "id": video_id,
        "title": title,
        "author": author,
        "duration": duration,
        "thumbnail": f"https://example.com/thumbnail/{video_id}.jpg",
        "formats": formats,
        "platform": platform_name,
        "viewCount": random.randint(1000, 1000000)
    }
    
    # Cache the video info
    video_info_cache[video_id] = video_info
    
    return video_info

@router.post("/fetch-info", response_model=VideoInfo)
async def fetch_video_info(request: VideoUrlRequest):
    if not request.url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    # Simulate processing delay
    time.sleep(1)
    
    # Generate video info based on the URL
    video_info = generate_video_info(request.url)
    
    return video_info

@router.post("/download", response_model=UserDownload)
async def download_video(request: DownloadRequest):
    # Simulate processing delay
    time.sleep(1.5)
    
    # Check if video exists in cache
    if request.videoId not in video_info_cache:
        raise HTTPException(status_code=404, detail="Video not found")
    
    video_info = video_info_cache[request.videoId]
    
    # Find the format
    format_found = None
    for fmt in video_info["formats"]:
        if fmt["id"] == request.formatId:
            format_found = fmt
            break
    
    if not format_found:
        raise HTTPException(status_code=404, detail="Format not found")
    
    # Create download record
    download_id = f"dl-{int(time.time())}"
    download_record = {
        "id": download_id,
        "videoInfo": video_info,
        "downloadDate": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "format": format_found,
        "status": "completed"
    }
    
    # If authenticated, update user's download history
    # This would normally be done in a database
    
    return download_record

@router.get("/history", response_model=list[dict])
async def get_user_downloads(token: str = None):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # In a real app, this would fetch from a database based on the user ID
    # For the mock API, we'll return sample download records
    return mock_downloads
