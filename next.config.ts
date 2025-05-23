// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Keep other configurations if they exist
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Or 'http' if necessary
        hostname: 'yiewabyozkuflesqvkyn.supabase.co', // Replace YOUR_SUPABASE_PROJECT_ID.supabase.co with your actual Supabase storage hostname
        port: '',
        pathname: '/storage/v1/object/public/post-images/**', // Adjust pathname pattern if needed (e.g., /storage/v1/object/public/post-images/**)
      },
      // Add other domains if you host images elsewhere
      // {
      //   protocol: 'https',
      //   hostname: 'images.example.com',
      // },
    ],//https://yiewabyozkuflesqvkyn.supabase.co/storage/v1/object/public/post-images//pixel%20art.jpg
  },
};

export default nextConfig;