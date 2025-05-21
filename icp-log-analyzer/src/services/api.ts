// ==========================
// FILE INI: api.ts
// ==========================
// Fungsi:
// Tempat semua function untuk melakukan request ke backend (Ezel / Motoko).
// Contoh: loginUser(), uploadLog(), getHistory().
// Dipanggil dari file `pages/*.tsx`.


import axios from "axios";

const API_URL = "https://your-backend-url.icp/api";

export const login = async (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register = async (email: string, password: string) => {
  return axios.post(`${API_URL}/register`, { email, password });
};

export const uploadLog = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("log", file);

  return axios.post(`${API_URL}/upload-log`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getResult = async (token: string) => {
  return axios.get(`${API_URL}/get-result`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHistory = async (token: string) => {
  return axios.get(`${API_URL}/get-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
