import React from 'react';

export const ReviewHighlightsSection: React.FC = () => {
  const highlights = [
    { label: '★ 4.8 Google Rated', count: '227+ Reviews' },
    { label: '✨ Best Balayage & Hair Color', count: '98% Positive' },
    { label: '💧 Hydra-Facial Glow', count: 'Top Pick' },
    { label: '👑 HD Bridal Makeup Expert', count: '500+ Brides' },
    { label: '💅 Luxury 3D Gel Nail Art', count: 'Master Artists' },
    { label: '🌿 100% Sanitized & Hygienic', count: 'Verified' },
  ];

  return (
    <div className="salon-card-box bg-gradient-to-br from-amber-50/30 via-white to-white border-amber-200/60">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
            Why Clients Love Us
          </span>
          <h2 className="salon-card-title mt-1">
            Review Highlights &amp; Badges
          </h2>
        </div>

        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#c88132] text-xl font-bold">
          <i className="fa-solid fa-medal"></i>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {highlights.map((h, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs hover:border-[#c88132] transition-colors"
          >
            <span className="text-xs sm:text-sm font-bold text-gray-900 block">
              {h.label}
            </span>
            <span className="text-[11px] font-semibold text-[#c88132] block mt-0.5">
              {h.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
