import React, { useState } from 'react';
import { ServiceItem } from '../types';

interface ServicesCardProps {
  services: ServiceItem[];
  onBookService: (serviceId?: string) => void;
}

export const ServicesCard: React.FC<ServicesCardProps> = ({
  services,
  onBookService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categoryConfigs = [
    { id: 'all', label: 'All Services', icon: 'fa-layer-group' },
    { id: 'hair', label: 'Hair Services', icon: 'fa-[#c88132] fa-scissors' },
    { id: 'nails', label: 'Nails & Hands', icon: 'fa-hand-sparkles' },
    { id: 'skin', label: 'Skin & Facials', icon: 'fa-wand-magic-sparkles' },
    { id: 'makeup', label: 'Bridal & Makeup', icon: 'fa-crown' },
  ];

  const categoryGroups = [
    {
      id: 'hair',
      title: 'Hair Care & Styling Services',
      subtitle: 'Precision cuts, advanced treatments, global hair color & smoothing rituals',
      icon: 'fa-scissors',
    },
    {
      id: 'nails',
      title: 'Nail Art & Hand Treatments',
      subtitle: 'Gel paint, Korean glass nail extensions, hand whitening & mani-pedi combos',
      icon: 'fa-hand-sparkles',
    },
    {
      id: 'skin',
      title: 'Skin Care & Facial Treatments',
      subtitle: 'Whitening facials, Korean glass skin therapy & regular deep cleanups',
      icon: 'fa-wand-magic-sparkles',
    },
    {
      id: 'makeup',
      title: 'HD Bridal & Party Makeup',
      subtitle: 'Luxury HD/Airbrush bridal transformations & glamour party makeover',
      icon: 'fa-crown',
    },
  ];

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return services.length;
    return services.filter((s) => s.category === catId).length;
  };

  const visibleGroups = activeCategory === 'all'
    ? categoryGroups.filter((g) => services.some((s) => s.category === g.id))
    : categoryGroups.filter((g) => g.id === activeCategory);

  return (
    <div id="services" className="salon-card-box">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
            Salon Services &amp; Pricing
          </span>
          <h2 className="salon-card-title mt-1">
            Services &amp; Luxury Treatments
          </h2>
        </div>

        <span className="text-xs text-gray-700 bg-amber-50 px-3.5 py-1.5 rounded-full font-bold border border-amber-200 self-start sm:self-auto flex items-center gap-2">
          <i className="fa-solid fa-list-check text-[#c88132]"></i>
          <span>{services.length} Complete Rate Card Services</span>
        </span>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-gray-100">
        {categoryConfigs.map((cat) => {
          const count = getCategoryCount(cat.id);
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-[#2b161b] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className={`fa-solid ${cat.icon} text-xs ${isActive ? 'text-[#c88132]' : 'text-gray-500'}`}></i>
              <span>{cat.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-[#c88132] text-white' : 'bg-gray-200 text-gray-700'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grouped Category Sections */}
      <div className="space-y-12">
        {visibleGroups.map((group) => {
          const groupServices = services.filter((s) => s.category === group.id);
          if (groupServices.length === 0) return null;

          return (
            <div key={group.id} className="space-y-6">
              {/* Group Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-amber-200/60">
                <div className="w-9 h-9 rounded-full bg-[#2b161b] text-[#c88132] flex items-center justify-center font-bold text-sm shadow-xs">
                  <i className={`fa-solid ${group.icon}`}></i>
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span>{group.title}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      {groupServices.length} {groupServices.length === 1 ? 'Service' : 'Services'}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">{group.subtitle}</p>
                </div>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {groupServices.map((svc) => (
                  <div
                    key={svc.id}
                    className="border border-gray-200/80 rounded-3xl p-5 sm:p-6 bg-white hover:border-[#c88132] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    {/* Top Image & Badge */}
                    <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 bg-gray-100">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {svc.popular && (
                        <div className="absolute top-3 left-3 bg-[#c88132] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          ★ Popular Choice
                        </div>
                      )}

                      {svc.duration && (
                        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-gray-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                          <i className="fa-regular fa-clock text-[#c88132]"></i>
                          <span>{svc.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Service Information */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-[#c88132] transition-colors">
                          {svc.title}
                        </h4>
                        {svc.priceDisplay ? (
                          <span className="text-base sm:text-lg font-extrabold text-[#2b161b] bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex-shrink-0">
                            {svc.priceDisplay}
                          </span>
                        ) : svc.price !== undefined ? (
                          <span className="text-base sm:text-lg font-extrabold text-[#2b161b] bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex-shrink-0">
                            ₹{svc.price.toLocaleString('en-IN')}/-
                          </span>
                        ) : null}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                        {svc.description}
                      </p>
                    </div>

                    {/* Book Now Action Footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                      <span className="text-[11px] text-gray-500 font-medium">
                        Instant Confirmation
                      </span>

                      <button
                        onClick={() => onBookService(svc.id)}
                        className="bg-[#2b161b] hover:bg-[#c88132] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        <span>Book Service</span>
                        <i className="fa-solid fa-arrow-right text-xs"></i>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

