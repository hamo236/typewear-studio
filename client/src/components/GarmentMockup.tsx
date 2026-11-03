import { useId } from "react";
import type { GarmentSide, GarmentType } from "@/lib/types";

export function GarmentMockup({
  type,
  color,
  side = "front",
  className = "",
  designText,
  label,
}: {
  type: GarmentType;
  color: string;
  side?: GarmentSide;
  className?: string;
  designText?: string;
  label: string;
}) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const tshirt = "M132 54 94 80 48 63 15 145 60 170 87 139 83 374Q200 392 317 374l-4-235 27 31 45-25-33-82-46 17-38-26q-19 28-68 28t-68-28Z";
  const hoodie = "M132 54 94 80 48 63 15 145 60 170 87 139 83 374Q200 392 317 374l-4-235 27 31 45-25-33-82-46 17-38-26q-19 28-68 28t-68-28Z";
  const cap = "M66 240Q72 92 200 74q130 18 135 166l31 21q-10 67-88 77H126q-84-7-94-78Z";
  const path = type === "cap" ? cap : type === "hoodie" ? hoodie : tshirt;

  return (
    <div className={`garment-mockup ${className}`}>
      <svg viewBox="0 0 400 440" role="img" aria-label={label} className="garment-svg">
        <title>{label}</title>
        <defs>
          <linearGradient id={`${id}-cloth`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={color} />
            <stop offset=".48" stopColor={color} />
            <stop offset="1" stopColor="#111715" stopOpacity=".25" />
          </linearGradient>
          <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#fff" stopOpacity=".28" />
            <stop offset=".45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#111" stopOpacity=".13" />
          </linearGradient>
          <filter id={`${id}-shadow`} x="-20%" y="-15%" width="140%" height="145%">
            <feDropShadow dx="0" dy="13" stdDeviation="12" floodColor="#27251f" floodOpacity=".15" />
          </filter>
        </defs>
        <ellipse cx="204" cy="407" rx="126" ry="14" fill="#1d2221" opacity=".1" />
        <g filter={`url(#${id}-shadow)`}>
          {type === "hoodie" && (
            <path d="M145 66Q157 14 200 10q44 4 56 56-27 36-56 34-29 2-55-34Z" fill={`url(#${id}-cloth)`} stroke="#101513" strokeOpacity=".18" strokeWidth="3" />
          )}
          <path d={path} fill={`url(#${id}-cloth)`} stroke="#101513" strokeOpacity=".18" strokeWidth="3" strokeLinejoin="round" />
          <path d={path} fill={`url(#${id}-shine)`} opacity=".55" />
          {type === "cap" ? (
            <g fill="none" stroke="#111715" strokeOpacity=".19" strokeWidth="3">
              {side === "front" ? <>
                <path d="M96 211q103 51 208 0M199 78v147M67 241q123-20 268 0" />
                <path d="M133 309q67 12 135 0" stroke="#fff" strokeOpacity=".25" />
              </> : <>
                <path d="M97 211q103 48 206 0M76 241q124-20 248 0M199 80v142" />
                <path d="M145 286q55 22 110 0v28q-55 17-110 0Z" stroke="#fff" strokeOpacity=".28" />
                <path d="M172 285v28m56-28v28" strokeDasharray="3 5" />
              </>}
            </g>
          ) : (
            <g fill="none" stroke="#111715" strokeOpacity=".14" strokeWidth="3">
              {side === "front" ? <path d="M168 92q32 31 64 0" stroke="#fff" strokeOpacity=".38" strokeWidth="4" /> : <path d="M132 72q68 42 136 0M107 151q93 30 186 0" />}
              <path d="M112 108 95 160M288 108l17 52M101 343q16 12 4 30M299 343q-16 12-4 30" />
              {type === "hoodie" && <><path d="M145 66q24 33 55 33t55-33" stroke="#fff" strokeOpacity=".35" /><path d="M168 96v78m64-78v78" strokeDasharray="4 6" /><path d="M145 282q55-12 110 0v53q-55 17-110 0Z" /></>}
            </g>
          )}
          {designText && side === "front" && type !== "cap" && (
            <text x="200" y="235" textAnchor="middle" fill={color === "#343A3B" ? "#F7F5F0" : "#1D2221"} fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="28" letterSpacing="-1">{designText}</text>
          )}
          {designText && side === "front" && type === "cap" && (
            <text x="200" y="212" textAnchor="middle" fill={color === "#343A3B" ? "#F7F5F0" : "#1D2221"} fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="23">{designText}</text>
          )}
          <path d={path} fill="none" stroke="#fff" strokeOpacity=".19" strokeWidth="1.2" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
