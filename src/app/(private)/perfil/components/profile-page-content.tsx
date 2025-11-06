"use client";

import CompanyData from "@/src/app/(private)/perfil/components/company-data";
import UserData from "@/src/app/(private)/perfil/components/user-data";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import { useAuth } from "@/src/providers/auth-provider";
import { Loader2 } from "lucide-react";

const ProfilePageContent = () => {
  const { isLoadingAuth } = useAuth();

  return (
    <Column className="w-full py-8 px-6 xl:px-0 space-y-3 max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px]">
      <Show
        when={!isLoadingAuth}
        fallback={
          <Loader2 className="text-[#66289B] animate-spin m-auto w-10 h-10" />
        }
      >
        <h2 className="text-3xl text-black font-bold">Perfil</h2>
        <Flex className="flex flex-col lg:flex-row w-full flex-1 gap-4">
          <UserData />
          <CompanyData />
        </Flex>
      </Show>
    </Column>
  );
};

export default ProfilePageContent;
