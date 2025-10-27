"use client";

import { Card } from "@/src/components/core";
import Image from "next/image";
import { Suspense } from "react";
import RecoveryPasswordForm from "./recovery-password-form";

const RecoveryPasswordCard = () => {
  return (
    <Card className="rounded-2xl p-6 border shadow-sm max-w-125 w-full max-h-125 flex justify-center bg-white">
      <Image
        src="/precific-logo-image.webp"
        alt="precific-logo-image"
        width={300}
        height={100}
        className="flex self-center"
      />
      <Suspense>
        <RecoveryPasswordForm />
      </Suspense>
    </Card>
  );
};

export default RecoveryPasswordCard;
