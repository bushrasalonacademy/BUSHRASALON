import { useState } from "react";

const images = {
  hero: "https://images.unsplash.com/photo-1560869713-bf165a9cfac1?auto=format&fit=crop&w=1600&q=88",
  stylist: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1400&q=86",
  interior: "https://images.unsplash.com/photo-1633681121751-e4a0392602b8?auto=format&fit=crop&w=1400&q=86",
  hair: "https://images.unsplash.com/photo-1629397685944-7073f5589754?auto=format&fit=crop&w=900&q=84",
  skin: "https://images.unsplash.com/photo-1675773051474-55c4b7d2cf53?auto=format&fit=crop&w=900&q=84",
  makeup: "https://images.unsplash.com/photo-1752245818739-890854ca3b81?auto=format&fit=crop&w=900&q=84",
  nails: "https://images.unsplash.com/photo-1659391542239-9648f307c0b1?auto=format&fit=crop&w=900&q=84",
  work: "https://images.unsplash.com/photo-1675034743339-0b0747047727?auto=format&fit=crop&w=1000&q=84",
  polish: "https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?auto=format&fit=crop&w=900&q=84",
  hairDetail: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=84",
};

const navItems = ["Home", "About", "Services", "Gallery", "Reviews", "Academy", "Contact"];

const services = [
  {
    name: "Hair",
    image: images.hair,
    items: ["Haircut & Styling", "Hair Colour", "Hair Treatments", "Hair Spa"],
  },
  {
    name: "Skin",
    image: images.skin,
    items: ["Facials", "Skin Treatments", "Clean-ups", "Skin Care"],
  },
  {
    name: "Makeup",
    image: images.makeup,
    items: ["Party Makeup", "Bridal Makeup", "Event Makeup"],
  },
  {
    name: "Nails",
    image: images.nails,
    items: ["Manicure", "Pedicure", "Nail Care"],
  },
];

const standards = [
  ["01", "Premium Products", "Only high-end brands are used across every service."],
  ["02", "Professional Expertise", "Experienced professionals focused on detail and quality."],
  ["03", "Personalised Care", "Services thoughtfully tailored to your individual requirements."],
  ["04", "Quality First", "No compromise, from consultation to the finished result."],
];

const reviews = [
  "Excellent services and good staff experience.",
  "Awesome haircut and very gentle behaviour of manager and hair stylist.",
  "Professional service, great attention to detail, and a friendly atmosphere.",
];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={down ? "arrow arrow-down" : "arrow"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ButtonLink({
  children,
  href,
  variant = "dark",
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "dark" | "light" | "outline" | "text";
  external?: boolean;
}) {
  return (
    <a
      className={`button button-${variant}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-head ${light ? "section-head-light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Bushra's Salon & Academy home">
          <span className="brand-name">BUSHRA’S</span>
          <span className="brand-subtitle">SALON &amp; ACADEMY</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          Book an Appointment
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <nav aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>
                {item}
              </a>
            ))}
          </nav>
          <p>Vijay Nagar, Indore</p>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Professional Hair &amp; Beauty Care · Indore</p>
            <h1>
              BEAUTY,
              <br />
              <em>REFINED.</em>
            </h1>
            <p className="hero-description">
              Expert hair, skin, makeup and nail services using high-end brands,
              delivered with uncompromising attention to quality.
            </p>
            <div className="button-row">
              <ButtonLink href="#contact">Book an Appointment</ButtonLink>
              <ButtonLink href="#services" variant="text">
                Explore Services
              </ButtonLink>
            </div>
            <p className="location">
              <span />
              Vijay Nagar, Indore
            </p>
          </div>
          <div className="hero-visual">
            <img src={images.hero} alt="Beautifully styled hair at Bushra's salon" />
            <div className="hero-monogram">B</div>
            <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
              <span>Scroll to discover</span>
              <Arrow down />
            </a>
          </div>
        </section>

        <section className="intro section-pad" id="about">
          <div className="intro-image reveal-image">
            <img src={images.stylist} alt="Professional stylist caring for a client's hair" />
            <span className="image-note">Care in every detail</span>
          </div>
          <div className="intro-copy">
            <p className="eyebrow">The Bushra’s Experience</p>
            <h2>Your Beauty.<br /><em>Our Expertise.</em></h2>
            <p className="large-copy">
              A professional beauty destination where expertise, premium products and
              considered care come together.
            </p>
            <p>
              At Bushra’s Salon &amp; Academy, every service begins with listening.
              Our experienced team works with high-end brands and exacting standards
              to create results that feel distinctly yours.
            </p>
            <p className="service-line">Hair <i>•</i> Skin <i>•</i> Makeup <i>•</i> Nails</p>
            <ButtonLink href="#services" variant="text">Discover Bushra’s</ButtonLink>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-top">
            <SectionHead
              eyebrow="Our Expertise"
              title="Our Services"
              text="Professional care designed around you."
            />
            <ButtonLink href="#contact" variant="outline">View All Services</ButtonLink>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-item" key={service.name}>
                <div className="service-image reveal-image">
                  <img src={service.image} alt={`${service.name} service at Bushra's`} />
                  <span>0{index + 1}</span>
                </div>
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <ul>
                    {service.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <a href="#contact" aria-label={`Enquire about ${service.name} services`}>
                    Enquire <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="standard section-pad">
          <div className="standard-title">
            <p className="eyebrow">Why Bushra’s</p>
            <h2>The Bushra’s<br /><em>Standard.</em></h2>
          </div>
          <div className="standard-list">
            {standards.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery section-pad" id="gallery">
          <div className="section-top">
            <SectionHead
              eyebrow="The Salon"
              title="Inside Bushra’s"
              text="A glimpse into our space, craft and attention to detail."
            />
            <ButtonLink href="#gallery-grid" variant="outline">View Gallery</ButtonLink>
          </div>
          <div className="gallery-grid" id="gallery-grid">
            <figure className="gallery-a reveal-image">
              <img src={images.interior} alt="Refined salon interior" />
              <figcaption><span>01</span> Our space</figcaption>
            </figure>
            <figure className="gallery-b reveal-image">
              <img src={images.makeup} alt="Editorial makeup detail" />
              <figcaption><span>02</span> Makeup</figcaption>
            </figure>
            <figure className="gallery-c reveal-image">
              <img src={images.work} alt="Stylist at work" />
              <figcaption><span>03</span> At work</figcaption>
            </figure>
            <figure className="gallery-d reveal-image">
              <img src={images.polish} alt="Curated nail colours" />
              <figcaption><span>04</span> Nail care</figcaption>
            </figure>
            <figure className="gallery-e reveal-image">
              <img src={images.hairDetail} alt="Hair styling detail" />
              <figcaption><span>05</span> Hair detail</figcaption>
            </figure>
          </div>
        </section>

        <section className="reviews section-pad" id="reviews">
          <div className="reviews-heading">
            <p className="eyebrow">Client Notes</p>
            <h2>Loved by<br /><em>Our Clients.</em></h2>
            <div className="google-rating">
              <strong>Google</strong>
              <span className="stars" aria-label="5 stars">★★★★★</span>
              <span>114 Google Reviews</span>
            </div>
          </div>
          <div className="review-list">
            {reviews.map((review, index) => (
              <article key={review}>
                <div className="quote-mark">“</div>
                <p>{review}</p>
                <footer>
                  <span>Google Review</span>
                  <span>0{index + 1}</span>
                </footer>
              </article>
            ))}
            <ButtonLink
              href="https://www.google.com/search?q=Bushra%27s+Salon+%26+Academy+Indore+reviews"
              variant="light"
              external
            >
              View All Reviews
            </ButtonLink>
          </div>
        </section>

        <section className="academy section-pad" id="academy">
          <div className="academy-visual reveal-image">
            <img src={images.stylist} alt="Professional salon training at Bushra's Academy" />
            <div className="academy-badge">
              <span>Learn</span>
              <strong>The craft of beauty</strong>
            </div>
          </div>
          <div className="academy-copy">
            <p className="eyebrow">Education · Practice · Skill</p>
            <h2>Bushra’s<br /><em>Academy.</em></h2>
            <p className="large-copy">
              Learn professional beauty and salon skills with practical,
              industry-focused training.
            </p>
            <div className="academy-list">
              {["Professional Hair Training", "Makeup Training", "Beauty & Skin Training", "Salon Skills"].map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <ButtonLink href="#contact">Enquire About Courses</ButtonLink>
          </div>
        </section>

        <section className="appointment-cta">
          <img src={images.hairDetail} alt="" aria-hidden="true" />
          <div className="cta-overlay" />
          <div className="cta-content">
            <p className="eyebrow">Your time, beautifully spent</p>
            <h2>Ready for Your<br /><em>Next Look?</em></h2>
            <p>Book your appointment at Bushra’s Salon &amp; Academy.</p>
            <div className="button-row">
              <ButtonLink href="#contact" variant="light">Book an Appointment</ButtonLink>
              <ButtonLink href="tel:+919630204104" variant="text">Call 096302 04104</ButtonLink>
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-info">
            <SectionHead eyebrow="Vijay Nagar · Indore" title="Visit Bushra’s" />
            <div className="contact-detail">
              <span>Address</span>
              <p>The Hub, Scheme-78, Part II, Vijay Nagar, Aranya Nagar, Indore, Madhya Pradesh 452010</p>
            </div>
            <div className="contact-detail">
              <span>Call us</span>
              <a href="tel:+919630204104">096302 04104</a>
            </div>
            <ButtonLink
              href="https://www.google.com/maps/search/?api=1&query=Bushra%27s+Salon+%26+Academy+Vijay+Nagar+Indore"
              variant="outline"
              external
            >
              Get Directions
            </ButtonLink>
            <a
              className="map"
              href="https://www.google.com/maps/search/?api=1&query=Bushra%27s+Salon+%26+Academy+Vijay+Nagar+Indore"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Bushra's Salon location in Google Maps"
            >
              <div className="map-roads" />
              <div className="map-marker">
                <span>B</span>
                <strong>Bushra’s Salon</strong>
                <small>Vijay Nagar, Indore</small>
              </div>
            </a>
          </div>

          <form className="appointment-form" onSubmit={(event) => event.preventDefault()}>
            <div className="form-heading">
              <p className="eyebrow">Appointment Request</p>
              <h3>How may we care for you?</h3>
              <p>Share your preferences and our team will call to confirm your appointment.</p>
            </div>
            <label>
              <span>Name</span>
              <input name="name" type="text" placeholder="Your full name" required />
            </label>
            <label>
              <span>Phone Number</span>
              <input name="phone" type="tel" placeholder="+91 00000 00000" required />
            </label>
            <div className="form-row">
              <label>
                <span>Service</span>
                <select name="service" defaultValue="">
                  <option value="" disabled>Select a service</option>
                  <option>Hair</option>
                  <option>Skin</option>
                  <option>Makeup</option>
                  <option>Nails</option>
                  <option>Academy enquiry</option>
                </select>
              </label>
              <label>
                <span>Preferred Date</span>
                <input name="date" type="date" />
              </label>
            </div>
            <label>
              <span>Message</span>
              <textarea name="message" rows={3} placeholder="Tell us anything we should know" />
            </label>
            <button className="button button-dark form-submit" type="submit">
              <span>Request Appointment</span>
              <Arrow />
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a className="footer-brand" href="#home">
            <strong>BUSHRA’S</strong>
            <span>SALON &amp; ACADEMY</span>
          </a>
          <p>Hair <i>•</i> Skin <i>•</i> Makeup <i>•</i> Nails</p>
        </div>
        <div className="footer-main">
          <div>
            <span>Visit</span>
            <p>Vijay Nagar, Indore<br />Madhya Pradesh 452010</p>
          </div>
          <div>
            <span>Call</span>
            <a href="tel:+919630204104">096302 04104</a>
          </div>
          <nav aria-label="Footer navigation">
            {["Home", "About", "Services", "Gallery", "Academy", "Contact"].map((item) => (
              <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>
            ))}
          </nav>
          <div className="socials">
            <a href="#home">Instagram</a>
            <a href="#home">Facebook</a>
            <a href="https://www.google.com/search?q=Bushra%27s+Salon+%26+Academy+Indore">Google</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Bushra’s Salon &amp; Academy. All rights reserved.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>

      <a className="mobile-sticky-cta" href="#contact">
        <span>Book Appointment</span>
        <Arrow />
      </a>
    </div>
  );
}
