import Column from "@/src/components/core/column";

interface CompanySectionBlockProps {
  id?: string;
  icon: React.ReactNode;
  title: string;
  heading: string;
  description?: string;
  children?: React.ReactNode;
}

const CompanySectionBlock = ({
  id,
  icon,
  title,
  heading,
  description,
  children,
}: CompanySectionBlockProps) => (
  <Column as="header" className="w-full space-y-4 sm:space-y-5 md:space-y-6">
    <Column className="gap-2 sm:gap-3">
      <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" aria-hidden="true">
        {icon}
      </span>
      <h2
        id={id}
        className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-zinc-200"
      >
        {title}
      </h2>
    </Column>
    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight">
      {heading}
    </p>
    {description && (
      <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed">
        {description}
      </p>
    )}
    {children}
  </Column>
);

export default CompanySectionBlock;
