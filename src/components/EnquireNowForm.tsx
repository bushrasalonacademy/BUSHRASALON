import React, { useState } from 'react';
import { api } from '../services/api';

export const EnquireNowForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
    agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!formData.agreed) {
      setErrorMessage('Please accept terms and conditions');
      return;
    }

    setLoading(true);

    try {
      await api.createInquiry({
        name: formData.name,
        phone: formData.mobile,
        email: formData.email,
        message: formData.message || 'General Enquiry',
        preferred_time: 'As soon as possible',
      });

      setSubmitted(true);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        message: '',
        agreed: false,
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Enquiry error:', err);
      setErrorMessage('Failed to send enquiry. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="salon-card-box bg-gradient-to-br from-white via-white to-amber-50/15">
      
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
          Quick Consultation
        </span>
        <h2 className="salon-card-title mt-1">
          Enquire Now
        </h2>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-7 text-center space-y-3">
          <i className="fa-solid fa-circle-check text-emerald-600 text-5xl"></i>
          <h3 className="text-lg font-bold text-emerald-950">
            Enquiry Received Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
            Thank you for reaching out to Bushra's Salon &amp; Academy. Our team will call you back within 15 minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="text-xs sm:text-sm text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Ananya Sharma"
              value={formData.name}
              onChange={handleChange}
              required
              className="enquire-input-field"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
              Mobile Phone *
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="10-digit Phone Number"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              required
              className="enquire-input-field"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              placeholder="yourname@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="enquire-input-field"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wider">
              Service Details or Message
            </label>
            <textarea
              name="message"
              placeholder="Tell us what service or appointment time you prefer..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="enquire-input-field resize-none"
            />
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              required
              className="mt-1 w-4 h-4 rounded text-[#2b161b] focus:ring-[#2b161b] cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer select-none leading-relaxed">
              I agree to receive call/SMS updates regarding my booking from{' '}
              <span className="text-[#2b161b] font-bold">
                Bushra's Salon &amp; Academy
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-black-submit flex items-center justify-center gap-3 mt-4"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                <span>Submitting Request...</span>
              </>
            ) : (
              <>
                <span>Submit Instant Enquiry</span>
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
