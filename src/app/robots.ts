import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/entrar",
          "/sobre-nos",
          "/termos-de-uso",
          "/politica-de-privacidade",
        ],
        disallow: [
          "/dashboard",
          "/produtos",
          "/perfil",
          "/configuracoes",
          "/suporte",
          "/criar-senha",
          "/redefinir-senha",
          "/auth/*",
          "/api/*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/entrar",
          "/sobre-nos",
          "/termos-de-uso",
          "/politica-de-privacidade",
        ],
        disallow: [
          "/dashboard",
          "/produtos",
          "/perfil",
          "/configuracoes",
          "/suporte",
          "/criar-senha",
          "/redefinir-senha",
          "/auth/*",
          "/api/*",
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: "https://www.precificapp.com/sitemap.xml",
  };
}
