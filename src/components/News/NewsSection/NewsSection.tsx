import React from "react";
import styles from "./NewsSection.module.scss";
import NewsCard from "../NewsCard/NewsCard";
import { Product, ProductApiResponse } from "@/types/product";
import Link from "next/link";
import IconButton from "@/components/Icons/IconButton";
import { getTranslations } from "next-intl/server";

async function getNewsPosts(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?limit=3&select=id,title,description,category,thumbnail",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch news posts: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data: ProductApiResponse = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching news posts:", error);
    return [];
  }
}

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
