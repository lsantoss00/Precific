import { PrivacyPolicyScripts } from "@/src/scripts/json-ld";

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrivacyPolicyScripts />
      {children}
    </>
  );
}

