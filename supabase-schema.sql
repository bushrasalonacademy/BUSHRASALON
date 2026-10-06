-- ============================================================================
-- BUSHRA'S SALON & ACADEMY - COMPLETE SUPABASE DATABASE SCHEMA
-- Project: https://gqfbiqlkgfrbkigvptmd.supabase.co
-- ============================================================================
-- Run this entire script in your Supabase SQL Editor:
-- 1. Creates all tables with proper data types
-- 2. Sets up Row Level Security (RLS) policies for full CRUD
-- 3. Enables Supabase Realtime for instant multi-device live sync
-- 4. Seeds all 18+ services with real salon photos, active offers & reviews!
-- ============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SALON INFO / SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.salon_info (
    id TEXT PRIMARY KEY DEFAULT 'main',
    name TEXT NOT NULL DEFAULT 'Bushra''s Salon & Academy',
    short_name TEXT NOT NULL DEFAULT 'Bushra''s Salon',
    tagline TEXT DEFAULT 'HAIR | SKIN | MAKEUP | NAIL | ACADEMY',
    subtagline TEXT DEFAULT 'Indore''s Premier Luxury Destination for Hair Transformations, Advanced Hydra Skin Care, HD Bridal Makeovers & Custom Nail Artistry.',
    location TEXT DEFAULT 'Plot No 02, Near Vijay Nagar Square, Part II, Scheme No 78, Vijay Nagar, Indore, Madhya Pradesh 452010',
    phone TEXT DEFAULT '9630204104',
    phone_display TEXT DEFAULT '+91 96302 04104',
    secondary_phone TEXT DEFAULT '+91 90395 56866',
    email TEXT DEFAULT 'info@bushrasalon.com',
    instagram TEXT DEFAULT '@bushrasalon_academy',
    hours TEXT DEFAULT 'Mon - Sun: 10:00 AM - 08:30 PM',
    years_active TEXT DEFAULT '8+',
    happy_clients TEXT DEFAULT '5,000+',
    satisfaction_rate TEXT DEFAULT '99%',
    about_text TEXT DEFAULT 'Bushra''s Salon & Academy is Vijay Nagar Indore''s foremost luxury salon and certified beauty academy. Featuring state-of-the-art styling stations, private aesthetic skin suites, and a dedicated nail art studio.',
    vision TEXT DEFAULT 'To be Central India''s premier luxury salon brand and most prestigious certified beauty academy.',
    mission TEXT DEFAULT 'Deliver world-class personalized hair, skin, bridal and nail services with unmatched hygiene and artistic precision.',
    value TEXT DEFAULT 'Committed to luxury quality, customer confidence, and authentic creative artistry.',
    announcement TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    price_display TEXT,
    duration TEXT DEFAULT '45 mins',
    image TEXT NOT NULL,
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. OFFERS TABLE
CREATE TABLE IF NOT EXISTS public.offers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    discount TEXT NOT NULL,
    code TEXT NOT NULL,
    description TEXT,
    includes TEXT[] DEFAULT '{}',
    price TEXT NOT NULL,
    original_price TEXT,
    valid_till TEXT,
    badge TEXT DEFAULT 'Special Offer',
    bg_style TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BOOKINGS TABLE (Realtime enabled)
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    service_id TEXT NOT NULL,
    service_title TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    stylist_preference TEXT,
    special_requests TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    total_price NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. REVIEWS & TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    author_name TEXT NOT NULL,
    author_role TEXT DEFAULT 'Verified Client',
    location TEXT DEFAULT 'Vijay Nagar, Indore',
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    avatar TEXT,
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. INQUIRIES & ACADEMY APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service_interest TEXT,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.salon_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 9. Create Open Public Access Policies (for seamless web & admin operations)
DROP POLICY IF EXISTS "Public select on salon_info" ON public.salon_info;
CREATE POLICY "Public select on salon_info" ON public.salon_info FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public update on salon_info" ON public.salon_info;
CREATE POLICY "Public update on salon_info" ON public.salon_info FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access on services" ON public.services;
CREATE POLICY "Public full access on services" ON public.services FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access on offers" ON public.offers;
CREATE POLICY "Public full access on offers" ON public.offers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access on bookings" ON public.bookings;
CREATE POLICY "Public full access on bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access on reviews" ON public.reviews;
CREATE POLICY "Public full access on reviews" ON public.reviews FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access on inquiries" ON public.inquiries;
CREATE POLICY "Public full access on inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

-- 10. Enable Supabase Realtime Publication
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.salon_info;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.offers;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
    EXCEPTION WHEN others THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
    EXCEPTION WHEN others THEN NULL;
    END;
END $$;

-- 11. SEED DEFAULT SALON INFO
INSERT INTO public.salon_info (id, name, short_name, tagline, subtagline, location, phone, phone_display, secondary_phone, email, instagram, hours, years_active, happy_clients, satisfaction_rate, about_text, vision, mission, value)
VALUES (
    'main',
    'Bushra''s Salon & Academy',
    'Bushra''s Salon',
    'HAIR | SKIN | MAKEUP | NAIL | ACADEMY',
    'Indore''s Premier Luxury Destination for Hair Transformations, Advanced Hydra Skin Care, HD Bridal Makeovers & Custom Nail Artistry.',
    'Plot No 02, Near Vijay Nagar Square, Part II, Scheme No 78, Vijay Nagar, Indore, Madhya Pradesh 452010',
    '9630204104',
    '+91 96302 04104',
    '+91 90395 56866',
    'info@bushrasalon.com',
    '@bushrasalon_academy',
    'Mon - Sun: 10:00 AM - 08:30 PM',
    '8+',
    '5,000+',
    '99%',
    'Bushra''s Salon & Academy is Vijay Nagar Indore''s foremost luxury salon and certified beauty academy. Featuring state-of-the-art styling stations, private aesthetic skin suites, and a dedicated nail art studio.',
    'To be Central India''s premier luxury salon brand and most prestigious certified beauty academy.',
    'Deliver world-class personalized hair, skin, bridal and nail services with unmatched hygiene and artistic precision.',
    'Committed to luxury quality, customer confidence, and authentic creative artistry.'
)
ON CONFLICT (id) DO UPDATE SET
    phone = EXCLUDED.phone,
    secondary_phone = EXCLUDED.secondary_phone,
    location = EXCLUDED.location,
    updated_at = now();

-- 12. SEED REAL SALON SERVICES
INSERT INTO public.services (id, title, category, description, price, price_display, duration, image, popular)
VALUES
('gel-paint-art', 'Custom Gel Paint + Nail Art', 'nails', 'Glossy long-lasting gel paint with custom hand-painted artistic accents and crystals.', 599, '₹599/-', '40 mins', '/photos/IMG_2280.jpg', true),
('korean-nail-extension', 'Korean Glass Nail Extensions', 'nails', 'Trendy Korean aesthetic gel extensions with ultra-glossy glass shine & pastel finishes.', 999, '₹999/-', '60 mins', '/photos/IMG_2643.jpg', true),
('glitter-ombre-nails', 'Signature Glitter Ombre Extensions', 'nails', 'Luxurious glitter fade ombre sculpting with reinforced high-shine top coat.', 1299, '₹1,299/-', '60 mins', '/photos/IMG_2638.jpg', true),
('hand-whitening', 'Hand Whitening & Tan Removal', 'nails', 'Deep tan removal, brightening exfoliation ritual & intense hydrating hand wrap.', 999, '₹999/-', '45 mins', '/photos/IMG_2381.jpg', false),
('mani-pedi-combo', 'Luxury Mani-Pedi Spa Combo', 'nails', 'Relaxing luxury manicure & pedicure session in our foot spa lounge with scrub & soothing massage.', 899, '₹899/-', '75 mins', '/photos/IMG_8145.jpg', true),
('female-hair-cut', 'Signature Female Layer Cut & Blowdry', 'hair', 'Includes refreshing hair wash, custom precision layer/feather cut & signature blowdry styling.', 599, '₹599/-', '45 mins', '/photos/IMG_4735.jpg', true),
('advanced-customized-cut', 'Advanced Step & Volume Cut', 'hair', 'Includes specialized hair wash, precision multi-step volume haircut & luxury blowout.', 799, '₹799/-', '60 mins', '/photos/IMG_4736.jpg', true),
('male-hair-cut', 'Gentleman Precision Cut & Styling', 'hair', 'Includes refreshing scalp wash, precision gentleman fade/cut & matte wax styling.', 350, '₹350/-', '30 mins', '/photos/IMG_8125.jpg', false),
('luxury-hair-treatment', 'Iluvia Amino Hair Restoration', 'hair', 'Deep nourishing protein treatment to restore damaged locks, seal cuticles & boost shine.', 1999, '₹1,999/-', '60 mins', '/photos/IMG_1491.jpg', true),
('shea-butter-hair-spa', 'Shea Butter & Argan Hair Spa', 'hair', 'Ultra-moisturizing shea butter & argan oil spa infusion for silky, frizz-free texture.', 2499, '₹2,499/- onwards', '60 mins', '/photos/IMG_1500.jpg', false),
('balayage-ombre-color', 'Dimensional Balayage & Ombre Color', 'hair', 'Hand-painted dimensional balayage highlights with rich gloss toner for seamless sun-kissed shine.', 3999, '₹3,999/-', '120 mins', '/photos/IMG_1491.jpg', true),
('keratin-treatment', 'Keratin Protein Smoothing Treatment', 'hair', 'Deep protein smoothing treatment for manageable, ultra-glossy and frizz-free sleek hair.', 2999, '₹2,999/- onwards', '90 mins', '/photos/IMG_4738.jpg', true),
('nanoplastia-treatment', 'Organic Nanoplastia Straightening', 'hair', 'Advanced organic amino acid hair straightening & deep structural restoration without harsh chemicals.', 3999, '₹3,999/- onwards', '120 mins', '/photos/IMG_4741.jpg', true),
('bridal-makeup', 'Luxury HD / Airbrush Bridal Makeover', 'makeup', 'Flawless HD/Airbrush luxury bridal makeover, designer hair styling, jewelry setting & dupatta draping.', 6999, '₹6,999/-', '180 mins', '/photos/IMG_8130.jpg', true),
('hydra-facial-glow', 'Hydra-Facial & Deep Oxygen Glow', 'skin', 'Multi-step hydra dermabrasion, pore vacuum extraction, vitamin C infusion & LED light mask.', 2499, '₹2,499/-', '75 mins', '/photos/IMG_8130.jpg', true),
('whitening-facial', 'Insta-Bright Whitening Facial', 'skin', 'Deep pore brightening facial with vitamin infusion, gentle peeling & botanical glowing pack.', 1499, '₹1,499/-', '60 mins', '/photos/IMG_8133.jpg', false),
('korean-facial', 'Korean Glass Skin Rejuvenation', 'skin', 'Glass-skin hydration therapy with soothing Korean peptides, botanical essences & cryo globe massage.', 2299, '₹2,299/-', '75 mins', '/photos/IMG_8135.jpg', true),
('party-makeup', 'Celebrity Party Makeup & Styling', 'makeup', 'Glamorous HD party makeup with eye sculpting, lash extensions & signature hairstyle.', 1999, '₹1,999/-', '60 mins', '/photos/IMG_8128.jpg', true)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    price = EXCLUDED.price,
    price_display = EXCLUDED.price_display,
    duration = EXCLUDED.duration,
    image = EXCLUDED.image,
    description = EXCLUDED.description;

-- 13. SEED OFFERS
INSERT INTO public.offers (id, title, discount, code, description, includes, price, original_price, valid_till, badge, bg_style)
VALUES
('offer-1', 'Premium 9-in-1 Bridal Glow Package', '41% OFF', 'BRIDAL9999', 'Complete luxury pre-bridal glow & grooming ritual with premium products', ARRAY['Whitening Bridal Facial', 'Full Body D-Tan Exfoliation', 'Full Body Waxing Ritual', 'Luxury Spa Manicure', 'Foot Spa Pedicure', 'Signature Layer Hair Cut', 'Argan & Shea Hair Spa', 'Custom Gel Nail Polish', 'Eyebrow & Upperlip Threading'], '₹9,999', '₹17,000', 'Limited Festive Slots', 'Most Popular', 'bg-gradient-to-br from-amber-50/70 via-white to-amber-100/40 border-amber-300'),
('offer-2', 'Amino Hair Botox & Shine Therapy', 'ANY LENGTH', 'BOTOX3999', 'Advanced amino protein hair botox treatment for silky smooth, frizz-free hair for any hair length', ARRAY['Amino Protein Botox Formula', 'Valid for Any Hair Length', 'Deep Hair Repair & Gloss', 'Post-Treatment Blowdry Styling'], '₹3,999', '₹6,500', 'Valid Till Month End', 'Best Seller', 'bg-gradient-to-br from-rose-50/50 via-white to-amber-50/50 border-rose-200')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    price = EXCLUDED.price,
    discount = EXCLUDED.discount,
    description = EXCLUDED.description;

-- 14. SEED SAMPLE REVIEWS
INSERT INTO public.reviews (id, author_name, author_role, location, rating, content, avatar, is_approved)
VALUES
('rev-1', 'Sonal Verma', 'Verified Client', 'Vijay Nagar, Indore', 5, 'Bushra''s Salon gave me stunning glitter nail extensions and fabulous layer hair styling that everyone admired! The ambience is so luxurious and hygienic.', '/photos/IMG_2638.jpg', true),
('rev-2', 'Neha Sharma', 'Bridal Client', 'Scheme 78, Indore', 5, 'Their expert bridal makeup and hydra facial team made my special day truly magical. Flawless HD finish that lasted all night without creasing!', '/photos/IMG_8130.jpg', true),
('rev-3', 'Ananya Patel', 'Hair Color Client', 'Indore', 5, 'Got the balayage and hair spa done here. My hair feels silky smooth, radiant and so healthy. Bushra''s is by far the best salon in Vijay Nagar!', '/photos/IMG_1491.jpg', true),
('rev-4', 'Pooja Tiwari', 'Nail Art Enthusiast', 'Indore', 5, 'The 3D nail art here is top tier! They have genuine international gel products and master technicians. 10/10 recommended.', '/photos/IMG_2280.jpg', true)
ON CONFLICT (id) DO UPDATE SET
    content = EXCLUDED.content,
    rating = EXCLUDED.rating;

-- 15. SEED INITIAL BOOKING SAMPLE
INSERT INTO public.bookings (id, customer_name, customer_phone, customer_email, service_id, service_title, booking_date, booking_time, stylist_preference, special_requests, status, total_price)
VALUES
('bk-sample-1', 'Pooja Kashyap', '9827012345', 'pooja@example.com', 'glitter-ombre-nails', 'Signature Glitter Ombre Extensions', CURRENT_DATE, '04:00 PM', 'Senior Nail Artist', 'Wants chrome rose gold finish', 'confirmed', 1299),
('bk-sample-2', 'Ananya Deshmukh', '9425098765', 'ananya@example.com', 'female-hair-cut', 'Signature Female Layer Cut & Blowdry', CURRENT_DATE + INTERVAL '1 day', '02:00 PM', 'Bushra Ma’am', 'Deep layer cut and blowdry styling', 'pending', 599)
ON CONFLICT (id) DO NOTHING;
