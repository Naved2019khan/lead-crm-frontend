import { errorHandler } from "./errorHandler";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/lib/tokenManager";

const baseURL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

interface FetchOptions extends RequestInit {
  data?: any;
}

const getHeaders = (token: string | undefined, originalHeaders?: HeadersInit) => {
  const headers = new Headers(originalHeaders);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

export const serverFetch = async (endpoint: string, options: FetchOptions = {}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  console.log("CRM TOKEN1:===>", token)

  const url = `${baseURL}${endpoint}`;

  let body = options.data;
  if (body && typeof body === "object") {
    body = JSON.stringify(body);
  }

  try {
    let response = await fetch(url, {
      ...options,
      headers: getHeaders(token, options.headers),
      body,
    });

    if (response.status === 401) {
      console.log("[serverFetch] 401 received. Attempting server-side token refresh...");
      const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

      const refreshResponse = await fetch(`${baseURL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": allCookies
        }
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        const newToken = refreshData.accessToken;

        if (newToken) {
          console.log("[serverFetch] Refresh successful. Retrying original request.");
          response = await fetch(url, {
            ...options,
            headers: getHeaders(newToken, options.headers),
            body,
          });
        }
      } else {
        console.error("[serverFetch] Refresh failed with status:", refreshResponse.status);
        console.log("CRM TOKEN2:===>", token)
      }
    }

    if (!response.ok) {
      // Parse error response if possible
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText };
      }

      throw {
        response: {
          data: errorData,
          status: response.status,
          statusText: response.statusText,
        },
        isAxiosError: true, // Mocking Axios error for the errorHandler
      };
    }

    return await response.json();
  } catch (error) {
    throw errorHandler(error);
  }
};
