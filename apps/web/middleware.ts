export { auth as middleware } from "@workspace/common/auth"; // 미들웨어 역할

export const config = {
  // 미들웨어를 적용할 라우트
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
