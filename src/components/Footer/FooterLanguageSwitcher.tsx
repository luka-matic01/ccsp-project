// src/components/Footer/FooterLanguageSwitcher.tsx
import React from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.scss";

interface FooterLanguageSwitcherProps {
  variant: "mobile" | "desktop";
}

const FooterLanguageSwitcher: React.FC<FooterLanguageSwitcherProps> = ({
  variant,
}) => {
  const locale = useLocale();
  // Determine wrapper class based on variant
  const wrapperClassName =
    variant === "mobile"
      ? `${styles.langSwitcher} ${styles.mobileLangSwitcher}`
      : `${styles.langSwitcher} ${styles.desktopLangSwitcher}`;

  return (
    <div className={wrapperClassName}>
      <Link
        href="/" // Use "/" as requested
        locale="nl"
        className={locale === "nl" ? styles.langLinkActive : styles.langLink}
      >
        NL
      </Link>
      <Link
        href="/" // Use "/" as requested
        locale="fr"
        className={locale === "fr" ? styles.langLinkActive : styles.langLink}
      >
        FR
      </Link>
    </div>
  );
};

export default FooterLanguageSwitcher;
