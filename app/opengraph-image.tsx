import { ImageResponse } from "next/og";
import { AGENCY } from "@/lib/constants";

/**
 * Generated share card.
 *
 * Replaces the old `/og-image.png` reference in lib/assets.ts, which pointed
 * at a file that never existed — every share of this site on Slack, WhatsApp,
 * LinkedIn or X rendered without an image.
 *
 * Generating it here means the card can never drift from the brand tokens and
 * there is no binary to keep in sync. Statically generated at build time.
 *
 * ImageResponse renders through Satori: flexbox only (no grid), every element
 * with more than one child needs an explicit `display: flex`, and there is no
 * support for CSS variables — hence the literal hex values below.
 */

export const alt = `${AGENCY.name} — AI agents that answer calls, reply to messages, and clear admin`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const AMBER = "#d9a15b";
const SAND = "#e8c89a";
const INK = "#0b0b0d";
const TEXT = "#e8e4dc";
const DIM = "#8a8680";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          backgroundImage: `radial-gradient(ellipse 90% 70% at 20% -10%, rgba(217,161,91,0.22), transparent 60%), radial-gradient(ellipse 60% 60% at 100% 100%, rgba(184,130,63,0.14), transparent 55%)`,
          padding: 72,
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: AMBER,
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: AMBER,
            }}
          >
            {AGENCY.name}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.06,
              letterSpacing: -2.5,
              color: TEXT,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Answer every call.</span>
            <span>Clear every inbox.</span>
            <span style={{ color: SAND }}>Automatically.</span>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 27,
              lineHeight: 1.45,
              color: DIM,
              maxWidth: 880,
            }}
          >
            AI agents that answer your phones, reply to your messages, and take care of the
            repetitive admin — around the clock, in any language.
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(232,228,220,0.12)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["Voice", "WhatsApp", "Email", "Documents"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  fontSize: 20,
                  color: SAND,
                  border: "1px solid rgba(217,161,91,0.3)",
                  borderRadius: 999,
                  padding: "8px 20px",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", fontSize: 22, color: DIM }}>
            {AGENCY.domain.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
