import { createClient } from "@/src/libs/supabase/client";
import { LeadType } from "../types/lead-type";

interface PostLeadProps {
  lead: LeadType;
}

export async function postLead({ lead }: PostLeadProps) {
  const supabase = createClient();

  const leadData = {
    name: lead.name,
    cnpj: lead.cnpj,
    email: lead.email,
    phone: lead.phone,
    accept_marketing: lead.acceptMarketing,
  };

  const { error } = await supabase.from("leads").insert(leadData).single();

  if (error) throw error;

  return;
}
