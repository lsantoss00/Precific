import { privacyPolicyJsonLd } from "@/src/scripts/json-ld/data";
import Script from "next/script";

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="privacy-policy-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyPolicyJsonLd),
        }}
      />
      {children}
    </>
  );
}
