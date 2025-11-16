"use client"

import { useState } from "react"
import SignInForm from "./SignInForm"
import { SignUpForm } from "./SignUpForm"

export const AuthModal = () =>{
    const [currentStep,setCurrentStep] = useState(0)

    
    const formsUI = [<SignInForm /> ,<SignUpForm onSwitchToSignIn={()=>setCurrentStep(0)} />]
    return  (<div className="bg-black">
    {formsUI[currentStep]}</div>)

    
}