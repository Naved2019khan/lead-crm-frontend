import FlightLeadsTable from '@/components/section/FlightLeadsTable'
import { getAllFlights } from '@/services/api/flight-api'
import React from 'react'

const FlightLeads = async () => {
    let response  = await getAllFlights()
    
  return  <FlightLeadsTable initialLeads={response.data} />
}

export default FlightLeads