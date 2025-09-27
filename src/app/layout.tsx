import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "../components/core/sonner";
import Providers from "../providers";
import "./globals.css";

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
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <main className="min-h-screen w-full flex">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
