import axiosInstance from "@/utils/axiosInstance";
import { errorHandler } from "@/utils/errorHandler";
const FLIGHT_LEAD_ENDPOINT = {
    getAllFlightsLeads : "/flight/get-all-flight-lead",
 
}


export const getAllFlights = async () => {
  try {
    const response = await axiosInstance.get(
      FLIGHT_LEAD_ENDPOINT.getAllFlightsLeads
    );
    return response.data;
  } catch (error) {
    errorHandler(error)
  }
};



