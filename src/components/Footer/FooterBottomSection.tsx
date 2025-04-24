// src/components/Footer/FooterBottomSection.tsx
import React from "react";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterLanguageSwitcher from "./FooterLanguageSwitcher";
import FooterCopyright from "./FooterCopyright";
import styles from "./Footer.module.scss";

const FooterBottomSection = () => {
  // No props needed as children handle their own data/translations/state

  return (
    <div className={styles.footerBottom}>
      {/* Row 1: Social + Mobile Lang */}
      <div className={styles.socialLangRow}>
        <FooterSocialLinks />
        <FooterLanguageSwitcher variant="mobile" />
      </div>

      {/* Row 2: Copyright + Desktop Lang */}
      <div className={styles.copyrightRow}>
        <FooterCopyright />
        <FooterLanguageSwitcher variant="desktop" />
      </div>
    </div>
  );
};

export default FooterBottomSection;
