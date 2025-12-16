import axiosInstance from "@/utils/axiosInstance";
import { errorHandler } from "@/utils/errorHandler";

export const createBooking = async (data) => {
  try {
    const response = await axiosInstance.post("/booking/create-booking",data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBooking = async (data) => {
  try {
    const response = await axiosInstance.post("/booking/update-booking/" + data._id,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getManualBookings = async () => {
  try {
    const response = await axiosInstance.get(
      "/booking/get-all-flight-booking"
    );
    return response.data;
  } catch (error) {
    errorHandler(error)
  }
};
