import { createClient } from "@/src/libs/supabase/client";

interface GetCompanySubscriptionStatusParams {
  companyId: string;
}

export async function getCompanySubscriptionStatus({
  companyId,
}: GetCompanySubscriptionStatusParams) {
  const supabase = createClient();

  const { data: subscription, error } = await supabase
    .from("company_subscriptions")
    .select("id, status, expires_at")
    .eq("company_id", companyId)
    .eq("status", "active")
    .order("expires_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar assinatura da empresa:", error);
    return {
      hasActiveSubscription: false,
      expiresAt: null,
    };
  }

  const isActive = subscription
    ? new Date(subscription.expires_at) > new Date()
    : false;

  return {
    hasActiveSubscription: isActive,
    expiresAt: subscription?.expires_at ?? null,
  };
}
