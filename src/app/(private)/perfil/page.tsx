import ProfilePageContent from "@/src/app/(private)/perfil/components/profile-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil",
  description:
    "Gerencie suas informações pessoais e configurações de perfil. Atualize seus dados cadastrais e preferências do sistema.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <ProfilePageContent />;
}
