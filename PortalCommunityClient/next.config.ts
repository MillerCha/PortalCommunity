import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_AUTH_SERVICE_URL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'https://localhost:32786',
    NEXT_PUBLIC_LIBRARY_SERVICE_URL: process.env.NEXT_PUBLIC_LIBRARY_SERVICE_URL || 'https://localhost:32778',
    NEXT_PUBLIC_COURSES_SERVICE_URL: process.env.NEXT_PUBLIC_COURSES_SERVICE_URL || 'https://localhost:44379',
  },
};

export default nextConfig;
