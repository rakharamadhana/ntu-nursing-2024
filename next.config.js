/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your existing Next.js configuration goes here
    reactStrictMode: true,
    // Any other Next.js config options you might have
};

const withPWA = require('next-pwa')({
    dest: 'public',
});

module.exports = withPWA(nextConfig);
