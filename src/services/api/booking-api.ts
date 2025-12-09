import axiosInstance from "@/utils/axiosInstance";

export const createBooking = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/booking/create-booking",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
