import React from 'react';
import { SALON_INFO } from '../data/initialData';

interface GetInTouchCardProps {
  onOpenShare: () => void;
}

export const GetInTouchCard: React.FC<GetInTouchCardProps> = ({ onOpenShare }) => {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SALON_INFO.location);
    alert('Salon address copied to clipboard!');
  };

  return (
    <div id="contact" className="salon-card-box">
      
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
          Visit Us Today
        </span>
        <h2 className="salon-card-title mt-1">
          Get In Touch
        </h2>
      </div>

      {/* Map Embed Preview */}
      <div id="map" className="rounded-2xl overflow-hidden mb-6 h-52 border border-gray-200/80 shadow-xs relative group">
        <iframe
          title="Bushra Salon Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.529805624795!2d75.8943!3d22.7562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302a632000001%3A0x889895c1a704e0e5!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        ></iframe>
        <a
          href="https://maps.google.com/?q=Vijay+Nagar+Indore+Bushra+Salon"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3 right-3 bg-[#2b161b] hover:bg-[#c88132] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition-all flex items-center gap-1.5"
        >
          <i className="fa-solid fa-directions text-xs"></i>
          <span>Open Maps</span>
        </a>
      </div>

      {/* Contact Details List */}
      <div className="space-y-4 text-xs sm:text-sm text-gray-700">
        
        {/* Address */}
        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
          <i className="fa-solid fa-location-dot text-[#c88132] text-base mt-0.5 flex-shrink-0"></i>
          <div className="flex-1">
            <span className="font-bold text-gray-900 block mb-0.5">Salon Address:</span>
            <p className="text-gray-600 leading-relaxed">
              {SALON_INFO.location}
            </p>
            <button
              onClick={handleCopyAddress}
              className="text-xs font-semibold text-[#c88132] hover:underline mt-1.5 inline-block"
            >
              <i className="fa-regular fa-copy mr-1"></i> Copy Address
            </button>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="flex items-center gap-3.5">
            <i className="fa-solid fa-phone text-[#c88132] text-base flex-shrink-0"></i>
            <div>
              <span className="font-bold text-gray-900 block">Phone:</span>
              <a href={`tel:${SALON_INFO.phone}`} className="text-gray-600 hover:text-[#2b161b] font-semibold">
                {SALON_INFO.phoneDisplay}
              </a>
            </div>
          </div>
          <a
            href={`tel:${SALON_INFO.phone}`}
            className="w-9 h-9 rounded-full bg-[#2b161b] text-white flex items-center justify-center text-xs shadow-xs hover:bg-[#c88132] transition-colors"
          >
            <i className="fa-solid fa-phone"></i>
          </a>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
          <div className="flex items-center gap-3.5">
            <i className="fa-brands fa-whatsapp text-emerald-600 text-lg flex-shrink-0"></i>
            <div>
              <span className="font-bold text-emerald-950 block">WhatsApp Booking:</span>
              <span className="text-emerald-800 text-xs font-medium">Instant Chat &amp; Queries</span>
            </div>
          </div>
          <a
            href="https://wa.me/919630204104?text=Hi%20Bushra%20Salon%2C%20I%20want%20to%20book%20an%20appointment."
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
          >
            <span>Chat</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>

      </div>

      {/* Share Button */}
      <button
        onClick={onOpenShare}
        className="w-full mt-6 bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-2xs"
      >
        <i className="fa-solid fa-share-nodes text-[#c88132]"></i>
        <span>Share Salon Profile with Friends</span>
      </button>

    </div>
  );
};
