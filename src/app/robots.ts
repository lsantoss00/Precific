import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/entrar", "/termos-de-uso", "/politica-de-privacidade"],
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
        allow: ["/", "/entrar", "/termos-de-uso", "/politica-de-privacidade"],
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
