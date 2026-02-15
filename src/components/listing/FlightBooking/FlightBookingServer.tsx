import { getManualBookings } from '@/services/api/booking-api'
import FlightBooking from './FlightBooking'


const FlightBookingServer = async () => {
  let bookingResponse;
  try {
    const response = await getManualBookings()
    bookingResponse = response?.data ?? []
  } catch (error) {
    console.log(error)
  }

  return (
    <FlightBooking bookingResponse={bookingResponse} />
  )
}

export default FlightBookingServer
