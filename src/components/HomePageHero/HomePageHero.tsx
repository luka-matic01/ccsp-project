// src/components/HomePageHero/HomePageHero.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import IconSearch from "../Icons/IconSearch"; // Adjust path if needed
import styles from "./HomePageHero.module.scss"; // Corrected import path if filename changed

// Placeholder - Replace with your actual image path
const HERO_IMAGE_PATH = "/images/hero-placeholder.png"; // Make sure this image exists in public/images
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
      <div className={styles.container}>
        {/* Image Wrapper */}
        <div className={styles.imageWrapper}>
          <Image
            src={HERO_IMAGE_PATH}
            alt={t(HERO_IMAGE_ALT_KEY)}
            width={952} // --- CORRECT INTRINSIC WIDTH ---
            height={1209} // --- CORRECT INTRINSIC HEIGHT ---
            priority // Keep priority for LCP
          />
        </div>

        {/* Content Wrapper (Text + Search) */}
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            {t(HERO_TITLE_PART1)}{" "}
            <span className={styles.titleUnderline}>
              {t(HERO_TITLE_UNDERLINE1)}
            </span>{" "}
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
              <IconSearch />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageHero;
