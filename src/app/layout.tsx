import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppHeader } from "../components/app-header";
import { AppSidebar } from "../components/app-sidebar";
import { SidebarTrigger } from "../components/core";
import { Toaster } from "../components/core/sonner";
import WhatsAppHelpLink from "../components/whatsapp-help-link";
import Providers from "../providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${poppins.className} antialiased bg-[url('/app-background-image.webp')] bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <Providers>
          <AppHeader />
          <AppSidebar />
          <SidebarTrigger className="max-md:hidden" />
          <main className="min-h-screen w-full flex justify-center">
            {children}
          </main>
          <Toaster position="top-center" />
        </Providers>
        <WhatsAppHelpLink />
      </body>
    </html>
  );
}
