/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com','res.cloudinary.com'],
  },
};

module.exports = nextConfig;
