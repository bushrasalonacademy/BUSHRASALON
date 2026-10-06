import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Phone, Mail, MessageSquare, ArrowRight, ShieldCheck, Tag, Gift } from 'lucide-react';
import { ServiceItem, Booking, OfferItem } from '../types';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

interface RealtimeBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  preselectedServiceId?: string;
  preselectedOffer?: OfferItem | null;
  onBookingSuccess: (booking: Booking) => void;
}

const TIME_SLOTS = [
  '10:30 AM', '11:30 AM', '12:30 PM', '01:30 PM',
  '02:30 PM', '03:30 PM', '04:30 PM', '05:30 PM',
  '06:30 PM', '07:30 PM'
];

const STYLISTS = [
  'Bushra Ma’am (Master Director & Bridal Specialist)',
  'Senior Hair & Chemical Specialist',
  'Master Nail Artist (Custom Nail Studio)',
  'Senior Aesthetician (Skin & Glow Expert)',
  'Any Available Senior Stylist'
];

export const RealtimeBookingModal: React.FC<RealtimeBookingModalProps> = ({
  isOpen,
  onClose,
  services,
  preselectedServiceId,
  preselectedOffer,
  onBookingSuccess
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('02:30 PM');
  const [selectedStylist, setSelectedStylist] = useState<string>(STYLISTS[0]);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (preselectedOffer) {
        setSelectedServiceId('');
      } else if (preselectedServiceId) {
        setSelectedServiceId(preselectedServiceId);
      } else if (services.length > 0 && !selectedServiceId) {
        setSelectedServiceId(services[0].id);
      }
      // default date tomorrow
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      setSelectedDate(tomorrow);
    }
  }, [isOpen, preselectedServiceId, preselectedOffer, services]);

  if (!isOpen) return null;

  const currentService = services.find(s => s.id === selectedServiceId) || services[0];

  // Price computation
  const getOfferNumericPrice = (pStr: string) => {
    const cleaned = pStr.replace(/[^0-9]/g, '');
    return parseInt(cleaned, 10) || 0;
  };

  const bookingTitle = preselectedOffer 
    ? `[OFFER: ${preselectedOffer.code}] ${preselectedOffer.title}` 
    : (currentService?.title || 'Salon Appointment');

  const bookingPrice = preselectedOffer 
    ? getOfferNumericPrice(preselectedOffer.price) 
    : (currentService?.price || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      const specialNotes = preselectedOffer
        ? `VIP Offer: ${preselectedOffer.title} | Coupon: ${preselectedOffer.code} (${preselectedOffer.discount})${notes ? ` | Notes: ${notes}` : ''}`
        : notes;

      const newBooking = await api.createBooking({
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim(),
        service_id: preselectedOffer ? `offer-${preselectedOffer.id}` : (currentService?.id || 'service-general'),
        service_title: bookingTitle,
        booking_date: selectedDate,
        booking_time: selectedTime,
        stylist_preference: selectedStylist,
        special_requests: specialNotes,
        total_price: bookingPrice,
      });

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setCreatedBooking(newBooking);
      onBookingSuccess(newBooking);
      setStep(3); // confirmation step
    } catch (err) {
      console.error('Error creating realtime booking:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppLink = (booking: Booking) => {
    const text = encodeURIComponent(
      `Hello Bushra's Salon & Academy! ✨\nI have ${preselectedOffer ? 'claimed a VIP Offer & booked' : 'booked an appointment'} through your website.\n\n*Booking Ref:* ${booking.id}\n*Client Name:* ${booking.customer_name}\n*Service / Offer:* ${booking.service_title}\n*Date:* ${booking.booking_date}\n*Time:* ${booking.booking_time}\n*Stylist:* ${booking.stylist_preference}\n*Phone:* ${booking.customer_phone}${preselectedOffer ? `\n*Coupon Code:* ${preselectedOffer.code} (${preselectedOffer.discount})` : ''}\n\nPlease confirm my slot. Thank you!`
    );
    return `https://wa.me/919630204104?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-[3500] flex items-center justify-center bg-black/80 p-2 sm:p-4 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <div className="bg-[#faf8f5] rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border border-amber-200/80 text-gray-800 flex flex-col" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 bg-[#2b161b] text-white border-b border-amber-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#2b161b] shadow-md">
              <Sparkles size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                {preselectedOffer ? 'Claim VIP Offer & Book Appointment' : 'Book Realtime Appointment'}
              </h3>
              <p className="text-xs text-amber-200/80">Bushra's Salon &amp; Academy · Vijay Nagar, Indore</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Claim Offer Banner */}
        {preselectedOffer && (
          <div className="mx-4 sm:mx-6 mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-100/90 via-amber-50 to-white border border-amber-300 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#2b161b] text-amber-400 flex items-center justify-center font-bold shadow-xs">
                <Gift size={22} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#c88132] block">
                  VIP Special Activated
                </span>
                <h4 className="text-sm sm:text-base font-bold text-[#2b161b]">{preselectedOffer.title}</h4>
                <p className="text-xs text-gray-600">
                  Coupon: <span className="font-mono font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-300">{preselectedOffer.code}</span> ({preselectedOffer.discount})
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-[#2b161b] block">{preselectedOffer.price}</span>
              {preselectedOffer.originalPrice && (
                <span className="text-xs text-gray-400 line-through block">{preselectedOffer.originalPrice}</span>
              )}
            </div>
          </div>
        )}

        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2 border-b border-gray-200/70 text-xs font-bold text-gray-500 gap-2">
          <div className={`flex-1 py-1.5 px-2 rounded-xl text-center transition-all ${step >= 1 ? 'bg-[#2b161b] text-amber-300' : 'bg-gray-100 text-gray-400'}`}>
            1. {preselectedOffer ? 'Date & Time' : 'Service & Slot'}
          </div>
          <div className={`flex-1 py-1.5 px-2 rounded-xl text-center transition-all ${step >= 2 ? 'bg-[#2b161b] text-amber-300' : 'bg-gray-100 text-gray-400'}`}>
            2. Client Info
          </div>
          <div className={`flex-1 py-1.5 px-2 rounded-xl text-center transition-all ${step >= 3 ? 'bg-[#2b161b] text-amber-300' : 'bg-gray-100 text-gray-400'}`}>
            3. Confirmed
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(85vh-160px)]">
          
          {/* STEP 1: Service / Date / Time / Stylist */}
          {step === 1 && (
            <div className="space-y-5">
              {!preselectedOffer && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Select Beauty Service *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto p-1 border border-gray-200 rounded-2xl bg-white">
                    {services.map((svc) => (
                      <div
                        key={svc.id}
                        onClick={() => setSelectedServiceId(svc.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                          selectedServiceId === svc.id 
                            ? 'bg-[#fdf8f0] border-[#c88132] shadow-xs' 
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{svc.title}</span>
                          {svc.price && <span className="font-extrabold text-[#c88132]">₹{svc.price}</span>}
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{svc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 outline-none focus:border-[#c88132]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Stylist Preference
                  </label>
                  <select
                    value={selectedStylist}
                    onChange={(e) => setSelectedStylist(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 outline-none focus:border-[#c88132]"
                  >
                    {STYLISTS.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Available Time Slot *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedTime === slot
                          ? 'bg-[#2b161b] text-amber-300 shadow-xs scale-[1.02]'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Clock size={12} />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#2b161b] hover:bg-[#c88132] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Continue to Client Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Client Info & Submit */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#c88132] block">Selected Appointment</span>
                  <h4 className="font-bold text-gray-900">{bookingTitle}</h4>
                  <p className="text-gray-500 mt-0.5">📅 {selectedDate} at ⏰ {selectedTime} · {selectedStylist}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-[#2b161b]">₹{bookingPrice}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sonal Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 outline-none focus:border-[#c88132]"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9630204104"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 outline-none focus:border-[#c88132]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 outline-none focus:border-[#c88132]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Special Notes / Hair &amp; Skin Preferences
                </label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3 text-gray-400" />
                  <textarea
                    rows={2}
                    placeholder="e.g. Preferred hair color tone, nail polish shade, bridal event date..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 outline-none focus:border-[#c88132]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#2b161b] hover:bg-[#c88132] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Syncing in Realtime...</span>
                    </>
                  ) : (
                    <>
                      <span>{preselectedOffer ? 'Claim Offer & Confirm Slot ✨' : 'Confirm Realtime Booking ✨'}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Success Confirmation Slip */}
          {step === 3 && createdBooking && (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={38} />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {preselectedOffer ? 'VIP Offer Claimed & Slot Reserved!' : 'Appointment Booked Successfully!'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Your appointment is synchronized in our Supabase database and confirmed at Bushra's Salon &amp; Academy.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-200 text-xs space-y-2.5 text-left max-w-lg mx-auto">
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Booking Reference ID:</span>
                  <strong className="text-[#c88132] font-mono">{createdBooking.id}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Client Name:</span>
                  <strong className="text-gray-900">{createdBooking.customer_name}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Service / Offer:</span>
                  <strong className="text-gray-900">{createdBooking.service_title}</strong>
                </div>
                {preselectedOffer && (
                  <div className="flex justify-between pb-2 border-b border-gray-100 bg-emerald-50/70 px-2 py-1 rounded">
                    <span className="text-emerald-800 font-bold">Coupon Applied:</span>
                    <strong className="text-emerald-800 font-bold">{preselectedOffer.code} ({preselectedOffer.discount})</strong>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Date &amp; Time:</span>
                  <strong className="text-gray-900">{createdBooking.booking_date} at {createdBooking.booking_time}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Stylist:</span>
                  <strong className="text-gray-900">{createdBooking.stylist_preference}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <strong className="text-gray-900">Vijay Nagar, Indore</strong>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 max-w-lg mx-auto">
                <a
                  href={generateWhatsAppLink(createdBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <i className="fa-brands fa-whatsapp text-base"></i>
                  <span>Send Confirmation Slip on WhatsApp (9630204104)</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Done / Close
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
