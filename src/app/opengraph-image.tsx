import { ImageResponse } from "next/og";

export const alt = "Aegner Billik, S.Kom. | Fullstack & Backend Engineer";
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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
            }}
          />
          <span style={{ fontSize: 20, color: "#10b981", fontWeight: 600 }}>
            Available Immediately • Bandung (Onsite & Remote)
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: 68,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Aegner Billik, <span style={{ color: "#a855f7" }}>S.Kom.</span>
          </h1>
          <p
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: "#e4e4e7",
              margin: 0,
            }}
          >
            Fullstack & Backend Engineer
          </p>
          <p
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Next.js • Laravel • PostgreSQL ACID • Offline-First POS Systems
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: 20, color: "#71717a" }}>
            aegner.my.id
          </span>
          <span style={{ fontSize: 20, color: "#8b5cf6", fontWeight: 600 }}>
            GitHub: @BroAegg
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
