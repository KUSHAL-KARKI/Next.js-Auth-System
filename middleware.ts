import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const url = request.nextUrl;
  const cookieToken = request.cookies.get("token")?.value || "";

  const isPublicPath = path === "/" ||
    path === "/login" || path === "/signup" || path === "/forgotpassword";

  // Token-based pages
  const isResetPath = path.startsWith("/resetpassword");
  const isVerifyPath = path.startsWith("/verifyemail");

  // Check query param "token"
  const hasQueryToken = url.searchParams.has("token");

  // Logged-in user should not see public pages
  if ((path === "/login" || path === "/signup" || path === "/forgotpassword") && cookieToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Not logged in → block protected routes
  if (!isPublicPath && !cookieToken && !isResetPath && !isVerifyPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Reset or verify page must have ?token=
  if ((isResetPath || isVerifyPath) && !hasQueryToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/admin",
    "/login",
    "/signup",
    "/forgotpassword",
    "/resetpassword/:path*",
    "/verifyemail/:path*",
  ],
};
