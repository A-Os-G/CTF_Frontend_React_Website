import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/user/homePage/index'
import ChallengePage from '../pages/user/challengePage/index'
import SignupPage from '../pages/user/accessPage/signupPage/Signup';
import LoginPage from '../pages/user/accessPage/loginPage/Login';
import EditProfilePage from '../pages/user/profilePage/index';
import AdminPage from '../pages/admin/welcomePage/index'
import UsersSubPage from '../pages/admin/usersSubPage/index';
import ChallengesSubPage from '../pages/admin/challengesSubPage/index';
import CategorySubPage from '../pages/admin/categorySubPage/index';
import FeedbackSubPage from '../pages/admin/feedbackSubPage/index';
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // or a spinner
  return !user ? children : <Navigate to="/challenge" />;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // or a spinner
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

const Routing = () => (
  <Routes>
    {/* Public routes */}
    <Route path='/' element={
      <PublicRoute>
        <HomePage />
      </PublicRoute>
    } />
    <Route path='/login' element={
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    } />
    <Route path='/signup' element={
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    } />

    {/* ROLE_USER routes */}
    <Route path='/challenge' element={
      <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_LECTURER', 'ROLE_ADMIN']}>
        <ChallengePage />
      </ProtectedRoute>
    } />
    <Route path='/profile' element={
      <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_LECTURER', 'ROLE_ADMIN']}>
        <EditProfilePage />
      </ProtectedRoute>
    } />

    {/* ROLE_LECTURER and ROLE_ADMIN routes */}
    <Route path='/admin' element={
      <ProtectedRoute allowedRoles={['ROLE_LECTURER', 'ROLE_ADMIN']}>
        <AdminPage />
      </ProtectedRoute>
    } />
    <Route path='/admin/users' element={
      <ProtectedRoute allowedRoles={['ROLE_LECTURER', 'ROLE_ADMIN']}>
        <UsersSubPage />
      </ProtectedRoute>
    } />
    <Route path='/admin/challenges' element={
      <ProtectedRoute allowedRoles={['ROLE_LECTURER', 'ROLE_ADMIN']}>
        <ChallengesSubPage />
      </ProtectedRoute>
    } />
    <Route path='/admin/category' element={
      <ProtectedRoute allowedRoles={['ROLE_LECTURER', 'ROLE_ADMIN']}>
        <CategorySubPage />
      </ProtectedRoute>
    } />
    <Route path='/admin/feedback' element={
      <ProtectedRoute allowedRoles={['ROLE_LECTURER', 'ROLE_ADMIN']}>
        <FeedbackSubPage />
      </ProtectedRoute>
    } />
  </Routes>
);

// Example logout handler (place in your Navbar or wherever you handle logout)
function LogoutButton() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user context
    setUser(null);
    // Optionally clear cookies/localStorage/session here
    // Redirect to home page
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Routing;
