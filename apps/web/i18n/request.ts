import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@workspace/common/i18n/locale";
import en from "@workspace/common/i18n/messages/en";
import ko from "@workspace/common/i18n/messages/ko";
import { Locale } from "@workspace/common/i18n/config";

const messages = { en, ko };

export default getRequestConfig(async () => {
  const locale: Locale = await getUserLocale();

  return {
    locale,
    messages: messages[locale],
  };
});
