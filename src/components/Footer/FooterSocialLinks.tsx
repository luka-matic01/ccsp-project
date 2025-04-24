// src/components/Footer/FooterSocialLinks.tsx
import React from "react";
import { useTranslations } from "next-intl";
import IconLinkedIn from "../Icons/IconLinkedIn";
import IconYoutube from "../Icons/IconYoutube";
import styles from "./Footer.module.scss";
import { socialLinks } from "@/config/navigation"; // Import config directly

const FooterSocialLinks = () => {
  const t = useTranslations("Footer");

  return (
    <div className={styles.socialLinks}>
      {socialLinks.map((social) => (
        <a
          key={social.platform}
          href={social.url} // Keep external URLs
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
  );
};

export default FooterSocialLinks;
