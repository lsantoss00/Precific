import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "../components/core/sonner";
import Header from "../components/header";
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
          <Header />
          <main className="min-h-screen w-full flex">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
