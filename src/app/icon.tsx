import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FF6B35, #E84E1B)",
          borderRadius: "14px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="60"
          viewBox="0 0 100 120"
        >
          <ellipse cx="50" cy="88" rx="30" ry="26" fill="white" />
          <ellipse cx="20" cy="52" rx="14" ry="17" fill="white" />
          <ellipse cx="50" cy="38" rx="13" ry="16" fill="white" />
          <ellipse cx="80" cy="52" rx="14" ry="17" fill="white" />
          <path
            d="M50 98 C50 98 36 86 36 80 C36 76 40 73 44 75 C46 76 48 78 50 81 C52 78 54 76 56 75 C60 73 64 76 64 80 C64 86 50 98 50 98Z"
            fill="#E84E1B"
            opacity="0.9"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
