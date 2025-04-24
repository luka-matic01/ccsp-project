// src/components/Footer/Footer.tsx
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import styles from "./Footer.module.scss";

// Import navigation config needed for Link Lists
import {
  quickLinksCol1,
  quickLinksCol2,
  legalLinks,
} from "@/config/navigation";

// Import New Components
import FooterLogo from "./FooterLogo";
import FooterAddress from "./FooterAddress";
import FooterLinkList from "./FooterLinkList";
import FooterBottomSection from "./FooterBottomSection";

const Footer = () => {
  const tHeader = useTranslations("Header");
  const tFooter = useTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Mobile Only Logo */}
        <div className={styles.mobileLogoWrapper}>
          <FooterLogo ariaLabel={tHeader("ariaHomepage")} />
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContentRow}>
          {/* Desktop Only Logo */}
          <div className={styles.desktopLogoWrapper}>
            <FooterLogo ariaLabel={tHeader("ariaHomepage")} />
          </div>

          {/* Coordinates Section */}
          <FooterAddress />

          {/* Quick Links Section - ADJUSTED */}
          <div className={`${styles.column} ${styles.quickLinksWrapper}`}>
            {/* Render the title directly here */}
            <h3 className={styles.sectionTitle}>
              {tFooter("quickLinksTitle")}
            </h3>
            {/* This div will now correctly get the border-top on desktop via .quickLinksColumns */}
            <div className={styles.quickLinksColumns}>
              {/* Column 1 - REMOVED titleKey */}
              <FooterLinkList
                // titleKey="quickLinksTitle" // REMOVED
                ariaLabel={tFooter("quickLinksTitle")} // Keep aria-label for accessibility
                links={quickLinksCol1}
                listClassName={styles.quickLinksList}
                useHeaderTranslations={true}
              />
              {/* Column 2 - REMOVED titleKey */}
              <FooterLinkList
                ariaLabel={tFooter("quickLinksTitle") + " 2"} // Keep aria-label
                links={quickLinksCol2}
                listClassName={styles.quickLinksList}
                useHeaderTranslations={true}
              />
            </div>
          </div>
          {/* END ADJUSTMENT */}

          {/* Legal Section - Pass titleKey as before */}
          <FooterLinkList
            titleKey="legalTitle" // Keep titleKey here as it's a single list section
            ariaLabel={tFooter("legalTitle")}
            links={legalLinks}
            listClassName={styles.legalLinksList}
            useHeaderTranslations={false}
          />
        </div>

        {/* Separators remain for layout */}
        {/* Removed redundant separator - only one needed between main content and bottom */}
        <hr className={`${styles.separator} ${styles.desktopOnlySeparator}`} />

        {/* Bottom Section */}
        <FooterBottomSection />
      </div>
    </footer>
  );
};

export default Footer;
