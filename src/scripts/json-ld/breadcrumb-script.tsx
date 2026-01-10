"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export function BreadcrumbScript() {
  const pathname = usePathname();

  const pageNames: Record<string, string> = {
    "/sobre-nos": "Sobre Nós",
    "/politica-de-privacidade": "Política de Privacidade",
    "/termos-de-uso": "Termos de Uso",
  };

  const pageName = pageNames[pathname];

  if (!pageName) {
    return null;
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: "https://precificapp.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `https://precificapp.com${pathname}`,
      },
    ],
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
  );
}
