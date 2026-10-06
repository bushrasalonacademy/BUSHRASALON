import React from 'react';

export const AmenitiesCard: React.FC = () => {
  const leftAmenities = [
    'Magazines, books, or catalogs',
    'Refreshments like water or tea.',
    'Hair Washing Stations',
    'Comfortable reclining chairs.',
    'Functional sink units with hot/cold water.',
    'Mirrored Workstations',
    'Well-organized stations for tools and products.',
  ];

  const rightAmenities = [
    'Complimentary water or coffee.',
    'Soft background music to create a pleasant ambiance.',
    'Free Wi-Fi for clients to use during their appointment.',
    'Beauty products are available for purchase',
    'Magazines, a TV, or tablets with access to shows/music.',
    'Charging Points',
    'Clean Towels and Gowns',
  ];

  return (
    <div className="salon-card-box">
      <div className="mb-8 pb-4 border-b border-gray-100">
        <h2 className="salon-card-title">
          Amenities &amp; Facilities
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Enjoy premium comfort during your appointment at Bushra's Salon
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
        <div className="space-y-4">
          {leftAmenities.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-800 leading-snug">
              <i className="fa-solid fa-circle-check text-[#15803d] text-base mt-0.5 flex-shrink-0"></i>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {rightAmenities.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-800 leading-snug">
              <i className="fa-solid fa-circle-check text-[#15803d] text-base mt-0.5 flex-shrink-0"></i>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

