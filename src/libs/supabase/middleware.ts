import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/entrar",
  "/criar-nova-senha",
  "/redefinir-senha",
  "/auth",
];

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasErrorParam = request.nextUrl.searchParams.has("error");

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
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

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/entrar";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (user) {
    if (pathname === "/entrar" || pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/produtos";
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/redefinir-senha")) {
      if (!hasErrorParam) {
        const url = request.nextUrl.clone();
        url.pathname = "/produtos";
        url.search = "";
        return NextResponse.redirect(url);
      }
      return supabaseResponse;
    }
  }

  return supabaseResponse;
}
