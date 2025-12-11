import Column from "@/src/components/core/column";

export type InfoTopic = {
  title: string;
  content?: string;
  items?: string[];
};

interface InfoPageTopicsProps {
  topics: InfoTopic[];
}

export default function InfoPageTopics({ topics }: InfoPageTopicsProps) {
  return (
    <Column className="space-y-10">
      {topics?.map((topic, index) => (
        <section key={index}>
          <h2 className="mb-4 text-xl font-bold leading-8 text-white">
            {topic?.title}
          </h2>
          <p className="mb-3 leading-7 text-zinc-200">{topic?.content}</p>
          {topic?.items && topic.items.length > 0 && (
            <ol className="ml-4 list-inside list-decimal space-y-2">
              {topic.items.map((item, itemIndex) => (
                <li key={itemIndex} className="leading-7 text-zinc-200">
                  {item}
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </Column>
  );
}
