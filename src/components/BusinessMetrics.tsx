import React from 'react';
import { Calendar, Users, ThumbsUp, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/initialData';

export const BusinessMetrics: React.FC = () => {
  return (
    <section className="metrics-section">
      <div className="section-container">
        <div className="metrics-header-row">
          <div>
            <span className="section-eyebrow">PROVEN EXCELLENCE</span>
            <h2 className="section-main-heading">Key Business Metrics</h2>
          </div>
          <p className="metrics-intro-text">
            These metrics demonstrate our trust, growth, and commitment to quality.
          </p>
        </div>

        <div className="metrics-cards-grid">
          {/* Metric 1 */}
          <div className="metric-box-card active-years-card">
            <div className="metric-box-inner">
              <div className="metric-top">
                <span className="metric-label">Years Active</span>
                <Calendar className="metric-icon" size={24} />
              </div>
              <div className="metric-huge-number">{SALON_INFO.yearsActive}</div>
              <p className="metric-sub-detail">
                Years of experience delivering personalized hair & skin care solutions.
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="metric-box-card happy-clients-card">
            <div className="metric-box-inner">
              <div className="metric-top">
                <span className="metric-label">Happy Clients</span>
                <Users className="metric-icon" size={24} />
              </div>
              <div className="metric-huge-number">{SALON_INFO.happyClients}</div>
              <p className="metric-sub-detail">
                Trusted by many satisfied clients for professional beauty services.
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="metric-box-card satisfaction-card">
            <div className="metric-box-inner">
              <div className="metric-top">
                <span className="metric-label">Satisfaction Rate</span>
                <ThumbsUp className="metric-icon" size={24} />
              </div>
              <div className="metric-huge-number">{SALON_INFO.satisfactionRate}</div>
              <p className="metric-sub-detail">
                Average customer satisfaction rating on all beauty and training services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
