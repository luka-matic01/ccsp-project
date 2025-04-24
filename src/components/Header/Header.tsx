// src/components/Header/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./Header.module.scss";

import IconLogo from "../Icons/IconLogo";
import IconHamburger from "../Icons/IconHamburger";
import IconClose from "../Icons/IconClose";
import IconSearch from "../Icons/IconSearch";
import IconButton from "../Icons/IconButton";
import IconChevronDown from "../Icons/IconChevronDown";
import Image from "next/image";

const menuNavigationConfig = [
  { href: "/conseil-central", translationKey: "navConseil" },
  {
    href: "#", // Main link is just a toggle
    translationKey: "navSurveillance",
    subItems: [
      { href: "/surveillance/sub1", translationKey: "subNavSurveillance1" },
      { href: "/surveillance/sub2", translationKey: "subNavSurveillance2" },
      { href: "/surveillance/sub3", translationKey: "subNavSurveillance3" },
    ],
  },
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const t = useTranslations("Header");
  const pathname = usePathname();
  const locale = useLocale();
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null); // Close dropdown when mobile menu toggles
  };

  const handleDropdownToggle = (key: string, isMobile: boolean = false) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  // Close dropdown if clicking outside of it (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown && window.innerWidth >= 1024) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

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

  const renderMenuNavLinks = (isMobile = false) => {
    return menuNavigationConfig.map((item) => {
      const hasSubItems = item.subItems && item.subItems.length > 0;
      const isDropdownOpen = openDropdown === item.translationKey;

      return (
        <li
          key={item.href}
          className={`${hasSubItems ? styles.navItemWithDropdown : ""} ${
            isMobile ? styles.mobileNavItem : ""
          }`}
          ref={hasSubItems && !isMobile ? dropdownRef : null}
        >
          {hasSubItems ? (
            <>
              <button
                type="button"
                className={`${styles.dropdownToggle} ${
                  isDropdownOpen ? styles.dropdownToggleOpen : ""
                }`}
                onClick={(e) => {
                  if (isMobile) e.stopPropagation();
                  handleDropdownToggle(item.translationKey, isMobile);
                }}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {t(item.translationKey)}
                <IconChevronDown className={styles.dropdownIcon} />
              </button>

              <ul
                className={`${styles.dropdownMenu} ${
                  isDropdownOpen ? styles.dropdownMenuOpen : ""
                }`}
                aria-hidden={!isDropdownOpen}
              >
                {item.subItems?.map((subItem) => (
                  <li key={subItem.translationKey}>
                    <Link
                      href={subItem.href}
                      onClick={() => {
                        if (isMobileMenuOpen) toggleMobileMenu();
                        setOpenDropdown(null);
                      }}
                    >
                      {t(subItem.translationKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link
              href={item.href}
              className={pathname === item.href ? styles.activeLink : ""}
              onClick={toggleMobileMenu}
            >
              {t(item.translationKey)}
            </Link>
          )}
        </li>
      );
    });
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
    <div className={styles.headerAbsoluteWrapper}>
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
              <div className={styles.headerLogoSection}>
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

              <div className={styles.headerNavSection}>
                <nav className={styles.desktopSecondaryNav}>
                  <ul className={styles.desktopSecondaryNavList}>
                    {renderMenuNavLinks()}
                  </ul>
                </nav>
              </div>

              <div className={styles.headerActionSection}>
                <div className={styles.desktopSearchWrapper}>
                  <button
                    className={styles.desktopSearchButtonSecondary}
                    aria-label={t("search")}
                  >
                    <IconSearch className={styles.whiteIcon} />
                  </button>

                  <button className={styles.desktopSearchButton}>
                    {t("mainAction")}
                    <IconButton className={styles.whiteIcon} />
                  </button>
                </div>
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

        <span className={styles.mobileMenuSeparator} />

        <div className={styles.mobileMenuScrollableContent}>
          <nav
            className={styles.mobileMenuNavPrimary}
            aria-label={t("navConseil")}
          >
            <ul>{renderMenuNavLinks(true)}</ul>
          </nav>

          <nav
            className={styles.mobileMenuNavSecondary}
            aria-label="Secondary Navigation"
          >
            <ul>{renderSecondaryMenuNavLinks()}</ul>
          </nav>

          <div className={styles.mobileMenuMainAction}>
            <button className={styles.mainActionButton}>
              {t("mainAction")}
              <IconButton className={styles.whiteIcon} />
            </button>
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
    </div>
  );
};

export default Header;
