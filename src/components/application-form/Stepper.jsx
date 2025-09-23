export default function Stepper({ currentStep }) {
  const steps = [
    "Personal Info",
    "Personal Contact Details",
    "Educational Details",
    "Parents Details",
    "Additional Information",
    "Documents",
  ];
  return (
    <div className="flex gap-2 mb-6">
      {steps.map((_, idx) => (
        <div
          key={idx}
          className={`flex-1 h-2 rounded ${
            idx <= currentStep ? "bg-[#0B56A4]" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
