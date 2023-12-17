import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const frontendRoutes = {
    home: "/",
    signin: "/signin",
    signup: "/signup",
  };

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    if (path == frontendRoutes.home)
      return NextResponse.redirect(new URL(frontendRoutes.signin, req.url));
    else if (path.startsWith("/api") && !path.endsWith("/user"))
      return NextResponse.json(
        { message: "Invalid authentication" },
        { status: 403 }
      );
  } else if (
    session &&
    session.subscribeStatus == "unfinished" &&
    path != frontendRoutes.signup
  ) {
    return NextResponse.redirect(new URL(frontendRoutes.signup, req.url));
  } else if (
    session &&
    (session.subscribeStatus == "active" ||
      session.subscribeStatus == "trialing") &&
    path != frontendRoutes.home
  ) {
    return NextResponse.redirect(new URL(frontendRoutes.home, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/api", "/signup", "/signin"],
};
