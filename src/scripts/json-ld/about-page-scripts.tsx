import Script from "next/script";
import { aboutPageJsonLd } from "./data";

export function AboutPageScripts() {
  return (
    <Script
      id="about-page-jsonld"
      type="application/ld+json"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
    />
  );
}

