import { supabase, isSupabaseConfigured, realtimeBus } from '../lib/supabase';
import { Booking, Review, Inquiry, ServiceItem, SalonInfo, OfferItem } from '../types';
import { INITIAL_SERVICES, INITIAL_REVIEWS, INITIAL_OFFERS, SALON_INFO } from '../data/initialData';

const STORAGE_KEYS = {
  BOOKINGS: 'bushra_bookings_store',
  REVIEWS: 'bushra_reviews_store',
  INQUIRIES: 'bushra_inquiries_store',
  SERVICES: 'bushra_services_store',
  OFFERS: 'bushra_offers_store',
  SALON_INFO: 'bushra_salon_info_store',
};

// Seed LocalStorage helpers
function getLocal<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(item);
  } catch (e) {
    return defaultVal;
  }
}

function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Local storage write failed', e);
  }
}

// Purge any legacy sample dummy data
try {
  if (typeof window !== 'undefined') {
    const cachedBks = getLocal<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    const cleanBks = cachedBks.filter(b => !b.id.startsWith('bk-sample'));
    if (cleanBks.length !== cachedBks.length) {
      setLocal(STORAGE_KEYS.BOOKINGS, cleanBks);
    }

    const cachedInqs = getLocal<Inquiry[]>(STORAGE_KEYS.INQUIRIES, []);
    const cleanInqs = cachedInqs.filter(i => !i.id.startsWith('inq-sample'));
    if (cleanInqs.length !== cachedInqs.length) {
      setLocal(STORAGE_KEYS.INQUIRIES, cleanInqs);
    }
  }
} catch (e) {}

export const api = {
  // SALON INFO / SETTINGS
  async getSalonInfo(): Promise<SalonInfo> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('salon_info').select('*').eq('id', 'main').single();
        if (!error && data) {
          const mapped: SalonInfo = {
            name: data.name || SALON_INFO.name,
            shortName: data.short_name || SALON_INFO.shortName,
            tagline: data.tagline || SALON_INFO.tagline,
            subtagline: data.subtagline || SALON_INFO.subtagline,
            location: data.location || SALON_INFO.location,
            phone: data.phone || SALON_INFO.phone,
            phoneDisplay: data.phone_display || SALON_INFO.phoneDisplay,
            secondaryPhone: data.secondary_phone || SALON_INFO.secondaryPhone,
            email: data.email || SALON_INFO.email,
            instagram: data.instagram || SALON_INFO.instagram,
            hours: data.hours || SALON_INFO.hours,
            yearsActive: data.years_active || SALON_INFO.yearsActive,
            happyClients: data.happy_clients || SALON_INFO.happyClients,
            satisfactionRate: data.satisfaction_rate || SALON_INFO.satisfactionRate,
            aboutText: data.about_text || SALON_INFO.aboutText,
            vision: data.vision || SALON_INFO.vision,
            mission: data.mission || SALON_INFO.mission,
            value: data.value || SALON_INFO.value,
            announcement: data.announcement,
          };
          setLocal(STORAGE_KEYS.SALON_INFO, mapped);
          return mapped;
        }
      } catch (err) {
        console.warn('Supabase salon_info fallback to local storage:', err);
      }
    }
    return getLocal<SalonInfo>(STORAGE_KEYS.SALON_INFO, SALON_INFO as SalonInfo);
  },

  async updateSalonInfo(info: Partial<SalonInfo>): Promise<SalonInfo> {
    const current = getLocal<SalonInfo>(STORAGE_KEYS.SALON_INFO, SALON_INFO as SalonInfo);
    const updated = { ...current, ...info };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('salon_info').upsert({
          id: 'main',
          name: updated.name,
          short_name: updated.shortName,
          tagline: updated.tagline,
          subtagline: updated.subtagline,
          location: updated.location,
          phone: updated.phone,
          phone_display: updated.phoneDisplay,
          secondary_phone: updated.secondaryPhone,
          email: updated.email,
          instagram: updated.instagram,
          hours: updated.hours,
          years_active: updated.yearsActive,
          happy_clients: updated.happyClients,
          satisfaction_rate: updated.satisfactionRate,
          about_text: updated.aboutText,
          vision: updated.vision,
          mission: updated.mission,
          value: updated.value,
          announcement: updated.announcement,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Supabase salon_info update fallback:', err);
      }
    }

    setLocal(STORAGE_KEYS.SALON_INFO, updated);
    realtimeBus.publish('salon_info', 'UPDATE', updated);
    return updated;
  },

  // SERVICES
  async getServices(): Promise<ServiceItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
        if (!error && data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            category: d.category,
            description: d.description,
            price: Number(d.price),
            priceDisplay: d.price_display || `₹${d.price}/-`,
            duration: d.duration || '45 mins',
            image: d.image,
            popular: Boolean(d.popular),
          }));
          setLocal(STORAGE_KEYS.SERVICES, mapped);
          return mapped;
        }
      } catch (err) {
        console.warn('Supabase services fallback to local storage:', err);
      }
    }
    return getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },

  async createService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    const newService: ServiceItem = {
      ...service,
      id: 'svc-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 5),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('services').insert([{
          id: newService.id,
          title: newService.title,
          category: newService.category,
          description: newService.description,
          price: newService.price,
          price_display: newService.priceDisplay,
          duration: newService.duration,
          image: newService.image,
          popular: newService.popular,
        }]).select().single();

        if (!error && data) {
          realtimeBus.publish('services', 'INSERT', data);
        }
      } catch (err) {
        console.warn('Supabase service insert fallback:', err);
      }
    }

    const list = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    const updated = [...list, newService];
    setLocal(STORAGE_KEYS.SERVICES, updated);
    realtimeBus.publish('services', 'INSERT', newService);
    return newService;
  },

  async updateService(id: string, updates: Partial<ServiceItem>): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        const payload: any = {};
        if (updates.title !== undefined) payload.title = updates.title;
        if (updates.category !== undefined) payload.category = updates.category;
        if (updates.description !== undefined) payload.description = updates.description;
        if (updates.price !== undefined) {
          payload.price = updates.price;
          payload.price_display = updates.priceDisplay || `₹${updates.price}/-`;
        }
        if (updates.duration !== undefined) payload.duration = updates.duration;
        if (updates.image !== undefined) payload.image = updates.image;
        if (updates.popular !== undefined) payload.popular = updates.popular;

        await supabase.from('services').update(payload).eq('id', id);
      } catch (err) {
        console.warn('Supabase service update fallback:', err);
      }
    }

    const list = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setLocal(STORAGE_KEYS.SERVICES, updated);
    realtimeBus.publish('services', 'UPDATE', { id, ...updates });
  },

  async deleteService(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('services').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase service delete fallback:', err);
      }
    }

    const list = getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    const filtered = list.filter((s) => s.id !== id);
    setLocal(STORAGE_KEYS.SERVICES, filtered);
    realtimeBus.publish('services', 'DELETE', { id });
  },

  // OFFERS
  async getOffers(): Promise<OfferItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: true });
        if (!error && data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            discount: d.discount,
            code: d.code,
            description: d.description,
            includes: d.includes || [],
            price: d.price,
            originalPrice: d.original_price,
            validTill: d.valid_till,
            badge: d.badge,
            bgStyle: d.bg_style,
          }));
          setLocal(STORAGE_KEYS.OFFERS, mapped);
          return mapped;
        }
      } catch (err) {
        console.warn('Supabase offers fallback to local storage:', err);
      }
    }
    return getLocal<OfferItem[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  },

  async updateOffer(id: string, updates: Partial<OfferItem>): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        const payload: any = {};
        if (updates.title !== undefined) payload.title = updates.title;
        if (updates.discount !== undefined) payload.discount = updates.discount;
        if (updates.code !== undefined) payload.code = updates.code;
        if (updates.description !== undefined) payload.description = updates.description;
        if (updates.includes !== undefined) payload.includes = updates.includes;
        if (updates.price !== undefined) payload.price = updates.price;
        if (updates.originalPrice !== undefined) payload.original_price = updates.originalPrice;
        if (updates.validTill !== undefined) payload.valid_till = updates.validTill;
        if (updates.badge !== undefined) payload.badge = updates.badge;

        await supabase.from('offers').update(payload).eq('id', id);
      } catch (err) {
        console.warn('Supabase offer update fallback:', err);
      }
    }

    const list = getLocal<OfferItem[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
    const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setLocal(STORAGE_KEYS.OFFERS, updated);
    realtimeBus.publish('offers', 'UPDATE', { id, ...updates });
  },

  async createOffer(offer: Omit<OfferItem, 'id'>): Promise<OfferItem> {
    const newOffer: OfferItem = {
      ...offer,
      id: 'offer-' + Date.now().toString(36),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('offers').insert([{
          id: newOffer.id,
          title: newOffer.title,
          discount: newOffer.discount,
          code: newOffer.code,
          description: newOffer.description,
          includes: newOffer.includes,
          price: newOffer.price,
          original_price: newOffer.originalPrice,
          valid_till: newOffer.validTill,
          badge: newOffer.badge,
          bg_style: newOffer.bgStyle,
        }]);
      } catch (err) {
        console.warn('Supabase offer insert fallback:', err);
      }
    }

    const list = getLocal<OfferItem[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
    const updated = [...list, newOffer];
    setLocal(STORAGE_KEYS.OFFERS, updated);
    realtimeBus.publish('offers', 'INSERT', newOffer);
    return newOffer;
  },

  async deleteOffer(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('offers').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase offer delete fallback:', err);
      }
    }

    const list = getLocal<OfferItem[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
    const filtered = list.filter((o) => o.id !== id);
    setLocal(STORAGE_KEYS.OFFERS, filtered);
    realtimeBus.publish('offers', 'DELETE', { id });
  },

  // BOOKINGS
  async getBookings(): Promise<Booking[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          setLocal(STORAGE_KEYS.BOOKINGS, data);
          return data as Booking[];
        }
      } catch (err) {
        console.warn('Supabase bookings fallback to local storage:', err);
      }
    }
    return getLocal<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
  },

  async createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'status'>): Promise<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: 'bk-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 5),
      created_at: new Date().toISOString(),
      status: 'pending',
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('bookings').insert([newBooking]).select().single();
        if (!error && data) {
          const list = getLocal<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
          const updated = [data as Booking, ...list.filter(b => b.id !== data.id)];
          setLocal(STORAGE_KEYS.BOOKINGS, updated);
          realtimeBus.publish('bookings', 'INSERT', data);
          return data as Booking;
        } else if (error) {
          console.error('Supabase booking insert error:', error);
        }
      } catch (err) {
        console.warn('Supabase booking insert fallback:', err);
      }
    }

    const list = getLocal<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    const updated = [newBooking, ...list.filter(b => b.id !== newBooking.id)];
    setLocal(STORAGE_KEYS.BOOKINGS, updated);
    realtimeBus.publish('bookings', 'INSERT', newBooking);
    return newBooking;
  },

  async updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('bookings').update({ status }).eq('id', id);
      } catch (err) {
        console.warn('Supabase booking update fallback:', err);
      }
    }
    const list = getLocal<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    const target = list.find((b) => b.id === id);
    if (target) {
      target.status = status;
      setLocal(STORAGE_KEYS.BOOKINGS, list);
      realtimeBus.publish('bookings', 'UPDATE', target);
    }
  },

  async deleteBooking(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('bookings').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase booking delete fallback:', err);
      }
    }
    const list = getLocal<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    const filtered = list.filter((b) => b.id !== id);
    setLocal(STORAGE_KEYS.BOOKINGS, filtered);
    realtimeBus.publish('bookings', 'DELETE', { id });
  },

  // REVIEWS
  async getReviews(): Promise<Review[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setLocal(STORAGE_KEYS.REVIEWS, data);
          return data as Review[];
        }
      } catch (err) {
        console.warn('Supabase reviews fallback to local storage:', err);
      }
    }
    return getLocal<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  },

  async addReview(review: Omit<Review, 'id' | 'created_at' | 'is_approved'>): Promise<Review> {
    const newRev: Review = {
      ...review,
      id: 'rev-' + Date.now().toString(36),
      created_at: new Date().toISOString(),
      is_approved: true,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('reviews').insert([newRev]).select().single();
        if (!error && data) {
          realtimeBus.publish('reviews', 'INSERT', data);
          return data as Review;
        }
      } catch (err) {
        console.warn('Supabase review insert fallback:', err);
      }
    }

    const list = getLocal<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    const updated = [newRev, ...list];
    setLocal(STORAGE_KEYS.REVIEWS, updated);
    realtimeBus.publish('reviews', 'INSERT', newRev);
    return newRev;
  },

  async toggleReviewApproval(id: string, is_approved: boolean): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('reviews').update({ is_approved }).eq('id', id);
      } catch (err) {
        console.warn('Supabase review approval fallback:', err);
      }
    }
    const list = getLocal<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    const target = list.find((r) => r.id === id);
    if (target) {
      target.is_approved = is_approved;
      setLocal(STORAGE_KEYS.REVIEWS, list);
      realtimeBus.publish('reviews', 'UPDATE', target);
    }
  },

  async deleteReview(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('reviews').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase review delete fallback:', err);
      }
    }
    const list = getLocal<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    const filtered = list.filter((r) => r.id !== id);
    setLocal(STORAGE_KEYS.REVIEWS, filtered);
    realtimeBus.publish('reviews', 'DELETE', { id });
  },

  // INQUIRIES
  async getInquiries(): Promise<Inquiry[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          setLocal(STORAGE_KEYS.INQUIRIES, data);
          return data as Inquiry[];
        }
      } catch (err) {
        console.warn('Supabase inquiries fallback to local storage:', err);
      }
    }
    return getLocal<Inquiry[]>(STORAGE_KEYS.INQUIRIES, []);
  },

  async createInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<Inquiry> {
    const newInq: Inquiry = {
      ...inquiry,
      id: 'inq-' + Date.now().toString(36),
      created_at: new Date().toISOString(),
      status: 'new',
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('inquiries').insert([newInq]).select().single();
        if (!error && data) {
          realtimeBus.publish('inquiries', 'INSERT', data);
          return data as Inquiry;
        }
      } catch (err) {
        console.warn('Supabase inquiry insert fallback:', err);
      }
    }

    const list = getLocal<Inquiry[]>(STORAGE_KEYS.INQUIRIES, []);
    const updated = [newInq, ...list];
    setLocal(STORAGE_KEYS.INQUIRIES, updated);
    realtimeBus.publish('inquiries', 'INSERT', newInq);
    return newInq;
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('inquiries').update({ status }).eq('id', id);
      } catch (err) {
        console.warn('Supabase inquiry update fallback:', err);
      }
    }
    const list = getLocal<Inquiry[]>(STORAGE_KEYS.INQUIRIES, []);
    const target = list.find((i) => i.id === id);
    if (target) {
      target.status = status;
      setLocal(STORAGE_KEYS.INQUIRIES, list);
      realtimeBus.publish('inquiries', 'UPDATE', target);
    }
  },

  async deleteInquiry(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('inquiries').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase inquiry delete fallback:', err);
      }
    }
    const list = getLocal<Inquiry[]>(STORAGE_KEYS.INQUIRIES, []);
    const filtered = list.filter((i) => i.id !== id);
    setLocal(STORAGE_KEYS.INQUIRIES, filtered);
    realtimeBus.publish('inquiries', 'DELETE', { id });
  },

  // REALTIME SUBSCRIPTION HOOK
  subscribeToTable(table: 'bookings' | 'reviews' | 'inquiries' | 'services' | 'offers' | 'salon_info', onUpdate: () => void) {
    const unsubBus = realtimeBus.subscribe(table, () => {
      onUpdate();
    });

    let supabaseChannel: any = null;
    if (isSupabaseConfigured && supabase) {
      try {
        supabaseChannel = supabase
          .channel(`public:${table}`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table },
            () => {
              onUpdate();
            }
          )
          .subscribe();
      } catch (err) {
        console.warn(`Supabase realtime channel subscription failed for ${table}:`, err);
      }
    }

    return () => {
      unsubBus();
      if (supabaseChannel && supabase) {
        try {
          supabase.removeChannel(supabaseChannel);
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  },
};
