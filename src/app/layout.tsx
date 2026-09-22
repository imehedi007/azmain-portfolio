import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#E50914",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://azmain-portfolio.vercel.app"
  ),
  title: {
    default: "Azmain Adil | Manager & Insurance Practitioner · Executive Portfolio",
    template: "%s | Azmain Adil",
  },
  description:
    "Explore the executive portfolio of Azmain Adil — Manager at Green Delta Insurance PLC, University of Dhaka MBA in Insurance, leading strategic branch operations across 20 branches, underwriting management, and community initiatives.",
  keywords: [
    "Azmain Adil",
    "Azmain Adil Rifat",
    "Manager Green Delta Insurance",
    "Insurance Manager Bangladesh",
    "Dhaka University MBA Insurance",
    "Underwriting Specialist",
    "Reinsurance Management",
    "Branch Restructuring",
    "Claims Settlement",
    "Mind Smiths Academy",
    "Executive Portfolio",
    "Netflix-Style Portfolio CMS",
  ],
  authors: [
    { name: "Azmain Adil" },
    { name: "Imran Mehedi", url: "https://www.linkedin.com/in/ali-imranmehedi" },
  ],
  creator: "Azmain Adil",
  publisher: "Azmain Adil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Azmain Adil Portfolio",
    title: "Azmain Adil | Manager & Insurance Practitioner · Executive Portfolio",
    description:
      "Strategic Operations, 20-Branch Transformation, Risk Underwriting & Reinsurance Management. Explore the executive portfolio and authentic CV of Azmain Adil.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Azmain Adil - Manager & Insurance Practitioner Executive Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Azmain Adil | Manager & Insurance Practitioner · Executive Portfolio",
    description:
      "Strategic Operations, 20-Branch Transformation, Risk Underwriting & Reinsurance Management. Explore the executive portfolio of Azmain Adil.",
    images: ["/og-image.jpg"],
    creator: "@azmainadil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} dark`}>
      <body className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans antialiased selection:bg-[#E50914] selection:text-white">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
