import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/entrar", "/criar-senha", "/redefinir-senha"],
        disallow: [
          "/dashboard",
          "/produtos",
          "/perfil",
          "/configuracoes",
          "/suporte",
          "/auth/*",
          "/api/*",
        ],
      },
    ],
    sitemap: "https://www.precificapp.com/sitemap.xml",
  };
}
