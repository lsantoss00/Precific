import logoImage from "@/public/images/precific-logo-image.webp";
import { Card } from "@/src/components/core";
import Flex from "@/src/components/core/flex";
import Image from "next/image";

interface AuthFormCardProps {
  children: React.ReactNode;
}

const AuthFormCard = ({ children }: AuthFormCardProps) => {
  return (
    <Card
      as="article"
      className="rounded-2xl p-6 mx-2 shadow-sm w-full max-w-125 items-center bg-white"
    >
      <Flex as="figure" className="mb-10">
        <Image
          src={logoImage}
          alt="Logo do Precific"
          width={300}
          height={80}
          priority
        />
      </Flex>
      {children}
    </Card>
  );
};

export default AuthFormCard;
