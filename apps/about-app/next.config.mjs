/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/common"],
  assetPrefix: "/about-static",
};

export default nextConfig;
