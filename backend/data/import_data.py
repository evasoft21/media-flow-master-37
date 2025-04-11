
import json
import os

# Function to read JSON data from files
def read_json_file(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            return json.load(file)
    return None

# Add mock data from the frontend project
# In a real project, you would load this from a database
# For this example, we'll create mock data here

# Mock user data
mock_user = {
    "id": "user-1",
    "name": "Demo User",
    "email": "user@example.com",
    "registrationDate": "2023-01-15T08:30:00Z",
    "plan": "Pro",
    "downloads": [],
    "downloadCount": 0
}

# Mock platforms
platforms = [
    {
        "id": "1",
        "name": "YouTube",
        "url": "https://youtube.com",
        "icon": "Youtube",
        "isActive": True
    },
    {
        "id": "2",
        "name": "TikTok",
        "url": "https://tiktok.com",
        "icon": "TikTok",
        "isActive": True
    },
    {
        "id": "3",
        "name": "Facebook",
        "url": "https://facebook.com",
        "icon": "Facebook",
        "isActive": True
    },
    {
        "id": "4",
        "name": "Instagram",
        "url": "https://instagram.com",
        "icon": "Instagram",
        "isActive": True
    },
    {
        "id": "5",
        "name": "Twitter",
        "url": "https://twitter.com",
        "icon": "Twitter",
        "isActive": True
    },
    {
        "id": "6",
        "name": "Vimeo",
        "url": "https://vimeo.com",
        "icon": "Vimeo",
        "isActive": True
    }
]

# Mock features
features = [
    {
        "id": "1",
        "title": "Multi-Platform Support",
        "description": "Download videos from YouTube, TikTok, Instagram, and more",
        "icon": "Globe",
        "isActive": True
    },
    {
        "id": "2",
        "title": "High-Quality Downloads",
        "description": "Download videos in up to 4K resolution",
        "icon": "BarChart4",
        "isActive": True
    },
    {
        "id": "3",
        "title": "Fast Processing",
        "description": "Our optimized servers process your downloads quickly",
        "icon": "Zap",
        "isActive": True
    },
    {
        "id": "4",
        "title": "Multiple Formats",
        "description": "Download in MP4, MKV, or convert to MP3 audio",
        "icon": "FileType",
        "isActive": True
    },
    {
        "id": "5",
        "title": "No Software Required",
        "description": "Everything works in your browser, no downloads needed",
        "icon": "Globe",
        "isActive": True
    },
    {
        "id": "6",
        "title": "Download History",
        "description": "Keep track of all your downloaded videos",
        "icon": "Clock",
        "isActive": True
    },
    {
        "id": "7",
        "title": "Cloud Storage Integration",
        "description": "Save directly to Google Drive or Dropbox",
        "icon": "Cloud",
        "isActive": True
    },
    {
        "id": "8",
        "title": "Secure Downloads",
        "description": "All transfers are encrypted and secure",
        "icon": "Shield",
        "isActive": True
    }
]

# Mock FAQ items
faq_items = [
    {
        "id": "1",
        "question": "How does OmniVideo work?",
        "answer": "OmniVideo extracts video data from various platforms and allows you to download them for offline viewing. Simply paste a video URL and click the Download button.",
        "order": 1,
        "isActive": True
    },
    {
        "id": "2",
        "question": "Is OmniVideo free to use?",
        "answer": "We offer a free plan with limited features, as well as paid plans for more advanced functionality. Check our pricing page for details.",
        "order": 2,
        "isActive": True
    },
    {
        "id": "3",
        "question": "What video platforms are supported?",
        "answer": "OmniVideo supports YouTube, TikTok, Facebook, Instagram, Twitter, Vimeo, and many more platforms.",
        "order": 3,
        "isActive": True
    },
    {
        "id": "4",
        "question": "What is the highest quality I can download?",
        "answer": "Free users can download videos up to 720p. Pro users can download up to 1080p. Unlimited plan users can download videos in their original quality, up to 4K.",
        "order": 4,
        "isActive": True
    },
    {
        "id": "5",
        "question": "Is it legal to download videos?",
        "answer": "Downloading videos for personal use is generally acceptable, but redistributing copyrighted content is not. Always respect copyright laws and the terms of service of the platforms.",
        "order": 5,
        "isActive": True
    },
    {
        "id": "6",
        "question": "Why do I need to create an account?",
        "answer": "An account allows you to keep track of your download history and access premium features. Free users can download a limited number of videos without an account.",
        "order": 6,
        "isActive": True
    },
    {
        "id": "7",
        "question": "How do I cancel my subscription?",
        "answer": "You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
        "order": 7,
        "isActive": True
    }
]

# Mock pricing plans
pricing_plans = [
    {
        "id": "free",
        "name": "Free",
        "price": 0,
        "currency": "USD",
        "description": "Basic video downloads for casual users",
        "features": [
            "5 downloads per day",
            "Up to 720p quality",
            "MP4 format only",
            "Basic video platforms"
        ],
        "isRecommended": False,
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z",
        "isActive": True,
        "billingCycle": "monthly"
    },
    {
        "id": "pro",
        "name": "Pro",
        "price": 9.99,
        "currency": "USD",
        "description": "Advanced features for regular users",
        "features": [
            "30 downloads per day",
            "Up to 1080p quality",
            "Multiple formats (MP4, MKV)",
            "Audio extraction (MP3)",
            "All supported platforms",
            "Download history"
        ],
        "isRecommended": True,
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z",
        "isActive": True,
        "billingCycle": "monthly"
    },
    {
        "id": "unlimited",
        "name": "Unlimited",
        "price": 19.99,
        "currency": "USD",
        "description": "Complete access for power users",
        "features": [
            "Unlimited downloads",
            "Up to 4K quality",
            "All formats supported",
            "Batch downloading",
            "Cloud storage integration",
            "Priority processing",
            "Premium support"
        ],
        "isRecommended": False,
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z",
        "isActive": True,
        "billingCycle": "monthly"
    }
]

# Terms of service
terms_of_service = {
    "title": "Terms of Service",
    "content": "# Terms of Service\n\n## 1. Acceptance of Terms\n\nBy accessing and using OmniVideo services, you agree to be bound by these Terms of Service.\n\n## 2. Description of Service\n\nOmniVideo provides video downloading services from various platforms for personal use only.\n\n## 3. User Responsibilities\n\nUsers must comply with copyright laws and platform terms of service when using our services.\n\n## 4. Intellectual Property Rights\n\nUsers agree not to use downloaded content for commercial purposes without proper licensing.\n\n## 5. Privacy Policy\n\nOur Privacy Policy governs the collection and use of personal information.\n\n## 6. Limitation of Liability\n\nOmniVideo is not responsible for misuse of downloaded content by users.\n\n## 7. Changes to Terms\n\nWe reserve the right to modify these terms at any time with notice to users.\n\n## 8. Termination\n\nWe may terminate service access for violations of these terms.\n\n## 9. Governing Law\n\nThese terms are governed by applicable laws.\n\n## 10. Contact Information\n\nFor questions about these terms, please contact support@omnivideo.example.com.",
    "lastUpdated": "2023-06-01T00:00:00Z"
}

# Privacy policy
privacy_policy = {
    "title": "Privacy Policy",
    "content": "# Privacy Policy\n\n## Introduction\n\nThis Privacy Policy explains how OmniVideo collects, uses, and protects your personal information.\n\n## Information We Collect\n\nWe collect information you provide directly, such as account details and usage information.\n\n## How We Use Your Information\n\nYour information helps us provide, improve, and protect our services.\n\n## Information Sharing and Disclosure\n\nWe do not sell your personal information to third parties.\n\n## Security\n\nWe implement security measures to protect your personal information.\n\n## Your Rights\n\nYou have rights regarding your personal data, including access and deletion.\n\n## Changes to This Policy\n\nWe may update this policy periodically with notice to users.\n\n## Contact Us\n\nIf you have questions about this policy, please contact privacy@omnivideo.example.com.",
    "lastUpdated": "2023-06-01T00:00:00Z"
}

# Cookie policy
cookie_policy = {
    "title": "Cookie Policy",
    "content": "# Cookie Policy\n\n## What Are Cookies\n\nCookies are small text files stored on your device when you visit our website.\n\n## How We Use Cookies\n\nWe use cookies to enhance your browsing experience and analyze site traffic.\n\n## Types of Cookies We Use\n\n### Essential Cookies\nRequired for basic website functionality.\n\n### Performance Cookies\nHelp us understand how visitors interact with our website.\n\n### Functionality Cookies\nAllow us to remember your preferences.\n\n### Targeting/Advertising Cookies\nUsed to deliver relevant advertisements.\n\n## Managing Cookies\n\nMost web browsers allow cookie control through their settings.\n\n## Changes to This Policy\n\nWe may update this policy periodically with notice to users.\n\n## Contact Us\n\nIf you have questions about our cookie usage, please contact cookies@omnivideo.example.com.",
    "lastUpdated": "2023-06-01T00:00:00Z"
}

# Contact info
contact_info = {
    "id": "1",
    "companyName": "OmniVideo, Inc.",
    "address": "123 Tech Lane, San Francisco, CA 94107",
    "email": "contact@omnivideo.example.com",
    "phone": "+1 (555) 123-4567",
    "supportHours": "Monday-Friday, 9:00 AM - 6:00 PM PST",
    "formSubmissionEmail": "support@omnivideo.example.com",
    "lastUpdated": "2023-06-01T00:00:00Z"
}

# Stripe config
stripe_config = {
    "id": "1",
    "publishableKey": "pk_test_mock_publishable_key",
    "webhookSecret": "whsec_mock_webhook_secret",
    "testMode": True,
    "successUrl": "/payment-success",
    "cancelUrl": "/payment-cancelled",
    "allowPromotionCodes": True,
    "collectBillingAddress": True,
    "collectShippingAddress": False,
    "lastUpdated": "2023-06-01T00:00:00Z"
}

# Admin statistics
admin_stats = {
    "totalUsers": 1250,
    "activeUsers": 723,
    "newUsersThisMonth": 186,
    "totalDownloads": 28976,
    "totalRevenue": 12739.85,
    "averageDownloadsPerUser": 23.18
}

# Mock invoices
mock_invoices = [
    {
        "id": "inv-001",
        "userId": "user-1",
        "userName": "John Doe",
        "userEmail": "john.doe@example.com",
        "planName": "Pro",
        "amount": 9.99,
        "currency": "USD",
        "createdAt": "2023-05-01T10:30:00Z",
        "status": "Paid",
        "paymentMethod": "Credit Card",
        "transactionId": "tx-12345"
    },
    {
        "id": "inv-002",
        "userId": "user-2",
        "userName": "Jane Smith",
        "userEmail": "jane.smith@example.com",
        "planName": "Unlimited",
        "amount": 19.99,
        "currency": "USD",
        "createdAt": "2023-05-02T14:45:00Z",
        "status": "Paid",
        "paymentMethod": "PayPal",
        "transactionId": "tx-23456"
    }
]

# Mock downloads
mock_downloads = [
    {
        "id": "dl-001",
        "userId": "user-1",
        "userName": "John Doe",
        "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "downloadDate": "2023-05-05T08:30:00Z",
        "fileSize": "35.4 MB",
        "resolution": "1080p",
        "format": "MP4"
    },
    {
        "id": "dl-002",
        "userId": "user-2",
        "userName": "Jane Smith",
        "videoUrl": "https://www.tiktok.com/@user/video/1234567890",
        "downloadDate": "2023-05-06T12:15:00Z",
        "fileSize": "18.2 MB",
        "resolution": "720p",
        "format": "MP4"
    }
]
