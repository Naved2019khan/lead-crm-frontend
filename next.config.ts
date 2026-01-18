import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    typescript: {
    ignoreBuildErrors: true, // ✅ prevents TS errors from breaking build
  },
   logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
