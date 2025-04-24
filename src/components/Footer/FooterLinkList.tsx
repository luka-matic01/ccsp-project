// src/components/Footer/FooterLinkList.tsx
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.scss";

// Define a more specific type for footer links if possible
interface FooterLinkItem {
  key: string;
  href?: string; // Optional href, defaults to "/"
  subItems?: FooterLinkItem[];
}

interface FooterLinkListProps {
  titleKey?: string; // Optional title for sections like Legal/QuickLinks
  ariaLabel: string;
  links: FooterLinkItem[];
  listClassName: string; // e.g., styles.quickLinksList or styles.legalLinksList
  useHeaderTranslations?: boolean; // Flag to use tHeader instead of tFooter
}

const FooterLinkList: React.FC<FooterLinkListProps> = ({
  titleKey,
  ariaLabel,
  links,
  listClassName,
  useHeaderTranslations = false,
}) => {
  // Choose the correct translation hook based on the prop
  const tDefault = useTranslations("Footer");
  const tHeader = useTranslations("Header");
  const t = useHeaderTranslations ? tHeader : tDefault;

  const renderLinkContent = (link: FooterLinkItem) => {
    // Special handling for t.rich or fallback
    try {
      // Attempt to use t.rich if needed, otherwise fallback to direct key
      return t.rich(link.key, { default: () => t(link.key) });
    } catch (e) {
      // Fallback if t.rich isn't defined or key doesn't exist
      return t(link.key);
    }
  };

  return (
    <div className={styles.column}>
      {titleKey && <h3 className={styles.sectionTitle}>{t(titleKey)}</h3>}
      <nav className={listClassName} aria-label={ariaLabel}>
        <ul>
          {links.map((link) => (
            <li key={link.key}>
              <Link href="/">
                {" "}
                {/* Static href="/" as requested */}
                {renderLinkContent(link)}
              </Link>
              {/* Render sub-items if they exist */}
              {link.subItems && link.subItems.length > 0 && (
                <ul className={styles.quickLinkSubitemList}>
                  {link.subItems.map((subItem) => (
                    <li key={subItem.key} className={styles.quickLinkSubitem}>
                      {/* Static href="/" for subitems too */}
                      <Link href="/">
                        {/* Assuming subitems also use Header translations if primary uses them */}
                        {useHeaderTranslations
                          ? tHeader(subItem.key)
                          : tDefault(subItem.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default FooterLinkList;
