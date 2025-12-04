import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const BASE_URL = "https://backend.infinz.seabed2crest.com";
// export const BASE_URL = "http://localhost:8085";
const http = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request interceptor
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");

      if (token) {
        // Make sure headers exist
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Token may have expired.");
    }
    return Promise.reject(error);
  }
);

export default http;
