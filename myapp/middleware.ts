import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
   
    const token = req.nextauth.token;
    
    if (token?.role === "USER" &&  req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(
        new URL("/user", req.url)
      )
    }
    if (token?.role === "ADMIN" && req.nextUrl.pathname.startsWith("/user")) {
      return NextResponse.redirect(
        new URL("/admin", req.url)
      )
    }
  }
)

export const config = { matcher: ["/user/:path*", "/admin/:path*"] }