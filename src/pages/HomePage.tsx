// src/pages/HomePage.tsx
// Bagian: Komponen Halaman Utama
// Fungsi: Menyediakan UI utama untuk pengguna berinteraksi dengan aplikasi,
//         khususnya untuk mengunggah file log dan melihat hasil analisisnya.

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAlert } from '../hooks/useAlert'; // Hook untuk menampilkan alert
import apiClient, { getApiErrorMessage } from '../services/apiClient'; // API client kita
import { AnalysisApiResult } from '../types'; // Tipe untuk hasil analisis

const HomePage: React.FC = () => {
  const { showAlert } = useAlert(); // Dapatkan fungsi showAlert dari context

  // State untuk file yang dipilih pengguna
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // State untuk menyimpan hasil analisis dari API
  const [analysisResult, setAnalysisResult] = useState<AnalysisApiResult | null>(null);
  // State untuk menunjukkan status loading saat API call berlangsung
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Menangani perubahan pada input file.
   * Memvalidasi tipe file dasar di sisi klien untuk UX yang lebih baik.
   * Validasi utama harus selalu ada di backend.
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Bersihkan alert sebelumnya dan hasil analisis
    setAnalysisResult(null);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const MAX_FILE_SIZE_MB = 5; // Batas ukuran file (contoh: 5MB)
      const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

      // Contoh validasi tipe file (sesuaikan dengan kebutuhan Anda)
      const allowedMimeTypes = ['text/plain', 'application/log']; // Tipe MIME yang diizinkan
      const allowedExtensions = ['.log', '.txt']; // Ekstensi file yang diizinkan

      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!allowedMimeTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        showAlert(`Tipe file tidak didukung (${file.type || fileExtension}). Harap unggah file .log atau .txt.`, 'error');
        setSelectedFile(null);
        event.target.value = ''; // Reset input file agar bisa pilih file yang sama lagi setelah error
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        showAlert(`Ukuran file terlalu besar (maks ${MAX_FILE_SIZE_MB}MB). Ukuran file Anda: ${(file.size / (1024*1024)).toFixed(2)}MB.`, 'error');
        setSelectedFile(null);
        event.target.value = '';
        return;
      }

      setSelectedFile(file);
      showAlert(`File "${file.name}" dipilih dan siap diunggah.`, 'info', 3000);
    } else {
      setSelectedFile(null);
    }
  };

  /**
   * Menangani submit form (pengunggahan file dan permintaan analisis).
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah reload halaman standar form HTML

    if (!selectedFile) {
      showAlert('Silakan pilih file log terlebih dahulu.', 'warning');
      return;
    }

    setIsLoading(true); // Mulai loading
    setAnalysisResult(null); // Bersihkan hasil analisis sebelumnya

    // Membuat FormData untuk mengirim file ke API
    // Backend harus dikonfigurasi untuk menerima 'multipart/form-data'
    const formData = new FormData();
    formData.append('logFile', selectedFile); // 'logFile' adalah nama field yang diharapkan backend

    try {
      showAlert(`Mengunggah dan menganalisis "${selectedFile.name}"... Mohon tunggu.`, 'info', 7000);

      // Panggil API endpoint untuk upload dan analisis file
      // Ganti '/analyze-log' dengan endpoint backend Anda yang sebenarnya
      const response = await apiClient.post<AnalysisApiResult>('/analyze-log', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Penting untuk file upload!
        },
      });

      // Jika berhasil, simpan hasil analisis dan tampilkan pesan sukses
      setAnalysisResult(response.data);
      showAlert('File berhasil dianalisis!', 'success');

    } catch (error: any) {
      // Jika terjadi error saat API call
      const errorMessage = getApiErrorMessage(error, 'Gagal menganalisis file. Silakan coba lagi.');
      showAlert(errorMessage, 'error');
      console.error("Error submitting file for analysis:", error);
    } finally {
      setIsLoading(false); // Selesai loading, baik sukses maupun gagal
    }
  };

  return (
    <div className="page-container">
      <h2>Analisis File Log Otomatis</h2>
      <p>Unggah file log Anda (format .txt atau .log, maks 5MB) untuk dianalisis oleh sistem AI kami.</p>

      <form onSubmit={handleSubmit} className="log-upload-form">
        <div className="form-group">
          <label htmlFor="fileInput">Pilih File Log:</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".txt,.log,text/plain,application/log" // Atribut accept untuk UX
            disabled={isLoading} // Disable input saat loading
          />
          {selectedFile && <p style={{fontSize: '0.85em', marginTop: '5px'}}>File terpilih: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)</p>}
        </div>
        <button type="submit" className="form-button" disabled={isLoading || !selectedFile}>
          {isLoading ? 'Menganalisis...' : 'Unggah dan Analisis'}
        </button>
      </form>

      {/* Bagian untuk Menampilkan Hasil Analisis */}
      {analysisResult && !isLoading && (
        <div className="analysis-results-container">
          <h3>Hasil Analisis File:</h3>
          {/* Tampilkan hasil analisis, bisa dalam format JSON string atau komponen kustom */}
          <pre>
            {JSON.stringify(analysisResult, null, 2)}
          </pre>
          {/* Contoh cara menampilkan data secara lebih terstruktur:
          <p><strong>Status:</strong> {analysisResult.status}</p>
          {analysisResult.summary && <p><strong>Ringkasan:</strong> {analysisResult.summary}</p>}
          {analysisResult.issuesFound !== undefined && <p><strong>Isu Ditemukan:</strong> {analysisResult.issuesFound}</p>}
          {analysisResult.details && (
            <>
              <h4>Detail:</h4>
              <ul>
                {Object.entries(analysisResult.details).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {JSON.stringify(value)}</li>
                ))}
              </ul>
            </>
          )}
          */}
        </div>
      )}
    </div>
  );
};

export default HomePage;