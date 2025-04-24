// src/components/Header/LanguageSwitcher.tsx
import React from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./Header.module.scss"; // Reuse existing styles

interface LanguageSwitcherProps {
  className?: string; // To apply specific container styles (e.g., desktop vs mobile)
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={`${styles.langSwitcherBase} ${className || ""}`}>
      <Link
        href={pathname}
        locale="nl"
        className={locale === "nl" ? styles.langLinkActive : styles.langLink}
        aria-current={locale === "nl" ? "page" : undefined}
      >
        NL
      </Link>
      {/* Optional separator if needed visually */}
      {/* <span className={styles.langSeparator}>|</span> */}
      <Link
        href={pathname}
        locale="fr"
        className={locale === "fr" ? styles.langLinkActive : styles.langLink}
        aria-current={locale === "fr" ? "page" : undefined}
      >
        FR
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
