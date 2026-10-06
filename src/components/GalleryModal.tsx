import React, { useState } from 'react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GalleryItem {
  url: string;
  title: string;
  category: 'Interiors' | 'Hair' | 'Nails' | 'Skin & Spa';
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  if (!isOpen) return null;

  const galleryImages: GalleryItem[] = [
    // Interiors & Storefront
    { url: '/photos/IMG_8180.jpg', title: 'Salon Exterior & Illuminated Signboard', category: 'Interiors' },
    { url: '/photos/IMG_8097.jpg', title: 'Main Reception & Product Lounge', category: 'Interiors' },
    { url: '/photos/IMG_8103.jpg', title: 'Front Reception Counter Desk', category: 'Interiors' },
    { url: '/photos/IMG_8116.jpg', title: 'Designer Chandelier & Reception Area', category: 'Interiors' },
    { url: '/photos/IMG_8125.jpg', title: 'Styling Stations & Vanity Mirrors', category: 'Interiors' },
    { url: '/photos/IMG_8128.jpg', title: 'Master Hair Styling Station', category: 'Interiors' },

    // Real Hair Work
    { url: '/photos/IMG_4735.jpg', title: 'Signature Layer Cut & Bouncy Blowdry', category: 'Hair' },
    { url: '/photos/IMG_1491.jpg', title: 'Dimensional Balayage & Violet Gloss', category: 'Hair' },
    { url: '/photos/IMG_4736.jpg', title: 'Multi-layered Volume Styling', category: 'Hair' },
    { url: '/photos/IMG_4738.jpg', title: 'Keratin Smoothing & Silk Shine', category: 'Hair' },
    { url: '/photos/IMG_4741.jpg', title: 'Nanoplastia Straightening Results', category: 'Hair' },
    { url: '/photos/IMG_1500.jpg', title: 'Intense Hair Spa & Texture Revival', category: 'Hair' },

    // Real Nail Art Work
    { url: '/photos/IMG_2638.jpg', title: "Glitter Fade Ombre over Bushra's Logo", category: 'Nails' },
    { url: '/photos/IMG_2280.jpg', title: 'Royal Blue 3D Floral Nail Art', category: 'Nails' },
    { url: '/photos/IMG_2630.jpg', title: 'Bridal Rose Gold Sparkle Extensions', category: 'Nails' },
    { url: '/photos/IMG_2631.jpg', title: 'Champagne French Tip Sculpting', category: 'Nails' },
    { url: '/photos/IMG_2643.jpg', title: 'Korean Glass Finish Lilac Extensions', category: 'Nails' },
    { url: '/photos/IMG_2381.jpg', title: 'Nude Pink Pearl Hand Manicure', category: 'Nails' },
    { url: '/photos/IMG_2384.jpg', title: 'Coral Gloss & Rhinestone Detailing', category: 'Nails' },
    { url: '/photos/IMG_2646.jpg', title: 'Artisan Hand-Painted Floral Art', category: 'Nails' },

    // Skin & Spa Suites
    { url: '/photos/IMG_8130.jpg', title: 'Advanced Hydra-Facial & Glow Room', category: 'Skin & Spa' },
    { url: '/photos/IMG_8155.jpg', title: 'Luxury Pedicure Spa & Foot Lounge', category: 'Skin & Spa' },
    { url: '/photos/IMG_8145.jpg', title: 'Hair Wash Basins & Foot Spa Units', category: 'Skin & Spa' },
    { url: '/photos/IMG_8133.jpg', title: 'Aesthetic Treatment & Therapy Suite', category: 'Skin & Spa' },
  ];

  const categories = ['All', 'Interiors', 'Hair', 'Nails', 'Skin & Spa'];

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col relative shadow-2xl border border-amber-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200/80 bg-gray-50/50">
          <div>
            <span className="text-[11px] font-bold text-[#c88132] uppercase tracking-wider block">
              100% Real Salon &amp; Client Work
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              Bushra's Salon &amp; Academy Gallery
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Plot No 02, Scheme No 78, Vijay Nagar, Indore
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 p-3 sm:px-6 border-b border-gray-100 overflow-x-auto no-scrollbar bg-white">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setActiveImage(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-[#2b161b] text-amber-300 shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-[11px] text-gray-400 font-semibold ml-auto hidden sm:inline">
            Showing {filteredImages.length} Real Photos
          </span>
        </div>

        {/* Gallery Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#faf8f5]">
          {activeImage ? (
            <div className="flex flex-col items-center">
              <button
                onClick={() => setActiveImage(null)}
                className="self-start text-xs font-bold text-[#2b161b] hover:text-[#c88132] mb-3 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs"
              >
                <i className="fa-solid fa-arrow-left"></i> Back to Grid
              </button>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-black flex items-center justify-center max-h-[65vh] w-full">
                <img
                  src={activeImage}
                  alt="Selected salon view"
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img.url)}
                  className="group relative h-40 sm:h-52 rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-gray-200/80 bg-white"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-[#2b161b] shadow-xs">
                    {img.category}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-semibold leading-tight drop-shadow-md">
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-gray-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <i className="fa-solid fa-location-dot text-[#c88132]"></i>
            <span>Scheme No 78, Vijay Nagar, Indore</span>
          </div>
          <a
            href="tel:9630204104"
            className="text-xs font-bold text-[#2b161b] hover:text-[#c88132] flex items-center gap-1.5"
          >
            <i className="fa-solid fa-phone text-[#c88132]"></i>
            <span>+91 96302 04104 / +91 90395 56866</span>
          </a>
        </div>

      </div>
    </div>
  );
};
