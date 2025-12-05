import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/produtos",
          "/perfil",
          "/configuracoes",
          "/suporte",
          "/auth",
        ],
      },
    ],
    sitemap: "https://www.precificapp.com/sitemap.xml",
  };
}
