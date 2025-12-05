import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "../components/core/sonner";
import WhatsAppHelpLink from "../components/whatsapp-help-link";
import Providers from "../providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  preload: true,
  adjustFontFallback: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Precific",
    template: "%s | Precific",
  },
  description: "Precificação de Produtos com Inteligência Artificial",
  metadataBase: new URL("https://www.precificapp.com"),
  keywords: [
    "precificação",
    "preços",
    "reforma tributária",
    "impostos",
    "gestão de custos",
  ],
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
  verification: {
    google: "google-site-verification-code",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Precific",
    title: "Precific",
    description: "Precificação de Produtos com Inteligência Artificial",
    url: "https://www.precificapp.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precific",
    description: "Precificação de Produtos com Inteligência Artificial",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#66289B" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.youtube-nocookie.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://i.ytimg.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/landing-page/hero-section-background.webp"
          as="image"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="https://i.ytimg.com/vi/9gNKBYR-rhg/sddefault.jpg"
          as="image"
        />
      </head>
      <body
        className={`${poppins.className} antialiased bg-background`}
        suppressHydrationWarning
      >
        <Providers>
          <NextTopLoader
            color="#66289B"
            height={3}
            showSpinner={false}
            speed={300}
            crawl={false}
            easing="ease"
            showAtBottom={false}
          />

          {children}
          <Toaster position="top-center" />
        </Providers>
        <WhatsAppHelpLink />
      </body>
    </html>
  );
}
