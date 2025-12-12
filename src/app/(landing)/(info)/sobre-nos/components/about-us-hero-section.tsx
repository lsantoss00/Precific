import backgroundSectionImage from "@/public/images/hero-section-background.webp";
import people1 from "@/public/images/people-1.webp";
import people2 from "@/public/images/people-2.webp";
import people3 from "@/public/images/people-3.webp";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import { Sparkle } from "lucide-react";
import Image from "next/image";

const AboutUsHeroSection = () => {
  return (
    <Flex className="relative bg-primary w-full h-[calc(100vh-80px)] py-20 md:py-24 xl:py-0 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25 flex-col xl:flex-row items-center justify-between">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundSectionImage.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <Column className="max-w-170 z-10 gap-4">
        <Column className="gap-3 col-3 max-w-lg">
          <Sparkle className="text-secondary" />
          <p className="text-zinc-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            iaculis tempus sapien, vitae suscipit nisl consectetur nec.
          </p>
        </Column>
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl text-white leading-tight">
          Nós{" "}
          <span className="relative inline-block">
            impulsionamos
            <div className="absolute bottom-1 left-4 h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10" />
          </span>{" "}
          empresas há mais <br /> de{" "}
          <span className="relative inline-block">
            40 anos.
            <div className="absolute bottom-1 left-4 h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10" />
          </span>{" "}
        </h1>
      </Column>

      <Column className="justify-center items-center h-full">
        <div className="w-150 h-150 relative mr-14">
          <Image
            src={people1}
            alt="Funcionário Grupo Viriato"
            fill
            priority
            className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full shadow-2xl"
          />
          <Image
            src={people2}
            alt="Funcionário Grupo Viriato"
            width={320}
            height={320}
            priority
            className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full absolute -bottom-10 -right-13.5 w-80 h-80 shadow-2xl"
          />
          <Image
            src={people3}
            alt="Funcionário Grupo Viriato"
            width={160}
            height={160}
            priority
            className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full absolute -bottom-20 left-48 w-40 h-40 shadow-2xl"
          />
        </div>
      </Column>
    </Flex>
  );
};
export default AboutUsHeroSection;
