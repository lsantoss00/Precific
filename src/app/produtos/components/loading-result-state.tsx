"use client";

import { Progress } from "@/src/components/core";
import Column from "@/src/components/core/column";
import { Brain, Calculator, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingResultStateProps {
  onComplete: () => void;
}

const LoadingResultState = ({ onComplete }: LoadingResultStateProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const CurrentIcon =
    currentStep < loadingSteps.length
      ? loadingSteps[currentStep].icon
      : CheckCircle2;

  const currentMessage =
    currentStep < loadingSteps.length
      ? loadingSteps[currentStep].message
      : "Concluído!";

  const progress = ((currentStep + 1) / loadingSteps.length) * 100;

  useEffect(() => {
    if (currentStep >= loadingSteps.length) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, loadingSteps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <Column className="items-center justify-center max-w-md w-full h-full self-center space-y-8">
      <CurrentIcon className="w-16 h-16 text-[#66289B] animate-pulse" />
      <p className="text-xl font-medium text-center text-[#66289B]">
        {currentMessage}
      </p>
      <Progress value={progress} className="h-3 [&>div]:bg-[#66289B]" />
    </Column>
  );
};

export default LoadingResultState;

const loadingSteps: Array<{
  id: number;
  message: string;
  icon: any;
  duration: number;
}> = [
  {
    id: 1,
    message: "IA está analisando o produto...",
    icon: Brain,
    duration: 2000,
  },
  {
    id: 2,
    message: "IA está calculando resultados...",
    icon: Calculator,
    duration: 2000,
  },
  {
    id: 3,
    message: "Finalizando análise...",
    icon: CheckCircle2,
    duration: 1000,
  },
];
