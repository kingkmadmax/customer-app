"use client";

interface Step {
  id: number;
  label: string;
}

export default function CheckoutStepper({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps?: number;
}) {
  const steps: Step[] = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "Verification" },
    { id: 3, label: "Schedule" },
    { id: 4, label: "Terms" },
    { id: 5, label: "Payment" },
    { id: 6, label: "Complete" },
  ].slice(0, totalSteps || 6);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 py-10 mb-10">
      {/* 1. The Main Flex Container */}
      <div className="flex items-start justify-between w-full gap-0">
        
        {steps.map((s, index) => (
          <div key={s.id} className="flex flex-1 items-start group relative">
            
            {/* 2. THE CIRCLE & CONNECTOR COLUMN */}
            <div className="flex flex-col items-center flex-shrink-0 relative">
              
              {/* The Circle: Using borders instead of solid fills for a 'less bold' look */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out ${
                  s.id < step
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100" // Completed
                    : s.id === step
                    ? "bg-white border-blue-600 text-blue-600 font-bold scale-110"    // Active
                    : "bg-white border-gray-200 text-gray-400 font-normal"         // Upcoming
                }`}
              >
                {/* Use checkmark for completed, number for active/upcoming */}
                {s.id < step ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm">{s.id}</span>
                )}
              </div>

              {/* 3. THE LABEL SECTION (Centered under circle) */}
              <div className="mt-4 absolute top-10 w-32 text-center -left-11">
                <p
                  className={`text-xs sm:text-sm transition-colors duration-300 truncate ${
                    s.id <= step ? "text-gray-900 font-semibold" : "text-gray-500 font-medium"
                  }`}
                >
                  {s.label}
                </p>
              </div>
            </div>

            {/* 4. THE CONNECTOR LINE */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-10 flex items-center px-2">
                <div
                  className={`h-0.5 w-full rounded-full transition-all duration-700 ease-in-out ${
                    s.id < step ? "bg-blue-600" : "bg-gray-100"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}