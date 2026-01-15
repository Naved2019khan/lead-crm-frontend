import { auth } from "@/lib/auth";
import axios from "axios";

export async function axiosInstance() {
  const session = await auth();

  if (!session) {
    import { getSession } from "next-auth/react";
    const session = await getSession();
    return axios.create({
      baseURL: process.env.API_BASE_URL,
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
  }

  return axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });
}
