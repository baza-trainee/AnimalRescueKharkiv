import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
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

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      console.log("Handling 401: Refreshing token...");

        if (originalRequest.url === "/auth/login") {
        return Promise.reject(error);
      }

      if (originalRequest.url === "/auth/refresh") {
        console.log("No refresh token available. Redirecting to login...");
        Cookies.remove("access_token");
        window.location.href = "/crm/login";
        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return refreshPromise?.then((newToken) => {
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            }
            return Promise.reject(error);
          });
        }

        isRefreshing = true;
        refreshPromise = refreshToken();

        return refreshPromise.then((newToken) => {
          isRefreshing = false;
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          } else {
            console.log("Refresh token invalid or missing. Redirecting to login...");
            Cookies.remove("access_token");
            window.location.href = "/crm/login";
            return Promise.reject(error);
          }
        });
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
    Cookies.remove("access_token");
    return null;
  }
};

export const fetch = async <T>(path: string, params?: Record<string, any>): Promise<T> => {
  const config = params ? { params } : {};
  const response = await apiClient.get<T>(path, config);
  return response.data;
};

export const post = async <T>(
  path: string,
  data?: unknown,
  params?: Record<string, any> ): Promise<T | null> => {
  try {
    const queryString = params
      ? "?" + new URLSearchParams(params as Record<string, string>).toString()
      : "";
    const response = await apiClient.post<T>(`${path}${queryString}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

export const remove = async <T>(path: string, data?: unknown): Promise<T | null> => {
  try {
    const response = await apiClient.delete<T>(path, { data });

    return response.status !== 204 ? response.data : null;
  } catch (error) {
    console.error("DELETE request failed:", error);
    throw error;
  }
};
export default apiClient;
