import { ImageResponse } from "next/og";

// Rendered once at build time into out/og-image.png (static export), matching siteConfig.ogImage.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#090d16",
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#94a3b8" }}>
          <span>satohjiro.github.io</span>
          <span>Ho Chi Minh City, Vietnam</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Nguyen Tran Anh
            <span style={{ color: "#3b82f6" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#60a5fa" }}>
            Software Engineer — Frontend
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            paddingTop: 28,
            borderTop: "1px solid #1e293b",
            fontSize: 28,
            color: "#cbd5e1",
          }}
        >
          <span>3+ years</span>
          <span>React / Vue.js / Next.js / TypeScript</span>
          <span>Valedictorian, NLU</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
