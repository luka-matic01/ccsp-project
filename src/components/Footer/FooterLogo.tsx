import React from "react";
import { Link } from "@/i18n/navigation";
import IconLogo from "../Icons/IconLogo";
import styles from "./Footer.module.scss"; // Reuse styles

interface FooterLogoProps {
  ariaLabel: string;
}

// Simple component, visibility controlled by parent div classes
const FooterLogo: React.FC<FooterLogoProps> = ({ ariaLabel }) => {
  return (
    <Link href="/" aria-label={ariaLabel}>
      <IconLogo className={styles.footerLogoSvg} />
    </Link>
  );
};

export default FooterLogo;
