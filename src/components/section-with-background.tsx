import backgroundSectionImage from "@/public/images/hero-section-background.webp";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { ReactNode } from "react";

type SectionWithBackgroundProps = React.ComponentProps<"div"> & {
  as?: React.ElementType;
  children: ReactNode;
};

export default function SectionWithBackground({
  children,
  className,
  as: Component = "section",
  ...props
}: SectionWithBackgroundProps) {
  return (
    <Component
      className={cn("relative bg-primary flex flex-col", className)}
      {...props}
    >
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
    </Component>
  );
}
