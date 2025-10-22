import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV !== 'production';

const withPWAConfig = withPWA({
  dest: 'public',
  disable: isDev, // disables PWA in dev mode
});

export default withPWAConfig({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false, // change to true if build fails again
  },
});
