import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import type { DesignLayer, GarmentDesign } from "@/lib/types";
import { GarmentMockup } from "./GarmentMockup";

export type CanvasAction = "move" | "rotate" | "resize-nw" | "resize-ne" | "resize-sw" | "resize-se";
export type NudgeKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

export default function EditorCanvas({
  design, selectedId, zoom, guideX, guideY, onSelect, onDelete, onNudge,
  onPointerStart, onPointerMove, onPointerEnd, locale,
}: {
  design: GarmentDesign;
  selectedId: string | null;
  zoom: number;
  guideX: boolean;
  guideY: boolean;
  onSelect: (id: string | null) => void;
  onDelete: (id: string) => void;
  onNudge: (id: string, key: NudgeKey, largerStep: boolean) => void;
  onPointerStart: (event: ReactPointerEvent<HTMLDivElement>, layer: DesignLayer, action: CanvasAction) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerEnd: (event: ReactPointerEvent<HTMLDivElement>) => void;
  locale: "en" | "ar";
}) {
  const isArabic = locale === "ar";
  const visibleLayers = design.layers.filter((layer) => layer.visible && layer.side === design.side);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const layerNode = target.closest<HTMLElement>("[data-layer-id]");
    if (!layerNode) {
      onSelect(null);
      return;
    }
    const id = layerNode.dataset.layerId;
    const layer = visibleLayers.find((item) => item.id === id);
    if (!layer) return;
    const actionNode = target.closest<HTMLElement>("[data-action]");
    const action = (actionNode?.dataset.action as CanvasAction | undefined) ?? "move";
    if (layer.locked && action !== "move") return;
    onPointerStart(event, layer, action);
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLButtonElement>, layer: DesignLayer) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      onDelete(layer.id);
      return;
    }
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      onNudge(layer.id, event.key as NudgeKey, event.shiftKey);
    }
  };

  return <div className="canvas-viewport" onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd}>
    <div className="canvas-zoom-wrap" style={{ transform: `scale(${zoom / 100})` }}>
      <div className={`garment-stage garment-stage-${design.garmentType}`} onPointerDown={handlePointerDown}>
        <GarmentMockup type={design.garmentType} color={design.garmentColor} side={design.side} label={`${design.garmentType} ${design.side} design canvas`} className="canvas-garment" />
        <div className={`print-boundary ${design.garmentType === "cap" ? "print-boundary-cap" : ""}`} aria-hidden="true"><span>{isArabic ? "مساحة الطباعة" : "PRINT AREA"}</span></div>
        {guideX && <span className="snap-guide snap-guide-x" aria-hidden="true" />}
        {guideY && <span className="snap-guide snap-guide-y" aria-hidden="true" />}
        {visibleLayers.map((layer) => <div
          className={`design-layer ${selectedId === layer.id ? "is-selected" : ""} ${layer.locked ? "is-locked" : ""}`}
          key={layer.id}
          data-layer-id={layer.id}
          style={{
            left: `${layer.x}%`, top: `${layer.y}%`, width: `${layer.width}%`, height: `${layer.height}%`,
            transform: `rotate(${layer.rotation}deg)`, color: layer.color,
            fontFamily: layer.fontFamily === "Cairo" ? "Cairo, sans-serif" : "DM Sans, Cairo, sans-serif",
            fontSize: `${layer.fontSize}px`, fontWeight: layer.bold ? 700 : 500,
            fontStyle: layer.italic ? "italic" : "normal", textAlign: layer.align,
          }}
          role="group"
          aria-label={`${layer.kind === "text" ? (isArabic ? "طبقة كتابة" : "Text layer") : (isArabic ? "طبقة صورة" : "Image layer")}: ${layer.kind === "text" ? layer.text : layer.imageName ?? "image"}`}
        >
          <button className="design-layer-target" type="button" aria-pressed={selectedId === layer.id}
            aria-label={`${isArabic ? "حدد" : "Select"} ${layer.kind === "text" ? (layer.text || (isArabic ? "طبقة كتابة" : "text layer")) : (layer.imageName ?? (isArabic ? "طبقة صورة" : "image layer"))}. ${isArabic ? "استخدم الأسهم للتحريك، وShift مع الأسهم لتحريك أسرع." : "Use arrow keys to nudge; Shift plus arrows moves farther."}`}
            onFocus={() => onSelect(layer.id)} onClick={() => onSelect(layer.id)} onKeyDown={(event) => handleKeyboard(event, layer)} />
          <div className="design-layer-visual" aria-hidden="true">
            {layer.kind === "image" && layer.imageData ? <img className="design-image" src={layer.imageData} alt="" draggable={false} /> : <span className="design-layer-text">{layer.text}</span>}
          </div>
          {selectedId === layer.id && !layer.locked && <>
            <button className="resize-handle handle-nw" data-action="resize-nw" aria-label={isArabic ? "تغيير الحجم" : "Resize object"} type="button" tabIndex={-1}/>
            <button className="resize-handle handle-ne" data-action="resize-ne" aria-label={isArabic ? "تغيير الحجم" : "Resize object"} type="button" tabIndex={-1}/>
            <button className="resize-handle handle-sw" data-action="resize-sw" aria-label={isArabic ? "تغيير الحجم" : "Resize object"} type="button" tabIndex={-1}/>
            <button className="resize-handle handle-se" data-action="resize-se" aria-label={isArabic ? "تغيير الحجم" : "Resize object"} type="button" tabIndex={-1}/>
            <button className="rotate-handle" data-action="rotate" aria-label={isArabic ? "تدوير العنصر" : "Rotate object"} type="button" tabIndex={-1}><span aria-hidden="true">↻</span></button>
          </>}
        </div>)}
        {!visibleLayers.length && <div className="canvas-empty-hint" aria-hidden="true">{isArabic ? "أضف فكرتك هنا" : "Your idea goes here"}</div>}
      </div>
    </div>
    <div className="canvas-caption"><span>{isArabic ? "اسحب للتحريك · استخدم الأسهم لتحريك لوحة المفاتيح" : "Drag to move · use arrow keys for keyboard movement"}</span><span>{design.side === "front" ? (isArabic ? "الأمام" : "FRONT") : (isArabic ? "الخلف" : "BACK")}</span></div>
  </div>;
}
