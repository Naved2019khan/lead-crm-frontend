
import { serverFetch } from "@/utils/serverFetch";
const FLIGHT_LEAD_ENDPOINT = {
    getAllFlightsLeads : "/flight/get-all-flight-lead",
 
}


export const getAllFlights = async () => {
  return await serverFetch(FLIGHT_LEAD_ENDPOINT.getAllFlightsLeads);
};



