"use client"

import StepOne from "@/components/form/flight-booking-form/step-one";
import StepTwo from "@/components/form/flight-booking-form/step-two";
import FlightBookingModal from "@/components/modal/FlightBookingModal";
import { getAgencySites } from "@/services/api/product-api";
import { useEffect } from "react"


const Page = () => {
 async function fetchData(){
    const res = await getAgencySites();
 }

    useEffect(() => {
        // fetchData();
    },[])
  return (
    <div>
      
      <FlightBookingModal /></div>
  )
}

export default Page