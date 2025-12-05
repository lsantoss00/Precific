import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Precific",
    short_name: "Precific",
    description:
      "Automatize o cálculo de preços com base em custos, impostos e margens. Simule cenários futuros da Reforma Tributária.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#66289B",
    icons: [
      {
        src: "/precific-short-logo-image.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/precific-short-logo-image.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
