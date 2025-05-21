// src/components/AlertMessage.tsx
// Bagian: Komponen UI Reusable
// Fungsi: Komponen ini bertanggung jawab untuk merender semua alert yang aktif
//         dari AlertContext ke dalam UI.

import React from 'react';
import { useAlert } from '../hooks/useAlert'; // Hook untuk mengakses context

/**
 * Komponen untuk menampilkan daftar pesan alert yang aktif.
 * Alert diambil dari AlertContext menggunakan hook `useAlert`.
 */
const AlertDisplay: React.FC = () => {
  const { alerts, hideAlert } = useAlert(); // Dapatkan alerts dan fungsi hideAlert

  // Jika tidak ada alert yang aktif, jangan render apa-apa
  if (!alerts.length) {
    return null;
  }

  return (
    <div className="alert-display-container" aria-live="polite" aria-atomic="true">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert-item alert-item-${alert.type}`} // Class dinamis berdasarkan tipe alert
          role="alert" // Peran ARIA untuk aksesibilitas
        >
          <span className="alert-item-message">{alert.message}</span>
          <button
            onClick={() => hideAlert(alert.id)} // Tombol untuk menutup alert
            className="alert-item-close-button"
            aria-label={`Close alert: ${alert.message}`} // Label ARIA untuk aksesibilitas
          >
            × {/* Karakter 'x' untuk tombol close */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertDisplay;