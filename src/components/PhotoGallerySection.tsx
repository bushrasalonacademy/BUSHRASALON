import React from 'react';

interface PhotoGallerySectionProps {
  onOpenGallery: () => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  onOpenGallery,
}) => {
  const photos = [
    {
      url: '/photos/IMG_8180.jpg',
      title: 'Salon Storefront & Signboard',
      category: 'Exterior',
    },
    {
      url: '/photos/IMG_8097.jpg',
      title: 'Reception & Product Lounge',
      category: 'Interiors',
    },
    {
      url: '/photos/IMG_8125.jpg',
      title: 'Vanity Styling Stations',
      category: 'Hair Studio',
    },
    {
      url: '/photos/IMG_8130.jpg',
      title: 'Hydra-Facial Suite',
      category: 'Skin Aesthetics',
    },
    {
      url: '/photos/IMG_8155.jpg',
      title: 'Pedicure & Foot Spa Lounge',
      category: 'Foot Spa',
    },
    {
      url: '/photos/IMG_2638.jpg',
      title: 'Bespoke 3D Nail Art',
      category: 'Nail Studio',
    },
  ];

  return (
    <div id="gallery" className="salon-card-box">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
            Visual Tour
          </span>
          <h2 className="salon-card-title mt-1">
            Photos &amp; Moments
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            A glimpse inside Bushra's Salon &amp; Academy, Vijay Nagar, Indore
          </p>
        </div>

        <button
          onClick={onOpenGallery}
          className="text-xs sm:text-sm font-bold text-[#2b161b] hover:text-[#c88132] flex items-center gap-2 transition-colors px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100"
        >
          <span>View All Photos</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
        {photos.map((p, idx) => (
          <div
            key={idx}
            onClick={onOpenGallery}
            className="group relative h-44 sm:h-56 rounded-3xl overflow-hidden cursor-pointer shadow-2xs border border-gray-200/80 bg-gray-100"
          >
            <img
              src={p.url}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
            
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#2b161b] shadow-xs">
              {p.category}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors flex items-end p-4">
              <span className="text-white text-xs sm:text-sm font-bold drop-shadow-md">
                {p.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
