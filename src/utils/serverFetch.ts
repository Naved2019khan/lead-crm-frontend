import { auth } from "@/lib/auth";
import { errorHandler } from "./errorHandler";

const baseURL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

interface FetchOptions extends RequestInit {
  data?: any;
}

export const serverFetch = async (endpoint: string, options: FetchOptions = {}) => {
  const session = await auth();
  const token = (session?.user as any)?.token;

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = `${baseURL}${endpoint}`;

  // If there's a body and it's not a string, stringify it
  let body = options.data;
  if (body && typeof body === "object") {
    body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      body,
    });

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
