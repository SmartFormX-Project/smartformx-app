
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },  swcMinify: true,

  // async rewrites() {
  //   return [
  //     {
  //       source: "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  //       destination: "/$1",
  //     },
  //   ];
  // },
};

export default nextConfig;
