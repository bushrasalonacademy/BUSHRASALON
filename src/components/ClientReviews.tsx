import React, { useState } from 'react';
import { Star, Quote, PlusCircle, CheckCircle2, X } from 'lucide-react';
import { Review } from '../types';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

interface ClientReviewsProps {
  reviews: Review[];
  onReviewAdded: () => void;
}

export const ClientReviews: React.FC<ClientReviewsProps> = ({ reviews, onReviewAdded }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Indore');
  const [role, setRole] = useState('Client');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return;
    setSubmitting(true);

    try {
      await api.addReview({
        author_name: name,
        author_role: role,
        location: location || 'Indore',
        rating,
        content,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setModalOpen(false);
        setName('');
        setContent('');
        onReviewAdded();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-container">
        <div className="section-head-center">
          <span className="section-eyebrow">TESTIMONIALS</span>
          <h2 className="section-main-heading">Happy Clients</h2>
          <p className="section-sub-desc">
            Hear from our clients who love our personalized beauty services and expert care.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="reviews-cards-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card-modern">
              <div className="review-card-top">
                <div className="client-avatar-wrap">
                  {rev.avatar ? (
                    <img src={rev.avatar} alt={rev.author_name} className="client-avatar-img" />
                  ) : (
                    <div className="client-avatar-placeholder">
                      {rev.author_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="client-star-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < rev.rating ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
              </div>

              <div className="review-quote-icon">
                <Quote size={32} />
              </div>

              <p className="review-content-quote">
                "{rev.content}"
              </p>

              <div className="review-author-meta">
                <h4 className="author-full-name">{rev.author_name}</h4>
                <p className="author-loc-role">
                  {rev.author_role || 'Client'}, {rev.location || 'Indore'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Action */}
        <div className="add-review-cta-box">
          <button 
            onClick={() => setModalOpen(true)}
            className="btn-outline-gold"
          >
            <PlusCircle size={18} />
            <span>Share Your Salon Experience</span>
          </button>
        </div>
      </div>

      {/* Add Review Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-dialog review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Write a Realtime Review</h3>
              <button onClick={() => setModalOpen(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            {success ? (
              <div className="modal-success-state">
                <CheckCircle2 size={48} className="success-icon" />
                <h4>Thank You for Your Feedback!</h4>
                <p>Your review has been broadcasted and added in real-time.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="modal-form">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sonal Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>City / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Indore"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Rating</label>
                    <div className="rating-select-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className={`star-select-btn ${rating >= star ? 'active' : ''}`}
                        >
                          <Star size={20} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Experience / Comments *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share how Bushra's Salon made you look and feel..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="btn-primary-luxury w-full"
                >
                  {submitting ? 'Broadcasting...' : 'Submit Realtime Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
