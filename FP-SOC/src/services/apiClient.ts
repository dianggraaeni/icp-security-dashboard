// src/services/apiClient.ts
// Bagian: Layanan API Client
// Fungsi: Mengkonfigurasi dan menyediakan instance Axios terpusat untuk
//         melakukan panggilan HTTP ke backend API. Ini akan diadaptasi nanti
//         jika menggunakan ICP actor, namun strukturnya bisa serupa.

import axios, { AxiosError, AxiosInstance } from 'axios';

// Ambil Base URL API dari environment variable (didefinisikan di .env dan vite.config.ts)
// VITE_API_BASE_URL bisa berupa 'http://localhost:YOUR_BACKEND_PORT/api' untuk dev lokal,
// atau URL API production Anda.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; // Fallback jika tidak ada

// Membuat instance Axios dengan konfigurasi dasar
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Header lain yang mungkin dibutuhkan secara default, misal 'Accept'
    'Accept': 'application/json',
  },
  // timeout: 10000, // Timeout 10 detik (opsional)
});

// Interceptor untuk Request (Opsional, berguna untuk token auth, dll.)
apiClient.interceptors.request.use(
  (config) => {
    // Misalnya, jika Anda punya token otentikasi yang disimpan di localStorage:
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    // Lakukan sesuatu jika ada error saat konfigurasi request
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor untuk Response (Berguna untuk penanganan error global)
apiClient.interceptors.response.use(
  (response) => {
    // Semua status code 2xx akan masuk ke sini
    // Anda bisa melakukan transformasi data response di sini jika perlu
    return response;
  },
  (error: AxiosError) => {
    // Semua status code di luar 2xx akan masuk ke sini
    // Ini adalah tempat yang baik untuk logging error atau penanganan error global
    // seperti redirect ke halaman login jika 401 Unauthorized.

    if (error.response) {
      // Request dibuat dan server merespons dengan status code error
      console.error('API Response Error - Status:', error.response.status);
      console.error('API Response Error - Data:', error.response.data);
      // Anda bisa menambahkan logic di sini, misalnya:
      // if (error.response.status === 401) {
      //   // Panggil fungsi logout atau redirect ke login
      //   // window.location.href = '/login';
      // }
    } else if (error.request) {
      // Request dibuat tapi tidak ada respons yang diterima (misal, server down, masalah jaringan)
      console.error('API No Response Error - Request:', error.request);
    } else {
      // Sesuatu terjadi saat menyiapkan request yang memicu Error
      console.error('API Request Setup Error - Message:', error.message);
    }

    // Penting untuk meneruskan error agar bisa ditangani juga oleh pemanggil API
    return Promise.reject(error);
  }
);

export default apiClient;

/**
 * Fungsi helper untuk menangani error dari Axios dan mengembalikan pesan yang lebih user-friendly.
 * Ini bisa dipanggil di blok catch pada komponen.
 * @param error Objek error yang dilempar oleh Axios atau pemanggilan API.
 * @param defaultMessage Pesan default jika tidak ada pesan spesifik dari error.
 * @returns String pesan error yang siap ditampilkan ke pengguna.
 */
export const getApiErrorMessage = (error: any, defaultMessage: string = "Terjadi kesalahan saat menghubungi server."): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server merespons dengan error
      // Coba ambil pesan dari data respons (backend mungkin mengirimkannya di properti 'message' atau 'error')
      const responseData = error.response.data as any; // 'any' untuk fleksibilitas
      if (responseData && typeof responseData.message === 'string') {
        return responseData.message;
      }
      if (responseData && typeof responseData.error === 'string') {
        return responseData.error;
      }
      // Fallback ke status text jika tidak ada pesan spesifik
      return `Error ${error.response.status}: ${error.response.statusText || defaultMessage}`;
    } else if (error.request) {
      // Tidak ada respons dari server
      return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    }
  }
  // Error non-Axios atau error setup request
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};