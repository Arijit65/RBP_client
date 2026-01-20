import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './Context/AuthContext'
import HomePage from './pages/HomePage'
import PostPropertyPage from './pages/PostPropertyPage'
import PropertyListingPage from './pages/PropertyListingPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import AdminLoginPage from './pages/admin-view/AdminLoginPage'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import AdminPostPropertyPage from './pages/admin-view/AdminPostPropertyPage'
import AllPropertyListing from './pages/admin-view/AllPropertyListing'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route path="/post-property" element={<PostPropertyPage />} />
          <Route
            path="/properties"
            element={
              <>
                <Navbar />
                <PropertyListingPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/properties/:location"
            element={
              <>
                <Navbar />
                <PropertyListingPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/property/:id"
            element={
              <>
                <Navbar />
                <PropertyDetailPage />
                <Footer />
              </>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRedirect />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/post-property"
            element={
              <ProtectedRoute>
                <AdminPostPropertyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/properties"
            element={
              <ProtectedRoute>
                <AllPropertyListing />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

// Component to handle /admin redirect
function AdminRedirect() {
  const { isAdminAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return isAdminAuthenticated ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/admin/login" replace />
  );
}

export default App
