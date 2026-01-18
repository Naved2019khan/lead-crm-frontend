import { FlightLeadsTableServer } from '@/components/section/FlightLeadsTable'
import React, { Suspense } from 'react'

const FlightLeads = async () => {  
  return  (
  <>
  <h1>Flight Lead Section</h1>
  <Suspense fallback={<div>Loading...</div>} >

  <FlightLeadsTableServer  />
  </Suspense>
  </>
  )
}

export default FlightLeads