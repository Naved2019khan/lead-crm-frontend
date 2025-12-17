import { convertLeadToTicket } from "@/services/api/flight-api"

export const flightLeadHandler = {
   converLead : async (data) => {
        const response = await convertLeadToTicket(data);
   }
}