import type { GarmentDesign, GarmentType, DesignLayer } from "./types";
import { PRODUCTS } from "./catalog";

export function garmentLabel(type: GarmentType, locale: "en" | "ar") {
  const names = {
    tshirt: { en: "T-shirt", ar: "تيشيرت" },
    hoodie: { en: "Hoodie", ar: "هودي" },
    cap: { en: "Cap", ar: "قبعة" },
  };
  return names[type][locale];
}

export function basePrice(type: GarmentType) {
  return PRODUCTS.find((product) => product.type === type)?.price ?? 850;
}

export function estimatePrice(design: GarmentDesign) {
  const base = basePrice(design.garmentType);
  const sides = new Set(design.layers.filter((layer) => layer.visible).map((layer) => layer.side)).size || 1;
  const sizeAdd = ["2XL", "3XL"].includes(design.size) ? 90 : 0;
  const printAdd = Math.max(0, sides - 1) * 140;
  return (base + sizeAdd + printAdd) * design.quantity;
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
  })[character] ?? character);
}

function garmentPath(type: GarmentType) {
  if (type === "hoodie") return "M132 54 94 80 48 63 15 145 60 170 87 139 83 374Q200 392 317 374l-4-235 27 31 45-25-33-82-46 17-38-26q-19 28-68 28t-68-28Z";
  if (type === "cap") return "M67 241Q72 94 200 77q130 16 134 163l31 21q-11 68-88 76H126q-84-6-94-77Z";
  return "M132 54 94 80 48 63 15 145 60 170 87 139 83 374Q200 392 317 374l-4-235 27 31 45-25-33-82-46 17-38-26q-19 28-68 28t-68-28Z";
}

function layerSvg(layer: DesignLayer) {
  const x = (layer.x / 100) * 400;
  const y = (layer.y / 100) * 440;
  const width = (layer.width / 100) * 400;
  const height = (layer.height / 100) * 440;
  const transform = `rotate(${layer.rotation} ${x + width / 2} ${y + height / 2})`;
  if (layer.kind === "image" && layer.imageData) {
    return `<image href="${escapeXml(layer.imageData)}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" transform="${transform}"/>`;
  }
  const text = escapeXml(layer.text ?? "");
  const anchor = layer.align === "left" ? "start" : layer.align === "right" ? "end" : "middle";
  const tx = layer.align === "left" ? x : layer.align === "right" ? x + width : x + width / 2;
  return `<text x="${tx}" y="${y + layer.fontSize}" fill="${escapeXml(layer.color)}" font-family="${escapeXml(layer.fontFamily)},sans-serif" font-size="${layer.fontSize}" font-weight="${layer.bold ? 700 : 500}" font-style="${layer.italic ? "italic" : "normal"}" text-anchor="${anchor}" transform="${transform}">${text}</text>`;
}

export function exportDesignSvg(design: GarmentDesign) {
  const path = garmentPath(design.garmentType);
  const details = design.side === "front"
    ? `<path d="M170 93q30 29 60 0" fill="none" stroke="#ffffff" stroke-opacity=".42" stroke-width="4"/><path d="M112 105 95 160M288 105l17 55M108 325q15 25 5 50M292 325q-15 25-5 50" fill="none" stroke="#000000" stroke-opacity=".09" stroke-width="2"/>`
    : `<path d="M132 75q68 42 136 0M106 158q94 28 188 0" fill="none" stroke="#000000" stroke-opacity=".1" stroke-width="2"/>`;
  const layers = design.layers.filter((layer) => layer.visible && layer.side === design.side).map(layerSvg).join("");
  const hood = design.garmentType === "hoodie" ? `<path d="M145 65q16-52 55-52t55 52q-27 34-55 34t-55-34Z" fill="${design.garmentColor}" stroke="#000000" stroke-opacity=".1" stroke-width="3"/><path d="M173 45q27 20 54 0" fill="none" stroke="#ffffff" stroke-opacity=".36" stroke-width="3"/>` : "";
  const capDetails = design.garmentType === "cap" ? `<path d="M95 219Q199 267 305 218M198 80v150" fill="none" stroke="#000000" stroke-opacity=".12" stroke-width="3"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 440"><defs><linearGradient id="cloth" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${design.garmentColor}"/><stop offset=".55" stop-color="${design.garmentColor}"/><stop offset="1" stop-color="#000" stop-opacity=".14"/></linearGradient></defs><path d="${path}" fill="url(#cloth)" stroke="#000000" stroke-opacity=".16" stroke-width="3" stroke-linejoin="round"/>${hood}${details}${capDetails}${layers}</svg>`;
}
