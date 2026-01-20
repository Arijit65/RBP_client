import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const ArticlesSection = () => {
  const [activeTab, setActiveTab] = useState('news');

  const tabs = [
    { id: 'news', label: 'News' },
    { id: 'tax', label: 'Tax & Legal' },
    { id: 'guides', label: 'Help Guides' },
    { id: 'investment', label: 'Investment' }
  ];

  const articles = {
    news: [
      {
        title: 'Unified RERA Portal: How It Benefits Homebuyers',
        date: 'Sep 05, 2025',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop'
      },
      {
        title: 'No stamp duty on small housing plots in Haryana',
        date: 'Aug 28, 2025',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop'
      }
    ],
    tax: [
      {
        title: 'Demolition Drive at Palm Hills, Gurgaon',
        date: 'Aug 20, 2025',
        image: 'https://images.unsplash.com/photo-1590759668628-05b5calb933d?w=300&h=200&fit=crop'
      },
      {
        title: 'UP women homebuyers get 1% stamp duty rebate',
        date: 'Jul 28, 2025',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&fit=crop'
      }
    ]
  };

  const currentArticles = articles[activeTab] || articles.news;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Buying Home Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
                alt="Living room"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-sm uppercase tracking-wide mb-2 opacity-90">
                  ALL PROPERTY NEEDS - ONE PORTAL
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Find Better Places to Live, Work and Wonder...
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Buy a Home Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8">
              <p className="text-sm text-gray-600 uppercase tracking-wide mb-2 font-semibold">
                BUY A HOME
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Find, Buy & Own Your Dream Home
              </h2>
              <p className="text-gray-700 mb-6 font-medium">
                Explore from Apartments, land, builder floors, villas and more
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-800/90 backdrop-blur-sm text-white px-8 py-3 rounded border border-slate-700 hover:border-amber-500/30-lg font-semibold hover:bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 transition-colors"
              >
                Explore Buying
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Articles Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Top articles on home buying
              </h3>
              <p className="text-gray-700 font-medium">
                Read from Beginners check-list to Pro Tips
              </p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 border-b border-gray-300 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-slate-800'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentArticles.map((article, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group flex space-x-4 bg-white p-4 rounded-lg hover:shadow-lg transition-all"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-slate-800 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 font-medium">{article.date}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Read More Link */}
            <motion.div
              whileHover={{ x: 5 }}
              className="mt-6 text-center"
            >
              <a
                href="#"
                className="inline-flex items-center text-slate-800 font-semibold hover:underline"
              >
                Read realty news, guides & articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;

