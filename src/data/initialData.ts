import { ServiceItem, Review, AcademyCourse, OfferItem } from '../types';

export const SALON_INFO = {
  name: "Bushra's Salon & Academy",
  shortName: "Bushra's Salon",
  tagline: "HAIR | SKIN | MAKEUP | NAIL | ACADEMY",
  subtagline: "Indore's Premier Luxury Destination for Hair Transformations, Advanced Hydra Skin Care, HD Bridal Makeovers & Custom Nail Artistry.",
  location: "Plot No 02, Near Vijay Nagar Square, Part II, Scheme No 78, Vijay Nagar, Indore, Madhya Pradesh 452010",
  phone: "9630204104",
  phoneDisplay: "+91 96302 04104",
  secondaryPhone: "+91 90395 56866",
  email: "info@bushrasalon.com",
  instagram: "@bushrasalon_academy",
  hours: "Mon - Sun: 10:00 AM - 08:30 PM",
  yearsActive: "8+",
  happyClients: "5,000+",
  satisfactionRate: "99%",
  aboutText: "Bushra's Salon & Academy is Vijay Nagar Indore's foremost luxury salon and certified beauty academy. Featuring state-of-the-art styling stations, private aesthetic skin suites, and a dedicated nail art studio, we provide high-end hair transformations, dermatologically proven facials, and couture bridal makeover experiences using 100% genuine international brands like L'Oréal Professionnel, Olaplex, Schwarzkopf, and Iluvia.",
  vision: "To be Central India's premier luxury salon brand and most prestigious certified beauty academy.",
  mission: "Deliver world-class personalized hair, skin, bridal and nail services with unmatched hygiene and artistic precision.",
  value: "Committed to luxury quality, customer confidence, and authentic creative artistry.",
};

export const NAIL_BADGES = [
  {
    title: "100% Gel & Acrylic",
    desc: "Long-lasting, chip-resistant shine for weeks"
  },
  {
    title: "Bespoke 3D Art",
    desc: "Hand-painted gems, chromes & ombre finishes"
  },
  {
    title: "Sterilized Hygiene",
    desc: "Hospital-grade sanitized tools & disposables"
  },
  {
    title: "Certified Nail Techs",
    desc: "Master artists trained in modern nail sculpting"
  }
];

export const NAIL_ART_STYLES = [
  { name: "3D Floral Gel Art", desc: "Hand-sculpted flowers with pearl accents" },
  { name: "Glitter Fade Ombre", desc: "Signature sparkle gradients on glossy extensions" },
  { name: "Korean Glass Nails", desc: "Ultra-high gloss translucent mirror effect" },
  { name: "French Chrome Tips", desc: "Metallic chrome and champagne foil edging" },
  { name: "Bridal Rose Gold", desc: "Intricate crystal embellishments for brides" },
  { name: "Midnight Royal Blue", desc: "Rich pigment with gold leaf detailing" }
];

export const INITIAL_OFFERS: OfferItem[] = [
  {
    id: 'offer-1',
    title: 'Premium 9-in-1 Bridal Glow Package',
    discount: '41% OFF',
    code: 'BRIDAL9999',
    description: 'Complete luxury pre-bridal glow & grooming ritual with premium products',
    includes: [
      'Whitening Bridal Facial',
      'Full Body D-Tan Exfoliation',
      'Full Body Waxing Ritual',
      'Luxury Spa Manicure',
      'Foot Spa Pedicure',
      'Signature Layer Hair Cut',
      'Argan & Shea Hair Spa',
      'Custom Gel Nail Polish',
      'Eyebrow & Upperlip Threading',
    ],
    price: '₹9,999',
    originalPrice: '₹17,000',
    validTill: 'Limited Festive Slots',
    badge: 'Most Popular',
    bgStyle: 'bg-gradient-to-br from-amber-50/70 via-white to-amber-100/40 border-amber-300',
  },
  {
    id: 'offer-2',
    title: 'Amino Hair Botox & Shine Therapy',
    discount: 'ANY LENGTH',
    code: 'BOTOX3999',
    description: 'Advanced amino protein hair botox treatment for silky smooth, frizz-free hair for any hair length',
    includes: [
      'Amino Protein Botox Formula',
      'Valid for Any Hair Length',
      'Deep Hair Repair & Gloss',
      'Post-Treatment Blowdry Styling',
    ],
    price: '₹3,999',
    originalPrice: '₹6,500',
    validTill: 'Valid Till Month End',
    badge: 'Best Seller',
    bgStyle: 'bg-gradient-to-br from-rose-50/50 via-white to-amber-50/50 border-rose-200',
  },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  // NAILS & HANDS
  {
    id: 'gel-paint-art',
    title: 'Custom Gel Paint + Nail Art',
    category: 'nails',
    description: 'Glossy long-lasting gel paint with custom hand-painted artistic accents and crystals.',
    price: 599,
    priceDisplay: '₹599/-',
    duration: '40 mins',
    popular: true,
    image: '/photos/IMG_2280.jpg'
  },
  {
    id: 'korean-nail-extension',
    title: 'Korean Glass Nail Extensions',
    category: 'nails',
    description: 'Trendy Korean aesthetic gel extensions with ultra-glossy glass shine & pastel finishes.',
    price: 999,
    priceDisplay: '₹999/-',
    duration: '60 mins',
    popular: true,
    image: '/photos/IMG_2643.jpg'
  },
  {
    id: 'glitter-ombre-nails',
    title: 'Signature Glitter Ombre Extensions',
    category: 'nails',
    description: 'Luxurious glitter fade ombre sculpting with reinforced high-shine top coat.',
    price: 1299,
    priceDisplay: '₹1,299/-',
    duration: '60 mins',
    popular: true,
    image: '/photos/IMG_2638.jpg'
  },
  {
    id: 'hand-whitening',
    title: 'Hand Whitening & Tan Removal',
    category: 'nails',
    description: 'Deep tan removal, brightening exfoliation ritual & intense hydrating hand wrap.',
    price: 999,
    priceDisplay: '₹999/-',
    duration: '45 mins',
    popular: false,
    image: '/photos/IMG_2381.jpg'
  },
  {
    id: 'mani-pedi-combo',
    title: 'Luxury Mani-Pedi Spa Combo',
    category: 'nails',
    description: 'Relaxing luxury manicure & pedicure session in our foot spa lounge with scrub & soothing massage.',
    price: 899,
    priceDisplay: '₹899/-',
    duration: '75 mins',
    popular: true,
    image: '/photos/IMG_8145.jpg'
  },

  // HAIR SERVICES
  {
    id: 'female-hair-cut',
    title: 'Signature Female Layer Cut & Blowdry',
    category: 'hair',
    description: 'Includes refreshing hair wash, custom precision layer/feather cut & signature blowdry styling.',
    price: 599,
    priceDisplay: '₹599/-',
    duration: '45 mins',
    popular: true,
    image: '/photos/IMG_4735.jpg'
  },
  {
    id: 'advanced-customized-cut',
    title: 'Advanced Step & Volume Cut',
    category: 'hair',
    description: 'Includes specialized hair wash, precision multi-step volume haircut & luxury blowout.',
    price: 799,
    priceDisplay: '₹799/-',
    duration: '60 mins',
    popular: true,
    image: '/photos/IMG_4736.jpg'
  },
  {
    id: 'male-hair-cut',
    title: 'Gentleman Precision Cut & Styling',
    category: 'hair',
    description: 'Includes refreshing scalp wash, precision gentleman fade/cut & matte wax styling.',
    price: 350,
    priceDisplay: '₹350/-',
    duration: '30 mins',
    popular: false,
    image: '/photos/IMG_8125.jpg'
  },
  {
    id: 'luxury-hair-treatment',
    title: 'Iluvia Amino Hair Restoration',
    category: 'hair',
    description: 'Deep nourishing protein treatment to restore damaged locks, seal cuticles & boost shine.',
    price: 1999,
    priceDisplay: '₹1,999/-',
    duration: '60 mins',
    popular: true,
    image: '/photos/IMG_1491.jpg'
  },
  {
    id: 'shea-butter-hair-spa',
    title: 'Shea Butter & Argan Hair Spa',
    category: 'hair',
    description: 'Ultra-moisturizing shea butter & argan oil spa infusion for silky, frizz-free texture.',
    price: 2499,
    priceDisplay: '₹2,499/- onwards',
    duration: '60 mins',
    popular: false,
    image: '/photos/IMG_1500.jpg'
  },
  {
    id: 'balayage-ombre-color',
    title: 'Dimensional Balayage & Ombre Color',
    category: 'hair',
    description: 'Hand-painted dimensional balayage highlights with rich gloss toner for seamless sun-kissed shine.',
    price: 3999,
    priceDisplay: '₹3,999/-',
    duration: '120 mins',
    popular: true,
    image: '/photos/IMG_1491.jpg'
  },
  {
    id: 'keratin-treatment',
    title: 'Keratin Protein Smoothing Treatment',
    category: 'hair',
    description: 'Deep protein smoothing treatment for manageable, ultra-glossy and frizz-free sleek hair.',
    price: 2999,
    priceDisplay: '₹2,999/- onwards',
    duration: '90 mins',
    popular: true,
    image: '/photos/IMG_4738.jpg'
  },
  {
    id: 'nanoplastia-treatment',
    title: 'Organic Nanoplastia Straightening',
    category: 'hair',
    description: 'Advanced organic amino acid hair straightening & deep structural restoration without harsh chemicals.',
    price: 3999,
    priceDisplay: '₹3,999/- onwards',
    duration: '120 mins',
    popular: true,
    image: '/photos/IMG_4741.jpg'
  },

  // SKIN & MAKEUP
  {
    id: 'bridal-makeup',
    title: 'Luxury HD / Airbrush Bridal Makeover',
    category: 'makeup',
    description: 'Flawless HD/Airbrush luxury bridal makeover, designer hair styling, jewelry setting & dupatta draping.',
    price: 6999,
    priceDisplay: '₹6,999/-',
    duration: '180 mins',
    popular: true,
    image: '/photos/IMG_8130.jpg'
  },
  {
    id: 'hydra-facial-glow',
    title: 'Hydra-Facial & Deep Oxygen Glow',
    category: 'skin',
    description: 'Multi-step hydra dermabrasion, pore vacuum extraction, vitamin C infusion & LED light mask.',
    price: 2499,
    priceDisplay: '₹2,499/-',
    duration: '75 mins',
    popular: true,
    image: '/photos/IMG_8130.jpg'
  },
  {
    id: 'whitening-facial',
    title: 'Insta-Bright Whitening Facial',
    category: 'skin',
    description: 'Deep pore brightening facial with vitamin infusion, gentle peeling & botanical glowing pack.',
    price: 1499,
    priceDisplay: '₹1,499/-',
    duration: '60 mins',
    popular: false,
    image: '/photos/IMG_8133.jpg'
  },
  {
    id: 'korean-facial',
    title: 'Korean Glass Skin Rejuvenation',
    category: 'skin',
    description: 'Glass-skin hydration therapy with soothing Korean peptides, botanical essences & cryo globe massage.',
    price: 2299,
    priceDisplay: '₹2,299/-',
    duration: '75 mins',
    popular: true,
    image: '/photos/IMG_8135.jpg'
  },
  {
    id: 'party-makeup',
    title: 'Celebrity Party Makeup & Styling',
    category: 'makeup',
    description: 'Glamorous HD party makeup with eye sculpting, lash extensions & signature hairstyle.',
    price: 1999,
    priceDisplay: '₹1,999/-',
    duration: '60 mins',
    popular: true,
    image: '/photos/IMG_8128.jpg'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    author_name: 'Sonal Verma',
    author_role: 'Verified Client',
    location: 'Vijay Nagar, Indore',
    rating: 5,
    content: "Bushra's Salon gave me stunning glitter nail extensions and fabulous layer hair styling that everyone admired! The ambience is so luxurious and hygienic.",
    avatar: '/photos/IMG_2638.jpg',
    is_approved: true
  },
  {
    id: 'rev-2',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    author_name: 'Neha Sharma',
    author_role: 'Bridal Client',
    location: 'Scheme 78, Indore',
    rating: 5,
    content: "Their expert bridal makeup and hydra facial team made my special day truly magical. Flawless HD finish that lasted all night without creasing!",
    avatar: '/photos/IMG_8130.jpg',
    is_approved: true
  },
  {
    id: 'rev-3',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    author_name: 'Ananya Patel',
    author_role: 'Hair Color Client',
    location: 'Indore',
    rating: 5,
    content: "Got the balayage and hair spa done here. My hair feels silky smooth, radiant and so healthy. Bushra's is by far the best salon in Vijay Nagar!",
    avatar: '/photos/IMG_1491.jpg',
    is_approved: true
  },
  {
    id: 'rev-4',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    author_name: 'Pooja Tiwari',
    author_role: 'Nail Art Enthusiast',
    location: 'Indore',
    rating: 5,
    content: "The 3D nail art here is top tier! They have genuine international gel products and master technicians. 10/10 recommended.",
    avatar: '/photos/IMG_2280.jpg',
    is_approved: true
  }
];

export const FAQS = [
  {
    question: "What services does Bushra's Salon & Academy offer?",
    answer: "We offer complete premium beauty care including precision haircuts, balayage hair color, keratin/nanoplastia treatments, hydra-facials, HD/Airbrush bridal makeup, luxury foot spa & pedicure lounge, custom 3D gel nail extensions, and certified beauty academy courses."
  },
  {
    question: "Where is Bushra's Salon located in Indore?",
    answer: "We are located at Plot No 02, Near Vijay Nagar Square, Part II, Scheme No 78, Vijay Nagar, Indore, MP 452010. You can call +91 96302 04104 or +91 90395 56866 for instant directions."
  },
  {
    question: "Do I need an appointment in advance?",
    answer: "While we welcome walk-ins based on availability, we strongly recommend booking an appointment online or via WhatsApp to avoid waiting during peak salon hours."
  },
  {
    question: "What brands and products do you use?",
    answer: "We use only 100% genuine, dermatologist-tested, top international brands like L'Oréal Professionnel, Olaplex, Schwarzkopf, Iluvia, Kryolan, Huda Beauty, and O.P.I."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept Google Pay, PhonePe, Paytm (UPI), Credit/Debit Cards, Net Banking, and Cash."
  }
];

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'course-1',
    title: 'Diploma in Advanced Hair Styling & Color Mastery',
    duration: '3 Months',
    description: 'Master international haircut techniques, balayage, keratin smoothing, and hair chemistry on live clients.',
    curriculum: ['Precision Layer Cuts', 'Balayage & Ombre Color', 'Keratin & Nanoplastia', 'Client Consultation & Hygiene'],
    certification: 'ISO Certified Academy Diploma',
    level: 'Beginner to Advanced'
  },
  {
    id: 'course-2',
    title: 'Professional HD & Airbrush Bridal Makeover',
    duration: '2 Months',
    description: 'Hands-on bridal makeover mastery, undertone color theory, eye contouring, and luxury dupatta draping.',
    curriculum: ['HD Makeup Techniques', 'Airbrush Equipment', 'Bridal Hairstyling', 'Portfolio Photoshoot'],
    certification: 'Certified Master Makeup Artist',
    level: 'Professional'
  },
  {
    id: 'course-3',
    title: 'Nail Artistry & 3D Gel Extension Mastery',
    duration: '1 Month',
    description: 'Learn gel extensions, acrylic sculpting, chrome foil, 3D floral sculpting, and luxury nail care science.',
    curriculum: ['Gel & Acrylic Extensions', '3D Sculpting & Foils', 'Korean Glass Nail Art', 'Salon Sanitation & Aftercare'],
    certification: 'Certified Nail Technician',
    level: 'All Levels'
  }
];
