"use client"
import { useSelector } from 'react-redux';
import StepOne from '@/components/form/flight-booking-form/step-one';
import StepTwo from '@/components/form/flight-booking-form/step-two';
import StepThree from '@/components/form/flight-booking-form/step-three';
import Tabbar from '@/components/ui/Tabbar';
import {
  NotebookPen,
  Ticket,
  PersonStanding,
  TreePalm,
  GalleryVerticalEnd,
} from "lucide-react";
import FlightBookingForm from '@/components/form/flight-booking-form';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const listing = [
   <FlightBookingForm />,
   <ToddlerPanel />,
  <ChildPanel />,
   <InfantPanel />,
];

const TABS: Tab[] = [
  { id: 1, label: "Booking", icon: <NotebookPen size={32} strokeWidth={2.5} absoluteStrokeWidth /> },
  { id: 2, label: "Fare", icon: <Ticket size={32} strokeWidth={2.5} absoluteStrokeWidth /> },
  { id: 3, label: "Passenger", icon: <PersonStanding size={32} strokeWidth={2.5} absoluteStrokeWidth /> },
  { id: 4, label: "Trip", icon: <TreePalm size={32} strokeWidth={2.5} absoluteStrokeWidth />},
  { id: 5, label: "Logs", icon: <GalleryVerticalEnd size={32} strokeWidth={2.5} absoluteStrokeWidth />},
];


const Page = () => {
  const [flightData,setFlightData] = useState({})
  const param = useParams()

  useEffect(()=>{
    console.log(param["booking-id"])
    
    // if(flightData){
    //   setFlightData(JSON.parse(flightData))
    // }
  },[])

  return (
    <div className='bg-blue-50 '>
      <Tabbar componentList={listing} TABS={TABS} />
    </div>
  )
}

export default Page



/* ======================
   Individual Tab Panels
   ====================== */

function InfantPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Infant (0 – 2 years)</h3>
      <p className="text-sm text-gray-600">
        Select options related to infant care, seating, and safety requirements.
      </p>
    </div>
  );
}

function ToddlerPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Toddler (2 – 4 years)</h3>
      <p className="text-sm text-gray-600">
        Configure toddler-specific needs such as supervision and amenities.
      </p>
    </div>
  );
}

function ChildPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Child (5 – 10 years)</h3>
      <p className="text-sm text-gray-600">
        Add preferences for school-age children, activities, or seating.
      </p>
    </div>
  );
}

function TeenPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Teen (11 – 17 years)</h3>
      <p className="text-sm text-gray-600">
        Manage options suitable for teenagers including independence settings.
      </p>
    </div>
  );
}

function GroupPanel() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Group</h3>
      <p className="text-sm text-gray-600">
        Configure details when multiple children are involved.
      </p>
    </div>
  );
}
