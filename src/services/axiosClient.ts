"use client";

import axios from "axios";
import { tokenManager } from "@/lib/tokenManager";

// Create the axios client
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true, // Required for httpOnly cookies to be sent/received
});

// Request Interceptor: Attach Bearer Token from memory
axiosClient.interceptors.request.use(async (config) => {
  // Skip the Auth header for the refresh request (uses X-Skip-Auth header set in tokenManager)
  if (config.headers?.["X-Skip-Auth"]) {
    delete config.headers["X-Skip-Auth"]; // Clean up
    return config;
  }

  const token = tokenManager.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Helper to notify all queued requests that a new token is available
const notifySubscribers = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Response Interceptor: Handle 401 Unauthorized with automatic refresh and retry
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config: originalRequest,
      response: { status } = {},
    } = error;

    // Detect 401 status and ensure we aren't already retrying this specific request
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request and return a promise that resolves
        // when notifySubscribers is called
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("[AxiosClient] Access token expired. Attempting refresh...");
        const newToken = await tokenManager.getAccessToken(true);

        if (newToken) {
          console.log("[AxiosClient] Token refreshed successfully. Retrying request.");
          isRefreshing = false;
          notifySubscribers(newToken);
          
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("[AxiosClient] Token refresh failed.");
      } finally {
        isRefreshing = false;
      }

      // If refresh fails, log the user out
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
