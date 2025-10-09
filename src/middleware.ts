import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicRoutes = ["/entrar", "/redefinir-senha", "/criar-nova-senha"];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname === route);
}

function isPrivateRoute(pathname: string): boolean {
  return pathname.startsWith("/produtos");
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  if (pathname === "/" && !session) {
    return NextResponse.redirect(new URL("/entrar", req.url));
  }

  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/produtos", req.url));
  }

  if (isPrivateRoute(pathname) && !session) {
    const redirectUrl = new URL("/entrar", req.url);
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (session && pathname === "/entrar") {
    return NextResponse.redirect(new URL("/produtos", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
