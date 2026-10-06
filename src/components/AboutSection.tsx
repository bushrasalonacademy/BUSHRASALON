import React from 'react';
import { CheckCircle2, Sparkles, MapPin, Award } from 'lucide-react';
import { SALON_INFO } from '../data/initialData';

export const AboutSection: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="about-layout-grid">
          {/* Left Text Column */}
          <div className="about-left-col">
            <div className="section-eyebrow">
              <Sparkles size={14} className="gold-icon" />
              <span>EXPERIENCE LUXURY</span>
            </div>
            <h2 className="section-main-heading">
              About Bushra's <br />
              <span className="serif-highlight">Salon & Academy</span>
            </h2>
            
            <p className="about-paragraph-text">
              {SALON_INFO.aboutText}
            </p>

            <div className="about-highlights-list">
              <div className="highlight-item">
                <div className="check-icon-circle">
                  <CheckCircle2 size={20} />
                </div>
                <div className="highlight-text-box">
                  <h4 className="highlight-title">Vision</h4>
                  <p className="highlight-desc">{SALON_INFO.vision}</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="check-icon-circle">
                  <CheckCircle2 size={20} />
                </div>
                <div className="highlight-text-box">
                  <h4 className="highlight-title">Mission</h4>
                  <p className="highlight-desc">{SALON_INFO.mission}</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="check-icon-circle">
                  <CheckCircle2 size={20} />
                </div>
                <div className="highlight-text-box">
                  <h4 className="highlight-title">Value</h4>
                  <p className="highlight-desc">{SALON_INFO.value}</p>
                </div>
              </div>
            </div>

            <div className="about-bottom-card">
              <MapPin size={20} className="gold-icon" />
              <div>
                <strong>Located in Vijay Nagar, Indore</strong>
                <p>Equipped with state-of-the-art stations & private bridal suites</p>
              </div>
            </div>
          </div>

          {/* Right Image Column showing the Luxury Salon Interior */}
          <div className="about-right-col">
            <div className="about-image-frame">
              <img 
                src="/photos/IMG_8097.jpg" 
                alt="Bushra's Salon & Academy Reception Vijay Nagar Indore" 
                className="salon-interior-img object-cover"
              />
              <div className="image-floating-badge">
                <Award size={24} className="badge-gold-icon" />
                <div>
                  <span className="floating-big-num">8+</span>
                  <span className="floating-text">Years of Aesthetic Mastery in Indore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
