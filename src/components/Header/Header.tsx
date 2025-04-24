// src/components/Header/Header.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation"; // Keep Link/usePathname if needed elsewhere
import styles from "./Header.module.scss";

// Import Icons needed directly in Header (Hamburger, Search for mobile toggle)
import IconHamburger from "../Icons/IconHamburger";
import IconSearch from "../Icons/IconSearch";

// Import Config
import {
  menuNavigationConfig,
  secondaryMenuNavigationConfig,
  MenuItemConfig, // Import type
} from "@/config/navigation";

// Import New Components
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import HeaderActions from "./HeaderActions";
import MobileMenuPanel from "./MobileMenuPanel";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const t = useTranslations("Header");

  const navRef = useRef<HTMLDivElement>(null); // Ref for the main nav container for outside click

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      if (!newState) {
        // If closing menu, also close any open dropdown
        setOpenDropdown(null);
      }
      return newState;
    });
  }, []);

  const handleDropdownToggle = useCallback((key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  // Close dropdown if clicking outside (for Desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the navigation container ref
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (openDropdown && window.innerWidth >= 1024) {
      // Only on desktop
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown, closeDropdown]);

  // Effect for body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add(styles.noScroll); // Use class from module
    } else {
      document.body.classList.remove(styles.noScroll);
    }
    // Cleanup function
    return () => document.body.classList.remove(styles.noScroll);
  }, [isMobileMenuOpen]);

  // Effect to close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        toggleMobileMenu(); // Use the toggle function to ensure state consistency
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen, toggleMobileMenu]);

  // Placeholder actions
  const handleSearchClick = () => {
    console.log("Search clicked");
    // Implement search functionality (e.g., open search modal/overlay)
  };
  const handleMainActionClick = () => {
    console.log("Main action clicked");
    // Implement main action (e.g., navigate to contact/login)
  };

  return (
    // Use a fragment or div if the wrapper isn't always needed
    <>
      <div className={styles.headerAbsoluteWrapper}>
        {" "}
        {/* This wrapper might need review depending on layout needs */}
        <header
          className={`${styles.header} ${
            isMobileMenuOpen ? styles.hiddenOnMobile : "" // CSS handles hiding header when mobile menu open
          }`}
        >
          <div className={styles.headerOuterWrapper}>
            {/* Desktop Top Bar */}
            <div className={styles.desktopTopContainer}>
              <nav
                className={styles.desktopMainNav}
                aria-label={t("secondaryNavLabel") || "Secondary navigation"}
              >
                {/* Render Secondary Nav directly or use NavigationMenu */}
                {/* Direct rendering approach: */}
                <ul>
                  {secondaryMenuNavigationConfig.map((item) => (
                    <li key={item.translationKey || item.href}>
                      <Link href="/">{t(item.translationKey)}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <LanguageSwitcher className={styles.desktopLangSwitcher} />
            </div>

            {/* Main Header Bar */}
            <div className={styles.headerInnerWrapper}>
              <div className={styles.container}>
                {/* Logo Section */}
                <div className={styles.headerLogoSection}>
                  <Logo
                    href="/"
                    ariaLabel={t("ariaHomepage")}
                    context="header"
                    isMobileMenuOpen={isMobileMenuOpen} // Pass state for CSS swapping
                  />
                </div>

                {/* Mobile-only Header Actions (Toggles) */}
                <div className={styles.mobileHeaderActions}>
                  <button
                    className={styles.mobileSearchButton}
                    aria-label={t("search")}
                    onClick={handleSearchClick}
                  >
                    <IconSearch className={styles.searchIconSvg} />
                  </button>
                  <button
                    className={styles.mobileMenuButton}
                    onClick={toggleMobileMenu}
                    aria-label={t("openMenu")}
                    aria-expanded={isMobileMenuOpen} // Correctly reflect state
                    aria-controls="mobile-menu-panel"
                  >
                    <IconHamburger className={styles.menuIconSvg} />
                  </button>
                </div>

                {/* Desktop Navigation Section */}
                <div ref={navRef} className={styles.headerNavSection}>
                  {" "}
                  {/* Added ref here */}
                  <nav
                    className={styles.desktopSecondaryNav}
                    aria-label={t("primaryNavLabel") || "Primary navigation"}
                  >
                    <NavigationMenu
                      navConfig={menuNavigationConfig}
                      isMobile={false}
                      openDropdown={openDropdown}
                      onDropdownToggle={handleDropdownToggle}
                      onLinkClick={closeDropdown} // Close dropdown when a link/sublink is clicked
                      listClassName={styles.desktopSecondaryNavList}
                      // No itemClassName needed for desktop primary nav
                    />
                  </nav>
                </div>

                {/* Desktop Action Section */}
                <div className={styles.headerActionSection}>
                  <HeaderActions
                    onSearchClick={handleSearchClick}
                    onMainActionClick={handleMainActionClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Panel */}
      <MobileMenuPanel
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu} // Use the callback
        onSearchClick={handleSearchClick}
        onMainActionClick={handleMainActionClick}
        menuNavConfig={menuNavigationConfig}
        secondaryMenuNavConfig={secondaryMenuNavigationConfig}
        openDropdown={openDropdown}
        onDropdownToggle={handleDropdownToggle} // Pass toggle handler
      />
    </> // End Fragment
  );
};

export default Header;
