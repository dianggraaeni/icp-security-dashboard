// ==========================
// FILE INI: Login.tsx
// ==========================
// Fungsi:
// Halaman form untuk user masuk ke sistem.
// Kirim email & password ke endpoint /api/login lalu simpan token.

import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Username dan password wajib diisi.');
    } else {
      // Simulasi error
      if (username !== 'admin') {
        alert('Akun user tidak ditemukan di database');
      } else if (password !== '1234') {
        alert('Username / Password salah');
      } else {
        alert('Login berhasil');
        window.location.href = '/home';
      }
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="border px-4 py-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;