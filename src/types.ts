/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SEOMeta {
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string;
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  price_pkr: number;
  is_signature: boolean;
  description: string;
  image?: string;
  seo?: SEOMeta;
  isActive?: boolean;
}

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  items: {
    id: string;
    name: string;
    price_pkr: number;
    quantity: number;
  }[];
  totalPrice: number;
  taxAmount: number;
  finalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  discountPercentage: number;
  isActive: boolean;
  code: string;
  bannerImage?: string;
}

export interface AdminSettings {
  taxRate: number; // e.g. 16 for 16%
  basePriceModifier: number; // multiplier, e.g. 1.0 for no change
  whatsAppNumber: string; // WhatsApp trigger phone number
  storeAddress: string;
  seoTitle: string;
  metaDescription: string;
}
