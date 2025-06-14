import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.professionalHeadline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#060b12",
        color: "#e8f2f0",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "64px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,242,208,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,242,208,.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          display: "flex",
          inset: 0,
          position: "absolute",
        }}
      />
      <div
        style={{
          color: "#63f2d0",
          display: "flex",
          fontFamily: "monospace",
          fontSize: 22,
          letterSpacing: 3,
          position: "relative",
        }}
      >
        SECURITY_ENGINEERING / MEMORY_FORENSICS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -3 }}>
          {profile.name}
        </div>
        <div style={{ color: "#c8ff62", display: "flex", fontSize: 34, fontWeight: 700 }}>
          {profile.professionalHeadline}
        </div>
        <div
          style={{
            color: "#91a5a3",
            display: "flex",
            fontFamily: "monospace",
            fontSize: 22,
          }}
        >
          explainable detection · analyst-ready artifacts · reproducible research
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          borderTop: "1px solid #203445",
          color: "#a78bfa",
          display: "flex",
          fontFamily: "monospace",
          fontSize: 18,
          justifyContent: "space-between",
          paddingTop: 24,
          position: "relative",
        }}
      >
        <span>TORONTO, ONTARIO</span>
        <span>YaCnDehfuli</span>
      </div>
    </div>,
    size,
  );
}
