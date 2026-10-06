import React from 'react';

export const BlogsSection: React.FC = () => {
  const blogs = [
    {
      id: '1',
      title: 'Top Hair Restoration & Balayage Care Secrets',
      date: 'Oct 2026',
      readTime: '3 min read',
      image: '/photos/IMG_1491.jpg',
      summary: 'Essential scalp treatments, protein hydration, and expert salon maintenance for vibrant, frizz-free hair in Indore.',
    },
    {
      id: '2',
      title: 'Complete Pre-Bridal Hydra-Facial & 3D Nail Guide',
      date: 'Sep 2026',
      readTime: '5 min read',
      image: '/photos/IMG_2638.jpg',
      summary: 'From deep-cleansing oxygen hydra-facials to long-lasting gel nail extensions, here is our salon guide for brides.',
    },
  ];

  return (
    <div id="blogs" className="salon-card-box">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <h2 className="salon-card-title">
            Latest Blogs &amp; Beauty Tips
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Expert grooming and salon styling advice from Bushra's Salon
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {blogs.map((b) => (
          <div
            key={b.id}
            className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 group flex flex-col"
          >
            <div className="h-48 sm:h-56 overflow-hidden relative">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#2b161b] shadow-xs">
                {b.readTime}
              </div>
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-xs text-amber-700 font-semibold uppercase tracking-wider block mb-1">
                  {b.date}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-[#c88132] transition-colors mb-2">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {b.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-[#2b161b] group-hover:text-[#c88132]">
                <span>Read Full Article</span>
                <i className="fa-solid fa-[#2b161b] fa-arrow-right text-[10px] ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
