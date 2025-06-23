"use server";
import { fetchApiClient } from "@/lib/oneentry";

export const getSignupFormData = async () => {
  try {
    const apiClient = await fetchApiClient();
    const response = await apiClient?.Forms.getFormByMarker("sign_up", "en_US");
    return response?.attributes;
  } catch (error) {
    console.error(error);
    throw new Error("Fetching form data failed.");
  }
};

export const handleSignupSubmit = async (inputValues) => {
  try {
    const apiClient = await fetchApiClient();
    const data = {
      formIdentifier: "sign_up",
      authData: [
        { marker: "email", value: inputValues.email },
        { marker: "password", value: inputValues.password },
      ],
      formData: [{ marker: "name", type: "string", value: inputValues.name }],
      notificationData: {
        email: inputValues.email,
        // phonePush: ["+1234567890"],
        // phoneSMS: "+1234567890",
      },
    };

    const value = await apiClient?.AuthProvider.signUp("email", data);
    return value;
  } catch (error) {
    console.error(error);
    if (error?.statusCode === 400) {
      return { message: error?.message };
    }

    throw new Error("Account Creation Failed. Please try again later.");
  }
};
