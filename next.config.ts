import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["unframer"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
