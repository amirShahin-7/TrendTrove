"use server";
import { fetchApiClient } from "@/lib/oneentry";
import { cookies } from "next/headers";

export default async function createOrder(orderData) {
  const apiClient = await fetchApiClient();

  if (!apiClient) {
    throw new Error("Unable to retrieve API instance.");
  }

  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    throw new Error("Missing access token.");
  }

  try {
    const createdOrder = await apiClient.Orders.setAccessToken(
      accessToken
    ).createOrder("orders", orderData);

    if (!createdOrder?.id) {
      throw new Error("Order creation was unsuccessful.");
    }

    const paymentSession = await apiClient.Payments.setAccessToken(
      accessToken
    ).createSession(createdOrder.id, "session");

    if (!paymentSession?.paymentUrl) {
      throw new Error("Failed to generate payment session URL.");
    }

    return paymentSession.paymentUrl;
  } catch (err) {
    console.error("Error during order and payment processing:", err);
    throw new Error(
      `Order or payment session creation failed. ${
        err instanceof Error ? err.message : "Unknown error occurred."
      }`
    );
  }
}
