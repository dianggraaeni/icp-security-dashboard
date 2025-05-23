// src/main.tsx
// Bagian: Entry Point Aplikasi React
// Fungsi: File ini adalah titik masuk utama yang di-render oleh Vite.
//         Ia menginisialisasi React DOM dan merender komponen App utama,
//         serta membungkusnya dengan provider yang diperlukan (seperti AlertProvider).

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './App.css';
import { AlertProvider } from './contexts/AlertContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx'; // << TAMBAHKAN INI

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider> {/* << BUNGKUS DENGAN AUTHPROVIDER */}
        <App />
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode>,
);