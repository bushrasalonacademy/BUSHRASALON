import React from 'react';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const handleReload = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5">
      {/* Floating Blue Refresh Widget Icon matching screenshot */}
      <button
        onClick={handleReload}
        className="w-10 h-10 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-lg transition-all duration-200"
        title="Scroll to top / Refresh"
        aria-label="Refresh / Scroll to top"
      >
        <i className="fa-solid fa-arrows-rotate text-lg"></i>
      </button>
    </div>
  );
};

