import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0f",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 16,
          letterSpacing: "-0.5px",
        }}
      >
        <span style={{ color: "#f0f0f5" }}>AP</span>
        <span style={{ color: "#6c63ff" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
