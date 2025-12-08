"use client"
import { useSelector } from 'react-redux';
import SideStepper from './SideStepper'
import StepOne from '@/components/form/flight-booking-form/step-one';
import StepTwo from '@/components/form/flight-booking-form/step-two';
import StepThree from '@/components/form/flight-booking-form/step-three';



const BookingConfirmFrom = () => {
  const { stepCount ,completedSteps } = useSelector((state: any) => state.stepperSlice);
  const renderStep = [<StepOne />, <StepTwo />, <StepThree />]

  return (
    <div className='flex justify-center gap-4 py-4 mt-6  '>
      <SideStepper />
      {
        renderStep?.map((element,index)=>{
          return (
            <div key={index} className={`${index != stepCount && "hidden"}  w-full max-w-3xl`}>
              {element}
            </div>
          )
        })
      }
    </div>
  )
}

export default BookingConfirmFrom