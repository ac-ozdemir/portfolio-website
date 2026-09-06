import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ahmet Can Özdemir — Senior Data Analyst";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#faf9f6",
          padding: "80px 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 10,
            background: "#2c6e8e",
            color: "#faf9f6",
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          AC
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#2c6e8e",
            marginBottom: 16,
            display: "flex",
          }}
        >
          Senior Data Analyst
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#2d2a26",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          Ahmet Can Özdemir
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#87817a",
            marginTop: 28,
            display: "flex",
          }}
        >
          Turning data into decisions
        </div>
      </div>
    ),
    { ...size }
  );
}
