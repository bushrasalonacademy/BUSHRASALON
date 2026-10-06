import React from 'react';

interface FeaturedCollageProps {
  onOpenGallery: () => void;
}

export const FeaturedCollage: React.FC<FeaturedCollageProps> = ({
  onOpenGallery,
}) => {
  const mainFeatured = {
    url: '/photos/IMG_8097.jpg',
    title: "Bushra's Reception & Ambience",
    category: 'Luxury Salon & Lounge',
  };

  const sideCollageItems = [
    {
      url: '/photos/IMG_8155.jpg',
      title: 'Pedicure Spa & Foot Lounge',
      category: 'Foot Care & Spa',
    },
    {
      url: '/photos/IMG_8130.jpg',
      title: 'Hydra-Facial & Aesthetic Suite',
      category: 'Advanced Skin Care',
    },
    {
      url: '/photos/IMG_4735.jpg',
      title: 'Precision Layer Cut & Blowdry',
      category: 'Hair Styling',
    },
    {
      url: '/photos/IMG_2638.jpg',
      title: '3D Gel Extensions & Nail Art',
      category: 'Nail Studio',
    },
  ];

  return (
    <section className="bg-white py-6 sm:py-8 border-b border-gray-100">
      <div className="custom-container">
        <div className="relative">
          
          {/* 1 Big Photo on Left + 2x2 Grid on Right (No empty spaces) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            
            {/* Left Big Featured Photo (6 of 12 cols on desktop) */}
            <div
              onClick={onOpenGallery}
              className="lg:col-span-6 group relative overflow-hidden rounded-3xl cursor-pointer shadow-sm border border-gray-200/80 bg-gray-100 h-72 sm:h-96 lg:h-[400px]"
            >
              <img
                src={mainFeatured.url}
                alt={mainFeatured.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              
              {/* Gradient Overlay & Captions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent group-hover:from-black/90 transition-colors duration-300 flex flex-col justify-end p-5 sm:p-7">
                <span className="text-xs font-bold text-amber-300 tracking-wider uppercase mb-1.5">
                  {mainFeatured.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight drop-shadow-sm">
                  {mainFeatured.title}
                </h3>
              </div>

              {/* Floating Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-md">
                <i className="fa-solid fa-expand text-xs"></i>
              </div>
            </div>

            {/* Right 2x2 Grid (6 of 12 cols on desktop) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-5">
              {sideCollageItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={onOpenGallery}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-2xs border border-gray-200/80 bg-gray-100 h-36 sm:h-44 lg:h-[190px]"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  
                  {/* Gradient Overlay & Captions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-300 flex flex-col justify-end p-3.5 sm:p-4">
                    <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 tracking-wider uppercase mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-sm line-clamp-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Floating Zoom Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-md">
                    <i className="fa-solid fa-expand text-[10px]"></i>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Floating View Full Gallery Button on Bottom Right */}
          <button
            onClick={onOpenGallery}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 hover:bg-white text-gray-900 text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-xl border border-gray-200 backdrop-blur-md transition-all duration-200 hover:scale-105 flex items-center gap-2 z-10"
          >
            <i className="fa-solid fa-images text-[#c88132]"></i>
            <span>View Full Salon Gallery (18+)</span>
          </button>

        </div>
      </div>
    </section>
  );
};
