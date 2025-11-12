import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/entrar", "/criar-senha", "/redefinir-senha", "/auth"];

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasErrorParam = request.nextUrl.searchParams.has("error");
  const isRecoveryFlow =
    request.nextUrl.searchParams.get("type") === "recovery";
  const isInviteFlow = request.nextUrl.searchParams.get("type") === "invite";
  const cookieRecovery = request.cookies.get("recovery_mode")?.value === "true";
  const cookieInvite = request.cookies.get("invite_mode")?.value === "true";

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isRecoveryFlow) {
    supabaseResponse.cookies.set("recovery_mode", "true", {
      sameSite: "lax",
      path: "/",
    });
  }

  if (isInviteFlow) {
    supabaseResponse.cookies.set("invite_mode", "true", {
      sameSite: "lax",
      path: "/",
    });
  }

  if (
    user &&
    (isRecoveryFlow || isInviteFlow || cookieRecovery || cookieInvite) &&
    pathname !== "/criar-senha"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/criar-senha";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/entrar";
    return NextResponse.redirect(url);
  }

  if (
    user &&
    (pathname === "/entrar" ||
      pathname === "/redefinir-senha" ||
      pathname === "/")
  ) {
    if (pathname === "/redefinir-senha" && hasErrorParam) {
      return supabaseResponse;
    }
    const url = request.nextUrl.clone();
    url.pathname = "/produtos";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
