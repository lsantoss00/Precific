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
  subsets: ["latin", "latin-ext"],
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
          <SidebarInset className="flex flex-col min-h-screen h-full bg-[url('/app-background-image.webp')] bg-cover bg-center bg-no-repeat">
            <AppHeader />
            <main className="flex flex-1 w-full min-h-full justify-center">
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
