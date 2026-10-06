import React, { useState } from 'react';
import { Sparkles, Clock, Calendar, ArrowRight, Star } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Services' },
    { key: 'hair', label: 'Hair Care' },
    { key: 'skin', label: 'Skin Treatments' },
    { key: 'makeup', label: 'Bridal & Makeup' },
    { key: 'nails', label: 'Nail Art' },
    { key: 'makeover', label: 'Complete Makeover' },
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <section className="services-section" id="services">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="section-eyebrow">
            <Sparkles size={14} className="gold-icon" />
            <span>INDORE BEAUTY SANCTUARY</span>
          </div>
          <h2 className="section-main-heading">
            Beauty Services
          </h2>
          <p className="section-sub-desc">
            Personalized beauty treatments and expert care for hair, skin, makeup, and nails in Indore.
          </p>

          {/* Category Tabs */}
          <div className="category-tabs-nav">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`category-tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Services Grid from Screenshot 1 */}
        <div className="services-grid-six">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card-luxury">
              <div className="service-image-container">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="service-card-img"
                  loading="lazy"
                />
                <div className="service-category-tag">
                  {service.category.toUpperCase()}
                </div>
                {service.popular && (
                  <div className="popular-ribbon">
                    <Star size={12} fill="#D4AF37" color="#D4AF37" />
                    <span>POPULAR</span>
                  </div>
                )}
              </div>

              <div className="service-card-info">
                <div className="service-title-row">
                  <h3 className="service-card-title">{service.title}</h3>
                  {service.price && (
                    <span className="service-price-tag">₹{service.price.toLocaleString('en-IN')}</span>
                  )}
                </div>

                <p className="service-card-desc">
                  {service.description}
                </p>

                <div className="service-meta-footer">
                  {service.duration && (
                    <div className="duration-pill">
                      <Clock size={13} />
                      <span>{service.duration}</span>
                    </div>
                  )}
                  <button 
                    onClick={() => onBookService(service.id)}
                    className="book-service-card-btn"
                  >
                    <span>Book Service</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
