import React from 'react';
import { Review } from '../types';

interface TestimonialsSectionProps {
  reviews: Review[];
  onOpenAddReview: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  reviews,
  onOpenAddReview,
}) => {
  return (
    <div id="reviews" className="salon-card-box">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
            Real Feedback
          </span>
          <h2 className="salon-card-title mt-1">
            Client Reviews &amp; Testimonials
          </h2>
        </div>

        <button
          onClick={onOpenAddReview}
          className="bg-[#2b161b] hover:bg-[#c88132] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <i className="fa-solid fa-pen text-xs"></i>
          <span>Write a Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="border border-gray-200/80 rounded-3xl p-6 sm:p-7 bg-white hover:border-amber-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            {/* Stars & Quote */}
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
                <span className="text-[11px] text-gray-400 font-medium">
                  Verified Visit
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                "{rev.content}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400/80 flex-shrink-0 bg-amber-100 flex items-center justify-center font-bold text-[#2b161b] text-sm shadow-xs">
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
        ))}
      </div>

    </div>
  );
};
