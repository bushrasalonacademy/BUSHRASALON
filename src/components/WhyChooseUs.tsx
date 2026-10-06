import React from 'react';
import { HeartHandshake, Users, Sparkles, Layers, GraduationCap, Flame } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/initialData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <HeartHandshake size={24} className="feature-icon" />;
      case 1: return <Users size={24} className="feature-icon" />;
      case 2: return <Sparkles size={24} className="feature-icon" />;
      case 3: return <Layers size={24} className="feature-icon" />;
      case 4: return <GraduationCap size={24} className="feature-icon" />;
      case 5: return <Flame size={24} className="feature-icon" />;
      default: return <Sparkles size={24} className="feature-icon" />;
    }
  };

  return (
    <section className="why-choose-section">
      <div className="section-container">
        <div className="section-head-center">
          <span className="section-eyebrow">OUR COMMITMENT</span>
          <h2 className="section-main-heading">Why Choose Bushra's Salon</h2>
          <p className="section-sub-desc">
            Experience exceptional standards, pristine hygiene, and custom aesthetic transformations.
          </p>
        </div>

        <div className="why-choose-grid">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div key={item.title} className="why-card">
              <div className="why-card-left-accent"></div>
              <div className="why-card-content">
                <div className="why-icon-box">
                  {getIcon(idx)}
                </div>
                <div className="why-text">
                  <h3 className="why-title">{item.title}</h3>
                  <p className="why-desc">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
