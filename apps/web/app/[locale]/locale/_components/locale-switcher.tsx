"use client";
import React from "react";
import { Trans } from "react-i18next";
import { locales, LocaleTypes } from "@workspace/common/localization/settings";
import Link from "next/link";
import { useTranslation } from "@workspace/common/localization/client";

const LocaleSwitcher = ({ lng }: { lng: LocaleTypes }) => {
  const { t } = useTranslation(lng, "footer");
  return (
    <div>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{`${lng}`}</strong> to:{" "}
      </Trans>
      {Array.from(locales)
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={"/locale"} locale={l}>
                {l}
              </Link>
            </span>
          );
        })}
    </div>
  );
};

export default LocaleSwitcher;
