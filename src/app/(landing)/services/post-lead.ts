import { createClient } from "@/src/libs/supabase/client";
import { decamelizeKeys } from "humps";
import { LeadType } from "../types/lead-type";

interface PostLeadProps {
  lead: LeadType;
}

export async function postLead({ lead }: PostLeadProps) {
  const supabase = createClient();

  const leadData = decamelizeKeys(lead);

  const { error } = await supabase.from("leads").insert(leadData).single();

  if (error) throw error;

  return;
}
