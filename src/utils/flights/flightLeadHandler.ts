"use server";
import { revalidatePath } from "next/cache";
import { convertLeadToTicket } from "@/services/api/booking-api";

export const convertLead = async (data) => {
  const response = await convertLeadToTicket(data);
  revalidatePath("/dashboard/flight-leads");
  return response.data;
};
