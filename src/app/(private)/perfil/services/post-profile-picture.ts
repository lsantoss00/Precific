import { createClient } from "@/src/libs/supabase/client";

interface PostProfilePictureProps {
  file: File | null;
  userId: string;
  currentProfilePictureUrl?: string | null;
}

export async function postProfilePicture({
  file,
  userId,
  currentProfilePictureUrl,
}: PostProfilePictureProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  if (file) {
    const { data: oldFiles } = await supabase.storage
      .from("profile-pictures")
      .list(userId);

    if (oldFiles && oldFiles.length > 0) {
      const filesToRemove = oldFiles.map((f) => `${userId}/${f.name}`);
      await supabase.storage.from("profile-pictures").remove(filesToRemove);
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data: updateData, error: updateError } = await supabase
      .from("profiles")
      .update({ profile_picture_url: filePath })
      .eq("id", userId)
      .select();

    if (updateError) {
      throw new Error(`Erro ao atualizar perfil: ${updateError.message}`);
    }

    if (!updateData || updateData.length === 0) {
      throw new Error(
        "Nenhum registro foi atualizado. Verifique se o usuário existe e se as políticas RLS estão configuradas corretamente."
      );
    }

    return;
  }

  if (!file && currentProfilePictureUrl) {
    const { data: oldFiles } = await supabase.storage
      .from("profile-pictures")
      .list(userId);

    if (oldFiles && oldFiles.length > 0) {
      const filesToRemove = oldFiles.map((f) => `${userId}/${f.name}`);
      const { error: removeError } = await supabase.storage
        .from("profile-pictures")
        .remove(filesToRemove);

      if (removeError) throw removeError;
    }
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ profile_picture_url: null })
      .eq("id", userId);

    if (updateError) throw updateError;
  }
}
