"use client";

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
        <Flex className="absolute m-0.5 inset-0 backdrop-blur-sm items-start p-2 justify-end z-10 rounded-md">
          <div className="h-12 w-12 bg-white rounded-full">
            <PlanCrownBadge isPremium={isPremium} />
          </div>
        </Flex>
      </Show>
    </div>
  );
};

export default PremiumFeatureWrapper;
