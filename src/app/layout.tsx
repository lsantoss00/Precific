import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppHeader } from "../components/app-header";
import { AppSidebar } from "../components/app-sidebar";
import { SidebarInset } from "../components/core/sidebar";
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
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <AppSidebar />
          <SidebarInset className="bg-[url('/app-background-image.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
            <AppHeader />
            <main className="flex-1 overflow-auto w-full flex justify-center">
              {children}
            </main>
          </SidebarInset>
          <Toaster position="top-center" />
        </Providers>
        <WhatsAppHelpLink />
      </body>
    </html>
  );
}
