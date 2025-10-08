import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppHeader } from "../components/app-header";
import { AppSidebar } from "../components/app-sidebar";
import { SidebarTrigger } from "../components/core";
import { Toaster } from "../components/core/sonner";
import WhatsAppHelpLink from "../components/whatsapp-help-link";
import Providers from "../providers";
import "./globals.css";

// TO-DO: change to Poppins
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Precific",
  description: "Precificação de produtos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased bg-[url('/app-background-image.webp')] bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <Providers>
          <AppHeader />
          <AppSidebar />
          {/* TO-DO: trigger criando scroll na pagina */}
          <SidebarTrigger />
          <main className="min-h-screen w-full flex">{children}</main>
          <Toaster position="top-center" />
        </Providers>
        <WhatsAppHelpLink />
      </body>
    </html>
  );
}
