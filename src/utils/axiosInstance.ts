import axios from "axios";
import { auth } from "@/lib/auth";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosServer = async () => {
  const session = await auth();
  const token = (session?.user as any)?.token 

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });
};

