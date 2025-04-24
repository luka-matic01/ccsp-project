// src/components/Footer/FooterCopyright.tsx
import React from "react";
import { useTranslations } from "next-intl";
import styles from "./Footer.module.scss";

const FooterCopyright = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <small className={styles.copyright}>
      {t("copyright", { year: currentYear })}
    </small>
  );
};

export default FooterCopyright;
