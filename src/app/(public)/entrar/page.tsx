import LoginForm from "@/src/app/(public)/entrar/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Faça login na sua conta Precific e acesse ferramentas de precificação inteligente, gestão de custos e simulação tributária.",
  alternates: {
    canonical: "https://www.precificapp.com/entrar",
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
