import logoImage from "@/public/precific-logo-image.webp";
import Flex from "@/src/components/core/flex";
import Image from "next/image";

const LogoSection = () => {
  return (
    <Flex className="w-full py-8 md:py-12 lg:py-16 lg:h-75 items-center justify-center bg-white px-4 sm:px-6 md:px-12">
      <Image
        src={logoImage}
        alt="precific-logo-image"
        width={800}
        height={225}
        quality={100}
        className="w-full max-w-sm md:max-w-md lg:max-w-2xl h-auto"
      />
    </Flex>
  );
};
export default LogoSection;
