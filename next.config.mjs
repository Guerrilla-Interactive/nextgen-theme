/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },

  
  async rewrites() {
    return [

      // courses - change these to make /kurs URLs serve /course content
      {
        source: "/kurs",        
        destination: "/course",
      },
      {
        source: "/kurs/:path*",
        destination: "/course/:path*",
      },

      {
        source: "/tjenester",
        destination: "/tjenester",
      },
      {
        source: "/tjenester/:path*",
        destination: "/service/:path*",
      },
      
    ];
  },

  async redirects() {
    return [
      {
        source: "/course",
        destination: "/kurs",
        permanent: true,
      },
      {
        source: "/course/:path*",
        destination: "/kurs/:path*",
        permanent: true,
      },
      {
        source: "/service",
        destination: "/tjenester",
        permanent: true,
      },
      {
        source: "/service/:path*",
        destination: "/tjenester/:path*",
        permanent: true,
      },
    ];
  },
  



  typescript: {
    // WARNING: This allows production builds to succeed even if there are type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;