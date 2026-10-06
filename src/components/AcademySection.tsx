import React, { useState } from 'react';
import { ACADEMY_COURSES, SALON_INFO } from '../data/initialData';
import { api } from '../services/api';

export const AcademySection: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState(ACADEMY_COURSES[0].title);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) return;
    setSubmitting(true);

    try {
      await api.createInquiry({
        name: studentName,
        phone: studentPhone,
        service_interest: `Academy: ${selectedCourse}`,
        message: `Academy Course Admission Inquiry for ${selectedCourse}`,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStudentName('');
        setStudentPhone('');
      }, 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="academy" className="salon-card-box bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 border-amber-200/70">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200/80">
        <div>
          <span className="text-xs font-bold text-[#c88132] uppercase tracking-widest block">
            Certified Beauty Career
          </span>
          <h2 className="salon-card-title mt-1">
            Bushra's Beauty Academy
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Government-recognized certified diploma courses with live practicals on real clients in Indore.
          </p>
        </div>

        <div className="bg-amber-100/80 border border-amber-300 px-3.5 py-1.5 rounded-2xl text-amber-900 text-xs font-bold flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
          <i className="fa-solid fa-graduation-cap text-[#c88132] text-sm"></i>
          <span>100% Placement Support</span>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4 mb-6">
        <h3 className="text-xs font-bold text-[#c88132] uppercase tracking-wider">
          Available Diploma Programs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ACADEMY_COURSES.map((course) => {
            const isSelected = selectedCourse === course.title;
            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course.title)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#c88132] shadow-md ring-2 ring-[#c88132]/25'
                    : 'bg-white/80 border-gray-200/80 hover:border-amber-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-[#2b161b] text-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {course.duration}
                    </span>
                    <span className="text-[11px] text-amber-800 font-bold">
                      {course.level}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 leading-snug">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 mt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {course.curriculum.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="bg-amber-50 text-amber-900 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                        <i className="fa-solid fa-check text-[#c88132] text-[8px]"></i>
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Admission Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#c88132] uppercase tracking-wider block">
              Direct Academy Counselor Call
            </span>
            <h4 className="text-sm sm:text-base font-bold text-gray-900">
              Inquire for: <span className="text-[#c88132]">{selectedCourse}</span>
            </h4>
            <p className="text-xs text-gray-500">
              Next batch admissions open now. Call counselor or submit fast callback.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 text-xs font-bold hover:bg-gray-100 flex items-center gap-2 transition-colors"
            >
              <i className="fa-solid fa-phone text-[#c88132]"></i>
              <span>Call: +91 {SALON_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/91${SALON_INFO.phone}?text=${encodeURIComponent(`Hi, I would like to inquire about admission for "${selectedCourse}" at Bushra's Beauty Academy.`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1ebc59] flex items-center gap-2 transition-all shadow-xs"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span>WhatsApp Counselor</span>
            </a>
          </div>
        </div>

        {/* Inline Quick Enroll Form */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          {success ? (
            <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-xl text-center text-xs text-emerald-900 font-bold">
              ✓ Academy inquiry sent! Our counselor will call you within 15 mins.
            </div>
          ) : (
            <form onSubmit={handleEnroll} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-4">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#c88132]"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  type="tel"
                  placeholder="10-digit Mobile Number"
                  maxLength={10}
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#c88132]"
                />
              </div>
              <div className="sm:col-span-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#2b161b] hover:bg-[#c88132] text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shadow-xs"
                >
                  {submitting ? 'Submitting...' : 'Request Free Brochure'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};
