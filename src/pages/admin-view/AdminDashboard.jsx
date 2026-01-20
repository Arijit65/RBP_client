import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/AdminLayout';
import {
  PlusCircle,
  List,
  Users,
  Settings,
  Building2,
  TrendingUp,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Properties', value: '156', icon: Building2, color: 'bg-amber-500', change: '+12%' },
    { label: 'Active Listings', value: '124', icon: TrendingUp, color: 'bg-green-500', change: '+8%' },
    { label: 'Total Views', value: '12.5K', icon: Eye, color: 'bg-amber-500', change: '+23%' },
    { label: 'Total Users', value: '1,245', icon: Users, color: 'bg-orange-500', change: '+5%' }
  ];

  const quickActions = [
    {
      label: 'Post New Property',
      description: 'Add a new property listing',
      icon: PlusCircle,
      color: 'bg-amber-500',
      link: '/admin/post-property'
    },
    {
      label: 'View Properties',
      description: 'Manage existing listings',
      icon: List,
      color: 'bg-green-600',
      link: '/properties'
    },
    {
      label: 'User Management',
      description: 'Manage users and roles',
      icon: Users,
      color: 'bg-amber-500',
      link: '/admin/users'
    },
    {
      label: 'Settings',
      description: 'Configure admin panel',
      icon: Settings,
      color: 'bg-gray-600',
      link: '/admin/settings'
    }
  ];

  const recentActivities = [
    {
      action: 'New property listed',
      detail: '3BHK Apartment in Sector 146, Noida',
      time: '2 hours ago',
      icon: PlusCircle,
      color: 'text-green-600 bg-green-50'
    },
    {
      action: 'Property updated',
      detail: '2BHK Flat in Sector 77, Noida',
      time: '5 hours ago',
      icon: CheckCircle,
      color: 'text-amber-500 bg-amber-50'
    },
    {
      action: 'New user registered',
      detail: 'john.doe@example.com',
      time: '1 day ago',
      icon: Users,
      color: 'text-amber-500 bg-amber-50'
    },
    {
      action: 'Property inquiry',
      detail: 'Inquiry for Villa in Sector 43, Noida',
      time: '2 days ago',
      icon: MessageSquare,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-2">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-400">Welcome back! Here's what's happening with your properties today.</p>
        </motion.div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-4 sm:p-6 hover:shadow-xl hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-md`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-green-400">{stat.change}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-1">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-100 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={action.label}
                to={action.link}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl hover:border-amber-500/30 transition-all group-hover:-translate-y-1"
                >
                  <div className={`${action.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition shadow-md`}>
                    <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-100 mb-1">{action.label}</h4>
                  <p className="text-xs sm:text-sm text-gray-400">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-4 sm:p-6"
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-4">Recent Activity</h3>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition border border-slate-600">
                  <div className={`${activity.color} w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base text-gray-100 truncate sm:whitespace-normal">{activity.action}</p>
                    <p className="text-xs sm:text-sm text-gray-400 truncate sm:whitespace-normal">{activity.detail}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                    <Clock className="w-3 h-3" />
                    <span className="hidden sm:inline">{activity.time}</span>
                    <span className="sm:hidden">{activity.time.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
