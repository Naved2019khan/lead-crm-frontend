import axiosInstance from "@/utils/axiosInstance";
const CAPTURE_ENDPOINT = {
    get_capture_leaa : "/_next/all-capture-lead",
}

export const getAllCapture = async () => {
  try {
    const response = await axiosInstance.get(CAPTURE_ENDPOINT.get_capture_leaa,);
    return response.data;
  } catch (error) {
    throw error;
  }
};