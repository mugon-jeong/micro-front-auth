import React, { use } from "react";
import About from "@/app/[locale]/locale/_components/about";
import { createTranslation } from "@workspace/common/localization/server";
import { LocaleTypes } from "@workspace/common/localization/settings";
import LocaleSwitcher from "@/app/[locale]/locale/_components/locale-switcher";

const Page = async ({
  params,
}: {
  params: Promise<{ locale: LocaleTypes }>;
}) => {
  const { locale } = await params;
  const { t } = await createTranslation(locale, "common");
  return (
    <div>
      <h1>{t("home")}</h1>
      <About locale={locale} />
      <LocaleSwitcher lng={locale} />
    </div>
  );
};

export default Page;
