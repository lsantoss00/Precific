import Column from "@/src/components/core/column";

interface CompanySectionBlockProps {
  icon: React.ReactNode;
  title: string;
  heading: string;
  description?: string;
  children?: React.ReactNode;
}

const CompanySectionBlock = ({
  icon,
  title,
  heading,
  description,
  children,
}: CompanySectionBlockProps) => (
  <Column className="max-w-lg space-y-6">
    <Column className="gap-3">
      {icon}
      <h3 className="text-base font-bold text-zinc-200 md:text-2xl">{title}</h3>
    </Column>
    <p className="text-[1.75rem] text-white font-bold md:text-4xl">{heading}</p>
    {description && <span className="text-lg text-white">{description}</span>}
    {children}
  </Column>
);

export default CompanySectionBlock;
