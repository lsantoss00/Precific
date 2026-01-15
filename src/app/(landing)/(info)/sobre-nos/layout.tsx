import { aboutUsJsonLd } from "@/src/scripts/json-ld/data";
import Script from "next/script";

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="about-us-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutUsJsonLd),
        }}
      />
      {children}
    </>
  );
}
