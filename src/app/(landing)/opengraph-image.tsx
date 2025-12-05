import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Precific";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(135deg, #66289B 0%, #8B3DB8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: "bold" }}>Precific</div>
        <div style={{ fontSize: 40, marginTop: 20 }}>
          Precificação Inteligente
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
