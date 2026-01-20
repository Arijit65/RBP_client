import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Srikanth Malleboina',
      role: 'Owner, Hyderabad',
      image: 'https://i.pravatar.cc/150?img=12',
      text: 'You get an exclusive RM from Royal Bengal Properties team who tracks your property closely.',
      rating: 5
    },
    {
      name: 'Prateek Sengar',
      role: 'Owner, Delhi',
      image: 'https://i.pravatar.cc/150?img=13',
      text: 'Royal Bengal Properties has a better response rate compared to any of their competitors.',
      rating: 5
    },
    {
      name: 'SOBHA Develt.',
      role: 'Developer',
      image: 'https://i.pravatar.cc/150?img=14',
      text: 'Platform to meet customers and generate revenues with lowest CPL.',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-gray-600 uppercase tracking-wide mb-2 font-semibold">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What our customers are saying about Royal Bengal Properties
          </h2>
          <p className="text-gray-700 font-medium">
            Hear from our satisfied buyers, tenants, owners and dealers
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Testimonial Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-amber-50"
                  />
                  <div className="absolute -top-2 -right-2 bg-slate-800/90 backdrop-blur-sm p-2 rounded border border-slate-700 hover:border-amber-500/30-full">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start space-x-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-gray-800 mb-6 italic font-medium">
                  "{testimonials[currentIndex].text}"
                </p>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600 font-medium">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-slate-800" />
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-slate-800'
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-slate-800" />
            </motion.button>
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a
              href="#"
              className="inline-flex items-center text-slate-800 font-semibold hover:underline"
            >
              View all testimonials
              <ChevronRight className="w-5 h-5 ml-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

