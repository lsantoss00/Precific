import logoImage from "@/public/images/precific-logo-image.webp";
import { Card } from "@/src/components/core";
import Image from "next/image";

interface AuthFormCardProps {
  children: React.ReactNode;
}

const AuthFormCard = ({ children }: AuthFormCardProps) => {
  return (
    <Card className="rounded-2xl p-6 mx-2 shadow-sm w-full max-w-125 flex flex-col items-center bg-white">
      <Image
        src={logoImage}
        alt="precific-logo-image"
        width={300}
        height={80}
        className="mb-10"
        priority
      />
      {children}
    </Card>
  );
};

export default AuthFormCard;
