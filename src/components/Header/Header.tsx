// src/components/Header/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./Header.module.scss";

import IconLogo from "../Icons/IconLogo";
import IconHamburger from "../Icons/IconHamburger";
import IconClose from "../Icons/IconClose";
import IconSearch from "../Icons/IconSearch";
import IconButton from "../Icons/IconButton";
import Image from "next/image";

const menuNavigationConfig = [
  { href: "/conseil-central", translationKey: "navConseil" },
  { href: "/surveillance", translationKey: "navSurveillance" },
  { href: "/avis", translationKey: "navAvis" },
  { href: "/droit-de-plainte", translationKey: "navDroit" },
  { href: "/publications", translationKey: "navPublications" },
  { href: "/mecanisme-prevention", translationKey: "navMecanisme" },
];

const secondaryMenuNavigationConfig = [
  { href: "/actualites", translationKey: "navActualites" },
  { href: "/jurisprudence", translationKey: "navJurisprudence" },
  { href: "/job", translationKey: "navJob" },
  { href: "/contact", translationKey: "navContact" },
  { href: "/liens-utiles", translationKey: "navLiens" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Header");
  const pathname = usePathname();
  const locale = useLocale();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isMobileMenuOpen]);

  const renderMenuNavLinks = () => {
    return menuNavigationConfig.map((item) => (
      <li key={item.href}>
        <Link
          href={item.href}
          className={pathname === item.href ? styles.activeLink : ""}
          onClick={toggleMobileMenu}
        >
          {t(item.translationKey)}
        </Link>
      </li>
    ));
  };

  const renderSecondaryMenuNavLinks = () => {
    return secondaryMenuNavigationConfig.map((item) => (
      <li key={item.href}>
        <Link href={item.href} onClick={toggleMobileMenu}>
          {t(item.translationKey)}
        </Link>
      </li>
    ));
  };

  return (
    <>
      <header
        className={`${styles.header} ${
          isMobileMenuOpen ? styles.hiddenOnMobile : ""
        }`}
      >
        <div className={styles.headerOuterWrapper}>
          <div className={styles.desktopTopContainer}>
            <nav className={styles.desktopMainNav}>
              <ul>{renderSecondaryMenuNavLinks()}</ul>
            </nav>
            <div className={styles.desktopLangSwitcher}>
              <Link
                href={pathname}
                locale="nl"
                className={
                  locale === "nl" ? styles.langLinkActive : styles.langLink
                }
                aria-current={locale === "nl" ? "page" : undefined}
              >
                NL
              </Link>
              <Link
                href={pathname}
                locale="fr"
                className={
                  locale === "fr" ? styles.langLinkActive : styles.langLink
                }
                aria-current={locale === "fr" ? "page" : undefined}
              >
                FR
              </Link>
            </div>
          </div>

          <div className={styles.headerInnerWrapper}>
            <div className={styles.container}>
              <div className={styles.logoWrapper}>
                <Link href="/" aria-label={t("ariaHomepage")}>
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={153}
                    height={60}
                    className={`${styles.logoImage} ${
                      isMobileMenuOpen ? styles.hideOnMobileMenuOpen : ""
                    }`}
                  />
                  <IconLogo
                    className={`${styles.logoSvg} ${
                      !isMobileMenuOpen
                        ? styles.hideIconWhenMobileMenuClosed
                        : ""
                    }`}
                  />
                </Link>
              </div>
              <div className={styles.mobileHeaderActions}>
                <button
                  className={styles.mobileSearchButton}
                  aria-label={t("search")}
                >
                  <IconSearch className={styles.searchIconSvg} />
                </button>
                <button
                  className={styles.mobileMenuButton}
                  onClick={toggleMobileMenu}
                  aria-label={t("openMenu")}
                  aria-expanded={false}
                  aria-controls="mobile-menu-panel"
                >
                  <IconHamburger className={styles.menuIconSvg} />
                </button>
              </div>

              <nav className={styles.desktopSecondaryNav}>
                <ul className={styles.desktopSecondaryNavList}>
                  {renderMenuNavLinks()}
                </ul>
              </nav>
              <div className={styles.desktopSearchWrapper}>
                <button
                  className={styles.desktopSearchButtonSecondary}
                  aria-label={t("search")}
                >
                  <IconSearch className={styles.whiteIcon} />
                </button>

                <button className={styles.desktopSearchButton}>
                  Je suis détenu(e)
                  <IconButton className={styles.whiteIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu-panel"
        className={`${styles.mobileMenuPanel} ${
          isMobileMenuOpen ? styles.isOpen : ""
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileMenuTopBar}>
          <div className={styles.mobileMenuLogoSimpleWrapper}>
            <IconLogo className={styles.mobileMenuLogoSimple} />
          </div>
          <div className={styles.mobileMenuTopActions}>
            <button
              className={styles.mobileMenuSearchButton}
              aria-label={t("search")}
            >
              <IconSearch />
            </button>
            <button
              className={styles.mobileMenuCloseButton}
              onClick={toggleMobileMenu}
              aria-label={t("closeMenu")}
              aria-expanded={true}
            >
              <IconClose />
            </button>
          </div>
        </div>

        <div className={styles.mobileMenuScrollableContent}>
          <nav
            className={styles.mobileMenuNavPrimary}
            aria-label={t("navConseil")}
          >
            <ul>{renderMenuNavLinks()}</ul>
          </nav>

          <nav
            className={styles.mobileMenuNavSecondary}
            aria-label="Secondary Navigation"
          >
            <ul>{renderSecondaryMenuNavLinks()}</ul>
          </nav>

          <div className={styles.mobileMenuMainAction}>
            <Link href="/je-suis-detenu" className={styles.mainActionButton}>
              <span>{t("mainAction")}</span>
              <IconSearch />
            </Link>
          </div>

          <div className={styles.mobileMenuLangSwitcher}>
            <Link
              href={pathname}
              locale="nl"
              className={
                locale === "nl" ? styles.langLinkActive : styles.langLink
              }
              aria-current={locale === "nl" ? "page" : undefined}
            >
              NL
            </Link>
            <span className={styles.langSeparator}>/</span>
            <Link
              href={pathname}
              locale="fr"
              className={
                locale === "fr" ? styles.langLinkActive : styles.langLink
              }
              aria-current={locale === "fr" ? "page" : undefined}
            >
              FR
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
