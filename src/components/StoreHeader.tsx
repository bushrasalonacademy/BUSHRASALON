import React, { useState } from 'react';
import { SALON_INFO } from '../data/initialData';
import { TabType } from './SubNavTabs';

interface StoreHeaderProps {
  onOpenBooking: () => void;
  onOpenShare: () => void;
  onOpenReview: () => void;
  onSelectTab?: (tab: TabType) => void;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  onOpenBooking,
  onOpenShare,
  onOpenReview,
  onSelectTab,
}) => {
  const [timingOpen, setTimingOpen] = useState(false);

  const handleDownloadVCard = () => {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:Bushra's Salon & Academy - Vijay Nagar Indore
N:Academy;Bushra's Salon;;;
ORG:Bushra's Salon & Academy
TEL;TYPE=CELL,VOICE:+919630204104
EMAIL:info@bushrasalon.com
ADR;TYPE=WORK:;;Plot No 02, Near Vijay Nagar Square, Scheme 78;Vijay Nagar, Indore;Madhya Pradesh;452010;India
URL:https://bushrasalon.com
NOTE:Luxury Hair, Skin, Makeup, Nails & Beauty Academy in Indore
END:VCARD`;

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bushras_Salon_Indore.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenReviewsTab = () => {
    if (onSelectTab) {
      onSelectTab('reviews');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenContactTab = () => {
    if (onSelectTab) {
      onSelectTab('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.open('https://maps.google.com/?q=Vijay+Nagar+Indore+Bushra+Salon', '_blank');
    }
  };

  return (
    <section className="store-header-section">
      <div className="custom-container">
        
        {/* Top Header Row with Title and Rating */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b border-gray-200/60">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
              <i className="fa-solid fa-crown text-[#c88132] text-xs"></i>
              <span>Premier Luxury Beauty Salon &amp; Academy in Indore</span>
            </div>

            <h1 className="store-heading-title">
              Bushra's Salon &amp; Academy <span className="text-[#c88132] font-normal text-2xl sm:text-3xl block sm:inline">| Vijay Nagar, Indore</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 pt-1 font-medium">
              <i className="fa-solid fa-location-dot text-[#c88132] text-sm flex-shrink-0"></i>
              <span>{SALON_INFO.location}</span>
            </p>
          </div>

          {/* Green Google Rating Badge on Top Right */}
          <div className="flex items-center gap-3 flex-shrink-0 self-start md:self-center bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="bg-[#15803d] text-white font-extrabold text-lg px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
              <span>4.8</span>
              <i className="fa-solid fa-star text-xs"></i>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
              <span className="text-xs font-bold text-gray-900 mt-0.5">227+ Google Reviews</span>
              <span className="text-[10px] text-gray-500 font-medium">99% Client Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Lower Row with Timing/Phone + Action Buttons on Left & QR Code Box on Right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6">
          
          {/* Left Sub-Section */}
          <div className="space-y-4">
            {/* Timing Dropdown & Phone */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTimingOpen(!timingOpen)}
                  className="inline-flex items-center gap-2.5 border border-emerald-200 bg-emerald-50/60 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-900 hover:border-emerald-400 transition-colors shadow-2xs"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Open Today · 10:00 AM – 08:30 PM</span>
                  <i className={`fa-solid ${timingOpen ? 'fa-angle-up' : 'fa-angle-down'} text-xs text-emerald-700`}></i>
                </button>

                {timingOpen && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="flex items-center justify-between bg-gray-50 px-5 py-3 border-b border-gray-200">
                      <span className="text-xs font-bold text-gray-800">Salon Working Hours</span>
                      <i className="fa-solid fa-clock text-[#2b161b]"></i>
                    </div>
                    <div className="p-4 text-xs space-y-2.5 text-gray-700">
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="font-medium">Monday - Sunday:</span>
                        <span className="font-bold text-gray-900">10:00 AM – 08:30 PM</span>
                      </div>
                      <div className="flex justify-between py-1 text-gray-600">
                        <span className="font-medium">Academy Sessions:</span>
                        <span className="font-semibold text-gray-800">11:00 AM – 05:00 PM</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a
                href={`tel:${SALON_INFO.phone}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2b161b] hover:text-[#c88132] transition-colors bg-amber-50/80 px-3.5 py-2 rounded-xl border border-amber-200/80"
              >
                <i className="fa-solid fa-phone-volume text-sm text-[#c88132]"></i>
                <span>{SALON_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleOpenContactTab}
                className="btn-pill-action cursor-pointer"
                title="Get directions to salon"
              >
                <i className="fa-solid fa-map-location-dot text-sm text-[#2b161b]"></i>
                <span>Get Directions</span>
              </button>

              <button
                onClick={onOpenShare}
                className="btn-pill-action cursor-pointer"
                title="Share salon profile"
              >
                <i className="fa-solid fa-share-nodes text-sm text-[#2b161b]"></i>
                <span>Share</span>
              </button>

              <button
                onClick={handleOpenReviewsTab}
                className="btn-pill-action cursor-pointer"
                title="View reviews"
              >
                <i className="fa-solid fa-star text-sm text-[#c88132]"></i>
                <span>Read Reviews</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="btn-pill-action font-bold text-white bg-[#2b161b] border-[#2b161b] hover:bg-[#c88132] hover:border-[#c88132] cursor-pointer"
                title="Book an appointment"
              >
                <i className="fa-regular fa-calendar-check text-sm text-white"></i>
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          {/* Right QR Code Contact Card */}
          <div 
            onClick={handleDownloadVCard}
            className="bg-white hover:bg-amber-50/50 border border-gray-200/80 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all shadow-xs self-start lg:self-auto hover:border-amber-300"
            title="Click to save contact card"
          >
            <div className="w-14 h-14 bg-gray-50 p-1.5 rounded-xl border border-gray-200 flex items-center justify-center shadow-2xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900">
                <path fill="currentColor" d="M10 10h30v30h-30zM15 15v20h20v-20zM60 10h30v30h-30zM65 15v20h20v-20zM10 60h30v30h-30zM15 65v20h20v-20zM22 22h6v6h-6zM72 22h6v6h-6zM22 72h6v6h-6zM55 55h10v10h-10zM75 55h15v10h-15zM55 75h10v15h-10zM75 75h15v15h-15z" />
              </svg>
            </div>

            <div className="flex items-center gap-3 pr-2">
              <i className="fa-solid fa-address-card text-3xl text-[#2b161b]"></i>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-gray-900">Add To Contacts</span>
                <span className="text-[11px] text-gray-500 font-medium">Save Salon Info to Phone</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
