"use server"
import { axiosServer } from "@/utils/axiosInstance";
import { errorHandler } from "@/utils/errorHandler";
import { revalidatePath } from "next/cache";
const FLIGHT_BOOKING_ENDPOINT = {
    convertFlightLead : "/booking/convert-flight-lead",
}

export const createBooking = async (data) => {
  try {
    const axiosInstance = await axiosServer();
    const response = await axiosInstance.post("/booking/create-booking",data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBooking = async (data) => {
  try {
       const axiosInstance = await axiosServer();
    const response = await axiosInstance.post("/booking/update-booking/" + data._id,
      data
    );
    return response.data;
  } catch (error) {
      errorHandler(error)
    throw error;
  }
}
export const getManualBookings = async () => {
  try {
       const axiosInstance = await axiosServer();
    const response = await axiosInstance.get(
      "/booking/get-all-flight-booking"
    );
    return response.data;
  } catch (error) {
    errorHandler(error)
  }
};
export const getManualBookingsById = async (params) => {
  try {
       const axiosInstance = await axiosServer();
    const response = await axiosInstance.post(
      `/booking/get-booking/${params}`
    );
    return response.data;
  } catch (error) {
    errorHandler(error)
  }
};


export const convertLeadToTicket = async (data) => {
  try {
       const axiosInstance = await axiosServer();
    const response = await axiosInstance.post(
      FLIGHT_BOOKING_ENDPOINT.convertFlightLead+"/"+data._id, {}
    );
    revalidatePath("/");
    return response.data;
  } catch (error) {
    errorHandler(error)
  } finally {
  }
};