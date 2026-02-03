import { CompanyType } from "@/src/app/(private)/perfil/types/company-type";
import { createClient } from "@/src/libs/supabase/client";
import { decamelizeKeys } from "humps";

interface PostCompanyProps {
  company: Partial<CompanyType>;
}

export async function postCompany({ company }: PostCompanyProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const data = decamelizeKeys(company);

  const { error } = await supabase.from("companies").insert(data).select();

  if (error) throw error;

  return;
}
