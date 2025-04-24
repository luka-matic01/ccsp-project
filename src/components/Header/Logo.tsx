// src/components/Header/Logo.tsx (Revised Approach)
import React from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import IconLogo from "../Icons/IconLogo";
import styles from "./Header.module.scss";

interface LogoProps {
  href: string;
  ariaLabel: string;
  isMobileMenuOpen?: boolean; // Pass state if needed for CSS swap
  context: "header" | "mobilePanel"; // Distinguish placement
}

const Logo: React.FC<LogoProps> = ({
  href,
  ariaLabel,
  isMobileMenuOpen = false, // Default to false
  context,
}) => {
  if (context === "mobilePanel") {
    // Simplified logo for mobile panel top bar
    return (
      <div className={styles.mobileMenuLogoSimpleWrapper}>
        <Link href={href} aria-label={ariaLabel}>
          <IconLogo className={styles.mobileMenuLogoSimple} />
        </Link>
      </div>
    );
  }

  // Main header logo logic (Desktop/Mobile Closed)
  return (
    <div className={styles.logoWrapper}>
      <Link href={href} aria-label={ariaLabel}>
        {/* Mobile (Menu Closed): Show Image, Hide Icon */}
        <Image
          src="/logo.png"
          alt="Logo"
          width={153}
          height={60}
          className={`${styles.logoImage} ${
            isMobileMenuOpen ? styles.hideOnMobileMenuOpen : ""
          }`}
          priority
        />
        {/* Mobile (Menu Open) & Desktop: Show Icon, Hide Image */}
        <IconLogo
          className={`${styles.logoSvg} ${
            !isMobileMenuOpen ? styles.hideIconWhenMobileMenuClosed : ""
          }`}
        />
      </Link>
    </div>
  );
};

export default Logo;
