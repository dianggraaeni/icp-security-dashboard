// ==========================
// FILE INI: Register.tsx
// ==========================
// Fungsi:
// Halaman form untuk user membuat akun baru.
// Kirim data ke endpoint /api/register untuk mendaftarkan user.

import React from 'react';

const Register = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Username" className="border px-4 py-2 w-full" />
        <input type="email" placeholder="Email" className="border px-4 py-2 w-full" />
        <input type="password" placeholder="Password" className="border px-4 py-2 w-full" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
