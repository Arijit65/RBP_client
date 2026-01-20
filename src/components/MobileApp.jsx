import { motion } from 'framer-motion';
import { Smartphone, Check, Apple } from 'lucide-react';

const MobileApp = () => {
  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Download Royal Bengal Properties Mobile App
            </h2>
            <p className="text-gray-700 mb-8 font-medium">
              and never miss daily property updates
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-green-100 p-1 rounded">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-800 font-medium">
                  Get to know about newly posted properties as soon as they are posted
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-green-100 p-1 rounded">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-800 font-medium">
                  Manage your properties with ease and get instant alerts about responses
                </p>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.341c-.538-.579-.871-1.346-.871-2.185 0-.839.333-1.606.871-2.185-.526-.571-.843-1.331-.843-2.161 0-1.774 1.425-3.211 3.181-3.211.385 0 .754.069 1.095.195V1.5h-18v21h18v-5.094c-.341.126-.71.194-1.095.194-1.756 0-3.181-1.437-3.181-3.211 0-.83.317-1.59.843-2.161zm.338 2.185c0 .923.734 1.671 1.639 1.671.905 0 1.639-.748 1.639-1.671 0-.923-.734-1.671-1.639-1.671-.905 0-1.639.748-1.639 1.671zM3.5 2.5h17v1h-17z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-3xl transform rotate-6"></div>

              {/* Phone Mockup */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                  {/* Phone Screen */}
                  <div className="bg-white">
                    {/* Status Bar */}
                    <div className="bg-slate-800 h-6"></div>

                    {/* App Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Smartphone className="w-8 h-8 text-slate-800" />
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold mb-2">Recommended Properties</h3>

                      {/* Property Cards */}
                      <div className="space-y-3">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-3">
                            <div className="w-20 h-20 bg-gray-300 rounded"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-3">
                            <div className="w-20 h-20 bg-gray-300 rounded"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-4 -right-4 bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">5M+</div>
                  <div className="text-xs">Downloads</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
