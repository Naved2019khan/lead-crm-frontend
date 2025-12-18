'use server'
import { revalidatePath } from 'next/cache'
import { convertLeadToTicket } from "@/services/api/booking-api";


export const flightLeadHandler = {
   converLead : async (data) => {
      return await convertLeadToTicket(data);
      revalidatePath('/');
   }
}