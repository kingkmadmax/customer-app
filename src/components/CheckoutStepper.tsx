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
    { id: 4, label: "Payment" },
    { id: 5, label: "Terms" },
    { id: 6, label: "Complete" },
  ].slice(0, totalSteps || 5);

  return (
    <div className="flex items-center mb-10">
      {steps.map((s) => (
        <div key={s.id} className="flex items-center w-full">

          <div className="flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                s.id < step
                  ? "bg-green-500 text-white"
                  : s.id === step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {s.id}
            </div>

            <span className="text-xs mt-2">{s.label}</span>
          </div>

          {s.id !== steps.length && (
            <div
              className={`flex-1 h-1 mx-2 ${
                s.id < step ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}