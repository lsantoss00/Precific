import { createClient } from "@/src/libs/supabase/client";
import { decamelizeKeys } from "humps";
import { LeadType } from "../types/lead-type";

interface PostLeadProps {
  lead: LeadType & { recaptcha: string };
}

export async function postLead({ lead }: PostLeadProps) {
  const supabase = createClient();

  const leadData = decamelizeKeys(lead);

  const { data, error } = await supabase.functions.invoke("submit-lead", {
    body: {
      ...leadData,
      recaptcha: lead.recaptcha,
    },
  });

  if (error) throw new Error(error.message || "Erro ao processar lead");

  return data;
}
