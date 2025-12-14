"use client";
import { useEffect, useState } from "react";
import SignInForm from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { Modal } from "@/components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "@/redux/slice/auth-slice";
const modalStates = { signIn: 0, signUp: 1 };

export const AuthModal = () => {
  const dispatch = useDispatch();
  const { openModal } = useSelector((state: any) => state.authSlice);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "naved2019khan@gmail.com",
    password: "naved2019khan@gmail.com",
    confirmPassword: "",
  });
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const formsUI = [
    <SignInForm
      key={"signIn"}
      formData={formData}
      onChange={handleFormChange}
      onSwitchToSignUp={() => setCurrentStep(1)}
    />,
    <SignUpForm
      key={"signUp"}
      formData={formData}
      onChange={handleFormChange}
      onSwitchToSignIn={() => setCurrentStep(0)}
    />,
  ];

  useEffect(() => {
    setCurrentStep(modalStates[openModal]);
  }, [openModal]);

  return (
    <Modal isOpen={openModal} onClose={() => dispatch(setOpenModal(""))}>
      <div className="bg-black w-sm">{formsUI[currentStep]}</div>
    </Modal>
  );
};
