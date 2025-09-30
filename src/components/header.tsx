"use client";

import Link from "next/link";
import { useAuth } from "../hooks/use-auth";
import Row from "./core/row";
import Menu from "./menu";

const Header = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="w-full bg-black/60 h-20 text-white p-4 fixed top-0 left-0 z-10">
      <Row className="max-w-5xl h-full mx-auto my-auto justify-between items-center">
        <Link href="/">
          <h1 className="text-lg font-bold text-yellow-500">Precific</h1>
        </Link>
        <Menu />
      </Row>
    </header>
  );
};

export default Header;
