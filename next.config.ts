import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
};

export default withNextIntl(nextConfig);
