import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV !== 'production';

const withPWAConfig = withPWA({
  dest: 'public',
  disable: isDev,
});

export default withPWAConfig({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false, // set true if you still get issues
  },
});
