import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <div className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center text-sm text-gray-400 flex-wrap gap-2" aria-label="Breadcrumb">
          <Link 
            to="/" 
            className="hover:text-amber-400 transition font-medium"
          >
            Home
          </Link>
          
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-600" />
              {item.href && index !== items.length - 1 ? (
                <Link 
                  to={item.href} 
                  className="hover:text-amber-400 transition font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={index === items.length - 1 ? 'text-gray-100 font-semibold' : 'font-medium'}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
