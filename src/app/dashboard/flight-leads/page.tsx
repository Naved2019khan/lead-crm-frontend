import FlightLeadsTable from '@/components/section/FlightLeadsTable'
import { getAllFlights } from '@/services/api/flight-api'
import React from 'react'

const FlightLeads = async () => {
    
  let data = await getAllFlights()
    
  return  <FlightLeadsTable  flights={data?.data}/>
}

export default FlightLeads