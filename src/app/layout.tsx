import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Ahmet Can Özdemir — Senior Data Analyst";
const description =
  "Portfolio of Ahmet Can Özdemir, a Senior Data Analyst turning data into decisions — dashboards, KPI frameworks, and automated reporting.";

export const metadata: Metadata = {
  metadataBase: new URL("https://acozdemir.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://acozdemir.com",
    siteName: "Ahmet Can Özdemir",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
