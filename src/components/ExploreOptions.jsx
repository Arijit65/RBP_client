import { motion } from 'framer-motion';
import { Home, KeyRound, TrendingUp, DollarSign, MapPin, Lightbulb, Building2, ChevronRight } from 'lucide-react';

const ExploreOptions = () => {
  const options = [
    {
      title: 'Buying a home',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
      link: '#'
    },
    {
      title: 'Renting a home',
      icon: KeyRound,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      link: '#'
    },
    {
      title: 'Invest in Real Estate',
      icon: TrendingUp,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
      badge: 'NEW',
      link: '#'
    },
    {
      title: 'Sell/Rent your property',
      icon: DollarSign,
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=300&fit=crop',
      badge: 'NEW',
      link: '#'
    },
    {
      title: 'Plots/Land',
      icon: MapPin,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      link: '#'
    },
    {
      title: 'Explore Insights',
      icon: Lightbulb,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      link: '#'
    },
    {
      title: 'PG and Co-living',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      link: '#'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="pt-8 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-gray-600 uppercase tracking-wide mb-2 font-semibold">
            GET STARTED WITH EXPLORING REAL ESTATE OPTIONS
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.a
                key={index}
                href={option.link}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {option.badge && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {option.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-amber-100 p-2 rounded-lg group-hover:bg-amber-500 transition-colors">
                        <Icon className="w-6 h-6 text-amber-500 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-amber-500 transition-colors">
                        {option.title}
                      </h3>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreOptions;

