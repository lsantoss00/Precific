"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface MultipleImportLoadingStateProps {
  setIsImporting: Dispatch<SetStateAction<boolean>>;
}

export default function MultipleImportLoadingState({
  setIsImporting,
}: MultipleImportLoadingStateProps) {
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  useEffect(() => {
    startLoading();
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-7">
      <div className="w-full flex flex-col gap-2">
        <span className="font-medium">{Math.round(progress)}%</span>
        <div className="w-full bg-slate-200 rounded-full h-[10px] overflow-hidden">
          <div
            className="bg-[#66289B] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
      <span className="font-medium">
        Estamos quase lá! Aguarde enquanto finalizamos a importação...
      </span>
    </div>
  );
}
