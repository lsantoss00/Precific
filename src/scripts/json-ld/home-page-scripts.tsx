import Script from "next/script";
import { faqJsonLd, contactPageJsonLd } from "./data";

export function HomePageScripts() {
  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="contact-page-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
    </>
  );
}

