// src/components/ProtectedRoute.tsx
// Bagian: Komponen UI (Higher-Order Component Pattern)
// Fungsi: Melindungi rute tertentu agar hanya bisa diakses oleh pengguna yang sudah terautentikasi.
//         Jika pengguna belum login, mereka akan diarahkan ke halaman login.

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Hook untuk status autentikasi

interface ProtectedRouteProps {
  // Anda bisa menambahkan props lain jika diperlukan, misal roles: string[]
}

/**
 * Komponen ProtectedRoute.
 * Jika pengguna tidak terautentikasi, redirect ke halaman login.
 * Jika terautentikasi, render komponen children (Outlet dari React Router).
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const location = useLocation(); // Untuk menyimpan lokasi asal sebelum redirect

  // Jika masih loading status autentikasi, tampilkan loading atau null
  if (isLoadingAuth) {
    // Anda bisa menampilkan spinner loading di sini
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>Memeriksa sesi...</div>;
  }

  // Jika tidak terautentikasi, redirect ke halaman login
  // Simpan lokasi saat ini agar bisa kembali setelah login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika terautentikasi, render komponen yang diproteksi (menggunakan <Outlet />)
  return <Outlet />;
};

export default ProtectedRoute;