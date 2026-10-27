import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ahmet Can Özdemir — Senior Data Analyst";

// Mirrors the top of the home page: name and role on the left, headshot on the right.
export default async function Image() {
  const headshot = await readFile(join(process.cwd(), "public", "headshot.jpg"));
  const headshotSrc = `data:image/jpeg;base64,${headshot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#faf9f6",
          padding: "72px 88px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
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
              fontSize: 66,
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
              color: "#69655f",
              marginTop: 24,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Turning data into decisions: data analysis, dashboard design and KPI frameworks.
          </div>
          <div style={{ display: "flex", marginTop: 40 }}>
            <div
              style={{
                display: "flex",
                background: "#2c6e8e",
                color: "#faf9f6",
                fontSize: 24,
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: 10,
              }}
            >
              acozdemir.com
            </div>
          </div>
        </div>
        <img
          src={headshotSrc}
          width={320}
          height={320}
          alt=""
          style={{ borderRadius: 9999, objectFit: "cover" }}
        />
      </div>
    ),
    { ...size }
  );
}
