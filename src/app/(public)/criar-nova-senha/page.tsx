import NewPasswordForm from "@/src/app/(public)/criar-nova-senha/components/new-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Senha | Precific",
};

export default function CreateNewPasswordPage() {
  return <NewPasswordForm />;
}
