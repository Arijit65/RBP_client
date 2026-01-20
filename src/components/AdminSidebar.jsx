import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Context/AuthContext';
import {
  Home,
  LayoutDashboard,
  PlusCircle,
  List,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  FileText,
  MessageSquare,
  BarChart3
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, adminLogout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      badge: null
    },
    {
      label: 'Post Property',
      icon: PlusCircle,
      path: '/admin/post-property',
      badge: null
    },
    {
      label: 'All Properties',
      icon: Building2,
      path: '/admin/properties',
      badge: '156'
    },
    {
      label: 'Property List',
      icon: List,
      path: '/properties',
      badge: null
    },
    {
      label: 'Inquiries',
      icon: MessageSquare,
      path: '/admin/inquiries',
      badge: '23'
    },
    {
      label: 'Users',
      icon: Users,
      path: '/admin/users',
      badge: null
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      path: '/admin/analytics',
      badge: null
    },
    {
      label: 'Reports',
      icon: FileText,
      path: '/admin/reports',
      badge: null
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      badge: null
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-amber-500 text-white rounded-lg shadow-lg hover:bg-amber-600 transition"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-800 border-r border-slate-700
          flex flex-col z-40 transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo/Brand */}
        <div className="p-3 border-b border-slate-700">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md shrink-0">
              <Home className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-md font-bold text-gray-100 leading-tight">Royal Bengal</h2>
              <h2 className="text-md font-bold text-gray-100 leading-tight">Properties</h2>
              <p className="text-[9px] text-gray-400 mt-0.5">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${active
                      ? 'bg-amber-500/10 text-amber-400 font-semibold shadow-sm'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-gray-100'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-amber-500' : 'text-gray-400'}`} />
                  <span className="flex-1 text-sm">{item.label}</span>
                  {item.badge && (
                    <span className={`
                      px-2 py-0.5 text-xs font-semibold rounded-full flex-shrink-0
                      ${active ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-gray-300'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-700">
          {/* User Info */}
          <div className="mb-3 p-3 bg-slate-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {admin?.userName ? admin.userName.charAt(0).toUpperCase() : 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-100 truncate">
                  {admin?.userName || 'Admin'}
                </p>
                <p className="text-xs text-gray-400 truncate">{admin?.email || 'admin@propszy.com'}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
