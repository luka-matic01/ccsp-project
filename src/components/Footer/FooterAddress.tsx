// src/components/Footer/FooterAddress.tsx
import React from "react";
import { useTranslations } from "next-intl";
import styles from "./Footer.module.scss";

const FooterAddress = () => {
  const t = useTranslations("Footer"); // Get translations internally

  return (
    <div className={styles.column}>
      <h3 className={styles.sectionTitle}>{t("coordinatesTitle")}</h3>
      <address className={styles.address}>
        <span>Rue de Louvain, 48/2, 1000 Bruxelles</span>
        <a href="mailto:info@ccsp-belgium.be">info@ccsp-belgium.be</a>
        <a href="tel:+3225499470">+32 (0)2 549 94 70</a>
      </address>
    </div>
  );
};

export default FooterAddress;
