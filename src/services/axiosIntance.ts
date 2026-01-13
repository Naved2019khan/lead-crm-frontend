import { auth } from "@/lib/auth";
import axios from "axios";

export async function axiosInstance() {
  const session = await auth();

  return axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });
}
