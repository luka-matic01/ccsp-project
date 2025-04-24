import { Product, ProductApiResponse } from "@/types/product";

export async function getNewsPosts(): Promise<Product[]> {
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
