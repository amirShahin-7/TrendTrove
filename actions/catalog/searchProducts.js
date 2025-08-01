"use server";
import { fetchApiClient } from "@/lib/oneentry";

export const searchProductsAction = async ({ query }) => {
  try {
    const apiClient = await fetchApiClient();

    const products = await apiClient?.Products.searchProduct(query, "en_US");

    return products || [];
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error(
      `Product search failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
