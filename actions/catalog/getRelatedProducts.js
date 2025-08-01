"use server";
import { fetchApiClient } from "@/lib/oneentry";

export const getRelatedProducts = async (pageId, productId) => {
  const apiClient = await fetchApiClient();

  if (!pageId) {
    throw new Error("Product ID is required to fetch related products.");
  }

  try {
    const products = await apiClient?.Products.getProductsByPageId(
      pageId,
      undefined,
      "en_US",
      {
        limit: 5,
        offset: 0,
        sortOrder: null,
        sortKey: null,
      }
    );

    const relatedProducts = [];

    for (let i = 0; i < products?.total; i++) {
      if (relatedProducts.length < 4) {
        if (products?.items[i].id !== productId)
          relatedProducts.push(products?.items[i]);
      } else {
        break;
      }
    }

    return relatedProducts;
  } catch (error) {
    throw new Error("Failed to fetch related products.");
  }
};
