/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
    },
    // Compression
    compress: true,
    // Power header
    poweredByHeader: false,
    // Bundle optimization
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
    // Strict mode
    reactStrictMode: true,
    // Production browser source maps off for speed
    productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
