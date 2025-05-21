// src/vite-env.d.ts
// Bagian: Deklarasi Tipe untuk Vite Environment Variables
// Fungsi: Memberikan type-checking untuk variabel lingkungan yang diakses melalui `import.meta.env`.
//         Ini membantu menangkap kesalahan ketik nama variabel saat development.

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string; // Akan kita gunakan untuk sementara
  // Tambahkan variabel lingkungan kustom lainnya di sini jika diperlukan
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}