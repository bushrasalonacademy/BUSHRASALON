import React from 'react';
import { OfferItem } from '../types';
import { INITIAL_OFFERS } from '../data/initialData';

interface OffersCardProps {
  offers?: OfferItem[];
  onOpenBooking: (serviceId?: string) => void;
  onClaimOffer?: (offer: OfferItem) => void;
}

export const OffersCard: React.FC<OffersCardProps> = ({ 
  offers = INITIAL_OFFERS, 
  onOpenBooking,
  onClaimOffer 
}) => {
  const activeOffers = offers && offers.length > 0 ? offers : INITIAL_OFFERS;

  const handleClaim = (offer: OfferItem) => {
    if (onClaimOffer) {
      onClaimOffer(offer);
    } else {
      onOpenBooking();
    }
  };

  return (
    <div id="offers" className="salon-card-box">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
            Exclusive Salon Deals
          </span>
          <h2 className="salon-card-title mt-1">
            Offers &amp; VIP Packages
          </h2>
        </div>

        <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
          <i className="fa-solid fa-fire text-red-500"></i>
          <span>Seasonal Specials</span>
        </span>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {activeOffers.map((offer) => (
          <div
            key={offer.id}
            className={`relative rounded-3xl p-6 sm:p-8 ${offer.bgStyle || 'bg-gradient-to-br from-amber-50/70 via-white to-amber-100/40 border-amber-300'} border shadow-md flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-all duration-300`}
          >
            {/* Background Watermark */}
            <span className="absolute -right-4 -bottom-6 font-serif text-9xl font-extrabold text-[#2b161b]/5 pointer-events-none select-none">
              B
            </span>

            {/* Top Ribbon */}
            <div className="flex items-center justify-between mb-6 z-10">
              <span className="bg-[#2b161b] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {offer.badge}
              </span>
              <span className="bg-[#c88132] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {offer.discount}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-3 z-10 mb-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#c88132] transition-colors">
                {offer.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                {offer.description}
              </p>

              {/* Package Inclusions */}
              {offer.includes && offer.includes.length > 0 && (
                <div className="pt-3 border-t border-gray-200/60">
                  <p className="text-[11px] font-bold text-[#c88132] uppercase tracking-wider mb-2">
                    Package Includes:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    {offer.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 font-semibold">
                        <i className="fa-solid fa-circle-check text-[#c88132] text-[11px]"></i>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price & Code Footer */}
            <div className="pt-5 border-t border-gray-200/80 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#2b161b]">
                    {offer.price}
                  </span>
                  {offer.originalPrice && (
                    <span className="text-xs text-gray-400 line-through font-medium">
                      {offer.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-amber-900 font-bold block mt-0.5">
                  Coupon: <strong className="text-[#2b161b] uppercase tracking-wider">{offer.code}</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleClaim(offer)}
                className="w-full sm:w-auto bg-[#2b161b] hover:bg-[#c88132] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-full transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Claim Offer</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
