import PasswordForm from "@/src/app/(public)/criar-senha/components/password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Senha",
};

export default function CreateNewPasswordPage() {
  return <PasswordForm />;
}
