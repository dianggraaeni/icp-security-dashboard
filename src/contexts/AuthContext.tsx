// src/contexts/AuthContext.tsx
// Bagian: State Management Global (React Context API)
// Fungsi: Menyediakan state autentikasi (apakah user login, data user)
//         dan fungsi untuk login, register, dan logout ke seluruh aplikasi.

import React, { createContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { User, AuthState } from '../types';
import { useAlert } from '../hooks/useAlert'; // Untuk menampilkan alert

// Kunci untuk menyimpan data pengguna di localStorage
const USER_STORAGE_KEY = 'logAppUsers';
const CURRENT_USER_SESSION_KEY = 'logAppCurrentUser';

interface AuthContextType extends AuthState {
  login: (username: string, passwordAttempt: string) => Promise<boolean>;
  register: (username: string, passwordAttempt: string) => Promise<boolean>;
  logout: () => void;
  isLoadingAuth: boolean; // Untuk loading saat inisialisasi auth state
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Fungsi helper untuk mengambil semua user dari localStorage
const getStoredUsers = (): User[] => {
  const usersJson = localStorage.getItem(USER_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Fungsi helper untuk menyimpan semua user ke localStorage
const storeUsers = (users: User[]) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

// Fungsi helper untuk menyimpan sesi user saat ini
const storeCurrentUserSession = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_SESSION_KEY);
  }
};

// Fungsi helper untuk mengambil sesi user saat ini
const getCurrentUserSession = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_SESSION_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true); // Loading awal
  const { showAlert } = useAlert();

  // Efek untuk memuat state autentikasi dari localStorage saat komponen pertama kali mount
  useEffect(() => {
    const currentUser = getCurrentUserSession();
    if (currentUser) {
      setAuthState({ isAuthenticated: true, user: currentUser });
    }
    setIsLoadingAuth(false); // Selesai loading state awal
  }, []);

  const register = useCallback(async (username: string, passwordAttempt: string): Promise<boolean> => {
    // Validasi dasar (bisa lebih kompleks)
    if (!username.trim() || !passwordAttempt.trim()) {
      showAlert('Username dan password tidak boleh kosong.', 'error');
      return false;
    }
    if (passwordAttempt.length < 6) {
      showAlert('Password minimal 6 karakter.', 'error');
      return false;
    }

    const users = getStoredUsers();
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
      showAlert('Username sudah terdaftar. Silakan gunakan username lain.', 'error');
      return false;
    }

    // Untuk data dummy, kita tidak menyimpan password.
    // Di aplikasi nyata, password akan di-hash di backend.
    // Kita hanya menyimpan username dan ID.
    const newUser: User = { id: `user-${Date.now()}`, username };
    const updatedUsers = [...users, newUser];
    storeUsers(updatedUsers);

    showAlert(`Registrasi berhasil untuk ${username}! Silakan login.`, 'success');
    return true;
  }, [showAlert]);

  const login = useCallback(async (username: string, passwordAttempt: string): Promise<boolean> => {
    // Validasi dasar
    if (!username.trim() || !passwordAttempt.trim()) {
      showAlert('Username dan password tidak boleh kosong.', 'error');
      return false;
    }

    const users = getStoredUsers();
    const userToLogin = users.find(u => u.username === username);

    if (!userToLogin) {
      showAlert('Username tidak ditemukan. Silakan register terlebih dahulu.', 'error');
      return false;
    }

    // Validasi password dummy (DI APLIKASI NYATA INI DILAKUKAN DI BACKEND DENGAN HASH)
    // Untuk dummy, kita bisa buat password sederhana yang sama untuk semua, atau skip validasi pw.
    // Misalnya, kita asumsikan password yang valid adalah "password123" untuk semua user dummy.
    if (passwordAttempt !== "password123") { // Ganti dengan logika password dummy Anda
      showAlert('Password salah.', 'error');
      return false;
    }

    setAuthState({ isAuthenticated: true, user: userToLogin });
    storeCurrentUserSession(userToLogin); // Simpan sesi
    showAlert(`Selamat datang kembali, ${username}!`, 'success');
    return true;
  }, [showAlert]);

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, user: null });
    storeCurrentUserSession(null); // Hapus sesi
    showAlert('Anda telah logout.', 'info');
    // Tidak perlu menghapus user dari USER_STORAGE_KEY, hanya sesi login saat ini
  }, [showAlert]);

  const contextValue = useMemo(() => ({
    ...authState,
    login,
    register,
    logout,
    isLoadingAuth,
  }), [authState, login, register, logout, isLoadingAuth]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};