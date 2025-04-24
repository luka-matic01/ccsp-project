// src/components/Header/MobileMenuPanel.tsx
import React from "react";
import { useTranslations } from "next-intl";
import IconLogo from "../Icons/IconLogo";
import IconSearch from "../Icons/IconSearch";
import IconClose from "../Icons/IconClose";
import IconButton from "../Icons/IconButton";
import LanguageSwitcher from "./LanguageSwitcher";
import NavigationMenu from "./NavigationMenu"; // Use the new Nav component
import Logo from "./Logo"; // Use the new Logo component
import styles from "./Header.module.scss";
import { MenuItemConfig } from "@/config/navigation"; // Import type

interface MobileMenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick: () => void; // Add search action
  onMainActionClick: () => void; // Add main action
  menuNavConfig: MenuItemConfig[];
  secondaryMenuNavConfig: MenuItemConfig[];
  openDropdown: string | null;
  onDropdownToggle: (key: string) => void;
}

const MobileMenuPanel: React.FC<MobileMenuPanelProps> = ({
  isOpen,
  onClose,
  onSearchClick,
  onMainActionClick,
  menuNavConfig,
  secondaryMenuNavConfig,
  openDropdown,
  onDropdownToggle,
}) => {
  const t = useTranslations("Header");

  // Function to close menu AND reset dropdown
  const handleLinkClick = () => {
    onClose();
    // Note: Resetting dropdown state should happen in the parent (Header)
    // We just trigger the close action here.
  };

  return (
    <div
      id="mobile-menu-panel"
      className={`${styles.mobileMenuPanel} ${isOpen ? styles.isOpen : ""}`}
      aria-hidden={!isOpen}
      // Add role="dialog" and aria-modal="true" for better accessibility
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-heading" // Add an invisible heading if needed
    >
      {/* <h2 id="mobile-menu-heading" className="sr-only">Mobile Menu</h2> */}

      <div className={styles.mobileMenuTopBar}>
        <Logo href="/" ariaLabel={t("ariaHomepage")} context="mobilePanel" />
        <div className={styles.mobileMenuTopActions}>
          <button
            className={styles.mobileMenuSearchButton}
            aria-label={t("search")}
            onClick={onSearchClick}
          >
            <IconSearch />
          </button>
          <button
            className={styles.mobileMenuCloseButton}
            onClick={onClose}
            aria-label={t("closeMenu")}
            aria-expanded={true} // Since it's visible when panel is open
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
          {/* Use NavigationMenu for Primary Mobile Nav */}
          <NavigationMenu
            navConfig={menuNavConfig}
            isMobile={true}
            openDropdown={openDropdown}
            onDropdownToggle={onDropdownToggle}
            onLinkClick={handleLinkClick}
            listClassName={styles.mobileMenuNavPrimaryList} // Add specific list class if needed
            itemClassName={styles.mobileNavItem}
          />
        </nav>

        <nav
          className={styles.mobileMenuNavSecondary}
          aria-label="Secondary Navigation" // Consider using a translation key
        >
          {/* Use NavigationMenu for Secondary Mobile Nav (no dropdowns expected here) */}
          <NavigationMenu
            navConfig={secondaryMenuNavConfig}
            isMobile={true}
            openDropdown={null} // No dropdowns here
            onDropdownToggle={() => {}} // No toggle needed
            onLinkClick={handleLinkClick}
            listClassName={styles.mobileMenuNavSecondaryList} // Add specific list class if needed
          />
        </nav>

        <div className={styles.mobileMenuMainAction}>
          <button
            className={styles.mainActionButton}
            onClick={() => {
              onMainActionClick();
              handleLinkClick(); // Close menu after clicking action
            }}
          >
            {t("mainAction")}
            <IconButton className={styles.whiteIcon} />
          </button>
        </div>

        <LanguageSwitcher className={styles.mobileMenuLangSwitcher} />
      </div>
    </div>
  );
};

export default MobileMenuPanel;
