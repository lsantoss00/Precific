"use client";

import { useEffect, useState } from "react";

interface MultipleImportLoadingStateProps {
  progress: number;
}

const MultipleImportLoadingState = ({
  progress,
}: MultipleImportLoadingStateProps) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const animate = () => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.5) return progress;
        return prev + diff * 0.1;
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [progress]);

  const getStatusMessage = (prog: number) => {
    if (prog < 15) return "Iniciando importação...";
    if (prog < 25) return "Lendo arquivo...";
    if (prog < 35) return "Processando dados...";
    if (prog < 45) return "Validando informações...";
    if (prog < 55) return "Preparando importação...";
    if (prog < 70) return "Enviando dados ao servidor...";
    if (prog < 80) return "Importando produtos...";
    if (prog < 95) return "Atualizando sistema...";
    if (prog < 100) return "Finalizando...";
    return "Importação concluída!";
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-7">
      <div className="w-full flex flex-col gap-2">
        <span className="font-medium">{Math.round(displayProgress)}%</span>
        <div className="w-full bg-slate-200 rounded-full h-[10px] overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(displayProgress, 100)}%` }}
          />
        </div>
      </div>
      <span className="font-medium text-center">
        {getStatusMessage(displayProgress)}
      </span>
    </div>
  );
};

export default MultipleImportLoadingState;
