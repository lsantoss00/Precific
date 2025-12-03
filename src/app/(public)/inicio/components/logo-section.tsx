import logoImage from "@/public/precific-logo-image.webp";
import Row from "@/src/components/core/row";
import Image from "next/image";

const LogoSection = () => {
  return (
    <Row className="w-full h-75 items-center justify-center bg-white">
      <Image
        src={logoImage}
        alt="precific-logo-image"
        width={800}
        height={225}
        quality={100}
      />
    </Row>
  );
};
export default LogoSection;
