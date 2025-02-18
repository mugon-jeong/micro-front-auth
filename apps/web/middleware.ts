import { fallbackLng, locales } from "@workspace/common/localization/settings";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@workspace/common/auth";
import acceptLanguage from "accept-language";

acceptLanguage.languages(Array.from(locales));

/** ✅ 요청에서 현재 언어(locale) 가져오기 */
const getLocaleFromPathname = (req: NextRequest) => {
  let lng;
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) {
    const pathname = req.nextUrl.pathname;
    lng = locales.find(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );
  }
  return lng || fallbackLng; // 매칭된 로케일 없으면 기본 로케일 반환
};

/** ✅ i18n 미들웨어 */
const i18nMiddleware = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // 기본 로케일 제거 (e.g. `/en/about` → `/about`)
  if (
    pathname.startsWith(`/${fallbackLng}/`) ||
    pathname === `/${fallbackLng}`
  ) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${fallbackLng}`,
          pathname === `/${fallbackLng}` ? "/" : "",
        ),
        req.url,
      ),
    );
  }

  // 경로에 로케일이 포함되지 않은 경우 기본 로케일 추가 (`/about` → `/ko/about`)
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(new URL(`/${fallbackLng}${pathname}`, req.url));
  }

  return undefined; // 변경 사항 없으면 그대로 진행
};

export default auth((req) => {
  const locale = getLocaleFromPathname(req); // 현재 언어 가져오기
  // ✅ 인증되지 않은 사용자를 언어별 로그인 페이지로 리디렉트
  if (
    !req.auth &&
    req.nextUrl.pathname !== `/${locale}/auth/signin` &&
    req.nextUrl.pathname !== `/auth/signin`
  ) {
    const newUrl = new URL(`/${locale}/auth/signin`, req.nextUrl.origin);
    return NextResponse.redirect(newUrl); // Next.js의 NextResponse 사용
  }
  return i18nMiddleware(req); // i18n 미들웨어 실행
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
