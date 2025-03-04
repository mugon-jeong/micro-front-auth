import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const isDev = process.env.NODE_ENV === "development";
const authorityUrl = isDev ? "http://localhost:3002" : "http://auth-app:3000";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/common"],
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/authority",
        destination: `${authorityUrl}/authority`,
      },
      {
        source: "/authority/:path+",
        destination: `${authorityUrl}/authority/:path+`,
      },
      {
        source: "/authority-static/_next/:path+",
        destination: `${authorityUrl}/authority-static/_next/:path+`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
