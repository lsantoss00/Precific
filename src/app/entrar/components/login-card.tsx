"use client";

import { Card } from "@/src/components/core";
import Image from "next/image";
import LoginForm from "./login-form";

const LoginCard = () => {
  return (
    <Card className="rounded-2xl p-6 shadow-sm w-full max-w-125 max-h-125 flex justify-center bg-white/60">
      <Image
        src="/precific-logo.png"
        alt="precific-logo"
        width={300}
        height={100}
        className="flex self-center"
      />
      <LoginForm />
    </Card>
  );
};

export default LoginCard;
