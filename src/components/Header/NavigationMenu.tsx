// src/components/Header/NavigationMenu.tsx
import React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import IconChevronDown from "../Icons/IconChevronDown";
import styles from "./Header.module.scss";
import { MenuItemConfig } from "@/config/navigation"; // Assuming you have a type

interface NavigationMenuProps {
  navConfig: MenuItemConfig[];
  isMobile: boolean;
  openDropdown: string | null;
  onDropdownToggle: (key: string) => void;
  onLinkClick: () => void; // To close mobile menu/dropdown
  listClassName: string; // e.g., styles.desktopSecondaryNavList, styles.mobileMenuNavPrimaryList
  itemClassName?: string; // e.g., styles.mobileNavItem
  dropdownMenuRef?: React.RefObject<HTMLLIElement>; // For outside click handling
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  navConfig,
  isMobile,
  openDropdown,
  onDropdownToggle,
  onLinkClick,
  listClassName,
  itemClassName = "",
  dropdownMenuRef,
}) => {
  const t = useTranslations("Header");
  const pathname = usePathname(); // Get pathname inside if needed for active link

  return (
    <ul className={listClassName}>
      {navConfig.map((item) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isDropdownOpen = openDropdown === item.translationKey;
        const itemKey = item.translationKey || item.href; // Ensure unique key

        return (
          <li
            key={itemKey}
            className={`${hasSubItems ? styles.navItemWithDropdown : ""} ${
              isMobile ? styles.mobileNavItem : ""
            } ${itemClassName}`}
            // Assign ref only to the specific dropdown item if needed
            ref={
              hasSubItems &&
              !isMobile &&
              dropdownMenuRef?.current?.dataset.key === itemKey
                ? dropdownMenuRef
                : null
            }
            // Add data-key attribute to identify the ref target
            data-key={hasSubItems && !isMobile ? itemKey : undefined}
          >
            {hasSubItems ? (
              <>
                <button
                  type="button"
                  className={`${styles.dropdownToggle} ${
                    isDropdownOpen ? styles.dropdownToggleOpen : ""
                  }`}
                  onClick={(e) => {
                    if (isMobile) e.stopPropagation(); // Prevent closing menu on toggle
                    onDropdownToggle(item.translationKey);
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
                    <li key={subItem.translationKey || subItem.href}>
                      {/* Use item.href for top level, subItem.href for sub level */}
                      <Link href="/" onClick={onLinkClick}>
                        {t(subItem.translationKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                href="/"
                // Add active class logic if needed
                className={pathname === item.href ? styles.activeLink : ""}
                onClick={onLinkClick}
              >
                {t(item.translationKey)}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationMenu;
