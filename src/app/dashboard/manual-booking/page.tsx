import FlightBooking from '@/components/listing/FlightBooking/FlightBooking'
import BookingTableToolbar from '@/components/toolbar/booking-toolbar'
import React from 'react'


const Page = () => {
  return (
    <div>
      <BookingTableToolbar />
      <FlightBooking />
      </div>
  )
}

export default Page