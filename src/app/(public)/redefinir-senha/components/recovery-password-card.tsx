"use client";

import { Card } from "@/src/components/core";
import { createClient } from "@/src/libs/supabase/client";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import RecoveryPasswordForm from "./recovery-password-form";

const RecoveryPasswordCard = () => {
  useEffect(() => {
    const doLogout = async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
    };
    doLogout();
  }, []);

  return (
    <Card className="rounded-2xl p-6 border shadow-sm max-w-125 w-full max-h-125 flex justify-center bg-white">
      <Image
        src="/precific-logo.png"
        alt="precific-logo"
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
