// src/types/index.ts
// Bagian: Definisi Tipe Global TypeScript
// Fungsi: Menyimpan semua definisi tipe atau interface yang digunakan
//         di berbagai bagian aplikasi untuk menjaga konsistensi dan type safety.

/**
 * Tipe untuk jenis-jenis alert yang bisa ditampilkan.
 */
export type AlertType = 'error' | 'success' | 'warning' | 'info';

/**
 * Interface untuk objek state sebuah pesan alert.
 */
export interface AlertMessageState {
  id: string; // ID unik untuk setiap alert, berguna untuk menghapusnya
  message: string; // Pesan yang akan ditampilkan
  type: AlertType; // Jenis alert (error, success, dll.)
  duration?: number; // Durasi opsional (ms) sebelum alert hilang otomatis
}

/**
 * Interface untuk data pengguna yang disimpan.
 * Untuk data dummy, ini akan sederhana.
 */
export interface User {
  id: string;
  username: string;
  // Tidak perlu menyimpan password di frontend, bahkan untuk dummy
  // Biasanya di BE, password di-hash.
}

/**
 * Tipe untuk state autentikasi.
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  // token?: string; // Jika menggunakan token JWT nanti
}

/**
 * Interface untuk input yang dikirim ke API analisis.
 * INI ADALAH CONTOH. Sesuaikan dengan apa yang dibutuhkan backend Anda.
 * Untuk file, Anda mungkin mengirim FormData atau representasi lain.
 */
export interface AnalysisApiInput {
  // Jika menggunakan FormData, ini mungkin tidak didefinisikan secara eksplisit di sini.
  // Jika mengirim JSON dengan file base64:
  // fileContentBase64?: string;
  // fileName?: string;
  // Jika mengirim ke canister ICP, ini bisa jadi:
  // fileContent?: Uint8Array;
  // fileName?: string;

  // Untuk contoh awal dengan Axios dan FormData, kita tidak terlalu butuh ini.
  // Tapi jika API Anda menerima JSON:
  logTextContent?: string; // Contoh jika Anda mengirim konten log sebagai teks
}

/**
 * Interface untuk hasil analisis yang diterima dari API.
 * INI ADALAH CONTOH. Sesuaikan dengan respons aktual dari backend Anda.
 */
export interface AnalysisApiResult {
  status: string; // Misal: "success", "failed"
  summary?: string; // Ringkasan analisis
  details?: Record<string, any>; // Detail analisis dalam bentuk objek
  issuesFound?: number; // Jumlah isu yang ditemukan
  // Tambahkan properti lain sesuai kebutuhan backend
}

// Tambahkan tipe atau interface lain yang dibutuhkan aplikasi Anda di sini.
// Contoh:
// export interface UserProfile {
//   id: string;
//   username: string;
//   email: string;
// }