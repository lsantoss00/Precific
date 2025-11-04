import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "../components/core/sonner";
import WhatsAppHelpLink from "../components/whatsapp-help-link";
import Providers from "../providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Precific",
  description: "Precificação de Produtos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} antialiased`}
        style={{
          backgroundImage: "url('/app-background-image.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
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
