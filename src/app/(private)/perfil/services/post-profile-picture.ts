import { createClient } from "@/src/libs/supabase/client";
import { compressImage } from "@/src/utils/compress-image";

interface PostProfilePictureProps {
  file: File | null;
  userId: string;
  currentProfilePictureUrl?: string | null;
}

export async function postProfilePicture({
  file,
  userId,
}: PostProfilePictureProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Usuário não autenticado");

  const { data: oldFiles } = await supabase.storage
    .from("profile-pictures")
    .list(userId);

  if (oldFiles && oldFiles.length > 0) {
    const filesToRemove = oldFiles.map((f) => `${userId}/${f.name}`);
    await supabase.storage.from("profile-pictures").remove(filesToRemove);
  }

  if (!file) {
    await supabase
      .from("profiles")
      .update({ profile_picture_url: null })
      .eq("id", userId);
    return;
  }

  try {
    const compressedFile = await compressImage(file);

    const fileName = `avatar-${Date.now()}.webp`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, compressedFile, {
        contentType: "image/webp",
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ profile_picture_url: filePath })
      .eq("id", userId);

    if (updateError) throw updateError;
  } catch (error) {
    throw error;
  }
}
