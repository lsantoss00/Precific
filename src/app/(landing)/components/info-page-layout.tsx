import Column from "@/src/components/core/column";
import SectionWithBackground from "@/src/components/section-with-background";
import { ReactNode } from "react";

interface InfoPageLayoutProps {
  children: ReactNode;
}

export default function InfoPageLayout({ children }: InfoPageLayoutProps) {
  return (
    <SectionWithBackground className="py-16">
      <Column className="z-10 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-25">
        {children}
      </Column>
    </SectionWithBackground>
  );
}
