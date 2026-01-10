import { TermsOfUseScripts } from "@/src/scripts/json-ld";

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TermsOfUseScripts />
      {children}
    </>
  );
}

