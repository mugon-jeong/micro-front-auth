"use server";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
import { cookies } from "next/headers.js";
import { defaultLocale, Locale } from "@workspace/common/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
