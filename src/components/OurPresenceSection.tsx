import React from 'react';

export const OurPresenceSection: React.FC = () => {
  const states = ['Delhi', 'Karnataka', 'Madhya Pradesh', 'Maharashtra', 'Telangana'];
  const cities = ['Bengaluru', 'Hyderabad', 'Indore', 'Nagpur', 'New Delhi'];

  return (
    <section className="bg-[#f8f9fa] py-14 sm:py-20 border-t border-gray-200/80 text-center">
      <div className="custom-container space-y-6">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2b161b]">
          Our Presence Across India
        </h3>

        <div className="text-xs sm:text-sm text-gray-600 space-y-3 max-w-3xl mx-auto leading-relaxed">
          <div>
            <span className="font-bold text-gray-900 mr-2">States:</span>
            {states.map((st, i) => (
              <span key={st}>
                <span className="hover:text-[#c88132] font-medium cursor-pointer transition-colors">{st}</span>
                {i < states.length - 1 && <span className="mx-2.5 text-gray-400">/</span>}
              </span>
            ))}
          </div>

          <div>
            <span className="font-bold text-gray-900 mr-2">Cities:</span>
            {cities.map((ct, i) => (
              <span key={ct}>
                <span className="hover:text-[#c88132] font-medium cursor-pointer transition-colors">{ct}</span>
                {i < cities.length - 1 && <span className="mx-2.5 text-gray-400">/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

