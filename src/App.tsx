// src/App.tsx
// Bagian: Komponen Aplikasi Utama (Root Component)
// Fungsi: Mengatur struktur dasar aplikasi, termasuk routing antar halaman,
//         dan merender komponen global seperti Navbar dan AlertDisplay.

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';     // << IMPOR
import RegisterPage from './pages/RegisterPage'; // << IMPOR
import Navbar from './components/Navbar';
import AlertDisplay from './components/AlertMessage';
import ProtectedRoute from './components/ProtectedRoute'; // << IMPOR
import { useAuth } from './hooks/useAuth';      // << IMPOR

function App() {
  const { isAuthenticated, isLoadingAuth } = useAuth(); // Untuk redirect dari root

  // Jika masih loading, bisa tampilkan spinner global atau null
  if (isLoadingAuth) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading application...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <AlertDisplay />
        <main>
          <Routes>
            {/* Rute Publik */}
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
            <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />} />

            {/* Rute yang Diproteksi */}
            <Route element={<ProtectedRoute />}> {/* Bungkus rute yang butuh login */}
              <Route path="/" element={<HomePage />} />
              {/* Tambahkan rute lain yang diproteksi di sini */}
              {/* <Route path="/profile" element={<ProfilePage />} /> */}
            </Route>

            {/* Redirect jika path tidak ditemukan, bisa ke halaman 404 atau home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;