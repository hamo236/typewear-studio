import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent as ReactDragEvent, PointerEvent as ReactPointerEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, ChevronDown, Download, Eye, EyeOff, ImagePlus, Layers3, Lock, LockKeyholeOpen, Minus, MoveUpRight, Palette, Plus, Redo2, RotateCw, Save, Shirt, Sparkles, Trash2, Type, Undo2, Upload, X } from "lucide-react";
import { Link } from "wouter";
import EditorCanvas, { type CanvasAction, type NudgeKey } from "@/components/EditorCanvas";
import { GarmentMockup } from "@/components/GarmentMockup";
import { GARMENT_COLORS, PRODUCTS, createDefaultDesign, createLayerId, getProduct } from "@/lib/catalog";
import { useStudio } from "@/lib/StudioContext";
import { basePrice, estimatePrice, exportDesignSvg, garmentLabel } from "@/lib/editor-utils";
import { formatMoney, siteConfig } from "@/lib/site-config";
import type { DesignLayer, GarmentDesign, GarmentType, TextAlign } from "@/lib/types";

type Tool = "product" | "color" | "text" | "upload" | "layers";
type ConfirmState = { kind: "delete"; layerId: string } | { kind: "reset" } | null;
type DragSnapshot = { id: string; action: CanvasAction; pointerId: number; startX: number; startY: number; x: number; y: number; width: number; height: number; rotation: number; centerX: number; centerY: number; startAngle: number };

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];
const TOOLS: { id: Tool; icon: typeof Shirt; labelKey: "product" | "color" | "text" | "upload" | "layers" }[] = [
  { id: "product", icon: Shirt, labelKey: "product" },
  { id: "color", icon: Palette, labelKey: "color" },
  { id: "text", icon: Type, labelKey: "text" },
  { id: "upload", icon: ImagePlus, labelKey: "upload" },
  { id: "layers", icon: Layers3, labelKey: "layers" },
];

function cloneDesign(value: GarmentDesign): GarmentDesign {
  return JSON.parse(JSON.stringify(value)) as GarmentDesign;
}

export default function Editor() {
  const { locale, t, design, setDesign, notify, addDesignToCart } = useStudio();
  const [tool, setTool] = useState<Tool>("product");
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [guideX, setGuideX] = useState(false);
  const [guideY, setGuideY] = useState(false);
  const [past, setPast] = useState<GarmentDesign[]>([]);
  const [future, setFuture] = useState<GarmentDesign[]>([]);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [dragLayerId, setDragLayerId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<DragSnapshot | null>(null);
  const isArabic = locale === "ar";
  const params = new URLSearchParams(window.location.search);
  const queryProduct = getProduct(params.get("item") ?? undefined);
  const selectedLayer = design.layers.find((layer) => layer.id === selectedId) ?? null;
  const selectedProduct = PRODUCTS.find((product) => product.type === design.garmentType) ?? PRODUCTS[0];
  const price = estimatePrice(design);

  useEffect(() => {
    if (params.get("item") && design.garmentType !== queryProduct.type) {
      setDesign({ ...design, garmentType: queryProduct.type, garmentColor: queryProduct.colors[0], side: "front" });
    }
  }, []);

  const pushHistory = (snapshot = design) => {
    setPast((current) => [...current.slice(-39), cloneDesign(snapshot)]);
    setFuture([]);
  };

  const commit = (next: GarmentDesign) => {
    pushHistory();
    setDesign(next);
  };

  const undo = () => {
    if (!past.length) return;
    setFuture((current) => [cloneDesign(design), ...current]);
    setDesign(cloneDesign(past[past.length - 1]));
    setPast((current) => current.slice(0, -1));
  };

  const redo = () => {
    if (!future.length) return;
    setPast((current) => [...current, cloneDesign(design)]);
    setDesign(cloneDesign(future[0]));
    setFuture((current) => current.slice(1));
  };

  const update = (patch: Partial<GarmentDesign>) => commit({ ...design, ...patch });
  const setViewSide = (side: "front" | "back") => { setSelectedId(null); update({ side }); };
  const updateLayer = (id: string, patch: Partial<DesignLayer>) => {
    const layers = design.layers.map((layer) => layer.id === id ? { ...layer, ...patch } : layer);
    commit({ ...design, layers });
  };
  const nudgeLayer = (id: string, key: NudgeKey, largerStep: boolean) => {
    const layer = design.layers.find((item) => item.id === id);
    if (!layer || layer.locked) return;
    const step = largerStep ? 2 : 0.5;
    const x = key === "ArrowLeft" ? -step : key === "ArrowRight" ? step : 0;
    const y = key === "ArrowUp" ? -step : key === "ArrowDown" ? step : 0;
    updateLayer(id, { x: Math.max(0, Math.min(100 - layer.width, layer.x + x)), y: Math.max(0, Math.min(100 - layer.height, layer.y + y)) });
  };

  const addText = () => {
    const layer: DesignLayer = {
      id: createLayerId(), kind: "text", text: isArabic ? "فكرتك" : "YOUR IDEA",
      x: 37, y: 40, width: 30, height: 12, rotation: 0, color: "#1D2221",
      fontFamily: isArabic ? "Cairo" : "DM Sans", fontSize: 27, bold: true, italic: false,
      align: "center", side: design.side, visible: true, locked: false,
    };
    commit({ ...design, layers: [...design.layers, layer] });
    setSelectedId(layer.id);
  };

  const onPointerStart = (event: ReactPointerEvent<HTMLDivElement>, layer: DesignLayer, action: CanvasAction) => {
    setSelectedId(layer.id);
    if (layer.locked && action === "move") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width * (layer.x + layer.width / 2) / 100;
    const centerY = rect.top + rect.height * (layer.y + layer.height / 2) / 100;
    const startAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    pushHistory();
    dragRef.current = { id: layer.id, action, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: layer.x, y: layer.y, width: layer.width, height: layer.height, rotation: layer.rotation, centerX, centerY, startAngle };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const stage = event.currentTarget.querySelector(".garment-stage");
    const rect = stage?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - drag.startX) / Math.max(1, rect.width) * 100;
    const dy = (event.clientY - drag.startY) / Math.max(1, rect.height) * 100;
    let patch: Partial<DesignLayer> = {};
    setGuideX(false); setGuideY(false);

    if (drag.action === "move") {
      let x = Math.max(0, Math.min(100 - drag.width, drag.x + dx));
      let y = Math.max(0, Math.min(100 - drag.height, drag.y + dy));
      if (Math.abs(x + drag.width / 2 - 50) < 2.4) { x = 50 - drag.width / 2; setGuideY(true); }
      if (Math.abs(y + drag.height / 2 - 50) < 2.4) { y = 50 - drag.height / 2; setGuideX(true); }
      patch = { x, y };
    } else if (drag.action === "rotate") {
      const angle = Math.atan2(event.clientY - drag.centerY, event.clientX - drag.centerX);
      patch = { rotation: Math.round(drag.rotation + (angle - drag.startAngle) * 180 / Math.PI) };
    } else {
      const west = drag.action.endsWith("w");
      const north = drag.action.endsWith("nw") || drag.action.endsWith("ne");
      const nextWidth = Math.max(7, drag.width + (west ? -dx : dx));
      const nextHeight = Math.max(7, drag.height + (north ? -dy : dy));
      const nextX = west ? drag.x + drag.width - nextWidth : drag.x;
      const nextY = north ? drag.y + drag.height - nextHeight : drag.y;
      patch = { width: Math.min(94, nextWidth), height: Math.min(94, nextHeight), x: Math.max(0, Math.min(100 - nextWidth, nextX)), y: Math.max(0, Math.min(100 - nextHeight, nextY)) };
    }
    setDesign({ ...design, layers: design.layers.map((layer) => layer.id === drag.id ? { ...layer, ...patch } : layer) });
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setGuideX(false); setGuideY(false);
  };

  const addImageFile = (file?: File) => {
    if (!file) return;
    setUploadError("");
    const allowed = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!allowed.includes(file.type)) { setUploadError(t("uploadErrorType")); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError(t("uploadErrorSize")); return; }
    const reader = new FileReader();
    reader.onerror = () => setUploadError(t("uploadErrorRead"));
    reader.onload = () => {
      const data = String(reader.result ?? "");
      const image = new Image();
      image.onload = () => {
        const lowResolution = image.naturalWidth < 400 || image.naturalHeight < 400;
        const layer: DesignLayer = {
          id: createLayerId(), kind: "image", imageData: data, imageName: file.name,
          x: 38, y: 38, width: 24, height: 22, rotation: 0, color: "#1D2221",
          fontFamily: "DM Sans", fontSize: 24, bold: false, italic: false, align: "center",
          side: design.side, visible: true, locked: false, lowResolution,
        };
        commit({ ...design, layers: [...design.layers, layer] });
        setSelectedId(layer.id);
        notify(lowResolution ? t("lowResolution") : t("imageReady"));
      };
      image.onerror = () => setUploadError(t("uploadErrorRead"));
      image.src = data;
    };
    reader.readAsDataURL(file);
  };

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    addImageFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const reorderLayer = (layerId: string, targetId: string) => {
    if (layerId === targetId) return;
    const layers = [...design.layers].reverse();
    const from = layers.findIndex((layer) => layer.id === layerId);
    const to = layers.findIndex((layer) => layer.id === targetId);
    if (from < 0 || to < 0) return;
    const [moving] = layers.splice(from, 1);
    layers.splice(to, 0, moving);
    commit({ ...design, layers: layers.reverse() });
  };

  const moveLayerBy = (layerId: string, offset: number) => {
    const layers = [...design.layers];
    const from = layers.findIndex((layer) => layer.id === layerId);
    const to = Math.max(0, Math.min(layers.length - 1, from + offset));
    if (from < 0 || from === to) return;
    const [moving] = layers.splice(from, 1);
    layers.splice(to, 0, moving);
    commit({ ...design, layers });
  };

  const removeLayer = (layerId: string) => {
    commit({ ...design, layers: design.layers.filter((layer) => layer.id !== layerId) });
    if (selectedId === layerId) setSelectedId(null);
    setConfirm(null);
  };

  const confirmAction = () => {
    if (confirm?.kind === "delete") removeLayer(confirm.layerId);
    if (confirm?.kind === "reset") {
      commit(createDefaultDesign()); setSelectedId(null); setZoom(100); setConfirm(null);
    }
  };

  const downloadSvg = () => {
    const file = new Blob([exportDesignSvg(design)], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `typewear-${design.side}-design.svg`;
    document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
    notify(t("downloaded"));
  };

  const saveLocal = () => {
    try {
      localStorage.setItem("typewear-design", JSON.stringify(design));
      notify(t("saved"));
    } catch {
      notify(isArabic ? "تعذّر الحفظ؛ مساحة المتصفح ممتلئة." : "Could not save: this browser's storage is full.");
    }
  };

  const handleAddToBag = () => {
    addDesignToCart(design, Math.round(price / Math.max(1, design.quantity)));
    notify(isArabic ? "أُضيف التصميم إلى حقيبتك التجريبية." : "Design added to your demo bag.");
  };

  const selectTool = (next: Tool) => {
    setTool(next);
    setMobilePanelOpen((open) => window.innerWidth < 900 ? (tool === next ? !open : true) : open);
  };

  const renderPalette = () => <div className="editor-swatches" role="group" aria-label={t("garmentColor")}>
    {GARMENT_COLORS.map((item) => <button type="button" key={item.hex} className={`editor-swatch ${design.garmentColor === item.hex ? "is-selected" : ""}`} style={{ "--swatch": item.hex } as React.CSSProperties} aria-label={isArabic ? item.nameAr : item.name} aria-pressed={design.garmentColor === item.hex} onClick={() => update({ garmentColor: item.hex })}>{design.garmentColor === item.hex && <Check size={14} aria-hidden="true"/>}</button>)}
  </div>;

  const renderProperties = () => {
    if (!selectedLayer) return <div className="inspector-empty"><span className="inspector-empty-mark">Aa</span><p>{t("selectObject")}</p></div>;
    if (selectedLayer.kind === "image") return <div className="property-stack">
      <label className="field-label">{isArabic ? "اسم الملف" : "File name"}<span className="field-value-readonly">{selectedLayer.imageName}</span></label>
      {selectedLayer.lowResolution && <p className="upload-warning"><Sparkles size={14}/>{t("lowResolution")}</p>}
      <label className="field-label">{t("textSize")} <span>{Math.round(selectedLayer.width)}%</span><input type="range" min="8" max="76" value={selectedLayer.width} onChange={(event)=>updateLayer(selectedLayer.id,{width:Number(event.target.value)})}/></label>
      <label className="field-label">{isArabic?"الدوران":"Rotation"}<span>{selectedLayer.rotation}°</span><input type="range" min="-180" max="180" value={selectedLayer.rotation} onChange={(event)=>updateLayer(selectedLayer.id,{rotation:Number(event.target.value)})}/></label>
      <button type="button" className="button button-secondary button-full" onClick={()=>fileInputRef.current?.click()}><Upload size={15}/>{t("addImage")}</button>
    </div>;
    return <div className="property-stack">
      <label className="field-label">{t("nameYourText")}<input className="text-input" value={selectedLayer.text ?? ""} onChange={(event)=>updateLayer(selectedLayer.id,{text:event.target.value})} placeholder={t("enterText")}/></label>
      <label className="field-label">{t("font")}<select className="select-input" value={selectedLayer.fontFamily} onChange={(event)=>updateLayer(selectedLayer.id,{fontFamily:event.target.value as DesignLayer["fontFamily"]})}><option value="DM Sans">DM Sans</option><option value="Cairo">Cairo</option></select></label>
      <label className="field-label">{t("textSize")}<span>{selectedLayer.fontSize}px</span><input type="range" min="12" max="72" value={selectedLayer.fontSize} onChange={(event)=>updateLayer(selectedLayer.id,{fontSize:Number(event.target.value)})}/></label>
      <div className="property-row"><label className="field-label">{t("textColor")}<input className="color-input" type="color" value={selectedLayer.color} onChange={(event)=>updateLayer(selectedLayer.id,{color:event.target.value})}/></label><div className="text-style-controls"><button type="button" className={selectedLayer.bold?"is-on":""} aria-pressed={selectedLayer.bold} aria-label={t("bold")} onClick={()=>updateLayer(selectedLayer.id,{bold:!selectedLayer.bold})}><strong>B</strong></button><button type="button" className={selectedLayer.italic?"is-on":""} aria-pressed={selectedLayer.italic} aria-label={t("italic")} onClick={()=>updateLayer(selectedLayer.id,{italic:!selectedLayer.italic})}><em>I</em></button></div></div>
      <label className="field-label">{t("alignment")}<select className="select-input" value={selectedLayer.align} onChange={(event)=>updateLayer(selectedLayer.id,{align:event.target.value as TextAlign})}><option value="left">{t("leftAlign")}</option><option value="center">{t("centerAlign")}</option><option value="right">{t("rightAlign")}</option></select></label>
      <p className="unsupported-note">{t("curveUnsupported")}</p>
    </div>;
  };

  const currentToolContent = () => {
    if (tool === "product") return <div className="panel-sections">
      <div className="panel-section"><p className="panel-label">{t("selectProduct")}</p><div className="product-type-options">{PRODUCTS.map((product)=><button type="button" key={product.id} className={`product-type-option ${design.garmentType===product.type?"is-selected":""}`} aria-pressed={design.garmentType===product.type} onClick={()=>update({garmentType:product.type,garmentColor:product.colors[0]})}><span className="product-type-icon"><GarmentMockup type={product.type} color={design.garmentColor} label={locale==="ar"?product.nameAr:product.nameEn}/></span><span>{locale==="ar"?product.nameAr:product.nameEn}</span></button>)}</div></div>
      <div className="panel-section"><p className="panel-label">{t("size")}</p><div className="size-options">{SIZES.map((size)=><button type="button" key={size} className={design.size===size?"is-selected":""} aria-pressed={design.size===size} onClick={()=>update({size})}>{size}</button>)}</div></div>
      <div className="panel-section"><label className="field-label">{t("quantity")}<div className="quantity-control"><button type="button" aria-label={isArabic?"تقليل الكمية":"Decrease quantity"} onClick={()=>update({quantity:Math.max(1,design.quantity-1)})}><Minus size={14}/></button><span>{design.quantity}</span><button type="button" aria-label={isArabic?"زيادة الكمية":"Increase quantity"} onClick={()=>update({quantity:Math.min(50,design.quantity+1)})}><Plus size={14}/></button></div></label></div>
    </div>;
    if (tool === "color") return <div className="panel-sections"><div className="panel-section"><p className="panel-label">{t("garmentColor")}</p>{renderPalette()}<p className="color-name-label">{t("selectedColor")}: {GARMENT_COLORS.find((item)=>item.hex===design.garmentColor)?.[isArabic?"nameAr":"name"] ?? design.garmentColor}</p></div><div className="panel-section"><p className="panel-label">{t("frontBack")}</p><div className="segmented-control"><button type="button" className={design.side==="front"?"is-selected":""} aria-pressed={design.side==="front"} onClick={()=>setViewSide("front")}>{t("front")}</button><button type="button" className={design.side==="back"?"is-selected":""} aria-pressed={design.side==="back"} onClick={()=>setViewSide("back")}>{t("back")}</button></div></div></div>;
    if (tool === "text") return <div className="panel-sections"><div className="panel-section"><button className="button button-primary button-full" type="button" onClick={addText}><Plus size={16}/>{t("addText")}</button></div>{selectedLayer?.kind === "text" ? <div className="panel-section"><p className="panel-label">{t("properties")}</p>{renderProperties()}</div> : <div className="inspector-empty"><span className="inspector-empty-mark">Aa</span><p>{selectedLayer ? t("selectObject") : t("noLayers")}</p></div>}</div>;
    if (tool === "upload") return <div className="panel-sections"><div className="panel-section"><button type="button" className="upload-dropzone" onClick={()=>fileInputRef.current?.click()} onDragOver={(event)=>event.preventDefault()} onDrop={(event:ReactDragEvent<HTMLButtonElement>)=>{event.preventDefault();addImageFile(event.dataTransfer.files?.[0]);}}><Upload size={25}/><strong>{t("uploadHint")}</strong><small>{t("uploadTypes")}</small><span>{locale==="ar"?"ملفات SVG أو صور حتى ٥ ميغابايت":"SVG/image files up to 5 MB"}</span></button><input ref={fileInputRef} className="sr-only" type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={onFileInput}/>{uploadError&&<p className="form-error" role="alert">{uploadError}</p>}</div>{selectedLayer?.kind === "image"&&<div className="panel-section"><p className="panel-label">{t("properties")}</p>{renderProperties()}</div>}</div>;
    return <div className="panel-sections"><div className="panel-section"><div className="layer-panel-heading"><p className="panel-label">{t("layers")}</p><span>{design.layers.length}</span></div>{!design.layers.length?<div className="layers-empty"><Layers3 size={23}/><p>{t("noLayers")}</p><button type="button" className="text-link" onClick={addText}>{t("addText")}</button></div>:<div className="layer-list">{[...design.layers].reverse().map((layer,reverseIndex)=>{const index=design.layers.findIndex((item)=>item.id===layer.id);return <div key={layer.id} className={`layer-row ${selectedId===layer.id?"is-selected":""} ${dragLayerId===layer.id?"is-dragging":""}`} draggable onDragStart={()=>setDragLayerId(layer.id)} onDragOver={(event)=>event.preventDefault()} onDrop={()=>{if(dragLayerId)reorderLayer(dragLayerId,layer.id);setDragLayerId(null);}} onDragEnd={()=>setDragLayerId(null)}>
        <button type="button" className="layer-main" onClick={()=>{setSelectedId(layer.id);setTool(layer.kind==="text"?"text":"upload");}}><span className="layer-grip" aria-hidden="true">⋮⋮</span><span className="layer-kind-icon">{layer.kind==="text"?<Type size={15}/>:<ImagePlus size={15}/>}</span><span className="layer-name">{layer.kind==="text"?(layer.text||t("text")):(layer.imageName||t("upload"))}</span></button>
        <div className="layer-actions"><button type="button" aria-label={layer.visible?t("hideLayer"):t("showLayer")} title={layer.visible?t("hideLayer"):t("showLayer")} onClick={()=>updateLayer(layer.id,{visible:!layer.visible})}>{layer.visible?<Eye size={14}/>:<EyeOff size={14}/>}</button><button type="button" aria-label={layer.locked?t("unlockLayer"):t("lockLayer")} title={layer.locked?t("unlockLayer"):t("lockLayer")} onClick={()=>updateLayer(layer.id,{locked:!layer.locked})}>{layer.locked?<LockKeyholeOpen size={14}/>:<Lock size={14}/>}</button><button type="button" aria-label={t("moveUp")} title={t("moveUp")} onClick={()=>moveLayerBy(layer.id,1)} disabled={index===design.layers.length-1}><ArrowUp size={14}/></button><button type="button" aria-label={t("moveDown")} title={t("moveDown")} onClick={()=>moveLayerBy(layer.id,-1)} disabled={index===0}><ArrowDown size={14}/></button><button type="button" aria-label={t("deleteLayer")} title={t("deleteLayer")} onClick={()=>setConfirm({kind:"delete",layerId:layer.id})}><Trash2 size={14}/></button></div>
      </div>})}</div>}</div>{selectedLayer&&<div className="panel-section"><p className="panel-label">{t("properties")}</p>{renderProperties()}</div>}</div>;
  };

  return <div className="editor-page">
    <div className="editor-heading page-container"><div><p className="eyebrow"><span className="eyebrow-dot"/>{siteConfig.brandName.toUpperCase()} / STUDIO</p><h1>{t("editorTitle")}</h1></div><div className="editor-demo-tag"><span className="status-dot"/>{t("demoOnly")}</div><Link className="editor-back-link" href="/products"><ArrowLeft size={15}/>{t("shop")}</Link></div>
    <section className="editor-shell" aria-label={t("editorTitle")}>
      <div className="editor-topbar">
        <div className="history-actions"><button type="button" onClick={undo} disabled={!past.length} aria-label={t("undo")} title={t("undo")}><Undo2 size={17}/></button><button type="button" onClick={redo} disabled={!future.length} aria-label={t("redo")} title={t("redo")}><Redo2 size={17}/></button><span className="topbar-divider"/><button type="button" onClick={()=>setConfirm({kind:"reset"})} aria-label={t("resetDesign")} title={t("resetDesign")}><RotateCw size={16}/></button></div>
        <div className="topbar-side-toggle" role="group" aria-label={t("frontBack")}><button type="button" className={design.side==="front"?"is-selected":""} aria-pressed={design.side==="front"} onClick={()=>setViewSide("front")}>{t("front")}</button><button type="button" className={design.side==="back"?"is-selected":""} aria-pressed={design.side==="back"} onClick={()=>setViewSide("back")}>{t("back")}</button></div>
        <div className="topbar-actions"><div className="zoom-control"><button type="button" aria-label={isArabic?"تصغير":"Zoom out"} onClick={()=>setZoom((value)=>Math.max(70,value-10))}><Minus size={14}/></button><span>{zoom}%</span><button type="button" aria-label={isArabic?"تكبير":"Zoom in"} onClick={()=>setZoom((value)=>Math.min(130,value+10))}><Plus size={14}/></button></div><button className="editor-save-button" type="button" onClick={saveLocal}><Save size={15}/><span>{t("save")}</span></button><button className="editor-download-button" type="button" onClick={downloadSvg}><Download size={15}/><span>{t("download")}</span></button></div>
      </div>
      <div className="editor-workspace">
        <nav className="editor-tool-rail" aria-label={t("mobileTools")}>{TOOLS.map(({id,icon:Icon,labelKey})=><button type="button" key={id} className={tool===id?"is-active":""} aria-pressed={tool===id} onClick={()=>selectTool(id)} title={t(labelKey)}><Icon size={19}/><span>{t(labelKey)}</span></button>)}<div className="rail-spacer"/><button type="button" className="rail-reset" onClick={()=>setConfirm({kind:"reset"})} title={t("resetDesign")}><RotateCw size={17}/><span>{t("resetDesign")}</span></button></nav>
        <div className="editor-canvas-column"><div className="canvas-meta-row"><div className="canvas-product-label"><span className="canvas-product-icon"><GarmentMockup type={design.garmentType} color={design.garmentColor} label={garmentLabel(design.garmentType,locale)}/></span><div><strong>{locale==="ar"?selectedProduct.nameAr:selectedProduct.nameEn}</strong><small>{t("sampleDesign")} · {t("frontBack")}: {design.side==="front"?t("front"):t("back")}</small></div></div><span className="canvas-save-note"><span className="status-dot"/>{t("saveHint")}</span></div>
          <EditorCanvas design={design} selectedId={selectedId} zoom={zoom} guideX={guideX} guideY={guideY} onSelect={setSelectedId} onDelete={(id)=>setConfirm({kind:"delete",layerId:id})} onNudge={nudgeLayer} onPointerStart={onPointerStart} onPointerMove={onPointerMove} onPointerEnd={onPointerEnd} locale={locale}/>
          {guideX||guideY?<div className="snap-announcement" role="status" aria-live="polite">{t("alignGuide")}</div>:null}
        </div>
        <aside className={`editor-inspector ${mobilePanelOpen?"is-open":""}`} aria-label={t("properties")}>
          <div className="inspector-mobile-head"><strong>{t(TOOLS.find((item)=>item.id===tool)?.labelKey??"properties")}</strong><button type="button" aria-label={isArabic?"إغلاق":"Close"} onClick={()=>setMobilePanelOpen(false)}><X size={19}/></button></div>
          <div className="inspector-scroll"><div className="inspector-title-row"><div><span className="panel-overline">{t("properties")}</span><h2>{t(TOOLS.find((item)=>item.id===tool)?.labelKey??"properties")}</h2></div><ChevronDown size={17} aria-hidden="true"/></div>{currentToolContent()}</div>
          <div className="price-panel"><div className="price-panel-top"><span>{t("estimatedPrice")}</span><strong>{formatMoney(price,locale)}</strong></div><p>{t("priceDisclaimer")}</p><button type="button" className="button button-primary button-full" onClick={handleAddToBag}>{t("bag")} <MoveUpRight size={15}/></button></div>
        </aside>
      </div>
      <nav className="editor-mobile-toolbar" aria-label={t("mobileTools")}>{TOOLS.map(({id,icon:Icon,labelKey})=><button type="button" key={id} className={tool===id&&mobilePanelOpen?"is-active":""} aria-pressed={tool===id&&mobilePanelOpen} onClick={()=>selectTool(id)}><Icon size={20}/><span>{t(labelKey)}</span></button>)}</nav>
    </section>
    {confirm&&<div className="confirm-overlay" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)setConfirm(null);}}><div className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-desc"><span className="confirm-icon"><Trash2 size={19}/></span><h2 id="confirm-title">{confirm.kind==="delete"?t("deleteLayer"):t("resetDesign")}</h2><p id="confirm-desc">{confirm.kind==="delete"?t("deleteConfirm"):t("resetConfirm")}</p><div className="confirm-actions"><button className="button button-secondary" type="button" onClick={()=>setConfirm(null)}>{t("cancel")}</button><button className="button button-danger" type="button" onClick={confirmAction}>{t("delete")}</button></div></div></div>}
    <input type="hidden" value={basePrice(design.garmentType)} readOnly aria-hidden="true" />
  </div>;
}
