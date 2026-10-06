export interface ServiceItem {
  id: string;
  title: string;
  category: 'hair' | 'skin' | 'makeup' | 'nails' | 'makeover' | 'academy';
  description: string;
  price?: number;
  priceDisplay?: string;
  duration?: string;
  image: string;
  popular?: boolean;
}

export interface OfferItem {
  id: string;
  title: string;
  discount: string;
  code: string;
  description: string;
  includes: string[];
  price: string;
  originalPrice: string;
  validTill: string;
  badge: string;
  bgStyle?: string;
}

export interface Booking {
  id: string;
  created_at?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  service_id: string;
  service_title: string;
  booking_date: string;
  booking_time: string;
  stylist_preference?: string;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_price?: number;
}

export interface Review {
  id: string;
  created_at?: string;
  author_name: string;
  author_role?: string;
  location: string;
  rating: number;
  content: string;
  avatar?: string;
  is_approved: boolean;
}

export interface Inquiry {
  id: string;
  created_at?: string;
  name: string;
  phone: string;
  email?: string;
  service_interest?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface AcademyCourse {
  id: string;
  title: string;
  duration: string;
  description: string;
  curriculum: string[];
  certification: string;
  level: string;
}

export interface SalonInfo {
  name: string;
  shortName: string;
  tagline: string;
  subtagline: string;
  location: string;
  phone: string;
  phoneDisplay: string;
  secondaryPhone: string;
  email: string;
  instagram: string;
  hours: string;
  yearsActive: string;
  happyClients: string;
  satisfactionRate: string;
  aboutText: string;
  vision: string;
  mission: string;
  value: string;
  announcement?: string;
}
