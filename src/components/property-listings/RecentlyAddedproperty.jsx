import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { MapPin } from "lucide-react";

function RecentlyAddedproperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch recently added properties from API
  useEffect(() => {
    const fetchRecentlyAddedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties/recently-added?limit=6`);
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data.properties);
        } else {
          setError('Failed to fetch recently added properties');
        }
      } catch (err) {
        setError('Error fetching properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyAddedProperties();
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
    builder: property.owner?.userName || 'Private Owner',
    types: `${property.bedrooms} BHK ${property.propertySubType}`,
    location: `${property.locality}, ${property.city}`,
    price: formatPrice(property.expectedPrice),
    image: property.photos && property.photos[0] ? property.photos[0] : null
  });

  const projects = properties.map(getPropertyInfo);

  // Loading state
  if (loading) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="ml-3 text-gray-300">Loading recently added properties...</p>
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
            <p>No recently added properties available.</p>
          </div>
        </div>
      </div>
    );
  }

  // Mobile settings (1 card)
  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
  };

  // Tablet settings (2 cards)
  const tabletSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
  };

  // Desktop settings (4 cards)
  const desktopSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400">
            Recently Added Properties
          </h2>
        </div>
      </div>

      {/* Mobile Slider */}
      <div className="block sm:hidden">
        <div className="px-4">
          <Slider {...mobileSettings}>
            {projects.map((project, index) => (
              <div className="pr-3" key={index}>
                <Link to={`/property/${properties[index]?.id}`} className="block">
                  <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50 hover:shadow-[0_25px_70px_rgba(251,191,36,0.25)] hover:shadow-amber-500/10 transition-shadow duration-300 overflow-hidden border border-slate-700">
                    <div className="relative">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 bg-slate-700 flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-gray-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                      <span className="absolute top-3 right-3 bg-amber-500/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                        {project.price}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-gray-100 text-sm leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-amber-400 font-medium">by {project.builder}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{project.types}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <span className="mr-1">📍</span>
                        {project.location}
                      </p>
                      <div className="pt-3">
                        <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)] text-white text-xs font-semibold py-2 rounded-full transition-all duration-200 transform hover:scale-105">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Tablet Slider */}
      <div className="hidden sm:block lg:hidden">
        <div className="px-4 sm:px-6">
          <Slider {...tabletSettings}>
            {projects.map((project, index) => (
              <div className="px-3" key={index}>
                <Link to={`/property/${properties[index]?.id}`} className="block">
                  <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] border border-slate-700 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden border border-slate-700 hover:-translate-y-2">
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                      <span className="absolute top-4 right-4 bg-amber-500/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg">
                        {project.price}
                      </span>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-gray-100 text-base leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-amber-400 font-semibold">by {project.builder}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{project.types}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <span className="mr-2">📍</span>
                        {project.location}
                      </p>
                      <div className="pt-4">
                        <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)] text-white text-sm font-semibold py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Desktop Slider */}
      <div className="hidden lg:block">
        <div className="px-6 lg:px-8">
          <Slider {...desktopSettings}>
            {projects.map((project, index) => (
              <div className="px-3" key={index}>
                <Link to={`/property/${properties[index]?.id}`} className="block">
                  <div className="bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden border border-slate-700 hover:-translate-y-3 group">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                      <span className="absolute top-4 right-4 bg-amber-500/95 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-bold text-white shadow-xl">
                        {project.price}
                      </span>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-gray-100 text-base leading-tight group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-amber-400 font-semibold">by {project.builder}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{project.types}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <span className="mr-2">📍</span>
                        {project.location}
                      </p>
                      <div className="pt-4">
                        <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)] text-white text-sm font-bold py-2.5 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-[0_25px_70px_rgba(251,191,36,0.25)]">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default RecentlyAddedproperty;

