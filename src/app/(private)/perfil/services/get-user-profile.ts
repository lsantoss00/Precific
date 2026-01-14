import { ProfileType } from "@/src/app/(private)/perfil/types/profile-type";
import { createClient } from "@/src/libs/supabase/client";
import { User } from "@supabase/supabase-js";

interface GetUserProfileProps {
  userId: User["id"];
}

export async function getUserProfile({
  userId,
}: GetUserProfileProps): Promise<ProfileType> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  if (data?.profile_picture_url) {
    const isSignedUrl = data.profile_picture_url.includes("?token=");

    if (!isSignedUrl) {
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from("profile-pictures")
          .createSignedUrl(data.profile_picture_url, 3600);

      if (signedUrlData && !signedUrlError) {
        data.profile_picture_url = signedUrlData.signedUrl;
      }
    }
  }

  return data;
}
