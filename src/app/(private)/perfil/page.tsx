import ProfilePageContent from "@/src/app/(private)/perfil/components/profile-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <ProfilePageContent />;
}
