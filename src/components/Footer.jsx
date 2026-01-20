import { motion } from 'framer-motion';
import { Home, Apple } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Royal Bengal Properties',
      links: [
        'Mobile Apps',
        'Our Services',
        'Price Trends',
        'Post your Property',
        'Real Estate Investments',
        'Builders in India',
        'Area Converter',
        'Articles',
        'Rent Receipt',
        'Customer Service',
        'Sitemap'
      ]
    },
    {
      title: 'Company',
      links: [
        'About us',
        'Contact us',
        'Careers with us',
        'Terms & Conditions',
        'Request Info',
        'Feedback',
        'Report a problem',
        'Testimonials',
        'Privacy Policy',
        'Summons/Notices',
        'Grievances',
        'Safety Guide'
      ]
    },
    {
      title: 'Our Partners',
      links: [
        'Naukri.com - Jobs in India',
        'Jeevansathi.com - Matrimonials',
        'Naukrigulf.com - Jobs in middle east',
        'Shiksha.com - Education India',
        'Quadrangle.com - Rental & Prop Mgmt',
        'Brijj.com - Professional Community',
        'Firstnaukri.com - Jobs for freshers',
        'Techgig.com - Tech community',
        'iimjobs.com - Exec jobs',
        'Hirist.tech - IT jobs',
        'Zwayam - Tech platform',
        'Ambitionbox.com - Company reviews'
      ]
    },
    {
      title: 'Contact Us',
      links: [
        'Toll free - 1800 123 4567',
        '9:30 AM to 6:30 PM (Mon-Sun)',
        'Email - support@royalbengalproperties.com'
      ]
    }
  ];

  const partners = [
    'Techgig.com - Tech news on the go',
    'Policybazaar.com - Insurance made easy',
    'Paisabazaar.com - Loans, Credit Cards',
    'Bankbazaar.com - Compare loans',
    'Jobhai.com - Jobs for blue-collar workers'
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-gray-200 border-t border-amber-500/10 relative overflow-hidden">
      {/* Golden Glow Effect at Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 font-bold text-lg mb-4 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Partners Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-800 relative"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
              >
                {partner}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Download App Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-800 relative"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 font-bold text-lg mb-4 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">Download the App</h3>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center space-x-3 bg-slate-800/80 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-lg border border-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgba(251,191,36,0.2)]"
            >
              <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.341c-.538-.579-.871-1.346-.871-2.185 0-.839.333-1.606.871-2.185-.526-.571-.843-1.331-.843-2.161 0-1.774 1.425-3.211 3.181-3.211.385 0 .754.069 1.095.195V1.5h-18v21h18v-5.094c-.341.126-.71.194-1.095.194-1.756 0-3.181-1.437-3.181-3.211 0-.83.317-1.59.843-2.161zm.338 2.185c0 .923.734 1.671 1.639 1.671.905 0 1.639-.748 1.639-1.671 0-.923-.734-1.671-1.639-1.671-.905 0-1.639.748-1.639 1.671z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-300">GET IT ON</div>
                <div className="text-sm font-semibold text-white">Google Play</div>
              </div>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-3 bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors shadow-lg"
            >
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-gray-300">Download on the</div>
                <div className="text-sm font-semibold text-white">App Store</div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-700"
        >
          <h3 className="text-white font-bold text-lg mb-4">Connect with us</h3>
          <div className="flex space-x-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="bg-slate-800 p-3 rounded-full hover:bg-amber-500 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="bg-slate-800 p-3 rounded-full hover:bg-amber-400 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="bg-slate-800 p-3 rounded-full hover:bg-red-600 transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="bg-slate-800 p-3 rounded-full hover:bg-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-amber-400" />
              <span className="text-white font-bold text-lg">Royal Bengal Properties</span>
            </div>
            <div className="text-gray-300 text-sm text-center md:text-left">
              All trademarks are the property of their respective owners.<br />
              All rights reserved. Royal Bengal Properties Pvt. Ltd.
            </div>
            <div className="text-gray-300 text-sm font-medium">
              &copy; 2025 RoyalBengalProperties.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
