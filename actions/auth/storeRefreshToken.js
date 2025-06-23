"use server";

import { cookies } from "next/headers";

export default async function retrieveRefreshToken(newToken) {
  const cookieStore = await cookies();

  return cookieStore.get("refresh_Token")?.value;
}
