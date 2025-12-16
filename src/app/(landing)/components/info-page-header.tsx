import Column from "@/src/components/core/column";

interface InfoPageHeaderProps {
  title: string;
  description: string;
}

export default function InfoPageHeader({
  title,
  description,
}: InfoPageHeaderProps) {
  return (
    <Column as="header" className="mb-10">
      <Column className="relative mb-6 w-fit">
        <h1 className="z-10 text-4xl sm:text-5xl font-bold text-white">
          {title}
        </h1>
        <span
          className="absolute -bottom-1 left-4 h-4 w-full bg-linear-to-r from-secondary to-transparent"
          aria-hidden="true"
        />
      </Column>
      <p
        className="leading-7 text-zinc-200"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Column>
  );
}
