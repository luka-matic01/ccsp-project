"use client";
import React from "react";
import Image from "next/image";
import styles from "./NewsCard.module.scss";
import { Product } from "@/types/product";
import { useTranslations } from "next-intl";

interface NewsCardProps {
  post: Product;
}

const NewsCard: React.FC<NewsCardProps> = ({ post }) => {
  const t = useTranslations("Header");

  const displayDate = "10.12.2024";

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={post.thumbnail}
          alt={post.title || t("heroSearchButtonAriaLabel")}
          width={350}
          height={200}
          className={styles.image}
          priority={false}
          loading="lazy"
        />
      </div>
      <div className={styles.contentWrapper}>
        <span className={styles.tag}>
          {post.category || t("heroSearchButtonAriaLabel")}
        </span>
        <h3 className={styles.title}>{post.title}</h3>
        <span className={styles.dateText}>{displayDate}</span>
      </div>
    </article>
  );
};

export default NewsCard;
