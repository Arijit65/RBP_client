import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Bell, Menu, X } from 'lucide-react';
import PostPropertyComingPopup from './PostPropertyComingPopup';
import { rbp_logo } from '../assets/assets';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPostPropertyPopupOpen, setIsPostPropertyPopupOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdownMenus = {
    buyers: {
      title: 'For Buyers',
      sections: [
        {
          title: 'BUY A HOME',
          links: [
            { label: 'Land/Plot', path: '/properties?propertyType=land' },
            { label: 'COMMERCIAL', path: '/properties?propertyType=commercial' },
            { label: 'INSIGHTS', badge: 'NEW', path: '/insights' },
            { label: 'ARTICLES & NEWS', path: '/articles' }
          ]
        },
        {
          title: 'TOP CITIES',
          links: [
            { label: 'Property in Delhi / NCR', path: '/properties/delhi' },
            { label: 'Property in Mumbai', path: '/properties/mumbai' },
            { label: 'Property in Bangalore', path: '/properties/bangalore' },
            { label: 'Property in Hyderabad Metropolitan Region', path: '/properties/hyderabad' },
            { label: 'Property in Pune', path: '/properties/pune' },
            { label: 'Property in Kolkata', path: '/properties/kolkata' },
            { label: 'Property in Chennai', path: '/properties/chennai' },
            { label: 'Property in Ahmedabad', path: '/properties/ahmedabad' }
          ]
        },
        {
          title: '',
          content: (
            <div className="bg-slate-700 p-4 rounded-lg border border-amber-500/30">
              <div className="flex items-start space-x-3">
                <div className="bg-amber-500 p-2.5 rounded flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-amber-400 font-medium text-xs uppercase">INTRODUCING</h4>
                      <h3 className="font-bold text-gray-100 text-lg">Insights</h3>
                    </div>
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Understand localities</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Read Resident Reviews</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Check Price Trends</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Tools, Utilities & more</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    tenants: {
      title: 'For Tenants',
      sections: [
        {
          title: 'RENT A HOME',
          links: [
            { label: 'PG/CO-LIVING', path: '/properties?propertyType=pg&purpose=rent' },
            { label: 'COMMERCIAL', path: '/properties?propertyType=commercial&purpose=rent' },
            { label: 'INSIGHTS', badge: 'NEW', path: '/insights' },
            { label: 'ARTICLES & NEWS', path: '/articles' }
          ]
        },
        {
          title: 'TOP CITIES',
          links: [
            { label: 'Property for rent in Delhi / NCR', path: '/properties/delhi?purpose=rent' },
            { label: 'Property for rent in Mumbai', path: '/properties/mumbai?purpose=rent' },
            { label: 'Property for rent in Bangalore', path: '/properties/bangalore?purpose=rent' },
            { label: 'Property for rent in Hyderabad Metropolitan Region', path: '/properties/hyderabad?purpose=rent' },
            { label: 'Property for rent in Pune', path: '/properties/pune?purpose=rent' },
            { label: 'Property for rent in Kolkata', path: '/properties/kolkata?purpose=rent' },
            { label: 'Property for rent in Chennai', path: '/properties/chennai?purpose=rent' },
            { label: 'Property for rent in Ahmedabad', path: '/properties/ahmedabad?purpose=rent' }
          ]
        },
        {
          title: '',
          content: (
            <div className="bg-slate-700 p-4 rounded-lg border border-amber-500/30">
              <div className="flex items-start space-x-3">
                <div className="bg-amber-500 p-2.5 rounded flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-amber-400 font-medium text-xs uppercase">INTRODUCING</h4>
                      <h3 className="font-bold text-gray-100 text-lg">Insights</h3>
                    </div>
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Understand localities</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Read Resident Reviews</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Check Price Trends</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Tools, Utilities & more</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    owners: {
      title: 'For Owners',
      sections: [
        {
          title: 'OWNER OFFERINGS',
          links: [
            { label: 'Post Property', badge: 'FREE', path: '/post-property' },
            { label: 'Owner Services', path: '/owner-services' },
            { label: 'My Royal Bengal Properties', path: '/mypropszy' },
            { label: 'View Responses', path: '/responses' }
          ]
        },
        {
          title: 'INSIGHTS',
          links: [
            { label: 'INSIGHTS', badge: 'NEW', path: '/insights' },
            { label: 'ARTICLES & NEWS', path: '/articles' }
          ]
        },
        {
          title: '',
          content: (
            <div className="bg-gradient-to-br from-slate-700 to-slate-600 p-5 rounded-lg border border-amber-500/30">
              <h4 className="font-bold text-gray-100 mb-2 text-sm leading-tight">
                Sell or rent faster at<br />the right price!
              </h4>
              <p className="text-xs text-gray-300 mb-4">
                List your property now for FREE
              </p>
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  setIsPostPropertyPopupOpen(true);
                }}
                className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition text-sm w-full shadow-md"
              >
                Post Property
              </button>
            </div>
          )
        }
      ]
    },
    dealers: {
      title: 'For Dealers / Builders',
      sections: [
        {
          title: 'DEALER OFFERINGS',
          links: [
            { label: 'Post Property', path: '/post-property' },
            { label: 'Dealer Services', path: '/dealer-services' },
            { label: 'My Royal Bengal Properties', path: '/mypropszy' },
            { label: 'View Responses', path: '/responses' }
          ]
        },
        {
          title: 'PROPERTY SERVICES',
          links: [
            { label: 'RESEARCH AND ADVICE', path: '/research' }
          ]
        },
        {
          title: '',
          content: (
            <div className="bg-gradient-to-br from-slate-700 to-slate-600 p-5 rounded-lg border border-amber-500/30">
              <h4 className="font-bold text-gray-100 mb-2 text-sm leading-tight">
                Sell or rent faster at<br />the right price!
              </h4>
              <p className="text-xs text-gray-300 mb-4">
                List your property now for FREE
              </p>
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  setIsPostPropertyPopupOpen(true);
                }}
                className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition text-sm w-full shadow-md"
              >
                Post Property
              </button>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Are you a builder?{' '}
                <a href="/builder" className="text-amber-500 font-semibold hover:underline">
                  click here
                </a>
              </p>
            </div>
          )
        }
      ]
    }
  };

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`backdrop-blur-md sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/98 shadow-[0_8px_30px_rgb(251,191,36,0.12)] border-b border-amber-500/20' 
          : 'bg-gradient-to-b from-slate-900/95 to-slate-900/90 shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Golden Glow */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
            <img 
              src={rbp_logo} 
              alt="Royal Bengal Properties" 
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" 
            />
          </Link>

          {/* Location Dropdown */}
          <div 
            className="hidden md:block relative"
            onMouseEnter={() => setIsLocationDropdownOpen(true)}
            onMouseLeave={() => setIsLocationDropdownOpen(false)}
          >
            <div className="flex items-center space-x-1 cursor-pointer hover:bg-slate-800/80 px-3 py-2 rounded-lg transition-all duration-300 border border-transparent hover:border-amber-500/30 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)]">
              <span className="text-gray-200 font-medium text-xs">All India</span>
              <ChevronDown className="w-3 h-3 text-amber-400" />
            </div>

            {/* Location Dropdown Menu */}
            {isLocationDropdownOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 w-64" style={{ zIndex: 100 }}>
                <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-amber-500/30 overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-bold text-amber-400 mb-3 text-sm drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">TOP CITIES</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          to="/properties/delhi"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-300 hover:text-amber-400 transition block"
                        >
                          Delhi / NCR
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/mumbai"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-300 hover:text-amber-400 transition block"
                        >
                          Mumbai
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/bangalore"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-300 hover:text-amber-400 transition block"
                        >
                          Bangalore
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/hyderabad"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-300 hover:text-amber-400 transition block"
                        >
                          Hyderabad
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/pune"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-300 hover:text-amber-400 transition block"
                        >
                          Pune
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/chennai"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-300 hover:text-amber-400 transition block"
                        >
                          Chennai
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/properties/kolkata"
                          onClick={() => setIsLocationDropdownOpen(false)}
                          className="text-sm text-gray-300 hover:text-amber-400 transition block"
                        >
                          Kolkata
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links with Dropdowns */}
          <div className="hidden lg:flex items-center space-x-1">
            {Object.entries(dropdownMenus).map(([key, menu]) => (
              <div
                key={key}
                className="relative group"
              >
                <button 
                  onMouseEnter={() => handleMouseEnter(key)}
                  className="text-gray-200 hover:text-amber-400 transition-all duration-300 font-medium px-3 py-2 flex items-center space-x-1 text-xs rounded-lg hover:bg-slate-800/60 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)]"
                >
                  <span>{menu.title}</span>
                  <ChevronDown className="w-3 h-3 text-amber-400 group-hover:text-amber-300 transition-colors" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => handleMouseEnter(key)}
                      onMouseLeave={handleMouseLeave}
                      className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 w-[900px]"
                      style={{ zIndex: 100 }}
                    >
                      <div className="bg-slate-800/98 backdrop-blur-xl rounded-xl shadow-[0_20px_70px_rgba(0,0,0,0.5)] border border-amber-500/30 overflow-hidden"
                        style={{ boxShadow: '0 20px 70px rgba(0,0,0,0.5), 0 0 40px rgba(251,191,36,0.08)' }}
                      >
                        <div className="grid grid-cols-3 gap-6 p-6">
                          {menu.sections.map((section, idx) => (
                            <div key={idx}>
                              {section.title && (
                                <h3 className="font-bold text-amber-400 mb-3 text-sm">
                                  {section.title}
                                </h3>
                              )}
                              {section.links && (
                                <ul className="space-y-2.5">
                                  {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                      <Link
                                        to={link.path}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`text-sm hover:text-amber-400 transition flex items-center space-x-2 ${
                                          link.highlight ? 'text-amber-400 font-semibold' : 'text-gray-300'
                                        }`}
                                      >
                                        <span>{link.label}</span>
                                        {link.badge && (
                                          <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded font-bold">
                                            {link.badge}
                                          </span>
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {section.content && section.content}
                            </div>
                          ))}
                        </div>
                        <div className="bg-slate-900 px-6 py-3 border-t border-slate-700 text-xs text-gray-400">
                          <span className="text-gray-500">contact us toll free on</span>{' '}
                          <span className="font-semibold text-amber-400">1800 41 99099</span>{' '}
                          <span className="text-gray-500">(9AM-11PM IST)</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              to="/insights"
              className="relative text-gray-300 hover:text-amber-400 transition font-medium px-3 py-2 text-xs"
            >
              Insights
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                NEW
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPostPropertyPopupOpen(true)}
              className="hidden md:flex items-center bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white px-5 py-2 rounded-lg hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 transition-all duration-300 font-bold shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.5)] text-xs border border-amber-400/30"
            >
              <span>Post property</span>
              <span className="ml-2 bg-green-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm">FREE</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-800/60 transition-all duration-300 border border-transparent hover:border-amber-500/20 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)]">
              <svg className="w-4 h-4 text-gray-300 hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="p-1.5 rounded-full hover:bg-slate-800 transition relative">
              <Bell className="w-4 h-4 text-gray-300" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-1 hover:bg-slate-800 px-2 py-1.5 rounded transition">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className="w-3 h-3 text-gray-300" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 rounded hover:bg-slate-800 transition"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-gray-300" /> : <Menu className="w-5 h-5 text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-slate-700"
          >
            <div className="flex flex-col space-y-2">
              {Object.entries(dropdownMenus).map(([key, menu]) => (
                <a key={key} href="#" className="text-gray-300 hover:text-amber-400 hover:bg-slate-800 transition py-2 px-3 rounded font-medium text-sm">
                  {menu.title}
                </a>
              ))}
              <Link to="/insights" className="text-gray-300 hover:text-amber-400 hover:bg-slate-800 transition py-2 px-3 rounded font-medium text-sm">
                Insights
              </Link>
              <button
                onClick={() => setIsPostPropertyPopupOpen(true)}
                className="bg-amber-500 text-white px-4 py-2.5 rounded-lg hover:bg-amber-600 transition font-bold text-left mt-2"
              >
                Post property FREE
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Post Property Coming Soon Popup */}
      <PostPropertyComingPopup 
        isOpen={isPostPropertyPopupOpen} 
        onClose={() => setIsPostPropertyPopupOpen(false)} 
      />
    </motion.nav>
  );
};

export default Navbar;
