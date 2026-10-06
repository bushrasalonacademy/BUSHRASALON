import React, { useState } from 'react';
import { TabType } from './SubNavTabs';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  bookingCount?: number;
  activeTab?: TabType;
  onSelectTab?: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  bookingCount = 0,
  activeTab = 'overview',
  onSelectTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dotsDropdownOpen, setDotsDropdownOpen] = useState(false);

  const handleNavigate = (tab: TabType) => {
    setMobileMenuOpen(false);
    setDotsDropdownOpen(false);
    if (onSelectTab) {
      onSelectTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="custom-container">
        <div className="flex items-center justify-between h-22 sm:h-24">
          
          {/* Brand Logo - Bushra's Salon & Academy */}
          <div 
            onClick={() => handleNavigate('overview')} 
            className="flex flex-col cursor-pointer select-none py-1 group flex-shrink-0"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2b161b] group-hover:text-[#c88132] transition-colors">
                BUSHRA'S <span className="font-light text-[#c88132]">SALON</span>
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#6b7280] font-semibold uppercase -mt-0.5">
              HAIR · SKIN · MAKEUP · ACADEMY
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-2.5">
            <button 
              onClick={() => handleNavigate('overview')} 
              className={`nav-link-item ${activeTab === 'overview' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate('services')} 
              className={`nav-link-item ${activeTab === 'services' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : ''}`}
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigate('gallery')} 
              className={`nav-link-item ${activeTab === 'gallery' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : ''}`}
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNavigate('offers')} 
              className={`nav-link-item ${activeTab === 'offers' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : ''}`}
            >
              Offers
            </button>
            <button 
              onClick={() => handleNavigate('reviews')} 
              className={`nav-link-item ${activeTab === 'reviews' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : ''}`}
            >
              Reviews
            </button>
            <button 
              onClick={() => handleNavigate('faqs')} 
              className={`nav-link-item ${activeTab === 'faqs' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : ''}`}
            >
              FAQs
            </button>
            <button 
              onClick={() => handleNavigate('contact')} 
              className={`nav-link-item ${activeTab === 'contact' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : ''}`}
            >
              Contact Us
            </button>

            {/* 3-Dots Vertical Dropdown */}
            <div className="relative inline-block text-left">
              <button
                type="button"
                onClick={() => setDotsDropdownOpen(!dotsDropdownOpen)}
                className="p-2.5 text-gray-500 hover:text-black focus:outline-none rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="More options"
              >
                <i className="fa-solid fa-ellipsis-vertical text-base"></i>
              </button>

              {dotsDropdownOpen && (
                <div 
                  className="origin-top-right absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl bg-white ring-1 ring-black/5 z-50 divide-y divide-gray-100 border border-gray-100 py-1.5"
                  onClick={() => setDotsDropdownOpen(false)}
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleNavigate('reviews')}
                      className="block w-full text-left px-4.5 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <i className="fa-solid fa-star text-amber-500 mr-3"></i> Client Reviews
                    </button>
                    <button
                      onClick={() => handleNavigate('contact')}
                      className="block w-full text-left px-4.5 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <i className="fa-solid fa-location-dot text-rose-500 mr-3"></i> Salon Location &amp; Map
                    </button>
                  </div>
                  <div className="py-1 bg-gray-50/80">
                    <button
                      onClick={onOpenAdmin}
                      className="block w-full text-left px-4.5 py-3 text-xs font-bold text-gray-900 hover:bg-gray-100 flex items-center justify-between"
                    >
                      <span><i className="fa-solid fa-shield-halved text-[#2b161b] mr-2.5"></i> Admin Portal</span>
                      {bookingCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {bookingCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="bg-[#2b161b] hover:bg-[#c88132] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow-md ml-3 whitespace-nowrap flex items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <i className="fa-regular fa-calendar-check text-xs sm:text-sm"></i>
              <span>Book Appointment</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2.5">
            <button
              onClick={onOpenBooking}
              className="bg-[#2b161b] text-white text-xs font-semibold px-3.5 py-2 rounded-full cursor-pointer"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-5 space-y-1.5 shadow-xl">
          <button
            onClick={() => handleNavigate('overview')}
            className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${activeTab === 'overview' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNavigate('services')}
            className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${activeTab === 'services' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Services &amp; Pricing
          </button>
          <button
            onClick={() => handleNavigate('offers')}
            className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${activeTab === 'offers' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Offers &amp; VIP Packages
          </button>
          <button
            onClick={() => handleNavigate('reviews')}
            className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${activeTab === 'reviews' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Reviews &amp; Ratings
          </button>
          <button
            onClick={() => handleNavigate('gallery')}
            className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${activeTab === 'gallery' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Photos &amp; Ambience
          </button>
          <button
            onClick={() => handleNavigate('faqs')}
            className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${activeTab === 'faqs' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            FAQs
          </button>
          <button
            onClick={() => handleNavigate('contact')}
            className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${activeTab === 'contact' ? 'bg-[#fdf8f0] text-[#2b161b] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Contact &amp; Location
          </button>
          <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={onOpenAdmin}
              className="text-xs text-gray-700 hover:text-black py-2 px-3 flex items-center gap-1.5 font-bold"
            >
              <i className="fa-solid fa-shield-halved text-[#2b161b]"></i> Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
