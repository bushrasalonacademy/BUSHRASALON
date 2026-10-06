import React from 'react';

export type TabType = 'overview' | 'services' | 'offers' | 'reviews' | 'gallery' | 'faqs' | 'contact';

interface SubNavTabsProps {
  activeTab: TabType;
  onTabChange: (tabId: TabType) => void;
  onOpenBooking: () => void;
}

export const SubNavTabs: React.FC<SubNavTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  onOpenBooking 
}) => {
  const tabs: { id: TabType | 'book'; label: string; isAction?: boolean }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'offers', label: 'Offers & VIP Packages' },
    { id: 'reviews', label: 'Reviews & Ratings' },
    { id: 'gallery', label: 'Photos & Ambience' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'book', label: 'Book Appointment', isAction: true },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.isAction) {
      onOpenBooking();
      return;
    }
    onTabChange(tab.id as TabType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sticky-subnav-bar">
      <div className="custom-container">
        <div className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto no-scrollbar py-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`subnav-tab-btn ${
                activeTab === tab.id
                  ? 'active font-bold text-[#2b161b] border-b-3 border-[#c88132]'
                  : 'text-gray-600 hover:text-[#2b161b]'
              } ${tab.isAction ? 'font-bold text-[#c88132] hover:text-[#a1621f]' : ''}`}
            >
              {tab.isAction && <i className="fa-regular fa-calendar-check mr-2"></i>}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
