/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    instrumentationHook: true,
    serverComponentsExternalPackages: ["bcrypt"]
  },
};

module.exports = nextConfig;
