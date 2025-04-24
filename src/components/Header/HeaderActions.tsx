// src/components/Header/HeaderActions.tsx
import React from "react";
import { useTranslations } from "next-intl";
import IconSearch from "../Icons/IconSearch";
import IconButton from "../Icons/IconButton";
import styles from "./Header.module.scss";

interface HeaderActionsProps {
  onSearchClick: () => void;
  onMainActionClick: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  onSearchClick,
  onMainActionClick,
}) => {
  const t = useTranslations("Header");

  return (
    <div className={styles.desktopSearchWrapper}>
      <button
        className={styles.desktopSearchButtonSecondary}
        aria-label={t("search")}
        onClick={onSearchClick}
      >
        <IconSearch className={styles.whiteIcon} />
      </button>

      <button
        className={styles.desktopSearchButton} // Note: This class has media query logic
        onClick={onMainActionClick}
      >
        {t("mainAction")}
        <IconButton className={styles.whiteIcon} />
      </button>
    </div>
  );
};

export default HeaderActions;
