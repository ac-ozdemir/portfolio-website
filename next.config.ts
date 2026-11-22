import type { NextConfig } from "next";

// Google Analytics 4 hosts, per Google's CSP guide. GA itself only loads
// after the visitor accepts the cookie banner.
const googleAnalytics = {
  script: "https://*.googletagmanager.com",
  img: "https://*.google-analytics.com https://*.googletagmanager.com",
  connect:
    "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
};

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${googleAnalytics.script}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${googleAnalytics.img}`,
  "font-src 'self' data:",
  `connect-src 'self' ${googleAnalytics.connect}`,
  // Looker Studio report embedded in the training dashboard's case study.
  "frame-src https://datastudio.google.com https://lookerstudio.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Next.js dev mode needs eval() for its debugging tools, which a strict
  // CSP blocks — so this only applies to production builds.
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]
    : []),
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.acozdemir.com" }],
        destination: "https://acozdemir.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
