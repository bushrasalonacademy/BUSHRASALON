import React from 'react';
import { Calendar, Sparkles, CheckCircle2, Shield, Heart, Award, ArrowRight } from 'lucide-react';
import { SALON_INFO, NAIL_ART_STYLES, NAIL_BADGES } from '../data/initialData';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="hero-section" id="home">
      {/* Background ambient glows */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      <div className="hero-container">
        {/* Top Header Text */}
        <div className="hero-top-copy">
          <div className="luxury-pill">
            <Sparkles size={14} className="sparkle-gold" />
            <span>Indore’s Premier Luxury Salon & Academy</span>
          </div>
          <h1 className="hero-headline">
            Expert Beauty Services for <br />
            <span className="gradient-gold-text">Your Unique Style</span>
          </h1>
          <p className="hero-subtext">
            {SALON_INFO.subtagline}
          </p>
          <div className="hero-cta-group">
            <button 
              onClick={() => onOpenBooking()} 
              className="btn-primary-luxury"
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
              <ArrowRight size={16} />
            </button>
            <a href="#services" className="btn-secondary-luxury">
              <span>Explore Services</span>
            </a>
          </div>
        </div>

        {/* Featured Nail Art Showcase Card from Screenshot 1 */}
        <div className="nail-art-hero-card" id="nail-art">
          <div className="card-top-header">
            <div className="brand-signature">
              <span className="sal-badge">BUSHRA'S</span>
              <span className="sal-sub">SALON & ACADEMY</span>
            </div>
            <div className="nail-title-group">
              <span className="nail-glow-tag">NAIL ART</span>
              <p className="nail-tagline">Small Details, Big Impact</p>
            </div>
          </div>

          <div className="nail-hero-body">
            <div className="nail-content-left">
              <h2 className="nail-body-title">
                BEAUTIFUL NAILS THAT <br />
                <span className="italic-serif">EXPRESS YOU. <Heart size={20} className="inline-heart" /></span>
              </h2>
              <p className="nail-body-desc">
                From classic elegance to trendy designs, our nail artists create perfection right down to the tips.
              </p>

              {/* 4 Feature Badges */}
              <div className="nail-badges-grid">
                {NAIL_BADGES.map((badge, idx) => (
                  <div key={idx} className="badge-item">
                    <div className="badge-icon-box">
                      {idx === 0 && <Award size={18} />}
                      {idx === 1 && <Sparkles size={18} />}
                      {idx === 2 && <Shield size={18} />}
                      {idx === 3 && <CheckCircle2 size={18} />}
                    </div>
                    <div>
                      <h4 className="badge-name">{badge.title}</h4>
                      <p className="badge-sub">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Choose Your Style Section */}
              <div className="choose-style-box">
                <span className="choose-style-heading">CHOOSE YOUR STYLE</span>
                <div className="style-chips-grid">
                  {NAIL_ART_STYLES.map((style) => (
                    <button 
                      key={style.name} 
                      onClick={() => onOpenBooking('nail-art')}
                      className="style-chip"
                      title={`Book ${style.name}: ${style.desc}`}
                    >
                      <span className="chip-dot"></span>
                      <span className="chip-name">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Hotline Bar */}
              <div className="hotline-bar">
                <div className="hotline-text">
                  <span className="hotline-brand">BUSHRA'S SALON & ACADEMY</span>
                  <span className="hotline-slogan">Perfect Nails, Perfect You ♡</span>
                </div>
                <div className="hotline-actions">
                  <a href={`tel:${SALON_INFO.phone}`} className="hotline-call-btn">
                    📞 {SALON_INFO.phone}
                  </a>
                  <button 
                    onClick={() => onOpenBooking('nail-art')}
                    className="hotline-book-btn"
                  >
                    Book Nail Art
                  </button>
                </div>
              </div>
            </div>

            {/* Right Poster Image */}
            <div className="nail-visual-right">
              <div className="nail-image-wrapper">
                <img 
                  src="/photos/IMG_2638.jpg" 
                  alt="Luxury Nail Art Bushra's Salon & Academy" 
                  className="nail-image object-cover"
                />
                <div className="nail-overlay-badge">
                  <span>✨ 100+ Custom Nail Designs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
