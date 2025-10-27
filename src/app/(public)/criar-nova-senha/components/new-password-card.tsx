"use client";

import { Card } from "@/src/components/core";
import Image from "next/image";
import NewPasswordForm from "./new-password-form";

const NewPasswordCard = () => {
  return (
    <Card className="rounded-2xl p-6 shadow-sm w-full max-w-125 max-h-125 flex justify-center bg-white">
      <Image
        src="/precific-logo-image.webp"
        alt="precific-logo-image"
        width={300}
        height={100}
        className="flex self-center"
      />
      <NewPasswordForm />
    </Card>
  );
};

export default NewPasswordCard;
