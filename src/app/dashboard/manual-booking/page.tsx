import FlightBookingServer from '@/components/listing/FlightBooking/FlightBookingServer'
import BookingTableToolbar from '@/components/toolbar/booking-toolbar'
import Link from 'next/link'
import { Suspense } from 'react'



const Page = () => {
  return (
    <>
      <nav>
        <div className='bg-white flex justify-end '>
          <Link href="/dashboard/manual-booking/new" className='bg-black text-white py-2 px-4 rounded-2xl mt-2'>
            <h1>+Create Manual Booking</h1>
            </Link>
        </div>
      </nav>
      <BookingTableToolbar />
      <Suspense fallback={<div>Loading...</div>}>
      <FlightBookingServer />
      </Suspense>
      </>
  )
}

export default Page 