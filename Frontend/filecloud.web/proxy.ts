import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/home"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home"],
};
