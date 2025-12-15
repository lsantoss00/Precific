import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
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
    sitemap: "https://www.precificapp.com/sitemap.xml",
  };
}
