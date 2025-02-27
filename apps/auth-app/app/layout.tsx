import ThemeProvider from "@workspace/common/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@workspace/common/auth";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "@workspace/ui/globals.css";
import { getUserLocale } from "@workspace/common/i18n/locale";
import { locales } from "@workspace/common/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getUserLocale();
  setRequestLocale(locale);
  const session = await auth();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>{children}</ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
