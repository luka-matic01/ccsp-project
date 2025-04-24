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
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");
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
                      <Link href="/">{tHeader(link.key)}</Link>

                      {/* If there are subitems, render them in a nested ul */}
                      {link.subItems && link.subItems.length > 0 && (
                        <ul className={styles.quickLinkSubitemList}>
                          {link.subItems.map((subItem) => (
                            <li
                              key={subItem.key}
                              className={styles.quickLinkSubitem}
                            >
                              <Link href={subItem.href}>
                                {tHeader(subItem.key)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
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
                      <Link href="/">
                        {t.rich(link.key, { default: () => tHeader(link.key) })}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Separator before Legal (Desktop Only) */}
          <hr
            className={`${styles.separator} ${styles.desktopOnlySeparator}`}
          />

          {/* Legal Section */}
          <div className={styles.column}>
            <h3 className={styles.sectionTitle}>{t("legalTitle")}</h3>
            <nav className={styles.legalLinksList} aria-label={t("legalTitle")}>
              <ul>
                {legalLinks.map((link) => (
                  <li key={link.key}>
                    <Link href="/">{t(link.key)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Section with RESTRUCTURED layout */}
        <div className={styles.footerBottom}>
          {/* Social Links (Left side on both mobile and desktop) */}
          <div className={styles.socialLangRow}>
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
                    <div className={styles.socialLinkIcon}>
                      <IconLinkedIn /> LinkedIn
                    </div>
                  ) : (
                    <div className={styles.socialLinkIcon}>
                      <IconYoutube /> YouTube
                    </div>
                  )}
                </a>
              ))}
            </div>

            {/* Language Switcher - Only visible on MOBILE */}
            <div
              className={styles.langSwitcher + " " + styles.mobileLangSwitcher}
            >
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

          {/* Copyright and Desktop Language (right side on desktop, full row on mobile) */}
          <div className={styles.copyrightRow}>
            {/* Copyright */}
            <small className={styles.copyright}>
              {t("copyright", { year: currentYear })}
            </small>

            {/* Language Switcher - Only visible on DESKTOP */}
            <div
              className={styles.langSwitcher + " " + styles.desktopLangSwitcher}
            >
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
