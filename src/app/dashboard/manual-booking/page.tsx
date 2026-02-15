import FlightBookingServer from '@/components/listing/FlightBooking/FlightBookingServer'
import BookingTableToolbar from '@/components/toolbar/booking-toolbar'
import Link from 'next/link'
import { Suspense } from 'react'



const Page = () => {
  return (
    <div className="p-8 space-y-6">
      <nav className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Manual Bookings</h1>
          <p className="text-sm font-medium text-gray-500">Manage and create manual flight reservations.</p>
        </div>
        <Link
          href="/dashboard/manual-booking/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-6 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <span className="text-xl leading-none">+</span>
          Create Manual Booking
        </Link>
      </nav>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <BookingTableToolbar />
        <div className="p-2">
          <Suspense fallback={
            <div className="p-12 flex flex-col items-center justify-center gap-4 text-gray-400">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-black uppercase tracking-widest">Hydrating Intelligence...</span>
            </div>
          }>
            <FlightBookingServer />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Page 
