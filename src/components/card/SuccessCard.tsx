import React from "react";
type SuccessCardProps = {
  isOpen?: boolean,
  title?: string,
  description?: string,
  onContinue?: () => void
};

export default function SuccessCard({ isOpen = false, title = "Success!", description = "Your changes have been saved successfully.", onContinue }: SuccessCardProps) {
  if (!isOpen) return null;
  return (
    <div className="min-w-[320px] max-w-sm w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-in zoom-in-95 duration-300">
      <div className="text-6xl mb-6">✨</div>

      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        {title}
      </h1>

      <p className="text-gray-500 mt-3 font-medium leading-relaxed">
        {description}
      </p>

      <button
        onClick={onContinue}
        className="mt-8 w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] uppercase tracking-widest text-xs"
      >
        Continue
      </button>
    </div>
  );
}
