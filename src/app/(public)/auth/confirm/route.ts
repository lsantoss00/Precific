import { createServer } from "@/src/libs/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.search = "";

  if (token_hash && type) {
    const supabase = await createServer();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }

    // Se deu erro no verifyOtp, redireciona para página de erro
    console.error("Erro ao verificar OTP:", error);
  }

  // Se não tem token_hash/type OU se verifyOtp falhou
  const errorUrl = request.nextUrl.clone();
  errorUrl.pathname = "/auth/error";
  return NextResponse.redirect(errorUrl);
}
