import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Search, PlusCircle, Menu, X } from 'lucide-react';
import MobileSearchModal from './MobileSearchModal';
import PostPropertyComingPopup from './PostPropertyComingPopup';

const MobileBottomNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPostPropertyPopupOpen, setIsPostPropertyPopupOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      action: () => navigate('/')
    },
    {
      icon: Search,
      label: 'Search',
      action: () => setIsSearchOpen(true)
    },
    {
      icon: PlusCircle,
      label: 'Post',
      action: () => setIsPostPropertyPopupOpen(true)
    },
    {
      icon: Menu,
      label: 'Menu',
      action: () => setIsMenuOpen(true)
    }
  ];

  return (
    <>
      {/* Bottom Navigation Bar - Only visible on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 z-50">
        <div className="flex items-center justify-around h-14 px-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[60px] transition-all duration-200 active:scale-95 ${
                item.path && isActive(item.path)
                  ? 'text-amber-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5 stroke-2" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Search Modal */}
      <MobileSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-50"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="md:hidden fixed right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-slate-900 z-50 overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
                <h2 className="text-xl font-bold text-gray-100">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-4 space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsPostPropertyPopupOpen(true);
                      }}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-slate-800 rounded-lg transition"
                    >
                      <div className="bg-amber-500/20 p-2 rounded-lg">
                        <PlusCircle className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-gray-100">Post Property</span>
                        <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">FREE</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Browse Properties</h3>
                  <div className="space-y-2">
                    <Link
                      to="/properties?purpose=buy"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 hover:bg-slate-800 rounded-lg transition"
                    >
                      <span className="font-medium text-gray-100">Buy Properties</span>
                    </Link>
                    <Link
                      to="/properties?purpose=rent"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 hover:bg-slate-800 rounded-lg transition"
                    >
                      <span className="font-medium text-gray-100">Rent Properties</span>
                    </Link>
                    <Link
                      to="/properties?type=commercial"
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 hover:bg-slate-800 rounded-lg transition"
                    >
                      <span className="font-medium text-gray-100">Commercial</span>
                    </Link>
                  </div>
                </div>

                {/* Top Cities */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Top Cities</h3>
                  <div className="space-y-2">
                    {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai'].map((city) => (
                      <Link
                        key={city}
                        to={`/properties?city=${city.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block p-3 hover:bg-slate-800 rounded-lg transition"
                      >
                        <span className="text-gray-300">Property in {city}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Help */}
                <div className="pt-4 border-t border-slate-700">
                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block p-3 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg transition text-center"
                  >
                    <span className="font-semibold text-amber-500">Need Help? Contact Us</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Post Property Popup */}
      <PostPropertyComingPopup 
        isOpen={isPostPropertyPopupOpen} 
        onClose={() => setIsPostPropertyPopupOpen(false)} 
      />
    </>
  );
};

export default MobileBottomNav;
