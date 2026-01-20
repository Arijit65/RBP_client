import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../Context/AppContext';

const HeroBanner = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [propertyType, setPropertyType] = useState('All Residential');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const { propertyApi } = useApi();
  const searchTimeoutRef = useRef(null);

  const tabs = ['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots/Land', 'Projects', 'Post Property'];

  // Search suggestions with debouncing
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debouncing
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      const result = await propertyApi.searchProperties(searchQuery);
      if (result.success) {
        setSuggestions(result.properties || []);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
      setIsSearching(false);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, propertyApi]);

  // Handle search submit
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Build query params based on active tab and search
    const params = new URLSearchParams();
    
    if (activeTab === 'Rent') params.append('purpose', 'rent');
    else if (activeTab === 'Buy') params.append('purpose', 'buy');
    
    if (propertyType !== 'All Residential') {
      params.append('propertyType', propertyType.toLowerCase().replace('/', '-'));
    }
    
    // Navigate to property listing with search query as location
    const searchTerm = searchQuery.toLowerCase().trim();
    const queryString = params.toString() ? `?${params.toString()}` : '';
    
    // Try to extract city from search query
    const cities = ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'pune', 'chennai', 'kolkata', 'ahmedabad'];
    const foundCity = cities.find(city => searchTerm.includes(city));
    
    if (foundCity) {
      navigate(`/properties/${foundCity}${queryString}`);
    } else {
      navigate(`/properties${queryString}`);
    }
    
    setShowSuggestions(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (property) => {
    navigate(`/property/${property.id}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <div className="relative -mt-16 pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[450px] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=400&fit=crop')"
        }}
      >
        {/* Enhanced Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        
        {/* Golden Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          {/* Ad Banner Card - Left Side with Premium Styling */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-md"
          >
            <div className="bg-gradient-to-br from-amber-50/95 via-amber-100/95 to-yellow-50/95 backdrop-blur-md p-6 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.3)] border border-amber-300/50 relative overflow-hidden">
              {/* Subtle Golden Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-transparent to-yellow-200/20 pointer-events-none"></div>
              
              <div className="mb-3 relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-gradient-to-br from-red-600 to-orange-600 p-2 rounded-lg shadow-lg">
                    <span className="text-white font-bold text-lg">M&M</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-700 font-semibold">J&C</p>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                  INSPIRED BY THE IMPOSSIBLE BESPOKE RESIDENCES
                </h1>
                <p className="text-gray-800 text-sm font-semibold">
                  Location: Sector 97, Noida
                </p>
              </div>

              <div className="mt-4 relative z-10">
                <button className="border-2 border-amber-600 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300 text-sm shadow-md hover:shadow-lg">
                  Explore Now →
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-3 relative z-10">
                MahaRERA Registration No.: P51700052867
              </p>
            </div>
          </motion.div>

          {/* Right side QR code image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block absolute right-8 top-20"
          >
            <div className="bg-white p-3 rounded-lg shadow-lg">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://example.com"
                alt="QR Code"
                className="w-24 h-24"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Search Box */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-20 -mt-24 mb-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.25)] border border-amber-500/20 overflow-hidden relative">
            {/* Golden Glow Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            
            {/* Tabs */}
            <div className="flex items-center border-b border-gray-200/70 px-6 pt-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-4 text-sm font-semibold transition-all relative whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-amber-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {tab === 'New Launch' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                  )}
                  {tab === 'Post Property' && (
                    <span className="ml-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded font-bold shadow-sm">
                      FREE
                    </span>
                  )}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="p-6">
              <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
                {/* Property Type Dropdown */}
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer transition-all shadow-sm hover:shadow-md"
                  >
                    <option>All Residential</option>
                    <option>Flat/Apartment</option>
                    <option>Independent House</option>
                    <option>Villa</option>
                    <option>Builder Floor</option>
                    <option>Plot/Land</option>
                    <option>PG</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Search Input */}
                <div className="flex-1 relative min-w-[300px]">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Search className="w-5 h-5 text-amber-500" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder='Search "Flats for rent in sector 77 Noida"'
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm hover:shadow-md transition-all hover:border-amber-400"
                  />
                  
                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                      {isSearching ? (
                        <div className="p-4 text-center text-gray-500">Searching...</div>
                      ) : (
                        <div className="py-2">
                          {suggestions.map((property) => (
                            <button
                              key={property.id}
                              onClick={() => handleSuggestionClick(property)}
                              className="w-full px-4 py-3 hover:bg-amber-50 transition-colors text-left flex items-start space-x-3 border-b border-gray-100 last:border-0"
                            >
                              {property.images && property.images[0] && (
                                <img
                                  src={property.images[0]}
                                  alt={property.title}
                                  className="w-16 h-16 object-cover rounded"
                                />
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-sm">{property.title}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {property.location} • {property.city}
                                </div>
                                <div className="text-sm font-semibold text-amber-600 mt-1">
                                  ₹{property.price?.toLocaleString()}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons Group */}
                <div className="flex items-center gap-2">
                  {/* Location Button */}
                  <button
                    className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-amber-50 hover:border-amber-400 transition-all shadow-sm hover:shadow-md"
                    aria-label="Use current location"
                  >
                    <MapPin className="w-5 h-5 text-amber-500" />
                  </button>

                  {/* Voice Search Button */}
                  <button
                    className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-amber-50 hover:border-amber-400 transition-all shadow-sm hover:shadow-md"
                    aria-label="Voice search"
                  >
                    <Mic className="w-5 h-5 text-amber-500" />
                  </button>

                  {/* Search Button */}
                  <button 
                    onClick={handleSearch}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-semibold rounded-lg hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 transition-all duration-300 shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)] whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
