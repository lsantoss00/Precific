import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppSidebar } from "../components/app-sidebar";
import { Toaster } from "../components/core/sonner";
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
        className={`${inter.className} antialiased bg-[url('/app-background-image.svg')] bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <Providers>
          <AppSidebar />
          <main className="min-h-screen mr-7 my-7 w-full flex">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
