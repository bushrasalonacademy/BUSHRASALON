import React, { useState } from 'react';
import { ACADEMY_COURSES, SALON_INFO } from '../data/initialData';
import { api } from '../services/api';
import { AcademyCourse } from '../types';

export const AcademySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>(ACADEMY_COURSES[0].title);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'All Courses', icon: 'fa-layer-group', count: ACADEMY_COURSES.length },
    { id: 'head_to_toe', label: 'Head to Toe Special', icon: 'fa-star', count: 1, highlight: true },
    { id: 'beauty_therapy', label: 'Beauty Therapy', icon: 'fa-wand-magic-sparkles', count: 4 },
    { id: 'hair', label: 'Hair', icon: 'fa-scissors', count: 3 },
    { id: 'makeup', label: 'Make-Up', icon: 'fa-brush', count: 2 },
    { id: 'nails', label: 'Nails', icon: 'fa-hand-sparkles', count: 1 },
    { id: 'salon_management', label: 'Salon Management', icon: 'fa-briefcase', count: 1 },
  ];

  const filteredCourses = selectedCategory === 'all'
    ? ACADEMY_COURSES
    : ACADEMY_COURSES.filter((c) => c.category === selectedCategory);

  const specialCourse = ACADEMY_COURSES.find((c) => c.category === 'head_to_toe');

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) return;
    setSubmitting(true);

    try {
      await api.createInquiry({
        name: studentName,
        phone: studentPhone,
        email: studentEmail || undefined,
        service_interest: `Academy: ${selectedCourse} (Indore Hub)`,
        message: `Course Enrollment Inquiry for "${selectedCourse}" at Bushra's Beauty Academy, Indore.`,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStudentName('');
        setStudentPhone('');
        setStudentEmail('');
      }, 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'beauty_therapy':
        return 'fa-wand-magic-sparkles';
      case 'hair':
        return 'fa-scissors';
      case 'makeup':
        return 'fa-brush';
      case 'nails':
        return 'fa-hand-sparkles';
      case 'head_to_toe':
        return 'fa-crown';
      case 'salon_management':
        return 'fa-chart-pie';
      default:
        return 'fa-graduation-cap';
    }
  };

  const primaryPhone = SALON_INFO.phone;

  return (
    <div id="academy" className="salon-card-box bg-gradient-to-br from-[#fcfbf9] via-white to-amber-50/25 border-amber-200/80 shadow-sm">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8 pb-6 border-b border-gray-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-[11px] font-bold tracking-wider uppercase mb-2">
            <i className="fa-solid fa-graduation-cap text-[#c88132]"></i>
            <span>Professional Career Diplomas · 100% Practical Training</span>
          </div>
          <h2 className="salon-card-title text-2xl sm:text-3xl text-[#2b161b]">
            Our Professional Courses
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Certified courses with 5 days a week hands-on training, expert mentorship, international standards, and job assistance given in all modules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center flex-shrink-0">
          <div className="bg-emerald-50 border border-emerald-300 px-3.5 py-1.5 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
            <i className="fa-solid fa-briefcase text-emerald-600 text-sm"></i>
            <span>Job Assistance in All Modules</span>
          </div>
          <div className="bg-amber-100/90 border border-amber-300 px-3.5 py-1.5 rounded-xl text-amber-900 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
            <i className="fa-regular fa-calendar-check text-[#c88132] text-sm"></i>
            <span>Classes: 5 Days a Week</span>
          </div>
        </div>
      </div>

      {/* SPECIAL SPOTLIGHT: OUR SPECIAL HEAD TO TOE COURSE */}
      {specialCourse && (
        <div className="mb-8 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#2b161b] via-[#3a2027] to-[#1f1014] text-white border-2 border-amber-400/60 shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <i className="fa-solid fa-crown text-xs"></i>
                  Flagship Program
                </span>
                <span className="bg-white/10 text-amber-200 text-xs font-semibold px-3 py-1 rounded-full border border-white/15">
                  Duration: {specialCourse.duration}
                </span>
                <span className="bg-white/10 text-amber-200 text-xs font-semibold px-3 py-1 rounded-full border border-white/15">
                  Classes: {specialCourse.classes}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <i className="fa-solid fa-check text-[10px]"></i>
                  {specialCourse.jobAssistance}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-amber-100 tracking-tight">
                {specialCourse.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-3xl">
                {specialCourse.description}
              </p>

              {/* 6 Core Modules Pills */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-2">
                  Complete Curriculum Highlights:
                </span>
                <div className="flex flex-wrap gap-2">
                  {specialCourse.curriculum.map((topic, idx) => (
                    <span
                      key={idx}
                      className="bg-white/15 hover:bg-white/25 transition-colors border border-amber-300/30 text-white text-xs font-semibold px-3 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-circle-check text-amber-400 text-[10px]"></i>
                      <span>{topic}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA action for Head to Toe course */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 justify-center">
              <button
                onClick={() => {
                  setSelectedCourse(specialCourse.title);
                  const el = document.getElementById('academy-inquiry-bar');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-[#c88132] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md text-center cursor-pointer"
              >
                Enroll In Head To Toe Program
              </button>
              <a
                href={`https://wa.me/91${primaryPhone}?text=${encodeURIComponent('Hi, I am interested in admission for "Our Special Head to Toe Course" (12 Months). Please share fee structure and syllabus.')}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
              >
                <i className="fa-brands fa-whatsapp text-emerald-400 text-sm"></i>
                <span>WhatsApp Counselor</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-xs font-bold text-[#c88132] uppercase tracking-wider flex items-center gap-1.5">
            <i className="fa-solid fa-list-check"></i>
            <span>Browse Courses by Discipline</span>
          </h3>
          <span className="text-xs text-gray-500 font-medium">
            Showing {filteredCourses.length} of {ACADEMY_COURSES.length} courses
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#2b161b] text-white shadow-xs'
                    : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-200 hover:border-amber-300'
                } ${cat.highlight && !isActive ? 'border-amber-300 bg-amber-50/50 text-[#c88132]' : ''}`}
              >
                <i className={`fa-solid ${cat.icon} text-xs ${isActive ? 'text-amber-300' : 'text-[#c88132]'}`}></i>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
        {filteredCourses.map((course) => {
          const isSelected = selectedCourse === course.title;
          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course.title)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-white border-[#c88132] shadow-md ring-2 ring-[#c88132]/30'
                  : 'bg-white/80 border-gray-200/90 hover:border-amber-300 hover:bg-white hover:shadow-xs'
              } ${course.featured ? 'border-amber-300 bg-amber-50/20' : ''}`}
            >
              <div>
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-[#2b161b] text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <i className="fa-regular fa-clock text-[9px]"></i>
                    {course.duration}
                  </span>
                  <span className="text-[11px] font-bold text-[#c88132] bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <i className={`fa-solid ${getCategoryIcon(course.category)} text-[10px]`}></i>
                    {course.categoryLabel || course.level}
                  </span>
                </div>

                <h4 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#c88132] transition-colors">
                  {course.title}
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {course.description}
                </p>

                {/* Schedule & Job Assistance specs */}
                <div className="space-y-1.5 mb-4 text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-700">
                    <i className="fa-solid fa-calendar-days text-[#c88132] text-xs"></i>
                    <span className="font-semibold">Classes:</span>
                    <span className="text-gray-900">{course.classes || '5 days in a week'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                    <i className="fa-solid fa-circle-check text-emerald-600 text-xs"></i>
                    <span>{course.jobAssistance || 'Job Assistance given in all modules'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Modules & Selection */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {course.curriculum.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="bg-amber-50 text-amber-900 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                      <i className="fa-solid fa-check text-[#c88132] text-[8px]"></i>
                      <span>{item}</span>
                    </span>
                  ))}
                  {course.curriculum.length > 3 && (
                    <span className="text-[10px] text-gray-500 font-semibold self-center">
                      +{course.curriculum.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#c88132]' : 'text-gray-500'}`}>
                    {isSelected ? '✓ Selected for Inquiry' : 'Click to select'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course.title);
                      const el = document.getElementById('academy-inquiry-bar');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#c88132] text-white shadow-2xs'
                        : 'bg-gray-100 hover:bg-[#2b161b] hover:text-white text-gray-700'
                    }`}
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Academy Campus & Helpline Details Banner */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#2b161b] text-white border border-amber-400/40 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          
          {/* Academy Location */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 text-base flex-shrink-0">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Academy Location (Indore)
              </span>
              <p className="text-xs sm:text-sm font-semibold text-gray-100 mt-0.5">
                The hub, plot 17 above Lig Maggie near 7coursemart, scheme 78, Indore
              </p>
              <span className="text-[11px] text-gray-300">Central India's Premier Certified Beauty Academy</span>
            </div>
          </div>

          {/* Academy Helplines */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 text-base flex-shrink-0">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Direct Calling &amp; WhatsApp
              </span>
              <div className="mt-0.5 text-xs sm:text-sm font-bold text-white">
                <a href={`tel:${SALON_INFO.phone}`} className="hover:text-amber-300 transition-colors text-base font-extrabold">
                  {SALON_INFO.phoneDisplay}
                </a>
              </div>
              <div className="text-[11px] text-emerald-300 mt-0.5 flex items-center gap-1">
                <i className="fa-brands fa-whatsapp text-xs"></i>
                <span>Instant WhatsApp Admission Support</span>
              </div>
            </div>
          </div>

          {/* Official Email & Inquiry */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 text-base flex-shrink-0">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Official Email
              </span>
              <a href={`mailto:${SALON_INFO.email}`} className="text-xs sm:text-sm font-semibold text-gray-100 hover:text-amber-300 transition-colors block mt-0.5">
                {SALON_INFO.email}
              </a>
              <span className="text-[11px] text-gray-300">Fast Response · Batch Counselling</span>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Admission Bar & Fast Inquiry Form */}
      <div id="academy-inquiry-bar" className="bg-white p-5 sm:p-7 rounded-2xl border border-amber-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#c88132] uppercase tracking-wider block">
              Direct Academy Counselor Call &amp; Fast Admission
            </span>
            <h4 className="text-base sm:text-lg font-bold text-gray-900">
              Admission Inquiry for: <span className="text-[#c88132]">{selectedCourse}</span>
            </h4>
            <p className="text-xs text-gray-500">
              Classes 5 days a week with job assistance. Next batch admissions open now.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`tel:${primaryPhone}`}
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 text-xs font-bold hover:bg-gray-100 flex items-center gap-2 transition-colors shadow-2xs"
            >
              <i className="fa-solid fa-phone text-[#c88132]"></i>
              <span>Call: +91 {primaryPhone}</span>
            </a>

            <a
              href={`https://wa.me/91${primaryPhone}?text=${encodeURIComponent(`Hi, I would like to inquire about admission for "${selectedCourse}" at the Academy.`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1ebc59] flex items-center gap-2 transition-all shadow-2xs"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span>WhatsApp Counselor</span>
            </a>
          </div>
        </div>

        {/* Inline Quick Enroll Form */}
        <div className="pt-4 border-t border-gray-100">
          {success ? (
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-center text-xs text-emerald-900 font-bold flex items-center justify-center gap-2">
              <i className="fa-solid fa-circle-check text-emerald-600 text-base"></i>
              <span>Academy inquiry sent successfully! Our counselor will call you within 15 minutes.</span>
            </div>
          ) : (
            <form onSubmit={handleEnroll} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    placeholder="Student Full Name *"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#c88132] focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-3">
                  <input
                    type="tel"
                    placeholder="10-digit Mobile Number *"
                    maxLength={10}
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#c88132] focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-3">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#c88132] focus:bg-white font-medium"
                  >
                    {ACADEMY_COURSES.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#2b161b] hover:bg-[#c88132] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    {submitting ? 'Submitting...' : 'Request Free Brochure & Fees'}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-gray-500 pt-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Campus Location:</span>
                  <span className="text-[#c88132] font-bold">Indore Hub (The Hub, Scheme 78, Vijay Nagar)</span>
                </div>

                <span>* No spam. Direct call from admission counselors only.</span>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};

export default AcademySection;
