"use client";

import Column from "@/src/components/core/column";
import Image from "next/image";

const PageInConstruction = () => {
  return (
    <Column className="gap-10 m-auto">
      <Image
        src="/page-in-construction-image.webp"
        alt="Página em construção"
        width={500}
        height={500}
        className="flex self-center"
      />
      <Column className="gap-2">
        <span className="text-2xl md:text-4xl font-medium text-center">
          Ops... Página em construção!
        </span>
        <p className="text-xs md:text-sm text-center">
          A página que você está tentando acessar ainda está em construção...
          novidades em breve :)
        </p>
      </Column>
    </Column>
  );
};

export default PageInConstruction;
