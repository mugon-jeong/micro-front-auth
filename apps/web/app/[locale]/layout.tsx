import ThemeProvider from "@workspace/common/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@workspace/common/auth";
import { dir } from "i18next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import "@workspace/ui/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await auth();
  const messages = await getMessages();
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
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
