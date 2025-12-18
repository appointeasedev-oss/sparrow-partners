/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "liveblocks.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "olcojkaokbyrbqjueboo.supabase.co",
        pathname: "/**",
      },
    ],
  },
};
