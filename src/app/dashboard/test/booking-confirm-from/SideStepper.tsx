// components/Stepper.tsx
'use client';

import { useState } from 'react';
import { CheckCircle, Circle, CircleDot, Edit2, Edit3 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { handleEdit } from '@/redux/slice/stepper-slice';

interface Step {
  id: number;
  title: string;
  subtitle: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Personal Information',
    subtitle: 'Help us get to know you better'
  },
  {
    id: 2,
    title: 'Travel Preferences',
    subtitle: 'Share with us your travel style'
  },
  {
    id: 3,
    title: 'Welcome Aboard!',
    subtitle: 'Please confirm your email'
  }
];

interface StepperProps {
  stepCount: number;
  completedSteps: number[];
}

export default function SideStepper({ }: StepperProps) {
  const { stepCount } = useSelector((state: any) => state.stepperSlice);
  const dispatch = useDispatch();


  return (
    <div className="bg-[#FFF5F0] p-6 rounded-lg h-full md:80">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800">Wayfarer</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCurrent = step.id === stepCount + 1;
          const isCompleted = stepCount >= step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative mb-0">
              <div className="flex items-start gap-4">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : isCurrent
                          ? 'bg-white border-orange-500 text-orange-500'
                          : 'bg-white border-gray-300 text-gray-500'
                      }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>

                  {/* Vertical line */}
                  {!isLast && (
                    <div
                      className={`w-0.5 h-18 mx-auto ${isCompleted
                          ? 'bg-orange-500'
                          : 'bg-gray-300'
                        }`}
                    />
                  )}
                </div>


                {/* Step content */}
                <div className="flex-1">
                  <h3 className={`font-medium ${isCompleted
                      ? 'text-gray-800'
                      : isCurrent
                        ? 'text-orange-500'
                        : 'text-gray-600'
                    }`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs mt-1 ${isCompleted
                      ? 'text-gray-600'
                      : isCurrent
                        ? 'text-orange-500'
                        : 'text-gray-400'
                    }`}>
                    {step.subtitle}
                  </p>

                </div>

                {isCompleted && <button onClick={() => dispatch(handleEdit(step.id - 1))} className='flex items-center gap-1 px-1 mt-2 text-white font-semibold text-xs bg-orange-600 rounded'>
                  <Edit2 className='size-3 font-medium' /> Edit
                </button>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200">
      </div>
    </div>
  );
}