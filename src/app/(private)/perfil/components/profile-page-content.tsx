"use client";

import CompanyData from "@/src/app/(private)/perfil/components/company-data";
import UserData from "@/src/app/(private)/perfil/components/user-data";
import { Container } from "@/src/components/core";
import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import { useAuth } from "@/src/providers/auth-provider";
import { Loader2 } from "lucide-react";

const ProfilePageContent = () => {
  const { isLoadingAuth } = useAuth();

  return (
    <Container
      variant="page"
      className="max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] space-y-3"
    >
      <Show
        when={!isLoadingAuth}
        fallback={
          <Loader2
            className="text-primary animate-spin m-auto w-10 h-10"
            aria-label="Carregando perfil"
          />
        }
      >
        <h1 className="text-3xl text-black font-bold">Perfil</h1>
        <Flex
          className="flex-col lg:flex-row w-full flex-1 gap-4"
          aria-label="Informações do perfil"
        >
          <UserData />
          <CompanyData />
        </Flex>
      </Show>
    </Container>
  );
};

export default ProfilePageContent;
