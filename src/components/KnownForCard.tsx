import React from 'react';

export const KnownForCard: React.FC = () => {
  return (
    <div className="salon-card-box bg-gradient-to-br from-white via-white to-amber-50/20">
      <div className="mb-6 pb-4 border-b border-gray-100">
        <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
          Client Endorsements
        </span>
        <h2 className="salon-card-title mt-1">
          Known For Excellence
        </h2>
      </div>

      <div className="rounded-2xl overflow-hidden my-6 h-56 border border-gray-200/80 shadow-xs relative group">
        <img
          src="/photos/IMG_8125.jpg"
          alt="Bushra's Master Styling Stations"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
          <span className="text-white text-sm font-bold drop-shadow-md">
            ✨ Master Artistry &amp; International Standards
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-amber-200/80 shadow-2xs">
          <i className="fa-solid fa-sparkles text-[#c88132] text-sm mt-0.5 flex-shrink-0"></i>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
            Personalized Consultations, High-Quality Treatments, Expert Stylists, Innovative Techniques.
          </p>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
          <i className="fa-solid fa-credit-card text-[#2b161b] text-base flex-shrink-0"></i>
          <p className="text-xs sm:text-sm font-bold text-gray-800">
            UPI, Cards &amp; Digital Payments Accepted
          </p>
        </div>
      </div>
    </div>
  );
};
