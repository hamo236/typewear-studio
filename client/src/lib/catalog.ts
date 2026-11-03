import type { GarmentDesign, Product } from "./types";

export const GARMENT_COLORS = [
  { name: "Chalk", nameAr: "طباشيري", hex: "#E9E1D3" },
  { name: "Ink", nameAr: "حبر", hex: "#343A3B" },
  { name: "Coral", nameAr: "مرجاني", hex: "#E66B4E" },
  { name: "Sage", nameAr: "مريمية", hex: "#A8B6A2" },
  { name: "Sky", nameAr: "سماوي", hex: "#A9C8D5" },
  { name: "Berry", nameAr: "توتي", hex: "#9E5268" },
  { name: "Sun", nameAr: "شمسي", hex: "#DDBB65" },
  { name: "Olive", nameAr: "زيتوني", hex: "#787A52" },
];

export const PRODUCTS: Product[] = [
  { id: "studio-tee", type: "tshirt", nameEn: "Studio tee", nameAr: "تيشيرت الاستوديو", descriptionEn: "A soft everyday blank.", descriptionAr: "قطعة أساسية ناعمة لليوم كله.", price: 850, colors: ["#E9E1D3", "#343A3B", "#E66B4E", "#A8B6A2"], category: "tops", featured: true },
  { id: "everyday-hoodie", type: "hoodie", nameEn: "Everyday hoodie", nameAr: "هودي يومي", descriptionEn: "Room for a bigger idea.", descriptionAr: "مساحة أوسع لفكرة أكبر.", price: 1450, colors: ["#343A3B", "#E9E1D3", "#787A52", "#9E5268"], category: "tops", featured: true },
  { id: "form-cap", type: "cap", nameEn: "Form cap", nameAr: "قبعة فورم", descriptionEn: "A small canvas, big point of view.", descriptionAr: "مساحة صغيرة، ووجهة نظر كبيرة.", price: 520, colors: ["#E9E1D3", "#343A3B", "#A9C8D5"], category: "accessories", featured: true },
];

export function createDefaultDesign(): GarmentDesign {
  return {
    name: "My Typewear design",
    garmentType: "tshirt",
    garmentColor: GARMENT_COLORS[0].hex,
    side: "front",
    size: "M",
    quantity: 1,
    layers: [],
  };
}

export function getProduct(id?: string) {
  return PRODUCTS.find((product) => product.id === id) ?? PRODUCTS[0];
}

export function createLayerId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `layer-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}
