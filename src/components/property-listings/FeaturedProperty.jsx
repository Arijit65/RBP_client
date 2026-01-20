import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { MapPin } from "lucide-react";

function FeaturedProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch featured properties from API
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties/featured?limit=6`);
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data.properties);
        } else {
          setError('Failed to fetch featured properties');
        }
      } catch (err) {
        setError('Error fetching properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
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

  // Transform API data for display
  const featuredProjects = properties.map((property) => ({
    id: property.id,
    name: `${property.bedrooms}BHK ${property.propertySubType}`,
    developer: `by ${property.owner?.userName || 'Private Owner'}`,
    types: `${property.bedrooms} BHK ${property.propertySubType}`,
    location: `${property.locality}, ${property.city}`,
    priceRange: formatPrice(property.expectedPrice),
    image: property.photos && property.photos[0] ? property.photos[0] : null
  }));

  // Desktop settings (3 cards)
  const desktopSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
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

  if (loading) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="ml-3 text-gray-300">Loading featured properties...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-400">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (featuredProjects.length === 0) {
    return (
      <div className="w-full py-6 sm:py-8 lg:py-10 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>No featured properties available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      {/* Golden Glow Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.3)] mb-3">
            ⭐ Featured Properties
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 mt-2 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties with the best value
          </p>
        </div>

        {/* Mobile View (< 768px) */}
        <div className="block md:hidden mb-8">
          <Slider {...mobileSettings}>
            {featuredProjects.map((project) => (
              <div className="px-1" key={project.id}>
                <Link to={`/property/${project.id}`} className="block group">
                  <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-[0_20px_60px_rgba(251,191,36,0.2)] transition-all duration-500 h-64 border border-slate-700 hover:border-amber-500/50 group-hover:-translate-y-1">
                    <div className="relative h-1/2">
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-lg">
                          ⭐ FEATURED
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    </div>
                    <div className="p-3 bg-gradient-to-b from-slate-800 to-slate-850">
                      <h3 className="text-xs font-bold text-gray-100 mb-1 truncate group-hover:text-amber-400 transition-colors">{project.name}</h3>
                      <p className="text-xs text-gray-400 truncate">{project.developer}</p>
                      <p className="text-xs text-amber-400 font-semibold">{project.priceRange}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <span className="mr-1">📍</span>
                        <span className="truncate">{project.location}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* Tablet View (768px - 1024px) */}
        <div className="hidden md:block lg:hidden mb-8">
          <Slider {...tabletSettings}>
            {featuredProjects.map((project) => (
              <div className="px-2" key={project.id}>
                <Link to={`/property/${project.id}`} className="block">
                  <div className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-amber-500/10 transition-shadow duration-300 h-80 border border-slate-700">
                    <div className="relative h-1/2">
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-100 mb-2 truncate">{project.name}</h3>
                      <p className="text-sm text-gray-400 truncate">{project.developer}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{project.types}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <span className="mr-2">📍</span>
                        {project.location}
                      </p>
                      <div className="pt-4">
                        <button className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
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

        {/* Desktop View (>= 1024px) */}
        <div className="hidden lg:block mb-8">
          <Slider {...desktopSettings}>
            {featuredProjects.map((project) => (
              <div className="px-3" key={project.id}>
                <Link to={`/property/${project.id}`} className="block group">
                  <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-[0_25px_70px_rgba(251,191,36,0.25)] transition-all duration-500 hover:-translate-y-2 h-96 border border-slate-700 hover:border-amber-500/60 relative">
                    {/* Golden Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-yellow-500/0 group-hover:from-amber-500/10 group-hover:to-yellow-500/10 transition-all duration-500 pointer-events-none rounded-2xl"></div>
                    
                    <div className="relative h-1/2">
                      {project.image ? (
                        <>
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-[0_4px_20px_rgba(251,191,36,0.5)] backdrop-blur-sm border border-yellow-400/50">
                            ⭐ FEATURED
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                          <MapPin className="w-10 h-10 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 bg-gradient-to-b from-slate-800 to-slate-850 relative z-10">
                      <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-amber-400 transition-colors">{project.name}</h3>
                      <p className="text-sm text-gray-400">{project.developer}</p>
                      <p className="text-base text-amber-400 font-bold mt-2">{project.priceRange}</p>
                      <p className="text-sm text-gray-500 flex items-center mt-2">
                        <span className="mr-2">📍</span>
                        <span className="truncate">{project.location}</span>
                      </p>
                      <div className="pt-4">
                        <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold py-2.5 rounded-full transition-all duration-300 transform group-hover:scale-105 shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)]">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-700/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-amber-500/40 text-center relative overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
          {/* Decorative Golden Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/10 to-amber-500/5 blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 mb-4">
              Looking for More Properties?
            </h3>
            <p className="text-gray-400 mb-6 text-base sm:text-lg max-w-2xl mx-auto">
              Explore our complete collection of premium properties or get personalized recommendations from our experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 text-white font-bold px-8 py-3 sm:py-4 rounded-full shadow-[0_6px_30px_rgba(251,191,36,0.4)] hover:shadow-[0_8px_40px_rgba(251,191,36,0.6)] transform hover:scale-105 transition-all duration-300">
                Browse All Properties
              </button>
              <button className="border-2 border-amber-500/60 text-amber-400 hover:bg-amber-500/20 font-bold px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                Get Expert Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProperty;
