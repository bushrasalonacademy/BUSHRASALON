import React, { useState } from 'react';
import { Review } from '../types';

interface TestimonialsSectionProps {
  reviews: Review[];
  onOpenAddReview: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  reviews,
  onOpenAddReview,
}) => {
  const [filter, setFilter] = useState<'all' | 'google' | 'marie_claire'>('all');

  const filteredReviews = reviews.filter((rev) => {
    if (filter === 'all') return true;
    if (filter === 'marie_claire') return rev.source === 'marie_claire';
    return rev.source !== 'marie_claire';
  });

  const bushraCount = reviews.filter((r) => r.source !== 'marie_claire').length;
  const marieClaireCount = reviews.filter((r) => r.source === 'marie_claire').length;

  return (
    <div id="reviews" className="salon-card-box">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
            Real Client Feedback
          </span>
          <h2 className="salon-card-title mt-1">
            Client Reviews &amp; Testimonials
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Verified ratings from Bushra's Salon &amp; Academy and former Marie Claire Paris Salon (Indore).
          </p>
        </div>

        <button
          onClick={onOpenAddReview}
          className="bg-[#2b161b] hover:bg-[#c88132] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <i className="fa-solid fa-pen text-xs"></i>
          <span>Write a Review</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filter === 'all'
              ? 'bg-[#2b161b] text-white shadow-xs'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Reviews ({reviews.length})
        </button>

        <button
          onClick={() => setFilter('google')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            filter === 'google'
              ? 'bg-[#15803d] text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100'
          }`}
        >
          <span className="flex items-center text-amber-300">★ 4.9</span>
          <span>Bushra's Salon ({bushraCount})</span>
        </button>

        <button
          onClick={() => setFilter('marie_claire')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            filter === 'marie_claire'
              ? 'bg-[#831843] text-white shadow-xs'
              : 'bg-rose-50 text-rose-800 border border-rose-200/80 hover:bg-rose-100'
          }`}
        >
          <span className="flex items-center text-amber-300">★ 4.9</span>
          <span>Marie Claire Paris (271 Reviews)</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredReviews.map((rev) => {
          const isMarieClaire = rev.source === 'marie_claire';

          return (
            <div
              key={rev.id}
              className={`border rounded-3xl p-6 sm:p-7 bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 ${
                isMarieClaire
                  ? 'border-rose-200/80 hover:border-rose-400'
                  : 'border-gray-200/80 hover:border-amber-300'
              }`}
            >
              {/* Stars & Source Badge */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-solid ${
                          i < rev.rating ? 'fa-star' : 'fa-star text-gray-200'
                        }`}
                      ></i>
                    ))}
                  </div>

                  {isMarieClaire ? (
                    <span className="text-[11px] text-rose-800 font-bold flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                      <i className="fa-solid fa-gem text-rose-600 text-[10px]"></i>
                      <span>Marie Claire Paris Review</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      <i className="fa-brands fa-google text-[#4285F4] text-[11px]"></i>
                      <span>Google Verified Review</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  "{rev.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-full overflow-hidden border-2 flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-xs ${
                    isMarieClaire
                      ? 'border-rose-400 bg-rose-100 text-rose-900'
                      : 'border-amber-400 bg-amber-100 text-[#2b161b]'
                  }`}
                >
                  {rev.avatar && !rev.avatar.includes('unsplash') ? (
                    <img
                      src={rev.avatar}
                      alt={rev.author_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{rev.author_name.charAt(0)}</span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {rev.author_name}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {rev.author_role || 'Client'} · {rev.location}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
export default TestimonialsSection;
