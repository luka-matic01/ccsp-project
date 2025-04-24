// src/components/HomePageHero/HomePageHero.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import IconSearch from "../Icons/IconSearch"; // Adjust path if needed
import styles from "./HomePageHero.module.scss"; // Corrected import path if filename changed

// Define image paths
const DESKTOP_HERO_IMAGE_PATH = "/images/hero-placeholder.png";
const MOBILE_HERO_IMAGE_PATH = "/images/mobile-hero.png";
const HERO_IMAGE_ALT_KEY = "heroImageAlt"; // Translation key for alt text

// Translation keys for the heading parts
const HERO_TITLE_PART1 = "heroTitlePart1";
const HERO_TITLE_UNDERLINE1 = "heroTitleUnderline1";
const HERO_TITLE_PART2 = "heroTitlePart2";
const HERO_TITLE_UNDERLINE2 = "heroTitleUnderline2";
const HERO_TITLE_PART3 = "heroTitlePart3";

const HERO_SUBTITLE_KEY = "heroSubtitle";
const HERO_SEARCH_PLACEHOLDER_KEY = "heroSearchPlaceholder";
const HERO_SEARCH_BUTTON_ARIA_LABEL_KEY = "heroSearchButtonAriaLabel";

const HomePageHero = () => {
  const t = useTranslations("HomePageHero");

  const handleSearchClick = () => {
    console.log("Search button clicked");
    // TODO: Implement search action
  };

  return (
    <section className={styles.hero}>
      {/* Mobile Hero Image - Only visible on mobile */}
      <div className={styles.mobileImageWrapper}>
        <Image
          src={MOBILE_HERO_IMAGE_PATH}
          alt={t(HERO_IMAGE_ALT_KEY)}
          width={242}
          height={180}
          priority
        />
      </div>

      <div className={styles.container}>
        {/* Desktop Image Wrapper - Only visible on desktop */}
        <div className={styles.desktopImageWrapper}>
          <Image
            src={DESKTOP_HERO_IMAGE_PATH}
            alt={t(HERO_IMAGE_ALT_KEY)}
            width={952}
            height={1209}
            priority
          />
        </div>

        {/* Content Wrapper (Text + Search) */}
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            {t(HERO_TITLE_PART1)}{" "}
            <span className={styles.titleUnderline}>
              {t(HERO_TITLE_UNDERLINE1)}
            </span>{" "}
            <br />
            {t(HERO_TITLE_PART2)}{" "}
            <span className={styles.titleUnderline}>
              {t(HERO_TITLE_UNDERLINE2)}
            </span>{" "}
            {t(HERO_TITLE_PART3)}
          </h1>

          <p className={styles.subtitle}>{t(HERO_SUBTITLE_KEY)}</p>

          <div className={styles.searchBar}>
            <span className={styles.searchText}>
              {t(HERO_SEARCH_PLACEHOLDER_KEY)}
            </span>
            <button
              className={styles.searchButton}
              onClick={handleSearchClick}
              aria-label={t(HERO_SEARCH_BUTTON_ARIA_LABEL_KEY)}
            >
              <IconSearch className={styles.whiteIcon} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageHero;
