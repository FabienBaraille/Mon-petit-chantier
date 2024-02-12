import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function rbacMiddleware(req: NextRequest) {

  const token = await getToken({ req, secret: process.env.SECRET });

  // console.log(req.nextUrl.pathname);
  

  // switch (token?.role) {
  //   case "USER":

  //     if (req.nextUrl.pathname.match("/") || req.nextUrl.pathname.startsWith("/admin")) {
  //       return NextResponse.redirect(new URL("/user"), req.url)
  //     }
  //     break;
  //   case "ADMIN":
  //     if (req.nextUrl.pathname.match("/") || req.nextUrl.pathname.startsWith("/user")) {
  //       return NextResponse.redirect(new URL("/admin"), req.url)
  //     }
  //     break;
  //   default:
  //     break;
  // }
}