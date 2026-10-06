import React, { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const address =
    'Plot No 02, Near Pizza Hut, Part II, Scheme 78, Vijay Nagar, Indore, Madhya Pradesh, 452010';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    const text = `Check out NSalon - Vijay Nagar, Indore:\n📍 ${address}\n🔗 ${currentUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <h3 className="text-base font-bold text-gray-900 mb-1">
          Share Salon Profile
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Share NSalon - Vijay Nagar, Indore with friends and family
        </p>

        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full py-2.5 px-4 bg-[#25D366] text-white rounded-lg font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
          >
            <i className="fa-brands fa-whatsapp text-base"></i> Share on WhatsApp
          </button>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 text-xs border border-gray-200 rounded-lg p-2 bg-gray-50 text-gray-600 outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-[#2b161b] text-white text-xs rounded-lg hover:bg-[#c88132] transition-colors whitespace-nowrap"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
