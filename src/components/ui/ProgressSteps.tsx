import React from "react";
import { Check,  ChevronRight, ChevronsRight } from "lucide-react";

interface Step {
  label: string;
  credit: string;
  completed?: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps }) => {
  const totalSteps = steps.length;
  const completedSteps = steps.filter((s) => s.completed).length;
  const progressPercent = (completedSteps / totalSteps) * 100;

  return (
    <div className="w-full relative mt-6">
      {/* Background Dashed Line */}
      <div
        className="absolute left-[10px] top-[10px] bottom-[10px] border-l border-dashed border-gray-300"
        style={{
          transform: "translateX(-50%)",
        }}
      ></div>

      {/* Completed Dashed Line */}
      <div
        className="absolute left-[10px] top-[10px] border-l border-dashed border-color-lightgreen transition-all duration-700"
        style={{
          transform: "translateX(-50%)",
          height: `${progressPercent}%`,
        }}
      ></div>

      <div className="flex flex-col gap-3 relative">
        {steps.map((step, idx) => {
          const isNext =
            !step.completed &&
            steps.slice(0, idx).every((s) => s.completed) &&
            (idx === 0 || steps[idx - 1].completed);

          const textColor = step.completed
            ? "text-color-lightgreen"
            : isNext
            ? "text-primary"
            : "text-color-lightgray";

          return (
            <div
              key={idx}
              className={`flex justify-between items-center text-xs ${textColor}`}
            >
              <div className="flex items-center gap-2 relative">
                {/* Step Circle */}
                <div
                  className={`w-5 h-5 flex items-center justify-center rounded-full  z-10 transition-all duration-300 ${
                    step.completed
                      ? "bg-color-lightgreen  text-white"
                      : isNext
                      ? " text-primary bg-[#F3FAF7]"
                      : " text-gray-400 bg-gray-100"
                  }`}
                >
                  {step.completed ? (
                    <Check size={11} strokeWidth={3} />
                  ) : isNext ? (
                    <ChevronRight size={10} strokeWidth={4} />
                  ) : (
                    <ChevronsRight size={10} strokeWidth={3} />
                  )}
                </div>

                {/* Step Label */}
                <span className={`leading-none ${isNext && "font-medium"}`}>
                  {idx + 1}. {step.label}
                </span>
              </div>

              {/* Credits */}
              <span>{step.credit}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
