import { ImageResponse } from "next/og";

// Image metadata
export const alt = "ASTM - Ai Sở Thì Mua | Mua tài khoản AI Tools giá rẻ";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: "bold",
            background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "24px",
          }}
        >
          ASTM
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: "600",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Ai Sở Thì Mua
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Mua tài khoản AI Tools giá rẻ, uy tín
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#64748b",
            marginTop: "24px",
          }}
        >
          ChatGPT • Midjourney • Claude • GitHub Copilot
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
