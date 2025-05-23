// src/components/Navbar.tsx
// Bagian: Komponen UI Reusable
// Fungsi: Menampilkan bar navigasi sederhana di bagian atas aplikasi.
//         Untuk saat ini hanya menampilkan judul aplikasi.

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Arahkan ke login setelah logout
  };

  return (
    <nav className="app-navbar">
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h1>Log Analyzer Pro</h1>
      </Link>
      <div>
        {isAuthenticated && user ? (
          <>
            <span style={{ marginRight: '15px', color: '#f0f0f0' }}>Halo, {user.username}!</span>
            <button
              onClick={handleLogout}
              className="form-button"
              style={{ backgroundColor: '#dc3545', fontSize: '0.9em', padding: '8px 12px' }} // Contoh styling tombol logout
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;