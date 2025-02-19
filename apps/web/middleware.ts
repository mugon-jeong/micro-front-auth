import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@workspace/common/auth";

const intlMiddleware = createMiddleware(routing);
export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (!req.auth && pathname !== "/auth/signin") {
    return Response.redirect(new URL("/auth/signin", req.nextUrl.origin));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
