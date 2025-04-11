export interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  plan: "Free" | "Pro" | "Unlimited";
  downloads: DownloadRecord[];
  downloadCount: number;
}

export interface DownloadRecord {
  id: string;
  userId: string;
  userName: string;
  videoUrl: string;
  downloadDate: string;
  fileSize: string;
  resolution: string;
  format: string;
  status?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  isRecommended?: boolean;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
  billingCycle?: "monthly" | "annually";
}

export interface Invoice {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planName: string;
  amount: number;
  currency: string;
  createdAt: string;
  status: 'Paid' | 'Pending' | 'Failed';
  paymentMethod?: string;
  transactionId?: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalDownloads: number;
  totalRevenue: number;
  averageDownloadsPerUser: number;
}

export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface VideoInfo {
  id: string;
  title: string;
  author: string;
  duration: number;
  thumbnail: string;
  formats: VideoFormat[];
  platform?: string;
  viewCount?: number;
}

export interface VideoFormat {
  id: string;
  format: string;
  quality: string;
  url: string;
  fileSize?: string;
}

export interface Platform {
  id: string;
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export interface SiteConfig {
  id: string;
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  colorScheme: ColorScheme;
  socialMedia: SocialMediaConfig[];
  landingSections: LandingPageSection[];
  faqItems: FAQItem[];
  lastUpdated: string;
}

export interface ColorScheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  isDarkMode: boolean;
}

export interface SocialMediaConfig {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
  icon: string;
}

export interface LandingPageSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  order: number;
  isActive: boolean;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface ContactInfo {
  id: string;
  companyName: string;
  address: string;
  email: string;
  phone: string;
  supportHours: string;
  formSubmissionEmail: string;
  lastUpdated: string;
}

export interface StripeConfig {
  id: string;
  publishableKey: string;
  webhookSecret: string;
  testMode: boolean;
  successUrl: string;
  cancelUrl: string;
  allowPromotionCodes: boolean;
  collectBillingAddress: boolean;
  collectShippingAddress: boolean;
  lastUpdated: string;
}

export interface LegalDocument {
  title: string;
  content: string;
  lastUpdated: string;
}

export interface PaymentSession {
  id: string;
  customerId: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  paymentMethod: string;
  planId: string;
}

export interface UserDownload {
  id: string;
  videoInfo: VideoInfo;
  downloadDate: string;
  format: VideoFormat;
  status: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  downloadLimit: number | string;
  qualityLimit: string;
  platformLimit?: string;
}
