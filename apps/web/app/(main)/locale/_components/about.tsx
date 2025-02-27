import React from "react";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("Authority");
  return (
    <div>
      <h1>{t("list.create")}</h1>
    </div>
  );
};

export default About;
