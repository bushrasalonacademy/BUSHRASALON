import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  User, 
  Phone, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Database, 
  MessageSquare, 
  RefreshCw, 
  Trash2, 
  ExternalLink,
  Sparkles,
  Scissors,
  Plus,
  Edit2,
  Save,
  Star,
  Building,
  DollarSign,
  Check,
  Send,
  Eye,
  EyeOff,
  Search,
  Filter,
  Layers,
  Tag,
  Copy,
  Terminal,
  Lock,
  LogOut,
  ArrowRight
} from 'lucide-react';
import { Booking, Inquiry, Review, ServiceItem, SalonInfo, OfferItem } from '../types';
import { api } from '../services/api';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  inquiries: Inquiry[];
  reviews: Review[];
  services: ServiceItem[];
  offers: OfferItem[];
  salonInfo: SalonInfo;
  onRefresh: () => void;
  onUpdateServices: (services: ServiceItem[]) => void;
  onUpdateOffers: (offers: OfferItem[]) => void;
  onUpdateSalonInfo: (info: SalonInfo) => void;
}

const ADMIN_PASSWORD = "Aesthetic@bushra";

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  bookings,
  inquiries,
  reviews,
  services,
  offers,
  salonInfo,
  onRefresh,
  onUpdateServices,
  onUpdateOffers,
  onUpdateSalonInfo
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('bushra_admin_auth') === 'true';
    }
    return false;
  });
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'offers' | 'inquiries' | 'reviews' | 'salon_info' | 'supabase'>('bookings');
  
  // Bookings state
  const [bookingFilter, setBookingFilter] = useState<string>('all');
  const [bookingSearch, setBookingSearch] = useState<string>('');
  const [newBookingModal, setNewBookingModal] = useState(false);
  const [newBookingData, setNewBookingData] = useState({
    customer_name: '',
    customer_phone: '',
    service_id: '',
    service_title: '',
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '11:00 AM',
    stylist_preference: 'Any Available Master Stylist',
    special_requests: 'Manual / Walk-in Booking',
    total_price: 599
  });

  // Services Edit state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState<Partial<ServiceItem>>({});
  const [isAddingService, setIsAddingService] = useState(false);

  // Offers Edit state
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [offerFormData, setOfferFormData] = useState<Partial<OfferItem>>({});
  const [isAddingOffer, setIsAddingOffer] = useState(false);

  // Salon Info Edit state
  const [salonEditForm, setSalonEditForm] = useState<SalonInfo>(salonInfo);
  const [salonSaveSuccess, setSalonSaveSuccess] = useState(false);

  // New Review state
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewData, setNewReviewData] = useState({
    author_name: '',
    author_role: 'Verified Client',
    location: 'Vijay Nagar, Indore',
    rating: 5,
    content: '',
    avatar: '/photos/IMG_2638.jpg'
  });

  // Supabase test state
  const [dbTestResult, setDbTestResult] = useState<string | null>(null);
  const [dbTesting, setDbTesting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
      sessionStorage.setItem('bushra_admin_auth', 'true');
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bushra_admin_auth');
    setInputPassword('');
  };

  useEffect(() => {
    setSalonEditForm(salonInfo);
  }, [salonInfo]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      onRefresh();
      const interval = setInterval(() => {
        onRefresh();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, isAuthenticated, onRefresh]);

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
        <div className="bg-[#fcfaf7] rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-amber-300/80 text-gray-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-3xl bg-[#2b161b] text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg border border-amber-400/30">
              <Lock size={28} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2b161b]">Bushra's Control Center</h3>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
              Enter administrator password to access realtime appointments, services CMS, and salon management.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter Admin Password..."
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm outline-none focus:border-[#c88132] focus:ring-2 focus:ring-amber-500/20 pr-11 text-gray-900"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-600 font-bold mt-1.5 flex items-center gap-1">
                  <AlertCircle size={14} />
                  <span>Incorrect password. Please try again.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#2b161b] hover:bg-[#c88132] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- BOOKING HANDLERS ---
  const handleStatusChange = async (id: string, newStatus: Booking['status']) => {
    try {
      await api.updateBookingStatus(id, newStatus);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm('Delete this booking record?')) {
      await api.deleteBooking(id);
      onRefresh();
    }
  };

  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookingData.customer_name || !newBookingData.customer_phone) return;
    
    const selectedSvc = services.find(s => s.id === newBookingData.service_id) || services[0];

    await api.createBooking({
      customer_name: newBookingData.customer_name,
      customer_phone: newBookingData.customer_phone,
      service_id: selectedSvc.id,
      service_title: selectedSvc.title,
      booking_date: newBookingData.booking_date,
      booking_time: newBookingData.booking_time,
      stylist_preference: newBookingData.stylist_preference,
      special_requests: newBookingData.special_requests,
      total_price: selectedSvc.price || 599
    });

    setNewBookingModal(false);
    setNewBookingData({
      customer_name: '',
      customer_phone: '',
      service_id: '',
      service_title: '',
      booking_date: new Date().toISOString().split('T')[0],
      booking_time: '11:00 AM',
      stylist_preference: 'Any Available Master Stylist',
      special_requests: 'Manual / Walk-in Booking',
      total_price: 599
    });
    onRefresh();
  };

  const getWhatsAppBookingLink = (b: Booking) => {
    const text = `Hello ${b.customer_name}! Your appointment for *${b.service_title}* at *Bushra's Salon & Academy* on *${b.booking_date}* at *${b.booking_time}* is *CONFIRMED*. Location: Plot No 02, Scheme No 78, Vijay Nagar, Indore. We look forward to welcoming you!`;
    const cleanPhone = b.customer_phone.replace(/\D/g, '');
    return `https://wa.me/91${cleanPhone.length === 10 ? cleanPhone : cleanPhone.slice(-10)}?text=${encodeURIComponent(text)}`;
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = bookingFilter === 'all' || b.status === bookingFilter;
    const matchesSearch = 
      b.customer_name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customer_phone.includes(bookingSearch) ||
      b.service_title.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenueEst = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, curr) => acc + (curr.total_price || 0), 0);

  // --- SERVICE EDIT HANDLERS ---
  const handleStartEditService = (svc: ServiceItem) => {
    setEditingServiceId(svc.id);
    setServiceFormData({ ...svc });
  };

  const handleSaveServiceEdit = async () => {
    if (!editingServiceId || !serviceFormData.title) return;
    await api.updateService(editingServiceId, serviceFormData);
    setEditingServiceId(null);
    const updated = await api.getServices();
    onUpdateServices(updated);
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Delete this service from the rate card?')) {
      await api.deleteService(id);
      const updated = await api.getServices();
      onUpdateServices(updated);
    }
  };

  const handleCreateNewService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormData.title || !serviceFormData.price) return;
    
    await api.createService({
      title: serviceFormData.title,
      category: serviceFormData.category || 'hair',
      description: serviceFormData.description || 'Premium salon treatment with international products.',
      price: Number(serviceFormData.price),
      priceDisplay: `₹${serviceFormData.price}/-`,
      duration: serviceFormData.duration || '45 mins',
      image: serviceFormData.image || '/photos/IMG_8097.jpg',
      popular: Boolean(serviceFormData.popular)
    });

    setIsAddingService(false);
    setServiceFormData({});
    const updated = await api.getServices();
    onUpdateServices(updated);
  };

  // --- OFFERS EDIT HANDLERS ---
  const handleStartEditOffer = (off: OfferItem) => {
    setEditingOfferId(off.id);
    setOfferFormData({ ...off });
  };

  const handleSaveOfferEdit = async () => {
    if (!editingOfferId || !offerFormData.title) return;
    await api.updateOffer(editingOfferId, offerFormData);
    setEditingOfferId(null);
    const updated = await api.getOffers();
    onUpdateOffers(updated);
  };

  const handleDeleteOffer = async (id: string) => {
    if (window.confirm('Delete this offer from website?')) {
      await api.deleteOffer(id);
      const updated = await api.getOffers();
      onUpdateOffers(updated);
    }
  };

  const handleCreateNewOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerFormData.title || !offerFormData.price || !offerFormData.code) return;
    
    await api.createOffer({
      title: offerFormData.title,
      discount: offerFormData.discount || 'Special Discount',
      code: offerFormData.code,
      description: offerFormData.description || 'Exclusive luxury package ritual.',
      includes: typeof offerFormData.includes === 'string' ? (offerFormData.includes as any).split(',').map((s: string) => s.trim()) : (offerFormData.includes || []),
      price: offerFormData.price,
      originalPrice: offerFormData.originalPrice || '',
      validTill: offerFormData.validTill || 'Limited Slots',
      badge: offerFormData.badge || 'Special Offer',
      bgStyle: offerFormData.bgStyle || 'bg-gradient-to-br from-amber-50/70 via-white to-amber-100/40 border-amber-300'
    });

    setIsAddingOffer(false);
    setOfferFormData({});
    const updated = await api.getOffers();
    onUpdateOffers(updated);
  };

  // --- SALON INFO SAVE ---
  const handleSaveSalonInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await api.updateSalonInfo(salonEditForm);
    onUpdateSalonInfo(updated);
    setSalonSaveSuccess(true);
    setTimeout(() => setSalonSaveSuccess(false), 4000);
  };

  // --- REVIEW HANDLERS ---
  const handleToggleReview = async (r: Review) => {
    await api.toggleReviewApproval(r.id, !r.is_approved);
    onRefresh();
  };

  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Delete this review?')) {
      await api.deleteReview(id);
      onRefresh();
    }
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewData.author_name || !newReviewData.content) return;
    await api.addReview({
      author_name: newReviewData.author_name,
      author_role: newReviewData.author_role,
      location: newReviewData.location,
      rating: Number(newReviewData.rating),
      content: newReviewData.content,
      avatar: newReviewData.avatar
    });
    setIsAddingReview(false);
    setNewReviewData({
      author_name: '',
      author_role: 'Verified Client',
      location: 'Vijay Nagar, Indore',
      rating: 5,
      content: '',
      avatar: '/photos/IMG_2638.jpg'
    });
    onRefresh();
  };

  // --- INQUIRY HANDLERS ---
  const handleInquiryStatus = async (id: string, status: Inquiry['status']) => {
    await api.updateInquiryStatus(id, status);
    onRefresh();
  };

  const handleDeleteInquiry = async (id: string) => {
    if (window.confirm('Delete inquiry?')) {
      await api.deleteInquiry(id);
      onRefresh();
    }
  };

  // --- SUPABASE TEST CONNECTION ---
  const handleTestDatabase = async () => {
    setDbTesting(true);
    setDbTestResult(null);
    try {
      if (!isSupabaseConfigured || !supabase) {
        setDbTestResult('⚠️ Supabase credentials not found in .env.');
        return;
      }
      const { data: bData, error: bErr } = await supabase.from('bookings').select('*').limit(3);
      if (bErr) {
        setDbTestResult(`❌ Connection reached Supabase, but tables need to be created: ${bErr.message}. Please copy and run supabase-schema.sql in Supabase SQL Editor!`);
      } else {
        setDbTestResult(`✅ SUCCESS! Connected to Supabase tables and realtime channel! Found ${bData ? bData.length : 0} bookings.`);
      }
    } catch (err: any) {
      setDbTestResult(`❌ Error testing database: ${err.message || err}`);
    } finally {
      setDbTesting(false);
    }
  };

  const availablePhotos = [
    { url: '/photos/IMG_8097.jpg', label: 'Reception & Interior' },
    { url: '/photos/IMG_8180.jpg', label: 'Storefront Signboard' },
    { url: '/photos/IMG_8125.jpg', label: 'Styling Station' },
    { url: '/photos/IMG_8130.jpg', label: 'Hydra-Facial Room' },
    { url: '/photos/IMG_8155.jpg', label: 'Pedicure Spa Lounge' },
    { url: '/photos/IMG_4735.jpg', label: 'Layer Cut & Blowdry' },
    { url: '/photos/IMG_4736.jpg', label: 'Volume Step Cut' },
    { url: '/photos/IMG_4738.jpg', label: 'Keratin Smoothing' },
    { url: '/photos/IMG_1491.jpg', label: 'Balayage & Violet Hair' },
    { url: '/photos/IMG_1500.jpg', label: 'Glossy Hair Spa' },
    { url: '/photos/IMG_2638.jpg', label: 'Glitter Fade Nails' },
    { url: '/photos/IMG_2280.jpg', label: 'Royal Blue 3D Nails' },
    { url: '/photos/IMG_2643.jpg', label: 'Korean Glass Nails' },
    { url: '/photos/IMG_2381.jpg', label: 'Hand Whitening' },
  ];

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/85 p-2 sm:p-4 backdrop-blur-md overflow-hidden">
      <div className="bg-[#fcfaf7] rounded-3xl max-w-7xl w-full h-[95vh] max-h-[95vh] overflow-hidden flex flex-col relative shadow-2xl border border-amber-200/80 text-gray-800">
        
        {/* Top Control Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:px-6 sm:py-4 bg-[#2b161b] text-white gap-3 border-b border-amber-950 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#2b161b] shadow-md flex-shrink-0">
              <ShieldCheck size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white leading-none">
                  Bushra's Salon &amp; Academy Control Center
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>SUPABASE REALTIME ACTIVE</span>
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-1">
                https://gqfbiqlkgfrbkigvptmd.supabase.co · Realtime Bookings, Services, Offers &amp; Leads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={onRefresh}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/10 cursor-pointer"
              title="Refresh Realtime Bus"
            >
              <RefreshCw size={13} />
              <span className="hidden sm:inline">Sync Live</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/35 text-red-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-red-500/30 cursor-pointer"
              title="Lock Admin Panel"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Lock / Logout</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Close Panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-3 sm:px-6 bg-white border-b border-gray-200/80 text-xs flex-shrink-0">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-amber-50/60 border border-amber-200/60">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-[#c88132] flex items-center justify-center font-bold">
              <Calendar size={16} />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Pending Bookings</div>
              <div className="text-sm font-extrabold text-amber-900">{pendingCount} Waiting</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle size={16} />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Confirmed / Done</div>
              <div className="text-sm font-extrabold text-emerald-950">{confirmedCount} Active</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-blue-50/60 border border-blue-200/60">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <MessageSquare size={16} />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Inquiries &amp; Leads</div>
              <div className="text-sm font-extrabold text-blue-950">{inquiries.length} Inquiries</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-purple-50/60 border border-purple-200/60">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
              <DollarSign size={16} />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Estimated Revenue</div>
              <div className="text-sm font-extrabold text-purple-950">₹{totalRevenueEst.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-2 sm:px-6 bg-[#f5f1eb] border-b border-gray-200/80 overflow-x-auto no-scrollbar flex-shrink-0">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#2b161b] text-amber-300 shadow-xs'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-black'
            }`}
          >
            <Calendar size={14} />
            <span>Bookings ({bookings.length})</span>
            {pendingCount > 0 && (
              <span className="bg-amber-400 text-[#2b161b] text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-[#2b161b] text-amber-300 shadow-xs'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-black'
            }`}
          >
            <Scissors size={14} />
            <span>Services &amp; Rates ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'offers'
                ? 'bg-[#2b161b] text-amber-300 shadow-xs'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-black'
            }`}
          >
            <Tag size={14} />
            <span>Offers &amp; VIP Packages ({offers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-[#2b161b] text-amber-300 shadow-xs'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-black'
            }`}
          >
            <MessageSquare size={14} />
            <span>Inquiries &amp; Academy ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'bg-[#2b161b] text-amber-300 shadow-xs'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-black'
            }`}
          >
            <Star size={14} />
            <span>Client Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('salon_info')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'salon_info'
                ? 'bg-[#2b161b] text-amber-300 shadow-xs'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-black'
            }`}
          >
            <Building size={14} />
            <span>Salon Info &amp; Numbers</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ml-auto ${
              activeTab === 'supabase'
                ? 'bg-[#2b161b] text-amber-300 shadow-xs'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-black'
            }`}
          >
            <Database size={14} />
            <span>Supabase Cloud Sync</span>
          </button>
        </div>

        {/* Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#faf8f5]">

          {/* TAB 1: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              
              {/* Controls & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs">
                {/* Status Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${
                        bookingFilter === st
                          ? 'bg-[#2b161b] text-white shadow-2xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {st} {st === 'pending' && pendingCount > 0 ? `(${pendingCount})` : ''}
                    </button>
                  ))}
                </div>

                {/* Search & Add Manual Button */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-60">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search name, phone..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-300 rounded-xl text-xs outline-none focus:border-[#c88132]"
                    />
                  </div>

                  <button
                    onClick={() => setNewBookingModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#2b161b] hover:bg-[#c88132] text-white text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-xs"
                  >
                    <Plus size={14} />
                    <span>+ Add Booking</span>
                  </button>
                </div>
              </div>

              {/* Bookings List Cards */}
              {filteredBookings.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-2">
                  <Calendar size={36} className="mx-auto text-gray-300" />
                  <h4 className="text-sm font-bold text-gray-800">No bookings match your filter</h4>
                  <p className="text-xs text-gray-500">Bookings placed on the website or added manually will appear here in realtime.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all shadow-2xs space-y-3 flex flex-col justify-between ${
                        b.status === 'pending'
                          ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-300/40'
                          : b.status === 'confirmed'
                          ? 'border-emerald-200'
                          : 'border-gray-200 opacity-80'
                      }`}
                    >
                      {/* Top Row: Customer & Status */}
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-[#c88132] uppercase tracking-wider block">
                              {b.booking_date} · {b.booking_time}
                            </span>
                            <h4 className="text-base font-bold text-gray-900 leading-tight">
                              {b.customer_name}
                            </h4>
                          </div>

                          {/* Status Badge Dropdown */}
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value as Booking['status'])}
                            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                              b.status === 'pending'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : b.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : b.status === 'completed'
                                ? 'bg-blue-100 text-blue-900 border-blue-300'
                                : 'bg-gray-100 text-gray-700 border-gray-300'
                            }`}
                          >
                            <option value="pending">⏳ Pending</option>
                            <option value="confirmed">✓ Confirmed</option>
                            <option value="completed">★ Completed</option>
                            <option value="cancelled">✕ Cancelled</option>
                          </select>
                        </div>

                        {/* Service & Price */}
                        <div className="mt-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 text-xs space-y-1">
                          <div className="flex justify-between font-bold text-gray-900">
                            <span>{b.service_title}</span>
                            <span className="text-[#c88132]">₹{b.total_price || 599}</span>
                          </div>
                          {b.stylist_preference && (
                            <div className="text-[11px] text-gray-500">
                              Stylist: <span className="font-semibold text-gray-700">{b.stylist_preference}</span>
                            </div>
                          )}
                          {b.special_requests && (
                            <div className="text-[11px] text-gray-500 italic">
                              Note: "{b.special_requests}"
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Shortcuts: WhatsApp, Call, Delete */}
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${b.customer_phone}`}
                            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Phone size={12} className="text-[#c88132]" />
                            <span>{b.customer_phone}</span>
                          </a>

                          <a
                            href={getWhatsAppBookingLink(b)}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-emerald-800 font-bold flex items-center gap-1.5 transition-colors border border-[#25D366]/30"
                            title="Send WhatsApp Confirmation"
                          >
                            <i className="fa-brands fa-whatsapp text-emerald-600 text-xs"></i>
                            <span>Confirm on WhatsApp</span>
                          </a>
                        </div>

                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete booking"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Booking Modal Dialog */}
              {newBookingModal && (
                <div className="fixed inset-0 z-[3500] flex items-center justify-center bg-black/70 p-4">
                  <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <h4 className="text-base font-bold text-gray-900">Add Walk-in / Phone Booking</h4>
                      <button onClick={() => setNewBookingModal(false)} className="text-gray-400 hover:text-gray-700">
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleCreateManualBooking} className="space-y-3 text-xs">
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Customer Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pooja Sharma"
                          value={newBookingData.customer_name}
                          onChange={(e) => setNewBookingData({ ...newBookingData, customer_name: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Mobile Phone (10 digits) *</label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="98260XXXXX"
                          value={newBookingData.customer_phone}
                          onChange={(e) => setNewBookingData({ ...newBookingData, customer_phone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Select Service *</label>
                        <select
                          value={newBookingData.service_id}
                          onChange={(e) => {
                            const svc = services.find(s => s.id === e.target.value);
                            setNewBookingData({
                              ...newBookingData,
                              service_id: e.target.value,
                              service_title: svc ? svc.title : '',
                              total_price: svc ? svc.price || 599 : 599
                            });
                          }}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                        >
                          <option value="">Select a service...</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.title} — ₹{s.price} ({s.duration})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Date</label>
                          <input
                            type="date"
                            value={newBookingData.booking_date}
                            onChange={(e) => setNewBookingData({ ...newBookingData, booking_date: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Time Slot</label>
                          <select
                            value={newBookingData.booking_time}
                            onChange={(e) => setNewBookingData({ ...newBookingData, booking_time: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                          >
                            {['10:30 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'].map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setNewBookingModal(false)}
                          className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 rounded-xl bg-[#2b161b] hover:bg-[#c88132] text-white font-bold transition-colors"
                        >
                          Save Booking
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: SERVICES & RATE CARD MANAGER */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
                <div>
                  <h4 className="text-base font-bold text-gray-900">Services &amp; Rate Card Live Editor</h4>
                  <p className="text-xs text-gray-500">Add, edit pricing, or change real photos for rate card services.</p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingService(true);
                    setServiceFormData({
                      category: 'hair',
                      duration: '45 mins',
                      price: 599,
                      popular: true,
                      image: '/photos/IMG_8097.jpg'
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#2b161b] hover:bg-[#c88132] text-white text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-xs"
                >
                  <Plus size={14} />
                  <span>+ Add New Service</span>
                </button>
              </div>

              {/* Add Service Modal */}
              {isAddingService && (
                <div className="bg-white p-5 rounded-3xl border-2 border-[#c88132] shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h5 className="text-sm font-bold text-gray-900">Create New Salon Service</h5>
                    <button onClick={() => setIsAddingService(false)} className="text-gray-400 hover:text-gray-700">
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleCreateNewService} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Service Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Keratin Hair Spa"
                        value={serviceFormData.title || ''}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Category *</label>
                      <select
                        value={serviceFormData.category || 'hair'}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value as any })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                      >
                        <option value="hair">Hair Care &amp; Styling</option>
                        <option value="nails">Nails &amp; Hands</option>
                        <option value="skin">Skin &amp; Facials</option>
                        <option value="makeup">Bridal &amp; Makeup</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Price (₹) *</label>
                      <input
                        type="number"
                        required
                        placeholder="999"
                        value={serviceFormData.price || ''}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, price: Number(e.target.value) })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Duration</label>
                      <input
                        type="text"
                        placeholder="e.g. 60 mins"
                        value={serviceFormData.duration || ''}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, duration: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-gray-700 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        placeholder="Detailed service description and benefits..."
                        value={serviceFormData.description || ''}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-gray-700 block mb-1">Select Real Salon Photo</label>
                      <select
                        value={serviceFormData.image || availablePhotos[0].url}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                      >
                        {availablePhotos.map(p => (
                          <option key={p.url} value={p.url}>{p.label} ({p.url})</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingService(false)}
                        className="px-4 py-2 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#2b161b] hover:bg-[#c88132] text-white font-bold transition-colors shadow-xs"
                      >
                        Add to Rate Card
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {services.map((svc) => {
                  const isEditing = editingServiceId === svc.id;

                  return (
                    <div
                      key={svc.id}
                      className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs space-y-3 flex flex-col justify-between"
                    >
                      {isEditing ? (
                        <div className="space-y-2.5 text-xs">
                          <div>
                            <label className="font-bold text-gray-600 block mb-0.5">Title</label>
                            <input
                              type="text"
                              value={serviceFormData.title || ''}
                              onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                              className="w-full bg-gray-50 border rounded-lg p-1.5"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="font-bold text-gray-600 block mb-0.5">Price (₹)</label>
                              <input
                                type="number"
                                value={serviceFormData.price || ''}
                                onChange={(e) => setServiceFormData({
                                  ...serviceFormData,
                                  price: Number(e.target.value),
                                  priceDisplay: `₹${e.target.value}/-`
                                })}
                                className="w-full bg-gray-50 border rounded-lg p-1.5"
                              />
                            </div>
                            <div>
                              <label className="font-bold text-gray-600 block mb-0.5">Duration</label>
                              <input
                                type="text"
                                value={serviceFormData.duration || ''}
                                onChange={(e) => setServiceFormData({ ...serviceFormData, duration: e.target.value })}
                                className="w-full bg-gray-50 border rounded-lg p-1.5"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="font-bold text-gray-600 block mb-0.5">Description</label>
                            <textarea
                              rows={2}
                              value={serviceFormData.description || ''}
                              onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                              className="w-full bg-gray-50 border rounded-lg p-1.5"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-gray-600 block mb-0.5">Photo</label>
                            <select
                              value={serviceFormData.image || svc.image}
                              onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.value })}
                              className="w-full bg-gray-50 border rounded-lg p-1.5 text-[11px]"
                            >
                              {availablePhotos.map(p => (
                                <option key={p.url} value={p.url}>{p.label}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => setEditingServiceId(null)}
                              className="flex-1 py-1.5 rounded-lg border font-bold text-gray-600 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSaveServiceEdit}
                              className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex gap-3">
                            <img
                              src={svc.image}
                              alt={svc.title}
                              className="w-16 h-16 rounded-xl object-cover border flex-shrink-0"
                            />
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full uppercase">
                                {svc.category}
                              </span>
                              <h5 className="text-sm font-bold text-gray-900 truncate leading-snug">
                                {svc.title}
                              </h5>
                              <div className="text-xs font-extrabold text-[#c88132]">
                                {svc.priceDisplay || `₹${svc.price}/-`} · <span className="text-gray-500 font-normal">{svc.duration}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {svc.description}
                          </p>

                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-gray-400">
                              {svc.popular ? '★ Popular Service' : 'Standard'}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleStartEditService(svc)}
                                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-900 font-bold flex items-center gap-1 transition-colors"
                              >
                                <Edit2 size={12} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteService(svc.id)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete service"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: OFFERS & VIP PACKAGES MANAGER */}
          {activeTab === 'offers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
                <div>
                  <h4 className="text-base font-bold text-gray-900">VIP Offers &amp; Festive Packages Manager</h4>
                  <p className="text-xs text-gray-500">Create new salon deals, coupon codes, and bundle packages live.</p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingOffer(true);
                    setOfferFormData({
                      badge: 'Special Offer',
                      discount: '30% OFF',
                      code: 'SPECIAL30',
                      validTill: 'Limited Slots Available'
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#2b161b] hover:bg-[#c88132] text-white text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-xs"
                >
                  <Plus size={14} />
                  <span>+ Add New Offer</span>
                </button>
              </div>

              {/* Add Offer Form */}
              {isAddingOffer && (
                <form onSubmit={handleCreateNewOffer} className="bg-white p-5 rounded-3xl border-2 border-[#c88132] shadow-md space-y-3 text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <h5 className="text-sm font-bold text-gray-900">Create New Salon Offer</h5>
                    <button type="button" onClick={() => setIsAddingOffer(false)}><X size={16} /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Package Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pre-Bridal Glow Ritual"
                        value={offerFormData.title || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, title: e.target.value })}
                        className="w-full bg-gray-50 border rounded-xl p-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Discount Text</label>
                      <input
                        type="text"
                        placeholder="e.g. 40% OFF or ANY LENGTH"
                        value={offerFormData.discount || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, discount: e.target.value })}
                        className="w-full bg-gray-50 border rounded-xl p-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Coupon Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="GLOW9999"
                        value={offerFormData.code || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, code: e.target.value.toUpperCase() })}
                        className="w-full bg-gray-50 border rounded-xl p-2.5 uppercase font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Offer Price *</label>
                      <input
                        type="text"
                        required
                        placeholder="₹9,999"
                        value={offerFormData.price || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, price: e.target.value })}
                        className="w-full bg-gray-50 border rounded-xl p-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Original Price (Strikethrough)</label>
                      <input
                        type="text"
                        placeholder="₹16,000"
                        value={offerFormData.originalPrice || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, originalPrice: e.target.value })}
                        className="w-full bg-gray-50 border rounded-xl p-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Badge Tag</label>
                      <input
                        type="text"
                        placeholder="Most Popular"
                        value={offerFormData.badge || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, badge: e.target.value })}
                        className="w-full bg-gray-50 border rounded-xl p-2.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Included Services (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="Bridal Facial, Full Body D-Tan, Hair Spa, Manicure, Pedicure"
                      value={typeof offerFormData.includes === 'string' ? offerFormData.includes : (offerFormData.includes?.join(', ') || '')}
                      onChange={(e) => setOfferFormData({ ...offerFormData, includes: e.target.value as any })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Brief overview of the deal..."
                      value={offerFormData.description || ''}
                      onChange={(e) => setOfferFormData({ ...offerFormData, description: e.target.value })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setIsAddingOffer(false)} className="px-4 py-2 border rounded-xl font-bold">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-[#2b161b] hover:bg-[#c88132] text-white font-bold rounded-xl">Publish Offer</button>
                  </div>
                </form>
              )}

              {/* Offers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offers.map((off) => {
                  const isEditing = editingOfferId === off.id;

                  return (
                    <div
                      key={off.id}
                      className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-2xs space-y-3 flex flex-col justify-between"
                    >
                      {isEditing ? (
                        <div className="space-y-2.5 text-xs">
                          <div>
                            <label className="font-bold text-gray-600 block mb-0.5">Title</label>
                            <input
                              type="text"
                              value={offerFormData.title || ''}
                              onChange={(e) => setOfferFormData({ ...offerFormData, title: e.target.value })}
                              className="w-full bg-gray-50 border rounded-lg p-1.5"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="font-bold text-gray-600 block mb-0.5">Offer Price</label>
                              <input
                                type="text"
                                value={offerFormData.price || ''}
                                onChange={(e) => setOfferFormData({ ...offerFormData, price: e.target.value })}
                                className="w-full bg-gray-50 border rounded-lg p-1.5"
                              />
                            </div>
                            <div>
                              <label className="font-bold text-gray-600 block mb-0.5">Coupon Code</label>
                              <input
                                type="text"
                                value={offerFormData.code || ''}
                                onChange={(e) => setOfferFormData({ ...offerFormData, code: e.target.value.toUpperCase() })}
                                className="w-full bg-gray-50 border rounded-lg p-1.5 uppercase font-bold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="font-bold text-gray-600 block mb-0.5">Description</label>
                            <textarea
                              rows={2}
                              value={offerFormData.description || ''}
                              onChange={(e) => setOfferFormData({ ...offerFormData, description: e.target.value })}
                              className="w-full bg-gray-50 border rounded-lg p-1.5"
                            />
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button onClick={() => setEditingOfferId(null)} className="flex-1 py-1.5 rounded-lg border font-bold">Cancel</button>
                            <button onClick={handleSaveOfferEdit} className="flex-1 py-1.5 rounded-lg bg-emerald-600 text-white font-bold">Save</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="bg-[#2b161b] text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                {off.badge}
                              </span>
                              <span className="bg-[#c88132] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                {off.discount}
                              </span>
                            </div>

                            <h5 className="text-base font-bold text-gray-900 leading-snug">{off.title}</h5>
                            <p className="text-xs text-gray-600 mt-1">{off.description}</p>

                            <div className="mt-3 p-2 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between text-xs font-bold">
                              <div>
                                <span className="text-base text-[#2b161b]">{off.price}</span>
                                {off.originalPrice && <span className="text-gray-400 line-through ml-2 font-normal">{off.originalPrice}</span>}
                              </div>
                              <span className="text-amber-900 font-extrabold uppercase tracking-wider bg-white px-2 py-0.5 rounded border">
                                Code: {off.code}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-gray-100 flex items-center justify-end gap-1.5 text-xs">
                            <button
                              onClick={() => handleStartEditOffer(off)}
                              className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-amber-100 text-gray-700 font-bold flex items-center gap-1"
                            >
                              <Edit2 size={12} />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteOffer(off.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                              title="Delete offer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: INQUIRIES & ACADEMY */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/80">
                <div>
                  <h4 className="text-base font-bold text-gray-900">Inquiries &amp; Academy Admissions ({inquiries.length})</h4>
                  <p className="text-xs text-gray-500">Live consultation leads and student enrollment inquiries.</p>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-2">
                  <MessageSquare size={36} className="mx-auto text-gray-300" />
                  <h4 className="text-sm font-bold text-gray-800">No Inquiries Yet</h4>
                  <p className="text-xs text-gray-500">Website consultation and course enrollment leads will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all shadow-2xs space-y-3 flex flex-col justify-between ${
                        inq.status === 'new'
                          ? 'border-blue-300 bg-blue-50/20 ring-1 ring-blue-300/40'
                          : 'border-gray-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                              {inq.status === 'new' ? '⚡ New Lead' : inq.status}
                            </span>
                            <h4 className="text-base font-bold text-gray-900 mt-1">
                              {inq.name}
                            </h4>
                          </div>

                          <select
                            value={inq.status}
                            onChange={(e) => handleInquiryStatus(inq.id, e.target.value as Inquiry['status'])}
                            className="text-[11px] font-bold px-2 py-1 rounded-lg border bg-white cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>

                        {inq.service_interest && (
                          <div className="mt-2 text-xs font-bold text-[#c88132]">
                            Interest: {inq.service_interest}
                          </div>
                        )}

                        <p className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border mt-2">
                          "{inq.message}"
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${inq.phone}`}
                            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold flex items-center gap-1.5"
                          >
                            <Phone size={12} className="text-[#c88132]" />
                            <span>{inq.phone}</span>
                          </a>

                          <a
                            href={`https://wa.me/91${inq.phone.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(`Hello ${inq.name}! We received your inquiry regarding Bushra's Salon & Academy. How can we assist you today?`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-emerald-800 font-bold flex items-center gap-1.5 border border-[#25D366]/30"
                          >
                            <i className="fa-brands fa-whatsapp text-emerald-600"></i>
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: REVIEWS & TESTIMONIALS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
                <div>
                  <h4 className="text-base font-bold text-gray-900">Client Reviews Moderation</h4>
                  <p className="text-xs text-gray-500">Approve, hide, or add verified reviews to the live website.</p>
                </div>
                <button
                  onClick={() => setIsAddingReview(true)}
                  className="px-4 py-2 rounded-xl bg-[#2b161b] hover:bg-[#c88132] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus size={14} />
                  <span>+ Add Verified Review</span>
                </button>
              </div>

              {isAddingReview && (
                <form onSubmit={handleCreateReview} className="bg-white p-5 rounded-2xl border-2 border-[#c88132] shadow-md space-y-3 text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <h5 className="font-bold text-gray-900">Add New Verified Testimonial</h5>
                    <button type="button" onClick={() => setIsAddingReview(false)}><X size={16} /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Author Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sonal Verma"
                        value={newReviewData.author_name}
                        onChange={(e) => setNewReviewData({ ...newReviewData, author_name: e.target.value })}
                        className="w-full bg-gray-50 border rounded-xl p-2"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Location / Area</label>
                      <input
                        type="text"
                        placeholder="Vijay Nagar, Indore"
                        value={newReviewData.location}
                        onChange={(e) => setNewReviewData({ ...newReviewData, location: e.target.value })}
                        className="w-full bg-gray-50 border rounded-xl p-2"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Rating</label>
                      <select
                        value={newReviewData.rating}
                        onChange={(e) => setNewReviewData({ ...newReviewData, rating: Number(e.target.value) })}
                        className="w-full bg-gray-50 border rounded-xl p-2"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Review Content *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Share the client's review text..."
                      value={newReviewData.content}
                      onChange={(e) => setNewReviewData({ ...newReviewData, content: e.target.value })}
                      className="w-full bg-gray-50 border rounded-xl p-2"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setIsAddingReview(false)} className="px-4 py-1.5 border rounded-lg">Cancel</button>
                    <button type="submit" className="px-5 py-1.5 bg-[#2b161b] hover:bg-[#c88132] text-white font-bold rounded-lg">Publish Review</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className={`bg-white rounded-2xl p-4 border transition-all shadow-2xs space-y-3 flex flex-col justify-between ${
                      rev.is_approved ? 'border-gray-200' : 'border-red-200 bg-red-50/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={13}
                              className={i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                            />
                          ))}
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rev.is_approved ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                        }`}>
                          {rev.is_approved ? '✓ Live on Site' : 'Hidden'}
                        </span>
                      </div>

                      <p className="text-xs text-gray-700 italic mt-2.5 leading-relaxed">
                        "{rev.content}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <h5 className="text-xs font-bold text-gray-900">{rev.author_name}</h5>
                        <p className="text-[10px] text-gray-500">{rev.author_role || 'Client'} · {rev.location}</p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleReview(rev)}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center gap-1 text-[11px]"
                          title={rev.is_approved ? 'Hide from website' : 'Show on website'}
                        >
                          {rev.is_approved ? <EyeOff size={12} /> : <Eye size={12} />}
                          <span>{rev.is_approved ? 'Hide' : 'Approve'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SALON INFO & LIVE SETTINGS */}
          {activeTab === 'salon_info' && (
            <div className="space-y-4 max-w-4xl">
              <div className="bg-white p-4 rounded-2xl border border-gray-200/80">
                <h4 className="text-base font-bold text-gray-900">Salon Contact &amp; Details Live Settings</h4>
                <p className="text-xs text-gray-500">Update salon contact numbers, address, and timings in real-time across the website.</p>
              </div>

              {salonSaveSuccess && (
                <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-xs font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>Salon Information &amp; Numbers Updated Successfully in Realtime!</span>
                </div>
              )}

              <form onSubmit={handleSaveSalonInfo} className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200/80 shadow-2xs space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Primary Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={salonEditForm.phone}
                      onChange={(e) => setSalonEditForm({ ...salonEditForm, phone: e.target.value, phoneDisplay: `+91 ${e.target.value}` })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Secondary Phone Number</label>
                    <input
                      type="text"
                      value={salonEditForm.secondaryPhone}
                      onChange={(e) => setSalonEditForm({ ...salonEditForm, secondaryPhone: e.target.value })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-gray-700 block mb-1">Location / Address *</label>
                    <input
                      type="text"
                      required
                      value={salonEditForm.location}
                      onChange={(e) => setSalonEditForm({ ...salonEditForm, location: e.target.value })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Working Hours</label>
                    <input
                      type="text"
                      value={salonEditForm.hours}
                      onChange={(e) => setSalonEditForm({ ...salonEditForm, hours: e.target.value })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Instagram Handle</label>
                    <input
                      type="text"
                      value={salonEditForm.instagram}
                      onChange={(e) => setSalonEditForm({ ...salonEditForm, instagram: e.target.value })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-gray-700 block mb-1">About Salon Text</label>
                    <textarea
                      rows={3}
                      value={salonEditForm.aboutText}
                      onChange={(e) => setSalonEditForm({ ...salonEditForm, aboutText: e.target.value })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none focus:border-[#c88132]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#2b161b] hover:bg-[#c88132] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <Save size={14} />
                    <span>Save &amp; Broadcast Updates</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: SUPABASE CLOUD SYNC & SQL RUNNER */}
          {activeTab === 'supabase' && (
            <div className="space-y-4 max-w-4xl">
              <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <Database size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">Supabase Cloud Database &amp; Realtime</h4>
                      <p className="text-xs text-gray-500">Connected to: <strong>https://gqfbiqlkgfrbkigvptmd.supabase.co</strong></p>
                    </div>
                  </div>

                  <button
                    onClick={handleTestDatabase}
                    disabled={dbTesting}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-xs"
                  >
                    <RefreshCw size={13} className={dbTesting ? 'animate-spin' : ''} />
                    <span>{dbTesting ? 'Testing Tables...' : 'Test Connection'}</span>
                  </button>
                </div>

                {dbTestResult && (
                  <div className={`p-4 rounded-2xl text-xs font-medium border ${
                    dbTestResult.includes('SUCCESS')
                      ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                      : 'bg-amber-50 text-amber-950 border-amber-300'
                  }`}>
                    {dbTestResult}
                  </div>
                )}

                {/* 1-Click Instructions & Schema */}
                <div className="p-4 rounded-2xl bg-[#2b161b] text-white text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Terminal size={14} />
                      <span>Execute in Supabase SQL Editor to seed tables:</span>
                    </span>

                    <a
                      href="https://supabase.com/dashboard/project/gqfbiqlkgfrbkigvptmd/sql"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-[#2b161b] rounded-lg font-bold flex items-center gap-1 text-[11px] transition-colors"
                    >
                      <span>Open Supabase SQL Editor</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-[11px]">
                    The complete PostgreSQL script creates all 6 tables (<code>services</code>, <code>offers</code>, <code>bookings</code>, <code>reviews</code>, <code>inquiries</code>, <code>salon_info</code>), enables RLS policies, and registers Realtime publications.
                  </p>

                  <div className="p-3 bg-black/50 rounded-xl font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-48">
                    {`-- File: supabase-schema.sql is already ready in project root!
-- 1. Open SQL Editor in Supabase
-- 2. Paste contents of supabase-schema.sql
-- 3. Click 'Run' to activate all realtime tables!`}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:px-6 sm:py-3.5 bg-white border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Realtime Admin Portal Active · Bushra's Salon &amp; Academy</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-colors"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
