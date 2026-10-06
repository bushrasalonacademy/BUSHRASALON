import React from 'react';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { BEAUTY_JOURNEY_STEPS } from '../data/initialData';

interface BeautyJourneyProps {
  onOpenBooking: () => void;
}

export const BeautyJourney: React.FC<BeautyJourneyProps> = ({ onOpenBooking }) => {
  return (
    <section className="journey-section" id="journey">
      <div className="section-container">
        <div className="section-head-center">
          <span className="section-eyebrow">SEAMLESS EXPERIENCE</span>
          <h2 className="section-main-heading">Your Beauty Journey</h2>
          <p className="section-sub-desc">
            Follow these simple steps to get expert hair, skin, makeup, and nail services at Bushra's Salon & Academy.
          </p>
        </div>

        <div className="journey-steps-grid">
          {BEAUTY_JOURNEY_STEPS.map((stepItem, idx) => (
            <div key={stepItem.step} className="journey-step-card">
              <div className="step-number-bubble">
                <span>{stepItem.step}</span>
              </div>
              <div className="step-content">
                <h3 className="step-title">{stepItem.title}</h3>
                <p className="step-desc">{stepItem.description}</p>
              </div>
              {idx < BEAUTY_JOURNEY_STEPS.length - 1 && (
                <div className="step-connector-line"></div>
              )}
            </div>
          ))}
        </div>

        <div className="journey-cta-wrapper">
          <button onClick={onOpenBooking} className="btn-primary-luxury">
            <Calendar size={18} />
            <span>Begin Your Transformation Today</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
