// src/hooks/useAuth.ts
// Bagian: Custom React Hook
// Fungsi: Menyediakan cara yang lebih bersih dan aman untuk mengakses AuthContext.
//         Hook ini juga melakukan pengecekan apakah ia digunakan di dalam AuthProvider.

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook untuk mengakses fungsi dan state dari AuthContext.
 * @returns Objek yang berisi state autentikasi dan fungsi-fungsi terkait.
 * @throws Error jika hook ini digunakan di luar komponen yang dibungkus oleh `AuthProvider`.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider. Pastikan komponen App Anda dibungkus dengan <AuthProvider>.');
  }

  return context;
};