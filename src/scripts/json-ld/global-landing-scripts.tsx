import Script from "next/script";
import {
  softwareAppJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "./data";

export function GlobalLandingScripts() {
  return (
    <>
      <Script
        id="software-app-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}

