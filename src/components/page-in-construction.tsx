"use client";

import pageInConstructionImage from "@/public/images/page-in-construction-image.webp";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Image from "next/image";

const PageInConstruction = () => {
  return (
    <Column
      as="article"
      className="gap-10 m-auto"
      aria-label="Página em construção"
    >
      <Flex as="figure" className="self-center">
        <Image
          src={pageInConstructionImage}
          alt="Página em construção"
          width={500}
          height={500}
          loading="lazy"
          aria-hidden="true"
        />
      </Flex>
      <Column as="header" className="gap-2">
        <h1 className="text-2xl md:text-4xl font-medium text-center">
          Ops... Página em construção!
        </h1>
        <p className="text-xs md:text-sm text-center">
          A página que você está tentando acessar ainda está em construção...
          novidades em breve <span aria-label="emoji sorrindo">:)</span>
        </p>
      </Column>
    </Column>
  );
};

export default PageInConstruction;
