import React from 'react';
import { SALON_INFO } from '../data/initialData';

export const AboutCard: React.FC = () => {
  return (
    <div id="overview" className="salon-card-box bg-gradient-to-br from-white via-white to-amber-50/20">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#c88132]">
            Welcome to Bushra's Salon &amp; Academy
          </span>
          <h2 className="salon-card-title mt-1">
            Indore's Destination for Luxury &amp; Artistry
          </h2>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold self-start md:self-auto">
          <i className="fa-solid fa-award text-[#c88132] text-sm"></i>
          <span>8+ Years Excellence in Indore</span>
        </div>
      </div>

      {/* Main Body Text */}
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8">
        {SALON_INFO.aboutText}
      </p>

      {/* 3 Key Feature Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#c88132] text-lg font-bold">
            <i className="fa-solid fa-scissors"></i>
          </div>
          <h3 className="text-sm font-bold text-gray-900">Master Stylists</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Certified beauty artists trained in international cuts, skin hydra-facials &amp; HD bridal makeup.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#c88132] text-lg font-bold">
            <i className="fa-solid fa-shield-cat"></i>
          </div>
          <h3 className="text-sm font-bold text-gray-900">100% Genuine Brands</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We exclusively use original products from L'Oréal Professionnel, Olaplex, Schwarzkopf &amp; Kryolan.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#c88132] text-lg font-bold">
            <i className="fa-solid fa-sparkles"></i>
          </div>
          <h3 className="text-sm font-bold text-gray-900">Highest Hygiene</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Single-use disposable gowns, sterilized tools, sanitized chairs, and clean private skin rooms.
          </p>
        </div>
      </div>

      {/* Brand Partner Logos Banner */}
      <div className="pt-6 border-t border-gray-200/60 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
        <span>Official Product Partners:</span>
        <div className="flex flex-wrap items-center gap-6 text-gray-600 font-semibold text-xs sm:text-sm">
          <span className="hover:text-black transition-colors">L'Oréal Professionnel</span>
          <span className="hover:text-black transition-colors">Olaplex</span>
          <span className="hover:text-black transition-colors">Schwarzkopf</span>
          <span className="hover:text-black transition-colors">Kryolan</span>
          <span className="hover:text-black transition-colors">O.P.I Nails</span>
        </div>
      </div>

    </div>
  );
};
