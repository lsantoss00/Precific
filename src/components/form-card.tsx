import { Card } from "@/src/components/core";
import Image from "next/image";

interface FormCardProps {
  children: React.ReactNode;
  hasLogo?: boolean;
}

const FormCard = ({ children, hasLogo = false }: FormCardProps) => {
  return (
    <Card className="rounded-2xl p-6 shadow-sm w-full max-w-125 max-h-125 flex justify-center bg-white">
      {hasLogo && (
        <Image
          src="/precific-logo-image.webp"
          alt="precific-logo-image"
          width={300}
          height={100}
          className="flex self-center mb-10"
        />
      )}
      {children}
    </Card>
  );
};

export default FormCard;
