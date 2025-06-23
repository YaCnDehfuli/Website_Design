import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `Profile card for ${profile.name}, ${profile.professionalHeadline}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const artifacts = [
  { label: "RULE", mark: "=>" },
  { label: "VAD", mark: "[##][ ]" },
  { label: "CFG", mark: "o--o" },
  { label: "ATTENTION", mark: "# . #" },
] as const;

export default async function OpenGraphImage() {
  const portraitBase64 = await readFile(
    join(process.cwd(), "public/profile/yasin-dehfouli.png"),
    "base64",
  );

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
        padding: "58px 64px 44px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,242,208,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(99,242,208,.055) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          display: "flex",
          inset: 0,
          position: "absolute",
        }}
      />

      <div
        style={{
          alignItems: "center",
          display: "flex",
          flex: 1,
          gap: 66,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              color: "#63f2d0",
              display: "flex",
              fontFamily: "monospace",
              fontSize: 20,
              letterSpacing: 2,
            }}
          >
            [59][44] · ~/yasin.dev
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 70,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 0.98,
            }}
          >
            <span>Yasin</span>
            <span>Dehfouli</span>
          </div>
          <div style={{ color: "#c8ff62", display: "flex", fontSize: 31, fontWeight: 700 }}>
            {profile.professionalHeadline}
          </div>
          <div
            style={{
              color: "#91a5a3",
              display: "flex",
              fontFamily: "monospace",
              fontSize: 20,
              lineHeight: 1.45,
              maxWidth: 600,
            }}
          >
            Detection engineering · memory forensics · applied ML
          </div>
        </div>

        <div
          style={{
            background: "rgba(3,7,12,.88)",
            border: "1px solid #203445",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            width: 350,
          }}
        >
          <div
            style={{
              color: "#a78bfa",
              display: "flex",
              fontFamily: "monospace",
              fontSize: 13,
              justifyContent: "space-between",
              letterSpacing: 1,
              padding: "12px 14px",
            }}
          >
            <span>PROFILE.record</span>
            <span>[59][44]</span>
          </div>
          <img
            alt=""
            height={292}
            src={`data:image/png;base64,${portraitBase64}`}
            style={{
              background: "#0b1420",
              borderBottom: "1px solid #203445",
              borderTop: "1px solid #203445",
              objectFit: "cover",
              objectPosition: "center top",
              width: "100%",
            }}
            width={350}
          />
          <div style={{ display: "flex", width: "100%" }}>
            {artifacts.map((artifact) => (
              <div
                key={artifact.label}
                style={{
                  alignItems: "center",
                  borderRight: artifact.label === "ATTENTION" ? "none" : "1px solid #203445",
                  color: "#91a5a3",
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  fontFamily: "monospace",
                  fontSize: artifact.label === "ATTENTION" ? 8 : 10,
                  gap: 7,
                  padding: "11px 4px 12px",
                }}
              >
                <span style={{ color: "#63f2d0", display: "flex", fontSize: 15 }}>
                  {artifact.mark}
                </span>
                <span>{artifact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "1px solid #203445",
          color: "#91a5a3",
          display: "flex",
          fontFamily: "monospace",
          fontSize: 16,
          justifyContent: "space-between",
          paddingTop: 20,
          position: "relative",
        }}
      >
        <span>Toronto, Ontario</span>
        <span>@YaCnDehfuli</span>
      </div>
    </div>,
    size,
  );
}
