import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/common"],
  async rewrites() {
    return [
      {
        source: "/about",
        destination: `http://localhost:3001/about`,
      },
      {
        source: "/about/:path+",
        destination: `http://localhost:3001/about/:path+`,
      },
      {
        source: "/about-static/_next/:path+",
        destination: `http://localhost:3001/about-static/_next/:path+`,
      },
      {
        source: "/authority",
        destination: `http://localhost:3002/authority`,
      },
      {
        source: "/authority/:path+",
        destination: `http://localhost:3002/authority/:path+`,
      },
      {
        source: "/authority-static/_next/:path+",
        destination: `http://localhost:3002/authority-static/_next/:path+`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
