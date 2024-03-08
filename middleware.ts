import * as jose from "jose";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const path = req.nextUrl.pathname;
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session && path == "/") {
      throw new Error("No Authentication");
    }
    if (session) {
      const payload = await jose.jwtVerify(
        session?.jwt!,
        new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
      );
    }

    if (session && path == "/signin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    // Redirects to the login page on failed authentication
    console.log(error);
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}
