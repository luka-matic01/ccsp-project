// src/components/Footer/Footer.tsx
"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./Footer.module.scss";

import IconLogo from "../Icons/IconLogo";
import IconLinkedIn from "../Icons/IconLinkedIn";
import IconYoutube from "../Icons/IconYoutube";
import Image from "next/image";

// Import navigation config
import {
  quickLinksCol1,
  quickLinksCol2,
  legalLinks,
  socialLinks,
} from "@/config/navigation";

const Footer = () => {
  const t = useTranslations("Footer"); // Namespace for Footer translations
  const tHeader = useTranslations("Header"); // Namespace for Header nav translations
  const locale = useLocale();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Mobile Only Logo */}
        <div className={styles.mobileLogoWrapper}>
          <Link href="/" aria-label={tHeader("ariaHomepage")}>
            <IconLogo className={styles.footerLogoSvg} />
          </Link>
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContentRow}>
          {/* Desktop Only Logo */}
          <div className={styles.desktopLogoWrapper}>
            <Link href="/" aria-label={tHeader("ariaHomepage")}>
              <IconLogo className={styles.footerLogoSvg} />
            </Link>
          </div>

          {/* Coordinates Section */}
          <div className={styles.column}>
            <h3 className={styles.sectionTitle}>{t("coordinatesTitle")}</h3>
            <address className={styles.address}>
              <span>Rue de Louvain, 48/2, 1000 Bruxelles</span>
              <a href="mailto:info@ccsp-belgium.be">info@ccsp-belgium.be</a>
              <a href="tel:+3225499470">+32 (0)2 549 94 70</a>
            </address>
          </div>

          {/* Separator Before Quick Links (Mobile Only) */}
          <hr className={`${styles.separator} ${styles.mobileOnlySeparator}`} />

          {/* Quick Links Section */}
          <div className={`${styles.column} ${styles.quickLinksWrapper}`}>
            <h3 className={styles.sectionTitle}>{t("quickLinksTitle")}</h3>
            <div className={styles.quickLinksColumns}>
              {/* Column 1 */}
              <nav
                className={styles.quickLinksList}
                aria-label={t("quickLinksTitle")}
              >
                <ul>
                  {quickLinksCol1.map((link) => (
                    <li key={link.key}>
                      {/* Assuming keys match Header translations */}
                      <Link href={link.href}>{tHeader(link.key)}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* Column 2 */}
              <nav
                className={styles.quickLinksList}
                aria-label={t("quickLinksTitle") + " 2"}
              >
                <ul>
                  {quickLinksCol2.map((link) => (
                    <li key={link.key}>
                      {/* Use t.rich to fallback gracefully */}
                      <Link href={link.href}>
                        {t.rich(link.key, { default: () => tHeader(link.key) })}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Separator Before Legal (Mobile Only) */}
          <hr className={`${styles.separator} ${styles.mobileOnlySeparator}`} />

          {/* Legal Section */}
          <div className={styles.column}>
            <h3 className={styles.sectionTitle}>{t("legalTitle")}</h3>
            <nav className={styles.legalLinksList} aria-label={t("legalTitle")}>
              <ul>
                {legalLinks.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href}>{t(link.key)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Separator (Desktop Only - Below Main Content) */}
        <hr className={`${styles.separator} ${styles.desktopOnlySeparator}`} />

        {/* Bottom Section (Social, Copyright, Lang) */}
        <div className={styles.footerBottom}>
          <div className={styles.socialLangRow}>
            {/* Social Links */}
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={t(social.ariaKey)}
                >
                  {social.platform === "LinkedIn" ? (
                    <IconLinkedIn />
                  ) : (
                    <IconYoutube />
                  )}
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>

            {/* Language Switcher (Desktop) */}
            <div
              className={`${styles.langSwitcher} ${styles.desktopLangSwitcher}`}
            >
              {/* Language Links */}
              <Link
                href={pathname}
                locale="nl"
                className={
                  locale === "nl" ? styles.langLinkActive : styles.langLink
                }
              >
                NL
              </Link>
              <Link
                href={pathname}
                locale="fr"
                className={
                  locale === "fr" ? styles.langLinkActive : styles.langLink
                }
              >
                FR
              </Link>
            </div>
          </div>

          <div className={styles.copyrightLangRow}>
            {/* Copyright */}
            <small className={styles.copyright}>
              {t("copyright", { year: currentYear })}
            </small>

            {/* Language Switcher (Mobile) */}
            <div
              className={`${styles.langSwitcher} ${styles.mobileLangSwitcher}`}
            >
              {/* Language Links */}
              <Link
                href={pathname}
                locale="nl"
                className={
                  locale === "nl" ? styles.langLinkActive : styles.langLink
                }
              >
                NL
              </Link>
              <Link
                href={pathname}
                locale="fr"
                className={
                  locale === "fr" ? styles.langLinkActive : styles.langLink
                }
              >
                FR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
