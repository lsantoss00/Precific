import logoImage from "@/public/images/precific-logo-image.webp";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Flex from "@/src/components/core/flex";
import Image from "next/image";

const LogoSection = () => {
  return (
    <Flex
      as="section"
      className="w-full py-8 md:py-12 xl:py-12 2xl:py-16 xl:min-h-72 2xl:h-75 items-center justify-center bg-white px-4 sm:px-6 md:px-12 lg:px-16"
      aria-label="Logo Precific"
    >
      <FadeInOnScroll as="figure" direction="none" duration={0.8}>
        <Image
          src={logoImage}
          alt="Precific – Plataforma de precificação inteligente"
          width={800}
          height={225}
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 448px, (max-width: 1280px) 576px, 672px"
          loading="lazy"
        />
      </FadeInOnScroll>
    </Flex>
  );
};
export default LogoSection;
