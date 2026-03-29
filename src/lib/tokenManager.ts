import axiosClient from "@/services/axiosClient";

/** Cookie name the middleware reads to verify auth */
export const AUTH_COOKIE = "crm_token";

/**
 * In-memory manager for Access Token.
 * Also syncs to a cookie so the server-side middleware can read it.
 */
let accessToken: string | null = null;


export const tokenManager = {
  get: () => accessToken,
  set: (token: string) => {
    accessToken = token;
    // Write to cookie for middleware (client-side only)
    if (typeof document !== "undefined") {
      document.cookie = `${AUTH_COOKIE}=${token}; path=/; SameSite=Lax`;
    }
  },
  clear: () => {
    accessToken = null;
    if (typeof document !== "undefined") {
      document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
    }
  },
  /**
   * Returns token from memory, OR attempts silent refresh via httpOnly cookie.
   * If the token exists but does not contain a valid user, it forces a refresh.
   * @param force - If true, ignores memory token and hits the refresh endpoint.
   */
  getAccessToken: async (force: boolean = false): Promise<string | null> => {
    let hasValidUser = false;

    if (accessToken && !force) {
      try {
        // Decode to check if user info actually exists in the token
        const { jwtDecode } = require('jwt-decode');
        const decoded: any = jwtDecode(accessToken);
        if (decoded && decoded.userId) {
          hasValidUser = true;
        }
      } catch (e) {
        console.error("[TokenManager] Failed to decode token. Forcing refresh.", e);
      }
    }

    // Return the cached token only if we aren't forcing a refresh AND it has a valid user
    if (accessToken && !force && hasValidUser) return accessToken;

    try {
      // Use original axiosClient which already has withCredentials: true
      // We'll ensure the interceptors don't interfere with this specific call
      const res = await axiosClient.post(
        `/auth/refresh`,
        {},
        {
          // Custom flag for interceptors to identify this as a refresh call
          headers: { "X-Skip-Auth": "true" },
        }
      );

      const newToken = res.data.accessToken;
      tokenManager.set(newToken);
      accessToken = newToken;
      return newToken;
    } catch (error) {
      return null;
    }
  },

};
