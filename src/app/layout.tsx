import AtlasLinkBalloon from "@/src/components/atlas-link-balloon";
import WhatsAppHelpLinkBalloon from "@/src/components/whatsapp-help-link-balloon";
import { OrganizationJsonLd } from "@/src/scripts/json-ld/";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "../components/core/sonner";
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
});

export const metadata: Metadata = {
  title: {
    default: "Precific",
    template: "%s | Precific",
  },
  description:
    "Sistema de precificação e gestão tributária. Automatize cálculos de custos, impostos e margens. Simule a Reforma Tributária (IBS/CBS) e otimize seus preços.",
  metadataBase: new URL("https://precificapp.com"),
  keywords: [
    "precificação",
    "formação de preços",
    "cálculo de impostos",
    "reforma tributária",
    "gestão de custos",
    "margem de lucro",
    "sistema de precificação",
    "tributação empresarial",
    "ibs",
    "cbs",
    "inteligência tributária",
    "precificação automática",
    "gestão financeira",
    "markup",
    "dre",
  ],
  authors: [{ name: "Grupo Viriato", url: "https://viriato.com.br/" }],
  applicationName: "Precific",
  publisher: "Grupo Viriato",
  category: "Business Software",
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
    google: "7V6UhSUMH_29t_gDjX5_MR_Wo86jwLj9TT2HjaTYwOo",
    // bing: "key",
  },
  openGraph: {
    type: "website",
    locale: "pt-BR",
    siteName: "Precific",
    title: "Precific",
    description:
      "Sistema de precificação e gestão tributária. Automatize cálculos e simule a Reforma Tributária.",
    url: "https://precificapp.com",
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Precific",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precific",
    description:
      "Sistema de precificação e gestão tributária. Automatize cálculos e simule a Reforma Tributária.",
    images: ["/opengraph-image.webp"],
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
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${poppins.className} antialiased bg-background`}
        suppressHydrationWarning
      >
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(OrganizationJsonLd),
          }}
        />
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
        <AtlasLinkBalloon />
        <WhatsAppHelpLinkBalloon />
      </body>
    </html>
  );
}
