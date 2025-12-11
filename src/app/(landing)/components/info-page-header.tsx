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
    <>
      <Column className="relative mb-10 w-fit">
        <h1 className="z-10 text-4xl sm:text-5xl font-bold text-white">
          {title}
        </h1>
        <div className="absolute -bottom-1 left-4 h-4 w-full bg-linear-to-r from-secondary to-transparent" />
      </Column>
      <p
        className="mb-10 leading-7 text-zinc-200"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </>
  );
}
