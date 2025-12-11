import backgroundSectionImage from "@/public/images/hero-section-background.webp";
import Column from "@/src/components/core/column";
import { ReactNode } from "react";

interface InfoPageLayoutProps {
  children: ReactNode;
}

export default function InfoPageLayout({ children }: InfoPageLayoutProps) {
  return (
    <Column className="relative bg-primary py-16">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundSectionImage.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <Column className="z-10 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-25">
        {children}
      </Column>
    </Column>
  );
}
