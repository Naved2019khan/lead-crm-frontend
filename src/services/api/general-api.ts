
import { axiosServer } from "@/utils/axiosInstance";
import { errorHandler } from "@/utils/errorHandler";
const GENERAL_ENDPOINT = {
    getAllEmailSubscribe : "/general/get-all-email-subscribe",
 
}


export const getAllEmailSubscribe = async () => {
  try {
     const axiosInstance = await axiosServer();
    const response = await axiosInstance.get(
      GENERAL_ENDPOINT.getAllEmailSubscribe
    );
    return response.data;
  } catch (error) {
    errorHandler(error)
  }
};


