import ThemeProvider from "@workspace/common/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@workspace/common/auth";
import { locales } from "@workspace/common/localization/settings";
import { dir } from "i18next";

export async function generateStaticParams() {
  return Array.from(locales).map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
