import axios, { InternalAxiosRequestConfig } from "axios";
import { globalAuthLogin, globalAuthLogout } from "../contexts/AuthStore"

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    // "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/auth/refresh")) {
      return config;
    }
    const accessToken = window.localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url === "/auth/refresh") {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = window.localStorage.getItem("refreshToken");
          console.log(refreshToken);

          const { data } = await apiClient.post(
            "/auth/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          console.log(data);
          globalAuthLogin?.(data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refreshToken", data.refresh_token);
          }

          console.log("리프레시 토큰 재발급");

          return data.access_token;
        })()
          .catch((error) => {
            globalAuthLogout?.();
            window.location.href = "/login";
            console.log(error);
            return Promise.reject(error);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient.request(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);
