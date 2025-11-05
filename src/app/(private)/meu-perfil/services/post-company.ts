import { CompanyType } from "@/src/app/(private)/meu-perfil/types/company-type";
import { createClient } from "@/src/libs/supabase/client";

interface PostCompanyProps {
  company: CompanyType;
}

export async function postCompany({ company }: PostCompanyProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { error } = await supabase.from("companies").insert(company).select();

  if (error) throw error;

  return;
}
