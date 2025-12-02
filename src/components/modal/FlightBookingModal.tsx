import React from 'react'
import StepOne from '../form/flight-booking-form/step-one';
import StepTwo from '../form/flight-booking-form/step-two';
import { Modal } from '../ui/Modal';
import { Button } from '../button/Button';


const FlightBookingModal = () => {
    const [currentStep, setCurrentStep] = React.useState(0);

    const renderForm = [
        <StepOne key="step-one" />,
        <StepTwo key="step-two" />,
    ];

    return (
    <div>
        <Modal isOpen={true} onClose={() => {}} title="Flight Booking">
            <div className='max-h-screen overflow-x-visible'>
        {renderForm[currentStep]}
        <Button onClick={() => setCurrentStep(currentStep + 1)}>
            {currentStep < renderForm.length - 1 ? 'Next' : 'Submit'}
        </Button>

            </div>
        </Modal>
        </div>
  )
}

export default FlightBookingModal