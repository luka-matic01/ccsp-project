import React from "react";
import styles from "./NewsSection.module.scss";
import NewsCard from "../NewsCard/NewsCard";
import Link from "next/link";
import IconButton from "@/components/Icons/IconButton";
import { getTranslations } from "next-intl/server";
import { getNewsPosts } from "@/services/api/newsService";

const NewsSection = async () => {
  const posts = await getNewsPosts();

  const t = await getTranslations("HomePageHero");

  const sectionTitle = t("heroTitle");
  const viewAllText = t("heroSearchButtonAriaLabel");

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        {posts && posts.length > 0 ? (
          <div className={styles.postsWrapper}>
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className={styles.noPostsMessage}>
            {t("heroSearchButtonAriaLabel")}
          </p>
        )}
        <Link href="/" className={styles.viewAllButton}>
          {viewAllText}
          <IconButton />
        </Link>
      </div>
    </section>
  );
};

export default NewsSection;
