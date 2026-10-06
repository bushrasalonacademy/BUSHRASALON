import React from 'react';
import { Sparkles, Phone, MessageCircle, Instagram, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../data/initialData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  return (
    <footer className="footer-luxury">
      <div className="section-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="footer-logo-title">BUSHRA’S</span>
              <span className="footer-logo-sub">SALON & ACADEMY</span>
            </div>
            <p className="footer-brand-desc">
              Indore’s premier beauty destination for high-definition bridal transformations, bespoke hair artistry, certified aesthetic therapies, and professional masterclasses.
            </p>
            <div className="footer-social-links">
              <a 
                href={`https://wa.me/91${SALON_INFO.phone}`} 
                target="_blank" 
                rel="noreferrer"
                className="social-circle"
                title="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a 
                href={`tel:${SALON_INFO.phone}`} 
                className="social-circle"
                title="Call Directly"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Bushra's Salon</a></li>
              <li><a href="#services">Beauty Services</a></li>
              <li><a href="#nail-art">Nail Art Studio</a></li>
              <li><a href="#journey">Your Beauty Journey</a></li>
              <li><a href="#academy">Beauty Academy</a></li>
              <li><a href="#faqs">FAQs</a></li>
            </ul>
          </div>

          {/* Signature Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Signature Services</h4>
            <ul className="footer-links-list">
              <li><a href="#services">Precision Haircut & Styling</a></li>
              <li><a href="#services">Deep Hair Therapy & Keratin</a></li>
              <li><a href="#services">Royal Bridal Makeover</a></li>
              <li><a href="#services">Hydra Radiance Skin Care</a></li>
              <li><a href="#nail-art">Custom Chrome & 3D Nails</a></li>
              <li><a href="#academy">Professional Diploma Course</a></li>
            </ul>
          </div>

          {/* Direct Contact Box */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Contact Salon</h4>
            <div className="footer-contact-details">
              <p className="f-item">
                <MapPin size={16} className="gold-icon" />
                <span>Vijay Nagar, Indore, MP</span>
              </p>
              <p className="f-item">
                <Phone size={16} className="gold-icon" />
                <a href={`tel:${SALON_INFO.phone}`}>+91 {SALON_INFO.phone}</a>
              </p>
              <p className="f-item">
                <Sparkles size={16} className="gold-icon" />
                <span>Mon - Sun: 10:00 AM - 8:30 PM</span>
              </p>
            </div>
            <button onClick={onOpenBooking} className="footer-book-cta">
              Book Appointment Now
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {new Date().getFullYear()} Bushra's Salon & Academy. All Rights Reserved. Vijay Nagar, Indore.
          </div>
          <div className="footer-admin-link">
            <button onClick={onOpenAdmin} className="admin-portal-link">
              <ShieldCheck size={14} />
              <span>Salon Admin & Supabase Realtime Sync</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
