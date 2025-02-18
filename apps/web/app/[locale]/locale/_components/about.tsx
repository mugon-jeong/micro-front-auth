"use client";
import React from "react";
import { LocaleTypes } from "@workspace/common/localization/settings";
import { useTranslation } from "@workspace/common/localization/client";

const About = ({ locale }: { locale: LocaleTypes }) => {
  const { t } = useTranslation(locale, "common");
  return (
    <div>
      <h1>{t("about")}</h1>
    </div>
  );
};

export default About;
