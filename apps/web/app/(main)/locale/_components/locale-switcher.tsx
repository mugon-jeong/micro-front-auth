import { useLocale, useTranslations } from "next-intl";
import { locales } from "@workspace/common/i18n/config";
import LocaleSwitcherSelect from "@/app/(main)/locale/_components/locale-switcher-select";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {locales.map((cur) => (
        <option key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </option>
      ))}
      ii
    </LocaleSwitcherSelect>
  );
}
