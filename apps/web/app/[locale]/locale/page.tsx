import React from "react";
import About from "@/app/[locale]/locale/_components/about";
import { LocaleTypes } from "@workspace/common/localization/settings";
import LocaleSwitcher from "@/app/[locale]/locale/_components/locale-switcher";
import { setRequestLocale } from "next-intl/server";

const Page = async ({
  params,
}: {
  params: Promise<{ locale: LocaleTypes }>;
}) => {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div>
      <About />
      <LocaleSwitcher />
    </div>
  );
};

export default Page;
