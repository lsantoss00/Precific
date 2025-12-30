"use client";

import CompanyData from "@/src/app/(private)/perfil/components/company-data";
import CompanySubscriptionData from "@/src/app/(private)/perfil/components/company-subscription-data";
import UserData from "@/src/app/(private)/perfil/components/user-data";
import { postProfilePicture } from "@/src/app/(private)/perfil/services/post-profile-picture";
import { Button, Container } from "@/src/components/core";
import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useAuth } from "@/src/providers/auth-provider";
import { supabaseErrorsTranslator } from "@/src/utils/supabase-errors-translator";
import { useMutation } from "@tanstack/react-query";
import { Check, Loader2, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProfilePageContent = () => {
  const { isLoadingAuth, profile } = useAuth();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const handleImageChange = (file: File | null) => {
    setSelectedFile(file);

    if (file === null && profile?.profile_picture_url) {
      setIsImageRemoved(true);
    } else {
      setIsImageRemoved(false);
    }
  };

  const { mutate: updateProfilePicture, isPending: isSaving } = useMutation({
    mutationFn: postProfilePicture,
    onSuccess: async () => {
      await queryClient?.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Foto de perfil atualizada com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
      setSelectedFile(null);
      setIsImageRemoved(false);
    },
    onError: (error: Error) => {
      toast.error(supabaseErrorsTranslator(error.message), {
        className: "!bg-red-600 !text-white",
      });
    },
  });

  const handleUpdateProfilePicture = () => {
    updateProfilePicture({
      file: selectedFile,
      userId: profile.id,
      currentProfilePictureUrl: profile?.profile_picture_url || null,
    });
  };

  const hasChanges = selectedFile !== null || isImageRemoved;

  return (
    <Container variant="page">
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
          <UserData onImageChange={handleImageChange} />
          <Flex className="flex-col w-full h-full gap-4">
            <CompanySubscriptionData />
            <CompanyData />
          </Flex>
        </Flex>
        <Button
          className="w-full md:w-40 h-12 self-end"
          onClick={handleUpdateProfilePicture}
          disabled={isSaving || !hasChanges}
        >
          <Show
            when={!isSaving}
            fallback={<Loader2Icon className="animate-spin" />}
          >
            <Check />
          </Show>
          Salvar
        </Button>
      </Show>
    </Container>
  );
};

export default ProfilePageContent;
