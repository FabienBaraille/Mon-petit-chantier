import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  
  const token = await getToken({ req: request, secret: process.env.SECRET });

  console.log('middleware', token);
  

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  switch (token.name) {
    case "ADMIN":
      if (request.nextUrl.pathname.startsWith("/user")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    case "USER":
      if (request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/user", request.url));
      }
    default:
      return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ]
}