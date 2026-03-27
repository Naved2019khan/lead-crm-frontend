import axiosClient from "@/services/axiosClient";

/**
 * In-memory manager for Access Token.
 * Prevents CSRF by keeping sensitive data out of localStorage.
 */
let accessToken: string | null = null;
let rotationInterval: NodeJS.Timeout | null = null;

export const tokenManager = {
  get: () => accessToken,
  set: (token: string) => {
    accessToken = token;
  },
  clear: () => {
    accessToken = null;
  },
  /**
   * Returns token from memory, OR attempts silent refresh via httpOnly cookie.
   * @param force - If true, ignores memory token and hits the refresh endpoint.
   */
  getAccessToken: async (force: boolean = false): Promise<string | null> => {
    if (accessToken && !force) return accessToken;

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
      accessToken = newToken;
      return newToken;
    } catch (error) {
      return null;
    }
  },

  /**
   * Starts periodic background rotation every 10 minutes.
   */
  startRotation: () => {
    if (rotationInterval) return;
    
    // Initial call to ensure we have a fresh token immediately if possible
    // (though usually initAuth handles this on boot)
    
    rotationInterval = setInterval(() => {
      console.log("[TokenManager] Rotating token...");
      tokenManager.getAccessToken(true);
    }, 14 * 60 * 1000); // 10 minutes
  },

  /**
   * Stops periodic background rotation.
   */
  stopRotation: () => {
    if (rotationInterval) {
      clearInterval(rotationInterval);
      rotationInterval = null;
    }
  },
};
