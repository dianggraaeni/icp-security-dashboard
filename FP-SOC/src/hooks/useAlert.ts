// src/hooks/useAlert.ts
// Bagian: Custom React Hook
// Fungsi: Menyediakan cara yang lebih bersih dan aman untuk mengakses AlertContext.
//         Hook ini juga melakukan pengecekan apakah ia digunakan di dalam AlertProvider.

import { useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';

/**
 * Custom hook untuk mengakses fungsi dan state dari AlertContext.
 * @returns Objek yang berisi `alerts`, `showAlert`, dan `hideAlert`.
 * @throws Error jika hook ini digunakan di luar komponen yang dibungkus oleh `AlertProvider`.
 */
export const useAlert = () => {
  const context = useContext(AlertContext);

  // Pastikan hook digunakan di dalam lingkup AlertProvider
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider. Pastikan komponen App Anda dibungkus dengan <AlertProvider>.');
  }

  return context;
};