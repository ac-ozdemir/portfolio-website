import { ImageResponse } from "next/og";

// Static on purpose: link previews are cached for days, so live numbers here
// would soon be stale. Styled to match the site's root OG image.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Training Performance Dashboard — Ahmet Can Özdemir";

const stages = ["Strava", "Cloud Functions", "BigQuery", "Next.js"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f6",
          padding: "72px 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
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
              marginBottom: 36,
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
            Project · Live data
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#2d2a26",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            Training Performance Dashboard
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#69655f",
              marginTop: 24,
              display: "flex",
            }}
          >
            My own training data, refreshed nightly by a cloud pipeline.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e5e1d8",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "#2d2a26" }}>
            {stages.map((stage, index) => (
              <div key={stage} style={{ display: "flex", alignItems: "center" }}>
                {index > 0 && (
                  <div style={{ display: "flex", color: "#2c6e8e", margin: "0 16px" }}>→</div>
                )}
                {stage}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#69655f" }}>
            Ahmet Can Özdemir
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
