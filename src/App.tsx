import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { StoreHeader } from './components/StoreHeader';
import { FeaturedCollage } from './components/FeaturedCollage';
import { SubNavTabs, TabType } from './components/SubNavTabs';
import { AboutCard } from './components/AboutCard';
import { OffersCard } from './components/OffersCard';
import { ServicesCard } from './components/ServicesCard';
import { AmenitiesCard } from './components/AmenitiesCard';
import { AcademySection } from './components/AcademySection';
import { EnquireNowForm } from './components/EnquireNowForm';
import { GetInTouchCard } from './components/GetInTouchCard';
import { KnownForCard } from './components/KnownForCard';
import { ReviewHighlightsSection } from './components/ReviewHighlightsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import { RealtimeBookingModal } from './components/RealtimeBookingModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ReviewModal } from './components/ReviewModal';
import { GalleryModal } from './components/GalleryModal';
import { ShareModal } from './components/ShareModal';
import { api } from './services/api';
import { ServiceItem, Booking, Review, Inquiry, SalonInfo, OfferItem } from './types';
import { INITIAL_SERVICES, INITIAL_OFFERS, SALON_INFO } from './data/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [salonInfo, setSalonInfo] = useState<SalonInfo>(SALON_INFO as SalonInfo);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [offers, setOffers] = useState<OfferItem[]>(INITIAL_OFFERS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
    }
    return false;
  });
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedOffer, setPreselectedOffer] = useState<OfferItem | null>(null);

  // Sync URL with Admin state
  const handleOpenAdmin = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({ admin: true }, '', '/admin');
    }
    setAdminModalOpen(true);
  };

  const handleCloseAdmin = () => {
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin')) {
      window.history.pushState({}, '', '/');
    }
    setAdminModalOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      const isAdmin = window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
      setAdminModalOpen(isAdmin);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch all realtime data
  const loadData = useCallback(async () => {
    try {
      const [infoData, svcData, ofrData, bkData, revData, inqData] = await Promise.all([
        api.getSalonInfo(),
        api.getServices(),
        api.getOffers(),
        api.getBookings(),
        api.getReviews(),
        api.getInquiries(),
      ]);
      setSalonInfo(infoData);
      setServices(svcData);
      setOffers(ofrData);
      setBookings(bkData);
      setReviews(revData);
      setInquiries(inqData);
    } catch (err) {
      console.error('Error fetching salon data:', err);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Subscribe to Realtime Updates
    const unsubBookings = api.subscribeToTable('bookings', () => {
      api.getBookings().then(setBookings);
    });

    const unsubOffers = api.subscribeToTable('offers', () => {
      api.getOffers().then(setOffers);
    });

    const unsubReviews = api.subscribeToTable('reviews', () => {
      api.getReviews().then(setReviews);
    });

    const unsubInquiries = api.subscribeToTable('inquiries', () => {
      api.getInquiries().then(setInquiries);
    });

    const unsubServices = api.subscribeToTable('services', () => {
      api.getServices().then(setServices);
    });

    const unsubSalonInfo = api.subscribeToTable('salon_info', () => {
      api.getSalonInfo().then(setSalonInfo);
    });

    return () => {
      unsubBookings();
      unsubOffers();
      unsubReviews();
      unsubInquiries();
      unsubServices();
      unsubSalonInfo();
    };
  }, [loadData]);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedOffer(null);
    setPreselectedServiceId(serviceId);
    setBookingModalOpen(true);
  };

  const handleClaimOffer = (offer: OfferItem) => {
    setPreselectedServiceId(undefined);
    setPreselectedOffer(offer);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    api.getBookings().then(setBookings);
  };

  const handleReviewAdded = () => {
    api.getReviews().then(setReviews);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div id="home" className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1f2937] pb-16 sm:pb-0">
      {/* Top Main Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleOpenAdmin}
        bookingCount={bookings.filter((b) => b.status === 'pending').length}
        activeTab={activeTab}
        onSelectTab={handleTabChange}
      />

      {/* Store Header Info */}
      <StoreHeader
        onOpenBooking={() => handleOpenBooking()}
        onOpenShare={() => setShareModalOpen(true)}
        onOpenReview={() => setReviewModalOpen(true)}
        onSelectTab={handleTabChange}
      />

      {/* Featured 1-Big + 2x2 Grid Collage (Only on Overview or compact on other pages) */}
      {activeTab === 'overview' && (
        <FeaturedCollage onOpenGallery={() => setGalleryModalOpen(true)} />
      )}

      {/* Screen Navigation Tabs */}
      <SubNavTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Dynamic Screen View */}
      <main className="flex-1 py-8 sm:py-12 bg-[#faf8f5]">
        <div className="custom-container">
          
          {/* Breadcrumb / Screen Title */}
          {activeTab !== 'overview' && (
            <div className="mb-8 flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <button 
                  onClick={() => handleTabChange('overview')}
                  className="hover:text-[#c88132] font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="fa-solid fa-house text-xs"></i>
                  <span>Home</span>
                </button>
                <span>/</span>
                <span className="text-[#c88132] font-bold capitalize">
                  {activeTab === 'services' && 'Services & Pricing Rate Card'}
                  {activeTab === 'offers' && 'Offers & VIP Packages'}
                  {activeTab === 'reviews' && 'Client Reviews & Ratings'}
                  {activeTab === 'gallery' && 'Photos & Salon Ambience'}
                  {activeTab === 'faqs' && 'Frequently Asked Questions'}
                  {activeTab === 'contact' && 'Contact Us & Location'}
                </span>
              </div>

              <button
                onClick={() => handleTabChange('overview')}
                className="text-xs font-bold text-gray-600 hover:text-[#2b161b] flex items-center gap-1 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
              >
                <i className="fa-solid fa-arrow-left text-[10px]"></i>
                <span>Back to Overview</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SCREEN 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <>
                <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                  <AboutCard />
                  <OffersCard 
                    offers={offers} 
                    onOpenBooking={handleOpenBooking}
                    onClaimOffer={handleClaimOffer}
                  />
                  <AcademySection />
                  <AmenitiesCard />
                  <PhotoGallerySection onOpenGallery={() => setGalleryModalOpen(true)} />
                </div>
                <div className="lg:col-span-4 space-y-8 sm:space-y-10">
                  <EnquireNowForm />
                  <GetInTouchCard onOpenShare={() => setShareModalOpen(true)} />
                  <KnownForCard />
                </div>
              </>
            )}

            {/* SCREEN 2: SERVICES & PRICING */}
            {activeTab === 'services' && (
              <>
                <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                  <ServicesCard
                    services={services}
                    onBookService={handleOpenBooking}
                  />
                  <AmenitiesCard />
                </div>
                <div className="lg:col-span-4 space-y-8 sm:space-y-10">
                  <EnquireNowForm />
                  <GetInTouchCard onOpenShare={() => setShareModalOpen(true)} />
                </div>
              </>
            )}

            {/* SCREEN 3: OFFERS & VIP PACKAGES */}
            {activeTab === 'offers' && (
              <>
                <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                  <OffersCard 
                    offers={offers} 
                    onOpenBooking={handleOpenBooking}
                    onClaimOffer={handleClaimOffer}
                  />
                </div>
                <div className="lg:col-span-4 space-y-8 sm:space-y-10">
                  <EnquireNowForm />
                  <GetInTouchCard onOpenShare={() => setShareModalOpen(true)} />
                </div>
              </>
            )}

            {/* SCREEN 4: REVIEWS & RATINGS */}
            {activeTab === 'reviews' && (
              <>
                <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                  <ReviewHighlightsSection />
                  <TestimonialsSection
                    reviews={reviews}
                    onOpenAddReview={() => setReviewModalOpen(true)}
                  />
                </div>
                <div className="lg:col-span-4 space-y-8 sm:space-y-10">
                  <EnquireNowForm />
                  <GetInTouchCard onOpenShare={() => setShareModalOpen(true)} />
                </div>
              </>
            )}

            {/* SCREEN 5: PHOTOS & AMBIENCE */}
            {activeTab === 'gallery' && (
              <>
                <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                  <PhotoGallerySection onOpenGallery={() => setGalleryModalOpen(true)} />
                  <AboutCard />
                </div>
                <div className="lg:col-span-4 space-y-8 sm:space-y-10">
                  <EnquireNowForm />
                  <GetInTouchCard onOpenShare={() => setShareModalOpen(true)} />
                </div>
              </>
            )}

            {/* SCREEN 6: FAQS */}
            {activeTab === 'faqs' && (
              <>
                <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                  <FaqSection />
                </div>
                <div className="lg:col-span-4 space-y-8 sm:space-y-10">
                  <EnquireNowForm />
                  <GetInTouchCard onOpenShare={() => setShareModalOpen(true)} />
                </div>
              </>
            )}

            {/* SCREEN 7: CONTACT & LOCATION */}
            {activeTab === 'contact' && (
              <>
                <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                  <GetInTouchCard onOpenShare={() => setShareModalOpen(true)} />
                  <KnownForCard />
                </div>
                <div className="lg:col-span-4 space-y-8 sm:space-y-10">
                  <EnquireNowForm />
                </div>
              </>
            )}

          </div>
        </div>
      </main>

      {/* Footer Section */}
      <FooterSection
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleOpenAdmin}
        onSelectTab={handleTabChange}
      />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav onOpenShare={() => setShareModalOpen(true)} />

      {/* Interactive Modals */}
      <RealtimeBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        services={services}
        preselectedServiceId={preselectedServiceId}
        preselectedOffer={preselectedOffer}
        onBookingSuccess={handleBookingSuccess}
      />

      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={handleCloseAdmin}
        bookings={bookings}
        inquiries={inquiries}
        reviews={reviews}
        services={services}
        offers={offers}
        salonInfo={salonInfo}
        onRefresh={loadData}
        onUpdateServices={setServices}
        onUpdateOffers={setOffers}
        onUpdateSalonInfo={setSalonInfo}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onReviewAdded={handleReviewAdded}
      />

      <GalleryModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}
