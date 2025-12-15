import backgroundSectionImage from "@/public/images/hero-section-background.webp";
import Column from "@/src/components/core/column";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { HTMLAttributes, ReactNode } from "react";

interface SectionWithBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function SectionWithBackground({
  children,
  className,
  ...props
}: SectionWithBackgroundProps) {
  return (
    <Column className={cn("relative bg-primary", className)} {...props}>
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
      {children}
    </Column>
  );
}
