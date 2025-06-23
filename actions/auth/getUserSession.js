"use server";

import { fetchApiClient } from "@/lib/oneentry";
import { cookies } from "next/headers";

export default async function getUserSession() {
  const apiClient = await fetchApiClient();
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const currentUser = await apiClient?.Users.setAccessToken(
      accessToken
    ).getUser();

    if (!currentUser || !currentUser.id) {
      throw new Error("Invalid user data or missing user ID.");
    }

    return currentUser;
  } catch (err) {
    if (err instanceof Error && err.statusCode === 401) {
      return undefined;
    }
    console.error("Failed to retrieve user session:", err);
  }
}
