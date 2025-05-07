import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [{
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "X-Requested-With, X-CSRF-Token, Authorization" },
        { key: "Access-Control-Allow-Credentials", value: "true" }
      ]
    }]
  }
};

export default nextConfig;
