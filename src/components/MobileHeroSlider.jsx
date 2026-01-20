import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MobileHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Find Your Dream Home",
      subtitle: "Discover the perfect property for you",
      gradient: "from-amber-600 to-amber-800"
    },
    {
      title: "Luxury Living Spaces",
      subtitle: "Premium properties at best locations",
      gradient: "from-slate-700 to-slate-900"
    },
    {
      title: "Smart Investments",
      subtitle: "Make your real estate dreams come true",
      gradient: "from-amber-500 to-slate-800"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="md:hidden relative w-full h-[280px] overflow-hidden bg-slate-900 mt-[44px]">
      <AnimatePresence mode="wait">
        <div
          key={currentSlide}
          className="absolute inset-0"
        >
          {/* Background Gradient */}
          <div 
            className={`absolute inset-0 bg-linear-to-br ${slides[currentSlide].gradient}`}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end p-5 pb-6">
            <h2 className="text-xl font-bold text-white text-center mb-1.5">
              {slides[currentSlide].title}
            </h2>
            <p className="text-white/90 text-center text-xs">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1.5 rounded-full transition z-10"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1.5 rounded-full transition z-10"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-amber-500 w-5' 
                : 'bg-white/50 hover:bg-white/70 w-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileHeroSlider;
