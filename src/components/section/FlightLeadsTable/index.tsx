import { getAllFlights } from "@/services/api/flight-api"
import FlightLeadsTable from "./FlightLeadsTable"

export const FlightLeadsTableServer =  async () => {
  const data = await getAllFlights()
  if(!data?.data || !data?.data.length) return null
  
return  <FlightLeadsTable flights={data?.data} />
}
