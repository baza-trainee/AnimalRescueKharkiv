import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    const token_type = Cookies.get("token_type") || "Bearer";
    if (token) {
      config.headers.Authorization = `${capitalizeFirstLetter(token_type)} ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshToken();
        if (newToken) {
          const token_type = Cookies.get("token_type") || "Bearer";
          Cookies.set("access_token", newToken, { secure: true, sameSite: "Strict" });
          error.config.headers.Authorization = `${capitalizeFirstLetter(token_type)} ${newToken}`;
          return apiClient(error.config);
        }
      } catch (refreshError) {
        console.error("Session expired. Redirecting to login...");
        Cookies.remove("access_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await apiClient.post(`/auth/refresh`);

    const { access_token } = response.data;

    Cookies.set("access_token", access_token, { secure: true, sameSite: "Strict" });

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
};

export const fetch = async <T>(path: string, params?: Record<string, any>): Promise<T> => {
    const config = params ? { params } : {};
    const response = await apiClient.get<T>(path, config);
    return response.data;
  };

export default apiClient;