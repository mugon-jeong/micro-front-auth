/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return [
      {
        source: '/about',
        destination: `http://localhost:3001/about`,
      },
      {
        source: '/about/:path+',
        destination: `http://localhost:3001/about/:path+`,
      }
    ];
  }
}

export default nextConfig
