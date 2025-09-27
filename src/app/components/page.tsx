import ComponentsDemonstration from "@/src/components/components-demonstration";
import Column from "@/src/components/core/column";

export default function ComponentsPage() {
  return (
    <Column className="w-full justify-center items-center space-y-4">
      <ComponentsDemonstration />
    </Column>
  );
}
