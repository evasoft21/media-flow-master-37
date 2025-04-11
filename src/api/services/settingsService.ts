
import { SiteConfig, SocialMediaConfig, LandingPageSection, FAQItem, ColorScheme, ContactInfo, StripeConfig } from '@/types/api';
import { delay, createApiError } from "../utils/apiHelpers";
import { getAuthToken } from "../utils/storageHelpers";
import { faqItems } from '../data/faqItems';

// Mock settings data
const mockTermsOfService = {
  id: '1',
  title: 'Terms of Service',
  content: `# Terms of Service

## 1. Introduction

Welcome to OmniVideo. By using our service, you agree to these Terms of Service. Please read them carefully.

## 2. Definitions

"Service" refers to the OmniVideo website and all services provided by OmniVideo.
"User" refers to any individual who accesses or uses the Service.

## 3. Account Registration

To use certain features of the Service, you may need to register for an account. You agree to provide accurate information and to keep it updated.

## 4. Content Usage Rights

Users are responsible for ensuring they have the right to download any content through our Service. OmniVideo does not claim ownership of any downloaded content.

## 5. Prohibited Uses

You agree not to use the Service for any illegal purpose or in violation of any local, state, national, or international law.

## 6. Limitation of Liability

OmniVideo shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the Service.
`,
  lastUpdated: new Date().toISOString()
};

const mockPrivacyPolicy = {
  id: '1',
  title: 'Privacy Policy',
  content: `# Privacy Policy

## 1. Introduction

At OmniVideo, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.

## 2. Information We Collect

We collect information you provide directly to us, such as your name, email address, and any other information you choose to provide.

## 3. How We Use Your Information

We use your information to provide, maintain, and improve our Service, to process transactions, and to communicate with you.

## 4. Data Security

We implement reasonable measures to protect the security of your personal information.

## 5. Your Rights

Depending on your location, you may have certain rights regarding your personal information, such as the right to access or delete your data.

## 6. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
`,
  lastUpdated: new Date().toISOString()
};

const mockCookiePolicy = {
  id: '1',
  title: 'Cookie Policy',
  content: `# Cookie Policy

## 1. What Are Cookies

Cookies are small text files that are stored on your computer or mobile device when you visit a website.

## 2. How We Use Cookies

We use cookies for various purposes, including:
- To provide essential website functionality
- To remember your preferences
- To analyze how you use our website
- To personalize your experience

## 3. Types of Cookies We Use

- **Essential cookies**: These are necessary for the website to function properly.
- **Preference cookies**: These remember your settings and preferences.
- **Analytics cookies**: These help us understand how you use our website.
- **Marketing cookies**: These allow us to show you relevant advertisements.

## 4. Managing Cookies

Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "options" or "preferences" menu of your browser.

## 5. Changes to This Cookie Policy

We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
`,
  lastUpdated: new Date().toISOString()
};

const mockContactInfo: ContactInfo = {
  id: '1',
  companyName: 'OmniVideo Inc.',
  address: '123 Download Street, Web City, 94105',
  email: 'support@omnivideo-example.com',
  phone: '+1 (555) 123-4567',
  supportHours: 'Monday - Friday, 9am - 5pm PST',
  formSubmissionEmail: 'contact@omnivideo-example.com',
  lastUpdated: new Date().toISOString()
};

const mockStripeConfig: StripeConfig = {
  id: '1',
  publishableKey: 'pk_test_1234567890abcdefghijklmnopqrstuvwxyz',
  webhookSecret: 'whsec_1234567890abcdefghijklmnopqrstuvwxyz',
  testMode: true,
  successUrl: 'https://example.com/success',
  cancelUrl: 'https://example.com/cancel',
  allowPromotionCodes: true,
  collectBillingAddress: true,
  collectShippingAddress: false,
  lastUpdated: new Date().toISOString()
};

// Settings service for managing various site configurations
export const settingsService = {
  // Get terms of service
  getTermsOfService: async () => {
    // Simulate API delay
    await delay(600);
    return { success: true, data: mockTermsOfService };
  },

  // Update terms of service
  updateTermsOfService: async (content: string) => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(800);
    
    const updated = {
      ...mockTermsOfService,
      content,
      lastUpdated: new Date().toISOString()
    };
    
    return { success: true, data: updated, message: 'Terms of Service updated successfully' };
  },

  // Get privacy policy
  getPrivacyPolicy: async () => {
    // Simulate API delay
    await delay(500);
    return { success: true, data: mockPrivacyPolicy };
  },

  // Update privacy policy
  updatePrivacyPolicy: async (content: string) => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(700);
    
    const updated = {
      ...mockPrivacyPolicy,
      content,
      lastUpdated: new Date().toISOString()
    };
    
    return { success: true, data: updated, message: 'Privacy Policy updated successfully' };
  },

  // Get cookie policy
  getCookiePolicy: async () => {
    // Simulate API delay
    await delay(550);
    return { success: true, data: mockCookiePolicy };
  },

  // Update cookie policy
  updateCookiePolicy: async (content: string) => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(650);
    
    const updated = {
      ...mockCookiePolicy,
      content,
      lastUpdated: new Date().toISOString()
    };
    
    return { success: true, data: updated, message: 'Cookie Policy updated successfully' };
  },

  // Get contact information
  getContactInfo: async () => {
    // Simulate API delay
    await delay(400);
    return { success: true, data: mockContactInfo };
  },

  // Update contact information
  updateContactInfo: async (contactInfo: Partial<ContactInfo>) => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(600);
    
    const updated = {
      ...mockContactInfo,
      ...contactInfo,
      lastUpdated: new Date().toISOString()
    };
    
    return { success: true, data: updated, message: 'Contact information updated successfully' };
  },

  // Get Stripe configuration
  getStripeConfig: async () => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(500);
    
    return { success: true, data: mockStripeConfig };
  },

  // Update Stripe configuration
  updateStripeConfig: async (config: Partial<StripeConfig>) => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(700);
    
    const updated = {
      ...mockStripeConfig,
      ...config,
      lastUpdated: new Date().toISOString()
    };
    
    return { success: true, data: updated, message: 'Stripe configuration updated successfully' };
  }
};
