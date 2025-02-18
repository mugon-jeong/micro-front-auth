import React from "react";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("IndexPage");
  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
};

export default About;
