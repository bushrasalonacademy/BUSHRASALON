import React from 'react';

export const OurPresenceSection: React.FC = () => {
  const states = ['Madhya Pradesh'];
  const cities = ['Indore'];

  return (
    <section className="bg-[#f8f9fa] py-14 sm:py-20 border-t border-gray-200/80 text-center">
      <div className="custom-container space-y-6">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2b161b]">
          Our Location
        </h3>

        <div className="text-xs sm:text-sm text-gray-600 space-y-3 max-w-3xl mx-auto leading-relaxed">
          <div>
            <span className="font-bold text-gray-900 mr-2">State:</span>
            <span className="text-[#c88132] font-semibold">Madhya Pradesh</span>
          </div>

          <div>
            <span className="font-bold text-gray-900 mr-2">City:</span>
            <span className="text-[#c88132] font-bold text-base">Indore</span>
            <span className="text-gray-500 ml-2">(The Hub, Scheme No 78, Vijay Nagar)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

