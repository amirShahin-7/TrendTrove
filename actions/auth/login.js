"use server";
import { fetchApiClient } from "@/lib/oneentry";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getLoginFormData = async () => {
  try {
    const apiClient = await fetchApiClient();
    const response = await apiClient?.Forms.getFormByMarker("sign_in", "en_US");
    return response?.attributes;
  } catch (error) {
    console.error(error);
    throw new Error("Fetching form data failed.");
  }
};

export const handleLoginSubmit = async (inputValues) => {
  try {
    const apiClient = await fetchApiClient();

    const data = {
      authData: [
        { marker: "email", value: inputValues.email },
        { marker: "password", value: inputValues.password },
      ],
    };

    const response = await apiClient?.AuthProvider.auth("email", data);

    if (!response?.userIdentifier) {
      return {
        message: response?.message,
      };
    }

    (await cookies()).set("access_token", response.accessToken, {
      maxAge: 60 * 60 * 24,
    });

    (await cookies()).set("refresh_token", response.refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    console.error(error);
    if (error?.statusCode === 401) {
      return { message: error?.message };
    }

    throw new Error("Failed to login. Please try again.");
  }
  redirect("/");
};
