"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabbar from "@/components/ui/Tabbar";
import { NotebookPen, Ticket, PersonStanding, TreePalm, GalleryVerticalEnd, Code} from "lucide-react";
import FlightBookingForm from "@/components/form/flight-booking-form";
import { useParams } from "next/navigation";
import { setPageData } from "@/redux/slice/page-data-slice";
import { getManualBookingsById } from "@/services/api/booking-api";
import FareCard from "@/components/section/manualBooking/FareCard";
import TripCard from "@/components/section/manualBooking/TripCard";
import PassengerList from "@/components/section/manualBooking/PassangerInfoCard";
import BookingHistoryTimeline from "@/components/section/manualBooking/BookingHistoryTimeline";

const listing = [
  <FlightBookingForm key={0} />,
  <FareCard  key={1}/>,
  <PassengerList  key={2}/>,
  <TripCard  key={3}/>,
  <BookingHistoryTimeline key={4}/>,
  <DebugPanel key={5}/>
];

const TABS: Tab[] = [
  {
    id: 1,
    label: "Booking",
    icon: <NotebookPen size={32} strokeWidth={2.5} absoluteStrokeWidth />,
  },
  {
    id: 2,
    label: "Fare",
    icon: <Ticket size={32} strokeWidth={2.5} absoluteStrokeWidth />,
  },
  {
    id: 3,
    label: "Passenger",
    icon: <PersonStanding size={32} strokeWidth={2.5} absoluteStrokeWidth />,
  },
  {
    id: 4,
    label: "Trip",
    icon: <TreePalm size={32} strokeWidth={2.5} absoluteStrokeWidth />,
  },
  {
    id: 5,
    label: "Logs",
    icon: (
      <GalleryVerticalEnd size={32} strokeWidth={2.5} absoluteStrokeWidth />
    ),
  },

  {
    id: 6,
    label: "Debug Value",
    icon: (
      <Code size={32} strokeWidth={2.5} absoluteStrokeWidth />
    ),
  },
];

const Page = () => {
  const param = useParams();
  const dispatch = useDispatch();


  const fetchBookingData = async (id) => {
    const response = await getManualBookingsById(id);
    dispatch(setPageData(response.data));
  };

  useEffect(() => {
    if (!param["booking-id"]) return;
    fetchBookingData(param["booking-id"]);
  }, []);

  return (
    <div className="bg-blue-50 ">
      <Tabbar componentList={listing} TABS={TABS} />
    </div>
  );
};

export default Page;

/* ======================
   Individual Tab Panels
   ====================== */

function DebugPanel() {
  const flightData = useSelector((state) => state?.pageDataSlice?.data);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2"></h3>
     <pre>
        <code>
        {JSON.stringify(flightData, null, 2) }
        </code>
     </pre>
    </div>
  );
}
