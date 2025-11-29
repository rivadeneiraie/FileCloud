import { NextRequest, NextResponse } from "next/server";

let locales = ['en', 'es'];

function getLocale() { return 'es'; }

export function proxy(request: NextRequest) {

  const locale = getLocale();

  // Handle locale in the URL

  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (!pathnameHasLocale) {
    
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
  } 

  // Redirect to login if accessing protected routes without a token

  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/home","/public"];

  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.endsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next).*)',],
};
