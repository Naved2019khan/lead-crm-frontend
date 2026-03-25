// actions/updateAgencySites.ts
"use server";

import { serverFetch } from "@/utils/serverFetch";
import { revalidatePath } from "next/cache";

export async function updateAgencySites(data: any, oldSiteId: string) {
  const response = await serverFetch(`/product/update-agency/${oldSiteId}`, { method: "POST", data });
  revalidatePath("/dashboard/all-agency-sites");
  return response;
}

export const createAgencySites = async (data: any) => {
  const response = await serverFetch("/product/create-agency-site", { method: "POST", data });
  revalidatePath("/dashboard/all-agency-sites");
  return response;
};

export const updateFlightSites = async (data: any, siteId: string) => {
  const response = await serverFetch(`/product/update-flight-site/${siteId}`, { method: "POST", data });
  revalidatePath("/dashboard/all-flight-sites");
  return response;
};

export const createFlightSites = async (data: any) => {
  const response = await serverFetch("/product/create-flight-site", { method: "POST", data });
  revalidatePath("/dashboard/all-flight-sites");
  return response;
};
