
import { type VideoInfo } from "@/types/api";

// Define VideoQuality type locally since it's not in the API types
type VideoQuality = '240p' | '360p' | '480p' | '720p' | '1080p' | '2K' | '4K';

// Platform-specific mock thumbnails
const platformThumbnails: Record<string, string> = {
  'YouTube': 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  'TikTok': 'https://i.pinimg.com/originals/c9/6b/6e/c96b6e549899b7155e86d31b3c3b747c.jpg',
  'Facebook': 'https://cdn.pixabay.com/photo/2021/02/08/15/38/social-media-5995266_960_720.jpg',
  'Instagram': 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814055_960_720.png',
  'Twitter': 'https://cdn.pixabay.com/photo/2018/05/08/21/29/twitter-3384010_960_720.png',
  'Vimeo': 'https://cdn.pixabay.com/photo/2016/11/18/11/16/social-1834011_960_720.jpg'
};

// Platform-specific mock titles
const platformTitles: Record<string, string[]> = {
  'YouTube': [
    'Ultimate Guide to Modern Web Development',
    'The Best Tech Review of 2023',
    'How to Build Your First App in 10 Minutes'
  ],
  'TikTok': [
    'This Dance Trend Is Taking Over',
    'Wait For It... #Viral',
    'Quick Life Hack You Need to Know'
  ],
  'Facebook': [
    'Our Amazing Family Vacation 2023',
    'Company Anniversary Celebration',
    'Live Q&A Session with Our CEO'
  ],
  'Instagram': [
    'Morning Routine for Productivity',
    'Behind the Scenes of Our Photoshoot',
    'New Collection Sneak Peek'
  ],
  'Twitter': [
    'Breaking News: Tech Conference Highlights',
    'This Thread Will Change How You Think',
    'Live Update from the Event'
  ],
  'Vimeo': [
    'Award-winning Short Film: Echoes',
    'Professional Studio Setup Tutorial',
    'Cinematic Travel Montage: Japan'
  ]
};

// Mock Video Data Generator
export const generateMockVideoInfo = (url: string): VideoInfo => {
  const platformMap: Record<string, string> = {
    'youtube': 'YouTube',
    'youtu.be': 'YouTube',
    'tiktok': 'TikTok',
    'facebook': 'Facebook',
    'fb.com': 'Facebook',
    'instagram': 'Instagram',
    'twitter': 'Twitter',
    'vimeo': 'Vimeo'
  };

  // Detect platform from URL
  let detectedPlatform = 'YouTube';
  for (const [urlPart, platform] of Object.entries(platformMap)) {
    if (url.includes(urlPart)) {
      detectedPlatform = platform;
      break;
    }
  }

  // Generate a pseudorandom ID based on the URL
  const randomId = Math.random().toString(36).substring(2, 10);

  // Select a random title for the platform
  const titles = platformTitles[detectedPlatform] || platformTitles['YouTube'];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  // Generate random durations
  const minutes = Math.floor(Math.random() * 30) + 1;
  const seconds = Math.floor(Math.random() * 60);
  const paddedSeconds = seconds.toString().padStart(2, '0');
  const duration = minutes * 60 + seconds; // Convert to seconds for the API

  // Mock formats based on platform and random availability
  const formats = [
    { id: `fmt1-${randomId}`, format: 'MP4', quality: '240p', url: `https://example.com/video-240p-${randomId}.mp4`, fileSize: '10 MB' },
    { id: `fmt2-${randomId}`, format: 'MP4', quality: '360p', url: `https://example.com/video-360p-${randomId}.mp4`, fileSize: '20 MB' },
    { id: `fmt3-${randomId}`, format: 'MP4', quality: '480p', url: `https://example.com/video-480p-${randomId}.mp4`, fileSize: '40 MB' },
    { id: `fmt4-${randomId}`, format: 'MP4', quality: '720p', url: `https://example.com/video-720p-${randomId}.mp4`, fileSize: '80 MB' },
    { id: `fmt5-${randomId}`, format: 'MP4', quality: '1080p', url: `https://example.com/video-1080p-${randomId}.mp4`, fileSize: '160 MB' },
    { id: `fmt6-${randomId}`, format: 'MP4', quality: '2K', url: `https://example.com/video-2k-${randomId}.mp4`, fileSize: '300 MB' },
    { id: `fmt7-${randomId}`, format: 'MP4', quality: '4K', url: `https://example.com/video-4k-${randomId}.mp4`, fileSize: '600 MB' },
    { id: `fmt8-${randomId}`, format: 'MP3', quality: '240p', url: `https://example.com/audio-${randomId}.mp3`, fileSize: '5 MB' }
  ];

  // Randomize format availability based on platform
  let availableFormats = formats;
  if (detectedPlatform === 'TikTok' || detectedPlatform === 'Instagram') {
    // These platforms typically have fewer format options
    availableFormats = formats.slice(2, 5);
  } else if (Math.random() > 0.7) {
    // Randomly limit formats sometimes
    const formatCount = Math.floor(Math.random() * 5) + 3;
    availableFormats = formats.slice(0, formatCount);
  }

  // Generate random view count
  const viewCount = Math.floor(Math.random() * 1000000);

  return {
    id: randomId,
    title: randomTitle,
    author: 'Content Creator',
    duration: duration,
    thumbnail: platformThumbnails[detectedPlatform] || platformThumbnails['YouTube'],
    formats: availableFormats,
    platform: detectedPlatform,
    viewCount: viewCount
  };
};
