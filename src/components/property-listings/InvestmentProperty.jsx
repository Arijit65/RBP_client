import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

function InvestmentProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const scrollContainerRef = useRef(null);

  // Fetch investment properties from API
  useEffect(() => {
    const fetchInvestmentProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties/investment?limit=6`);
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data.properties);
        } else {
          setError('Failed to fetch investment properties');
        }
      } catch (err) {
        setError('Error fetching properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentProperties();
  }, []);

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]/g, '')) : price;
    
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(1)} Cr`;
    } else if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(1)} L`;
    } else {
      return `₹${numPrice.toLocaleString()}`;
    }
  };

  // Get property display info
  const getPropertyInfo = (property) => ({
    title: `${property.bedrooms}BHK ${property.propertySubType}`,
    location: `${property.locality}, ${property.city}`,
    price: formatPrice(property.expectedPrice),
    roi: property.roi || 'N/A',
    image: property.photos && property.photos[0] ? property.photos[0] : null,
    bedrooms: property.bedrooms,
    area: property.builtUpArea,
    possessionStatus: property.possessionStatus || 'Ready to Move'
  });

  const projects = properties.map(getPropertyInfo);

  // Scroll handlers
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="ml-3 text-gray-300">Loading investment properties...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-400">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (properties.length === 0) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>No investment properties available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400">
              Investment Properties
            </h2>
            <p className="text-sm text-gray-400 mt-1">Best returns on your investment</p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="bg-slate-800/90 backdrop-blur-sm hover:bg-amber-500 text-gray-200 hover:text-white p-3 rounded-full border border-slate-700 hover:border-amber-500 transition-all duration-200 shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="bg-slate-800/90 backdrop-blur-sm hover:bg-amber-500 text-gray-200 hover:text-white p-3 rounded-full border border-slate-700 hover:border-amber-500 transition-all duration-200 shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {projects.map((project, index) => (
              <Link 
                key={index}
                to={`/property/${properties[index]?.id}`}
                className="flex-shrink-0"
              >
                <div className="w-[350px] bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden border border-slate-700 hover:-translate-y-1 group">
                  <div className="flex">
                    {/* Image Section */}
                    <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/30"></div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-gray-100 text-sm leading-tight line-clamp-1 group-hover:text-amber-400 transition-colors">
                          {project.title}
                        </h3>
                        
                        <div className="flex items-center text-xs text-gray-400">
                          <MapPin className="w-3 h-3 mr-1 text-amber-500 flex-shrink-0" />
                          <span className="line-clamp-1">{project.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {project.bedrooms} BHK
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {project.area} sq.ft
                          </span>
                        </div>

                        {project.roi !== 'N/A' && (
                          <div className="inline-flex items-center bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-semibold">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            ROI: {project.roi}%
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.3)] text-base font-bold">
                          {project.price}
                        </div>
                        <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={() => scroll('left')}
              className="bg-slate-800/90 backdrop-blur-sm hover:bg-amber-500 text-gray-200 hover:text-white p-3 rounded-full border border-slate-700 hover:border-amber-500 transition-all duration-200 shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="bg-slate-800/90 backdrop-blur-sm hover:bg-amber-500 text-gray-200 hover:text-white p-3 rounded-full border border-slate-700 hover:border-amber-500 transition-all duration-200 shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View All CTA */}
        <div className="mt-8 text-center">
          <Link 
            to="/investment-properties"
            className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)] text-white font-bold px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            View All Investment Properties
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default InvestmentProperty;

