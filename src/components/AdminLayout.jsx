import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
