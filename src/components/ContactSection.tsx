import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { SALON_INFO } from '../data/initialData';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Hair Care & Styling');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitting(true);

    try {
      await api.createInquiry({
        name,
        phone,
        service_interest: service,
        message: message || 'General Inquiry'
      });

      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.7 }
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName('');
        setPhone('');
        setMessage('');
      }, 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        <div className="section-head-center">
          <span className="section-eyebrow">GET IN TOUCH</span>
          <h2 className="section-main-heading">Visit Bushra's Salon</h2>
          <p className="section-sub-desc">
            We are conveniently located in Vijay Nagar, Indore. Reach out for consultations, bridal bookings, or academy inquiries.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Left Info Column */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <div className="contact-item">
                <div className="contact-icon-bubble">
                  <Phone size={20} className="gold-icon" />
                </div>
                <div>
                  <h4 className="contact-item-title">Direct Calling & WhatsApp</h4>
                  <a href={`tel:${SALON_INFO.phone}`} className="contact-item-value highlight-link">
                    +91 {SALON_INFO.phone}
                  </a>
                  <p className="contact-item-note">Instant appointment assistance</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-bubble">
                  <MapPin size={20} className="gold-icon" />
                </div>
                <div>
                  <h4 className="contact-item-title">Salon Address</h4>
                  <p className="contact-item-value">{SALON_INFO.location}</p>
                  <p className="contact-item-note">Near Main Square, Vijay Nagar, Indore</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-bubble">
                  <Clock size={20} className="gold-icon" />
                </div>
                <div>
                  <h4 className="contact-item-title">Working Hours</h4>
                  <p className="contact-item-value">{SALON_INFO.hours}</p>
                  <p className="contact-item-note">Open 7 days a week</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-bubble">
                  <MessageCircle size={20} className="gold-icon" />
                </div>
                <div>
                  <h4 className="contact-item-title">WhatsApp Quick Chat</h4>
                  <a 
                    href={`https://wa.me/919630204104?text=${encodeURIComponent("Hello Bushra's Salon! I would like to inquire about your services.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-inline-btn"
                  >
                    <span>Chat Directly on WhatsApp &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-title">Send a Realtime Inquiry</h3>
              <p className="form-sub">Our team responds within minutes during business hours.</p>

              {success ? (
                <div className="contact-success-box">
                  <CheckCircle2 size={42} className="success-icon" />
                  <h4>Message Sent Successfully!</h4>
                  <p>Our receptionist has received your inquiry in real-time and will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-actual-form">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9630204104"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Service Category</label>
                      <select value={service} onChange={(e) => setService(e.target.value)}>
                        <option>Hair Care & Styling</option>
                        <option>Hair Treatments & Spa</option>
                        <option>Bridal & Party Makeup</option>
                        <option>Skin Care & Facials</option>
                        <option>Custom Nail Art & Extensions</option>
                        <option>Complete Makeover</option>
                        <option>Academy Course Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>How Can We Help You?</label>
                    <textarea
                      rows={3}
                      placeholder="Ask any question regarding price, styling advice, or booking..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="btn-primary-luxury w-full"
                  >
                    <Send size={16} />
                    <span>{submitting ? 'Broadcasting Inquiry...' : 'Submit Realtime Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
