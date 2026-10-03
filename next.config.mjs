import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local images don't need remotePatterns
    // But we need to allow all extensions
    formats: ["image/avif", "image/webp"],
    qualities: [20, 70, 75],
    // Allow unoptimized for development if needed
  },
  // Handle Arabic filenames in static files
  async headers() {
    return [
      {
        source: "/projects/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
