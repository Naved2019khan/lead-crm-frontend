"use server"
import { serverFetch } from "@/utils/serverFetch";
import { errorHandler } from "@/utils/errorHandler";
import { revalidatePath } from "next/cache";
const FLIGHT_BOOKING_ENDPOINT = {
    convertFlightLead : "/booking/convert-flight-lead",
}

export const createBooking = async (data: any) => {
  return await serverFetch("/booking/create-booking", { method: "POST", data });
};

export const updateBooking = async (data: any) => {
  return await serverFetch("/booking/update-booking/" + data._id, { method: "POST", data });
}
export const getManualBookings = async () => {
  return await serverFetch("/booking/get-all-flight-booking");
};
export const getManualBookingsById = async (params: any) => {
  return await serverFetch(`/booking/get-booking/${params}`, { method: "POST" });
};


export const convertLeadToTicket = async (data: any) => {
  const response = await serverFetch(FLIGHT_BOOKING_ENDPOINT.convertFlightLead+"/"+data._id, { method: "POST", data: {} });
  revalidatePath("/");
  return response;
};