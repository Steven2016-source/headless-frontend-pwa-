import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  // any other settings you already have...
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev, // disable PWA in dev mode
})(nextConfig);
