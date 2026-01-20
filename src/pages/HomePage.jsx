import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ExploreOptions from '../components/ExploreOptions';
import PopularTools from '../components/PopularTools';
import ArticlesSection from '../components/ArticlesSection';
import Testimonials from '../components/Testimonials';
import MobileApp from '../components/MobileApp';
import QuickLinks from '../components/QuickLinks';
import MobileBottomNav from '../components/MobileBottomNav';
import MobileHeroSlider from '../components/MobileHeroSlider';
import PostPropertyComingPopup from '../components/PostPropertyComingPopup';
import FeaturedProperty from '../components/property-listings/FeaturedProperty';
import RecentlyAddedproperty from '../components/property-listings/RecentlyAddedproperty';
import TopHighlightedProjects from '../components/property-listings/TopHighlightedProjects';
import InvestmentProperty from '../components/property-listings/InvestmentProperty';

const HomePage = () => {
  const [isPostPropertyPopupOpen, setIsPostPropertyPopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900/98 backdrop-blur-md z-40 border-b border-amber-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between h-11 px-3">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center">
            <span className="text-base font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]">
              Royal Bengal Properties
            </span>
          </Link>
          
          {/* Buttons on the right */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPostPropertyPopupOpen(true)}
              className="flex items-center px-2.5 py-1.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 transition-all duration-300 font-medium text-[10px] shadow-[0_2px_10px_rgba(251,191,36,0.3)]"
            >
              <span>Post</span>
              <span className="ml-1 bg-green-500 text-white px-1 py-0.5 rounded text-[8px] font-bold shadow-sm">FREE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hero Slider - Only visible on mobile */}
      <MobileHeroSlider />
      
      {/* Desktop Hero Section - Hidden on mobile */}
      <div className="hidden md:block">
        <HeroBanner />
      </div>
      
      {/* Content sections - Add padding bottom for mobile bottom nav */}
      <div className="pb-14 md:pb-0">
        <FeaturedProperty />
        <RecentlyAddedproperty />
        <TopHighlightedProjects />
        <InvestmentProperty />
        <ExploreOptions />
        <PopularTools />
        <ArticlesSection />
        <Testimonials />
        <MobileApp />
        <QuickLinks />
      </div>
      
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <MobileBottomNav />

      {/* Post Property Coming Soon Popup */}
      <PostPropertyComingPopup 
        isOpen={isPostPropertyPopupOpen} 
        onClose={() => setIsPostPropertyPopupOpen(false)} 
      />
    </div>
  );
};

export default HomePage;
