import FlightBooking from '@/components/listing/FlightBooking/FlightBooking'
import BookingTableToolbar from '@/components/toolbar/booking-toolbar'
import Link from 'next/link'



const Page = () => {
  return (
    <div>
      <nav>
        <div className='bg-white flex justify-end px-12'>
          <Link href="/dashboard/manual-booking/new" className='bg-black text-white py-2 px-4 rounded-2xl mt-2'>
            <h1>+Create Manual Booking</h1></Link>
        </div>
      </nav>
      <BookingTableToolbar />
      <FlightBooking />
      </div>
  )
}

export default Page 