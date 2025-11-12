import LoginForm from "@/src/app/(public)/entrar/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar | Precific",
};

export default function LoginPage() {
  return <LoginForm />;
}
