import notFoundImage from "@/public/404-image.webp";
import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "404",
  description: "A página que você está tentando acessar não existe.",
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={poppins.className}>
      <body className="antialiased bg-background min-h-screen flex flex-col items-center justify-center space-y-4 m-4">
        <Column className="gap-10">
          <Image
            src={notFoundImage}
            alt="Erro 404"
            width={500}
            height={500}
            className="flex self-center"
          />
          <Column className="gap-2">
            <span className="text-2xl md:text-4xl font-medium text-center">
              Página não encontrada
            </span>
            <p className="text-xs md:text-sm text-center">
              A página que você está tentando acessar não existe :(
            </p>
          </Column>
        </Column>
        <Link href="/produtos">
          <Button
            className="cursor-pointer h-12"
            variant="secondary"
            type="button"
          >
            <ArrowLeft />
            Voltar para o Precific
          </Button>
        </Link>
      </body>
    </html>
  );
}
