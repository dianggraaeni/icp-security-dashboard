// src/pages/RegisterPage.tsx
// Bagian: Komponen Halaman
// Fungsi: Menyediakan UI dan logika untuk pengguna mendaftarkan akun baru.

import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../hooks/useAlert';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      showAlert('Password dan konfirmasi password tidak cocok.', 'error');
      return;
    }
    setIsLoading(true);
    try {
      const success = await register(username, password);
      if (success) {
        // showAlert sudah dihandle di context, jadi cukup navigasi
        navigate('/login'); // Arahkan ke login setelah berhasil register
      }
    } catch (error: any) {
      // Error seharusnya sudah ditangani dan alert ditampilkan oleh fungsi register di context
      // Tapi jika ada error tak terduga lain:
      showAlert(error.message || 'Gagal melakukan registrasi.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Registrasi Akun Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Konfirmasi Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? 'Mendaftar...' : 'Daftar'}
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
};

export default RegisterPage;