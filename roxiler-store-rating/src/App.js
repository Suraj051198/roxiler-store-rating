import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

// Layout Components
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Dashboard Components
import AdminDashboard from './components/dashboards/AdminDashboard';
import StoreOwnerDashboard from './components/dashboards/StoreOwnerDashboard';
import UserDashboard from './components/dashboards/UserDashboard';

// User Management Components
import AddUser from './components/admin/AddUser';
import UserDetails from './components/admin/UserDetails';
import UsersList from './components/admin/UsersList';

// Store Management Components
import AddStore from './components/admin/AddStore';
import StoresList from './components/stores/StoresList';

// Profile Management
import ChangePassword from './components/profile/ChangePassword';

// Page Components
import About from './components/pages/About';

// Helper Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import { initializeData } from './utils/dataUtils';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Initialize dummy data if not exists
    initializeData();
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/about" element={<About />} />
          
          {/* Protected Routes with Role-Based Redirects */}
          <Route path="/dashboard" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              {currentUser?.role === 'admin' ? <AdminDashboard /> : 
               currentUser?.role === 'store' ? <StoreOwnerDashboard /> : 
               <UserDashboard />}
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/users" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin">
              <UsersList />
            </ProtectedRoute>
          } />
          <Route path="/admin/users/add" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin">
              <AddUser />
            </ProtectedRoute>
          } />
          <Route path="/admin/users/:id" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin">
              <UserDetails />
            </ProtectedRoute>
          } />
          <Route path="/admin/stores/add" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin">
              <AddStore />
            </ProtectedRoute>
          } />
          
          {/* Store Routes */}
          <Route path="/stores" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <StoresList currentUser={currentUser} />
            </ProtectedRoute>
          } />
          
          {/* User Routes */}
          <Route path="/change-password" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ChangePassword currentUser={currentUser} />
            </ProtectedRoute>
          } />
          
          {/* Default Routes */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
