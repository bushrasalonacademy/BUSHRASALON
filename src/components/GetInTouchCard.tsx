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
          title="Bushra's Salon & Academy Location"
          src="https://maps.google.com/maps?q=Bushra's+Salon+%26+Academy+The+Hub+Scheme+78+Vijay+Nagar+Indore&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        ></iframe>
        <a
          href="https://maps.google.com/?q=Bushra's+Salon+%26+Academy+The+Hub+Scheme+78+Vijay+Nagar+Indore"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3 right-3 bg-[#2b161b] hover:bg-[#c88132] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition-all flex items-center gap-1.5"
        >
          <i className="fa-solid fa-directions text-xs"></i>
          <span>Open Real Map</span>
        </a>
      </div>

      {/* Contact Details List */}
      <div className="space-y-4 text-xs sm:text-sm text-gray-700">
        
        {/* Address */}
        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
          <i className="fa-solid fa-location-dot text-[#c88132] text-base mt-0.5 flex-shrink-0"></i>
          <div className="flex-1">
            <span className="font-bold text-gray-900 block mb-0.5">Salon Address:</span>
            <p className="text-gray-700 leading-relaxed font-medium">
              Plot No. 17, <span className="bg-amber-100 text-amber-950 font-bold px-1.5 py-0.5 rounded border border-amber-300/80">THE HUB</span>, Scheme No 78, Part II, Vijay Nagar, Indore, Madhya Pradesh 452010
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

        {/* Academy Campus & Helpline */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
          <div className="flex items-center gap-2 text-[#c88132] font-bold text-xs uppercase tracking-wider">
            <i className="fa-solid fa-graduation-cap"></i>
            <span>Beauty Academy (Indore Hub)</span>
          </div>
          <p className="text-xs text-gray-800 font-medium">
            Plot No. 17, THE HUB, Scheme 78, Vijay Nagar, Indore
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold">
            <a href="tel:8319504104" className="text-[#2b161b] hover:text-[#c88132] bg-white px-2.5 py-1 rounded-lg border border-amber-200">
              📞 8319504104
            </a>
            <a href="tel:8319527707" className="text-[#2b161b] hover:text-[#c88132] bg-white px-2.5 py-1 rounded-lg border border-amber-200">
              📞 8319527707
            </a>
            <a href="tel:07554057210" className="text-[#2b161b] hover:text-[#c88132] bg-white px-2.5 py-1 rounded-lg border border-amber-200">
              ☎️ 0755 4057210
            </a>
          </div>
          <a
            href="mailto:info@elanbeautyacademy.in"
            className="text-[11px] text-[#c88132] hover:underline font-semibold block"
          >
            ✉️ info@elanbeautyacademy.in
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
