"use client";

import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import PlanCrownBadge from "@/src/components/plan-crown-badge";
import { ReactNode } from "react";

interface PremiumFeatureWrapperProps {
  children: ReactNode;
  isPremium?: boolean;
}

const PremiumFeatureWrapper = ({
  children,
  isPremium = false,
}: PremiumFeatureWrapperProps) => {
  return (
    <div className="relative w-full h-full">
      {children}
      <Show when={isPremium}>
        <Flex className="absolute mb-0.5 inset-0 backdrop-blur-sm flex items-center justify-center z-10 rounded-md ">
          <Column className="flex flex-col items-center gap-2 p-4 bg-white shadow-sm backdrop-blur-sm rounded-xl border-2 border-amber-500/50 mx-4">
            <PlanCrownBadge isPremium={isPremium} />
            <Column className="text-center">
              <p className="text-lg font-semibold mb-1">Plano Pago</p>
              <span className="text-sm text-muted-foreground">
                Faça upgrade do seu plano para visualizar este gráfico.
              </span>
            </Column>
          </Column>
        </Flex>
      </Show>
    </div>
  );
};

export default PremiumFeatureWrapper;
