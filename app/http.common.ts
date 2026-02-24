import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// 🔗 Backend Base URL
// export const BASE_URL = "http://localhost:8085";
export const BASE_URL = "https://api.infinz.backend.1infinz.com";

// 🔑 Token storage key (single source of truth)
const AUTH_TOKEN_KEY = "accessToken";

// ⚡ Axios instance
const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 📤 Request Interceptor (attach token)
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 📥 Response Interceptor (handle auth errors)
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized: Token missing or expired");

    
    }

    return Promise.reject(error);
  }
);

export default http;
