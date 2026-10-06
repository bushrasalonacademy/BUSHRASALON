import React from 'react';
import { SALON_INFO } from '../data/initialData';
import { TabType } from './SubNavTabs';

interface FooterSectionProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onSelectTab?: (tab: TabType) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenBooking,
  onOpenAdmin,
  onSelectTab,
}) => {
  const handleNavigate = (tab: TabType) => {
    if (onSelectTab) {
      onSelectTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1f191b] text-white pt-14 pb-8 border-t border-gray-800">
      <div className="custom-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          
          {/* Column 1: Logo & Social Media */}
          <div>
            <div className="flex flex-col mb-4 cursor-pointer select-none" onClick={() => handleNavigate('overview')}>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                BUSHRA'S <span className="font-light text-[#c88132]">SALON</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-gray-300 font-semibold uppercase -mt-0.5">
                HAIR | SKIN | MAKEUP | ACADEMY
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              {SALON_INFO.subtagline}
            </p>

            <div className="flex items-center gap-4 text-xl">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://wa.me/919630204104" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-gray-700/80 pb-2 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavigate('overview')} className="text-gray-300 hover:text-[#c88132] transition-colors cursor-pointer">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('services')} className="text-gray-300 hover:text-[#c88132] transition-colors cursor-pointer">
                  Services &amp; Pricing
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('offers')} className="text-gray-300 hover:text-[#c88132] transition-colors cursor-pointer">
                  Offers &amp; VIP Packages
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('reviews')} className="text-gray-300 hover:text-[#c88132] transition-colors cursor-pointer">
                  Reviews &amp; Ratings
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('gallery')} className="text-gray-300 hover:text-[#c88132] transition-colors cursor-pointer">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('faqs')} className="text-gray-300 hover:text-[#c88132] transition-colors cursor-pointer">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('contact')} className="text-gray-300 hover:text-[#c88132] transition-colors cursor-pointer">
                  Contact &amp; Location
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="text-[#c88132] font-semibold hover:text-white transition-colors cursor-pointer">
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-gray-700/80 pb-2 uppercase tracking-wider">
              Opening Hours
            </h4>
            <div className="space-y-3.5 text-xs">
              <div>
                <h5 className="font-semibold text-gray-200">Salon Working Hours</h5>
                <p className="text-gray-400 mt-1 flex items-center gap-1.5">
                  <i className="fa-regular fa-clock text-[#c88132]"></i> Monday - Sunday
                </p>
                <p className="text-[#c88132] font-bold pl-5 mt-0.5">{SALON_INFO.hours}</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-200">Academy Sessions</h5>
                <p className="text-gray-400 mt-1 flex items-center gap-1.5">
                  <i className="fa-regular fa-clock text-[#c88132]"></i> Monday - Saturday
                </p>
                <p className="text-gray-300 pl-5 mt-0.5">11:00 AM – 05:00 PM</p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-gray-700/80 pb-2 uppercase tracking-wider">
              Contact Info
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-envelope text-sm text-[#c88132] mt-0.5"></i>
                <div>
                  <span className="block font-medium text-gray-200">Email:</span>
                  <a href={`mailto:${SALON_INFO.email}`} className="text-gray-300 hover:text-white">
                    {SALON_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <i className="fa-solid fa-phone text-sm text-[#c88132] mt-0.5"></i>
                <div>
                  <span className="block font-medium text-gray-200">Phone:</span>
                  <a href={`tel:${SALON_INFO.phone}`} className="text-gray-300 hover:text-white font-semibold">
                    {SALON_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-sm text-[#c88132] mt-0.5"></i>
                <div>
                  <span className="block font-medium text-gray-200">Address:</span>
                  <span className="text-gray-300 leading-relaxed block">
                    {SALON_INFO.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <p>© 2026 Bushra's Salon &amp; Academy. All Rights Reserved.</p>
          <button onClick={onOpenAdmin} className="text-gray-400 hover:text-white flex items-center gap-1.5 cursor-pointer">
            <i className="fa-solid fa-shield-halved text-[10px]"></i> Staff Admin Portal
          </button>
        </div>
      </div>
    </footer>
  );
};
