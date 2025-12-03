import shortLogoImage from "@/public/precific-short-logo-image.webp";
import { Button } from "@/src/components/core";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-25 py-4 h-20 bg-white border-b border-zinc-200">
      <nav className="flex items-center space-x-8">
        <Link href="/inicio">
          <Image
            src={shortLogoImage}
            alt="Precific Logo"
            width={48}
            height={48}
            quality={100}
            priority
            className="hover:scale-105 transition-transform duration-200"
          />
        </Link>
        <ul className="flex items-center space-x-8">
          <li>
            <Link
              href="#descubra"
              className="text-zinc-800 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-primary"
            >
              Descubra
            </Link>
          </li>
          <li>
            <Link
              href="#contato"
              className="text-zinc-800 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-primary"
            >
              Converse conosco
            </Link>
          </li>
        </ul>
      </nav>
      <Button
        asChild
        className="w-fit h-12 px-6 hover:cursor-pointer font-medium"
        variant="secondary"
      >
        <Link href="/entrar">Login</Link>
      </Button>
    </header>
  );
};

export default Header;
