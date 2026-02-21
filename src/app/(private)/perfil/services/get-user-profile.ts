import { ProfileType } from "@/src/app/(private)/perfil/types/profile-type";
import { createClient } from "@/src/libs/supabase/client";
import { User } from "@supabase/supabase-js";
import { camelizeKeys } from "humps";

interface GetUserProfileProps {
  userId: User["id"];
}

export async function getUserProfile({
  userId,
}: GetUserProfileProps): Promise<ProfileType> {
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  const data = camelizeKeys(profile) as ProfileType;

  if (data?.profilePictureUrl) {
    const isSignedUrl = data.profilePictureUrl.includes("?token=");

    if (!isSignedUrl) {
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from("profile-pictures")
          .createSignedUrl(data.profilePictureUrl, 86400, {});

      if (signedUrlData && !signedUrlError) {
        data.profilePictureUrl = signedUrlData.signedUrl;
      }
    }
  }

  return data;
}
