"use server";

import { fetchApiClient } from "@/lib/oneentry";

export const getCatalogs = async () => {
  try {
    const apiClient = await fetchApiClient();
    const pages = await apiClient?.Pages.getRootPages("en_US");

    const catalogPages = pages?.filter((page) => page);

    return catalogPages?.length ? catalogPages : [];
  } catch (error) {
    console.error({ error });
    return [];
  }
};
