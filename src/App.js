import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About';
import { useAuth } from './auth/AuthProvider';
import './App.css';
import Error from './pages/Error';

function ProtectedRoute({ children }) {
  const { accessToken } = useAuth();
  if (!accessToken) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Auth Demo</div>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/About">About</Link>
          <Link to="/Profile">Profile</Link>
          <Link to="/Contact">Contact</Link>
          <button onClick={logout}>Logout</button>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <span>&#10005;</span> // ✖
          ) : (
            <span>&#9776;</span> // ☰
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
        <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
        <Link onClick={() => setMenuOpen(false)} to="/dashboard">Dashboard</Link>
        <Link onClick={() => setMenuOpen(false)} to="/About">About</Link>
        <Link onClick={() => setMenuOpen(false)} to="/Profile">Profile</Link>
        <Link onClick={() => setMenuOpen(false)} to="/Contact">Contact</Link>
        <button onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
      </div>

      {/* Main content */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                Welcome. <Link to="/login">Login</Link> or{' '}
                <Link to="/register">Register</Link>
              </div>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/About"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/Contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  );
}
