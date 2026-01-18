// actions/updateAgencySites.ts
"use server";

import { axiosServer } from "@/utils/axiosInstance";
import { revalidatePath } from "next/cache";

export async function updateAgencySites(data: any, oldSiteId: string) {
  const axiosInstance = await axiosServer();
  const response = await axiosInstance.post(
    `/product/update-agency/${oldSiteId}`,
    data,
  );

  revalidatePath("/dashboard/all-agency-sites");
  return response.data;
}

export const createAgencySites = async (data: any) => {
  try {
    const axiosInstance = await axiosServer();
    const response = await axiosInstance.post(
      "/product/create-agency-site",
      data,
    );

    revalidatePath("/dashboard/all-agency-sites");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFlightSites = async (data: any, siteId: string) => {
  try {
    const axiosInstance = await axiosServer();
    const response = await axiosInstance.post(
      `/product/update-flight-site/${siteId}`,
      data,
    );
    revalidatePath("/dashboard/all-flight-sites");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFlightSites = async (data: any) => {
  try {
    const axiosInstance = await axiosServer();
    const response = await axiosInstance.post(
      "/product/create-flight-site",
      data,
    );
    revalidatePath("/dashboard/all-flight-sites");
    return response.data;
  } catch (error) {
    throw error;
  }
};
