import { CompanyType } from "@/src/app/(private)/perfil/types/company-type";
import { createClient } from "@/src/libs/supabase/client";

interface GetCompanyByIdProps {
  companyId: string;
}

export async function getCompanyById({
  companyId,
}: GetCompanyByIdProps): Promise<CompanyType> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", companyId)
    .single();

  if (error) throw error;

  return data;
}
