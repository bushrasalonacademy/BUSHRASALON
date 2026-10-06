import React, { useState } from 'react';
import { Camera, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MOMENTS_ITEMS = [
  {
    id: 1,
    title: 'Precision Layer Cut & Signature Blowdry',
    category: 'Hair Styling',
    image: '/photos/IMG_4735.jpg',
    desc: 'Bespoke precision layers and voluminous salon blowdry styling'
  },
  {
    id: 2,
    title: 'Luxury Salon Reception & Ambience',
    category: 'Interior & Ambience',
    image: '/photos/IMG_8097.jpg',
    desc: "Bushra's welcoming entrance, product bar & modern chandelier"
  },
  {
    id: 3,
    title: 'Dimensional Balayage & Violet Gloss',
    category: 'Hair Color & Treatment',
    image: '/photos/IMG_1491.jpg',
    desc: 'Deep nourishing hair restoration with vibrant ombre tones'
  },
  {
    id: 4,
    title: 'Advanced Hydra-Facial Treatment Room',
    category: 'Skin Aesthetics',
    image: '/photos/IMG_8130.jpg',
    desc: 'State-of-the-art oxygen therapy and rejuvenating skin suite'
  },
  {
    id: 5,
    title: '3D Sculpted Royal Blue Nail Art',
    category: 'Nail Art Studio',
    image: '/photos/IMG_2280.jpg',
    desc: 'Handcrafted floral 3D details on sapphire blue gel extensions'
  },
  {
    id: 6,
    title: 'Lounge Foot Spa & Pedicure Station',
    category: 'Spa & Wellness',
    image: '/photos/IMG_8155.jpg',
    desc: 'Relaxing luxury foot care and soothing massage chairs'
  }
];

export const MomentsGallery: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="moments-section" id="moments">
      <div className="section-container">
        <div className="section-head-center">
          <span className="section-eyebrow">VISUAL SHOWCASE</span>
          <h2 className="section-main-heading">Moments at Bushra's Salon</h2>
          <p className="section-sub-desc">
            Explore beautiful moments capturing expert hair, makeup, and nail artistry along with the elegant environment at Bushra's Salon & Academy in Indore.
          </p>
        </div>

        <div className="moments-grid">
          {MOMENTS_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="moment-card"
              onClick={() => setActiveImage(item.image)}
            >
              <div className="moment-img-wrap">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="moment-overlay">
                  <span className="moment-cat-pill">{item.category}</span>
                  <h4 className="moment-card-title">{item.title}</h4>
                  <p className="moment-card-desc">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeImage && (
        <div className="lightbox-overlay" onClick={() => setActiveImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage} alt="Bushra Salon Moment" />
            <button className="lightbox-close" onClick={() => setActiveImage(null)}>
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
