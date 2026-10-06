import React from 'react';
import { SALON_INFO } from '../data/initialData';

interface MobileBottomNavProps {
  onOpenShare: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenShare }) => {
  const mapAddress = SALON_INFO.location;
  const googleMapsUrl = 'https://maps.google.com/?q=Vijay+Nagar+Indore+Bushra+Salon';

  const handleShareWhatsApp = () => {
    const text = `Check this location:\n📍 Address: ${mapAddress}\n🗺️ Map: ${googleMapsUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="mobile-sticky-bottom sm:hidden">
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bottom-action"
      >
        <i className="fa-solid fa-location-arrow text-base"></i>
        <span>Drive Direction</span>
      </a>

      <a
        href={`tel:${SALON_INFO.phone}`}
        className="mobile-bottom-action bg-[#3f2128]"
      >
        <i className="fa-solid fa-phone text-base"></i>
        <span>Call Us</span>
      </a>

      <button
        onClick={handleShareWhatsApp}
        className="mobile-bottom-action"
      >
        <i className="fa-solid fa-share-nodes text-base"></i>
        <span>Share</span>
      </button>
    </div>
  );
};
