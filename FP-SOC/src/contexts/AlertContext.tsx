// src/contexts/AlertContext.tsx
// Bagian: State Management Global (React Context API)
// Fungsi: Menyediakan cara terpusat untuk mengelola dan menampilkan
//         pesan alert di seluruh aplikasi tanpa perlu prop drilling.

import React, { createContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { AlertMessageState, AlertType } from '../types';

// Definisikan tipe untuk nilai context
interface AlertContextType {
  alerts: AlertMessageState[];
  /**
   * Fungsi untuk menampilkan pesan alert baru.
   * @param message Pesan yang akan ditampilkan.
   * @param type Jenis alert (error, success, warning, info).
   * @param duration Durasi (ms) sebelum alert hilang otomatis. Default 5000ms.
   */
  showAlert: (message: string, type: AlertType, duration?: number) => void;
  /**
   * Fungsi untuk menyembunyikan/menghapus alert tertentu berdasarkan ID-nya.
   * @param id ID dari alert yang ingin disembunyikan.
   */
  hideAlert: (id: string) => void;
}

// Buat Context dengan nilai default undefined.
// Pengecekan akan dilakukan di hook `useAlert` untuk memastikan provider ada.
export const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode; // Tipe untuk children komponen React
}

/**
 * Komponen Provider untuk AlertContext.
 * Komponen ini membungkus bagian aplikasi yang membutuhkan akses ke sistem alert.
 */
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertMessageState[]>([]);

  // Fungsi untuk menampilkan alert baru, dibungkus dengan useCallback untuk optimasi
  const showAlert = useCallback((message: string, type: AlertType, duration: number = 5000) => {
    const id = `alert-${new Date().getTime()}-${Math.random().toString(36).substring(2, 9)}`; // ID unik
    const newAlert: AlertMessageState = { id, message, type, duration };

    setAlerts(prevAlerts => [...prevAlerts, newAlert]);

    // Jika ada durasi, set timeout untuk otomatis menyembunyikan alert
    if (duration > 0) {
      setTimeout(() => {
        hideAlert(id); // Memanggil hideAlert yang juga di-memoize
      }, duration);
    }
  }, []); // useCallback tanpa dependensi jika hideAlert di-memoize dengan benar

  // Fungsi untuk menyembunyikan alert berdasarkan ID, dibungkus dengan useCallback
  const hideAlert = useCallback((id: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  }, []);

  // Memoize nilai context untuk mencegah re-render yang tidak perlu pada consumer
  // jika showAlert atau hideAlert tidak berubah instance-nya (berkat useCallback).
  const contextValue = useMemo(() => ({
    alerts,
    showAlert,
    hideAlert,
  }), [alerts, showAlert, hideAlert]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};