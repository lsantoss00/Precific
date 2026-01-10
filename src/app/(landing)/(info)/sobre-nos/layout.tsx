import { AboutPageScripts } from "@/src/scripts/json-ld";

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AboutPageScripts />
      {children}
    </>
  );
}

