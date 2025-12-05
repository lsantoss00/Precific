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
  weight: ["400", "500", "600", "700"],
  preload: true,
  adjustFontFallback: true,
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
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Precific",
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
        <link
          rel="preload"
          href="/landing-page/hero-section-background.webp"
          as="image"
          fetchPriority="high"
        />
      </head>
      <body className={`${poppins.className} antialiased bg-background`}>
        <Providers>
          <NextTopLoader
            color="#66289B"
            height={4}
            showSpinner={false}
            speed={200}
          />

          {children}
          <Toaster position="top-center" />
        </Providers>
        <WhatsAppHelpLink />
      </body>
    </html>
  );
}
