"use client";

import { Card } from "@/src/components/core";
import Column from "@/src/components/core/column";
import RecoveryPasswordForm from "./recovery-password-form";

const RecoveryPasswordCard = () => {
  return (
    <Card className="rounded-2xl p-6 border border-[#461853] shadow-sm max-w-125 w-full max-h-125 flex justify-center bg-[#461853]/30">
      <Column className="space-y-1">
        <h2 className="font-bold text-white text-2xl">Redefinir Senha</h2>
        <div className="h-2 w-1/3 rounded-full bg-gradient-to-r from-[#750085] via-[#8D287F] to-[#6F27FF]" />
        <h3 className="font-semibold text-white text-sm">
          Recupere seu acesso ao sistema Precific
        </h3>
      </Column>
      <RecoveryPasswordForm />
    </Card>
  );
};

export default RecoveryPasswordCard;
