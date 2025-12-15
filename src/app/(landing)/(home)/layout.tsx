import { HomePageScripts } from "@/src/scripts/json-ld";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomePageScripts />
      {children}
    </>
  );
}
