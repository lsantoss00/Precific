import Script from "next/script";
import { termsOfUseJsonLd, privacyPolicyJsonLd } from "./data";

export function TermsOfUseScripts() {
  return (
    <Script
      id="terms-of-use-jsonld"
      type="application/ld+json"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(termsOfUseJsonLd) }}
    />
  );
}

export function PrivacyPolicyScripts() {
  return (
    <Script
      id="privacy-policy-jsonld"
      type="application/ld+json"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicyJsonLd) }}
    />
  );
}

