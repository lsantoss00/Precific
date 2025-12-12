import Column from "@/src/components/core/column";

interface CompanyTopicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CompanyTopicCard = ({
  icon,
  title,
  description,
}: CompanyTopicCardProps) => (
  <Column className="relative w-full xl:max-w-2xl items-center justify-center space-y-6 rounded-lg bg-black/40 shadow-2xl px-4 py-6 lg:h-60 lg:flex-row lg:space-y-0 lg:px-0 lg:py-0">
    <Column className="w-full lg:w-auto">
      <span className="-left-10 top-20 h-fit w-fit rounded-full bg-secondary p-3 text-white lg:absolute lg:p-6">
        {icon}
      </span>
    </Column>
    <Column className="space-y-4 lg:py-12 lg:pl-12 xl:pl-16 lg:pr-8 w-full">
      <h4 className="text-xl font-bold lg:text-2xl text-white">{title}</h4>
      <span className="text-base lg:text-lg text-zinc-200">{description}</span>
    </Column>
  </Column>
);

export default CompanyTopicCard;
