// ==========================
// FILE INI: AppRouter.tsx
// ==========================
// Fungsi:
// Mengatur routing untuk semua halaman.
// Setiap path (misalnya /login, /register, /upload) diarahkan ke komponen yang sesuai.


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
//import UploadLog from "../pages/UploadLog";
//import Result from "../pages/Result";
//import History from "../pages/History";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div className="p-4 text-center">404 - Page Not Found</div>} />
    </Routes>
  </Router>
);

//JIKA SUDAH SIAP TAMBAHKAN KODE DI BAWAH INI, TEPAT DI BAWAH <Route path="/" element={<Home />} />
//<Route path="/login" element={<Login />} />
//<Route path="/register" element={<Register />} />
//<Route path="/upload" element={<UploadLog />} />
//<Route path="/result" element={<Result />} />
//<Route path="/history" element={<History />} />

export default AppRouter;
