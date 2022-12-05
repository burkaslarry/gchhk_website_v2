/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "image.tmdb.org",
      "images.unsplash.com",
      "i.imgur.com",
      "i.postimg.cc",
    ],
  },
};

module.exports = nextConfig;
