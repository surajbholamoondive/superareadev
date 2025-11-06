/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', 
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      's3-alpha-sig.figma.com',
      'localhost',
      'cdn-icons-png.flaticon.com',
      'api.themoviedb.org',
      'images.pexels.com',
      'www.flaticon.com',
      'img.freepik.com',
      'superarea-bucket-s3.s3.ap-south-1.amazonaws.com',
      'via.placeholder.com',
      'www.searchenginejournal.com',
      'media.istockphoto.com',
      'cdn.pixabay.com',
      'dummyimage.com',
      'picsum.photos',
      "35.154.208.216",
      "placekitten.com"
    ],
  },
  transpilePackages: ['@mui/x-charts','@mui/material', '@mui/system', '@mui/icons-material'],
  experimental: {
    scrollRestoration: true,
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
