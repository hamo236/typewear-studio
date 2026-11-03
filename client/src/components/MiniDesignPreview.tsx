import type { CSSProperties } from "react";
import { GarmentMockup } from "@/components/GarmentMockup";
import type { GarmentDesign } from "@/lib/types";

export default function MiniDesignPreview({ design, label }: { design: GarmentDesign; label: string }) {
  const layers = design.layers.filter((layer) => layer.visible && layer.side === design.side);
  return <div className="mini-design-stage" role="img" aria-label={label}>
    <GarmentMockup type={design.garmentType} color={design.garmentColor} side={design.side} label={label} className="mini-design-garment" />
    {layers.map((layer) => <div key={layer.id} className="mini-design-layer" style={{
      left: `${layer.x}%`, top: `${layer.y}%`, width: `${layer.width}%`, height: `${layer.height}%`,
      transform: `rotate(${layer.rotation}deg)`, color: layer.color,
      fontFamily: layer.fontFamily === "Cairo" ? "Cairo, sans-serif" : "DM Sans, Cairo, sans-serif",
      fontSize: `${Math.max(6, Math.min(12, layer.fontSize * .3))}px`, fontWeight: layer.bold ? 700 : 500,
      fontStyle: layer.italic ? "italic" : "normal", textAlign: layer.align,
    } as CSSProperties}>
      {layer.kind === "image" && layer.imageData ? <img src={layer.imageData} alt="" /> : <span dir="auto">{layer.text}</span>}
    </div>)}
  </div>;
}
