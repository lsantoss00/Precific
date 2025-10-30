"use client";

import CompanyForm from "@/src/app/(private)/meu-perfil/components/company-form";
import { logout } from "@/src/app/(public)/entrar/services/logout";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/core";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const CompanyFormDialog = () => {
  const { hasCompany } = useAuth();
  const router = useRouter();

  const { mutate: doLogout, isPending: pendingDoLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => router.push("/entrar"),
  });

  const handleOpenChange = (open: boolean) => {
    if (!hasCompany && !open) return;
  };

  if (hasCompany) return null;

  return (
    <Dialog open={true} onOpenChange={handleOpenChange} modal>
      <DialogContent showCloseButton={false} className="w-full !max-w-xs">
        <DialogHeader className="flex flex-row items-center justify-center">
          <DialogTitle>Cadastro de empresa</DialogTitle>
          {/* TO-DO: Adicionar um tooltip para explicar o porquê o cadastro da empresa é obrigatório */}
        </DialogHeader>
        <CompanyForm />
        <Button
          type="button"
          variant="link"
          className="text-red-500"
          onClick={() => doLogout()}
          disabled={pendingDoLogout}
        >
          Sair
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyFormDialog;
