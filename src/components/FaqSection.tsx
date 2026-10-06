import React, { useState } from 'react';
import { FAQS } from '../data/initialData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div id="faqs" className="salon-card-box">
      <div className="mb-8 pb-4 border-b border-gray-100">
        <h2 className="salon-card-title">
          Frequently Asked Questions (FAQs)
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Everything you need to know about Bushra's Salon &amp; Academy
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-gray-200/80 rounded-2xl overflow-hidden transition-all bg-white shadow-2xs hover:border-gray-300"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left px-6 py-4.5 bg-white hover:bg-gray-50 flex items-center justify-between gap-4 transition-colors"
              >
                <span className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? 'bg-[#2b161b] text-white' : 'bg-gray-100 text-gray-700'} flex-shrink-0 transition-colors`}>
                  <i
                    className={`fa-solid ${
                      isOpen ? 'fa-minus' : 'fa-plus'
                    } text-xs`}
                  ></i>
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
