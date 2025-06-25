"use server";
import { defineOneEntry } from "oneentry";
import retrieveRefreshToken from "@/actions/auth/retrieveRefreshToken";
import storeRefreshToken from "@/actions/auth/storeRefreshToken";

let apiClient = null;

async function setupApiClient() {
  const apiURL = process.env.URL;

  if (!apiURL) {
    throw new Error("URL is missing");
  }
  if (!apiClient) {
    try {
      const refreshToken = await retrieveRefreshToken();

      apiClient = defineOneEntry(apiURL, {
        token: process.env.ONEENTRY_TOKEN,
        langCode: "en_US",
        auth: {
          refreshToken: refreshToken || undefined,
          customAuth: false,
          saveFunction: async (newToken) => {
            await storeRefreshToken(newToken);
          },
        },
      });
    } catch (error) {
      console.log("Error fetching refresh token:", error);
    }
  }

  if (!apiClient) {
    throw new Error("Failed to initialize API client");
  }
  return apiClient;
}
export async function fetchApiClient() {
  if (!apiClient) {
    await setupApiClient();
  }

  if (!apiClient) {
    throw new Error("API client is still null after setup");
  }

  return apiClient;
}
