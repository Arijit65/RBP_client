import { motion } from 'framer-motion';
import { Search, MapPin, ChevronRight } from 'lucide-react';

const QuickLinks = () => {
  const searchCategories = [
    {
      title: 'Popular Searches',
      links: [
        'Flats in Delhi / NCR',
        'House for Sale in Delhi / NCR',
        'Flats in Noida',
        'View 2 More'
      ]
    },
    {
      title: 'Popular Searches',
      links: [
        'Flats in Gurgaon',
        'House for Sale in Gurgaon',
        'Flats in Bangalore',
        'View 2 More'
      ]
    },
    {
      title: 'Popular Searches',
      links: [
        'Flats in Noida',
        'House for Sale in Noida',
        'Flats in Kerala',
        'View 2 More'
      ]
    }
  ];

  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-slate-800 p-2 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Curated Quick Links</h2>
          </div>
        </motion.div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {searchCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-gray-800 text-sm">{category.title}</h3>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className={`flex items-center justify-between text-gray-700 hover:text-slate-800 transition-colors font-medium ${
                        link.startsWith('View') ? 'text-slate-800 font-semibold' : ''
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        {!link.startsWith('View') && (
                          <MapPin className="w-4 h-4" />
                        )}
                        <span>{link}</span>
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Search Bar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 bg-slate-800 rounded-lg p-8"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-4 text-center">
              Search Properties by Location or Landmark
            </h3>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Enter locality, Project, Landmark..."
                  className="w-full px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Search
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickLinks;
