// ==========================
// FILE INI: App.tsx
// ==========================
// Fungsi:
// Root komponen React. Di sini router utama dijalankan.
// Biasanya hanya render <AppRouter /> dan Navbar global.

// src/App.tsx
import React from 'react';
import AppRouter from './routes/AppRouter';

const App = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
