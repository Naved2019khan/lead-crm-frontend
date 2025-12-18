import SideStepper from "@/app/dashboard/manual-booking/[booking-id]/SideStepper";
import React from "react";
import { useSelector } from "react-redux";
import StepOne from "./step-one";
import StepTwo from "./step-two";
import StepThree from "./step-three";

type Props = {};

const FlightBookingForm = (props: Props) => {
  const { stepCount } = useSelector((state: any) => state.stepperSlice);
  const renderStep = [<StepOne />, <StepTwo />, <StepThree />];

  return (
    <div className="grid grid-cols-[1fr_4fr] mx-36  ">
      <SideStepper />
      <div>
      {renderStep?.map((element, index) => {
        return (
          <div
          key={index}
          className={`${index != stepCount && "hidden"}  w-full `}
          >
            {element}
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default FlightBookingForm;
