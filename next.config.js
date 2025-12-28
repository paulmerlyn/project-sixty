/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better error handling and warnings
  reactStrictMode: true,

  // Optimize images (if you add images later)
  images: {
    domains: [],
  },

  // Environment variables that should be available on the client side
  // (prefixed with NEXT_PUBLIC_)
  env: {
    SITE_NAME: 'Just a Minute Game Store',
  },
}

module.exports = nextConfig
