import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@workspace/ui", "@workspace/common"],
  output: "standalone",
  assetPrefix: "/authority-static",
};

export default withNextIntl(nextConfig);
