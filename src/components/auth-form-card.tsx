import { Card } from "@/src/components/core";
import Image from "next/image";

interface AuthFormCardProps {
  children: React.ReactNode;
}

const AuthFormCard = ({ children }: AuthFormCardProps) => {
  return (
    <Card className="rounded-2xl p-6 shadow-sm w-full max-w-125 max-h-125 flex items-center bg-white">
      <Image
        src="/precific-logo-image.webp"
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
