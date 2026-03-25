"use server";

import { serverFetch } from "@/utils/serverFetch";
import { revalidatePath } from "next/cache";

const CRM_ENDPOINT = {
  createLead: "/agency/create-agency-lead",
  getALLLead: "/agency/get-all-agency-leads",
  getLeadById: "/agency/get-agency-lead/",
  updateLead: "/agency/update-agency-lead"
}

export const createNewLead = async (data: any) => {
  return await serverFetch(CRM_ENDPOINT.createLead, { method: "POST", data });
};

export const getALLLead = async () => {
  return await serverFetch(CRM_ENDPOINT.getALLLead);
};

export const getLeadById = async (siteId: string) => {
  return await serverFetch(CRM_ENDPOINT.getLeadById + "/" + siteId);
};

export const updateLead = async (id: string, data: any) => {
  const response = await serverFetch(`${CRM_ENDPOINT.updateLead}/${id}`, { method: "PUT", data });
  // Refresh the leads list cache
  revalidatePath("/dashboard/leads");
  return response;
};