import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

function TopHighlightedProjects() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch highlighted properties from API
  useEffect(() => {
    const fetchHighlightedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties/highlighted?limit=6`);
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data.properties);
        } else {
          setError('Failed to fetch highlighted properties');
        }
      } catch (err) {
        setError('Error fetching properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightedProperties();
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
    category: property.propertyType || 'Residential',
    image: property.photos && property.photos[0] ? property.photos[0] : null,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.builtUpArea,
    facing: property.facing || 'N/A'
  });

  const projects = properties.map(getPropertyInfo);

  // Get number of slides to show based on screen size
  const getSlidesToShow = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= properties.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? properties.length - slidesToShow : prev - 1
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="ml-3 text-gray-300">Loading highlighted properties...</p>
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
            <p>No highlighted properties available.</p>
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
              Top Highlighted Projects
            </h2>
            <p className="text-sm text-gray-400 mt-1">Premium properties handpicked for you</p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={prevSlide}
              className="bg-slate-800/90 backdrop-blur-sm hover:bg-amber-500 text-gray-200 hover:text-white p-3 rounded-full border border-slate-700 hover:border-amber-500 transition-all duration-200 shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-slate-800/90 backdrop-blur-sm hover:bg-amber-500 text-gray-200 hover:text-white p-3 rounded-full border border-slate-700 hover:border-amber-500 transition-all duration-200 shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
            }}
          >
            {projects.map((project, index) => (
              <div 
                key={index}
                className="flex-shrink-0 px-3"
                style={{
                  width: `${100 / slidesToShow}%`,
                }}
              >
                <Link to={`/property/${properties[index]?.id}`} className="block">
                  <div className="relative bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden border border-slate-700 group h-full">
                    {/* Image with Overlay */}
                    <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                          <MapPin className="w-12 h-12 text-gray-500" />
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          {project.category}
                        </span>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                        <h3 className="text-white text-lg sm:text-xl font-bold leading-tight group-hover:text-amber-400 transition-colors">
                          {project.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-300 text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                          <span className="line-clamp-1">{project.location}</span>
                        </div>

                        {/* Property Details */}
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {project.bedrooms} BHK
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {project.area} sq.ft
                          </span>
                          {project.facing && (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                              </svg>
                              {project.facing}
                            </span>
                          )}
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.3)] text-xl font-bold">
                            {project.price}
                          </div>
                          <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)] text-white text-sm font-bold px-5 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="bg-slate-800/90 backdrop-blur-sm hover:bg-amber-500 text-gray-200 hover:text-white p-3 rounded-full border border-slate-700 hover:border-amber-500 transition-all duration-200 shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-slate-800/90 backdrop-blur-sm hover:bg-amber-500 text-gray-200 hover:text-white p-3 rounded-full border border-slate-700 hover:border-amber-500 transition-all duration-200 shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(properties.length / slidesToShow) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx * slidesToShow)}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentSlide / slidesToShow) === idx
                  ? 'w-8 bg-amber-500'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopHighlightedProjects;

