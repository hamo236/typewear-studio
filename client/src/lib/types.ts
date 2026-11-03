export type Locale = "en" | "ar";
export type GarmentType = "tshirt" | "hoodie" | "cap";
export type GarmentSide = "front" | "back";
export type LayerKind = "text" | "image";
export type TextAlign = "left" | "center" | "right";

export interface DesignLayer {
  id: string;
  kind: LayerKind;
  text?: string;
  imageData?: string;
  imageName?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
  fontFamily: "DM Sans" | "Cairo";
  fontSize: number;
  bold: boolean;
  italic: boolean;
  align: TextAlign;
  side: GarmentSide;
  visible: boolean;
  locked: boolean;
  lowResolution?: boolean;
}

export interface GarmentDesign {
  name: string;
  garmentType: GarmentType;
  garmentColor: string;
  side: GarmentSide;
  size: string;
  quantity: number;
  layers: DesignLayer[];
}

export interface Product {
  id: string;
  type: GarmentType;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  colors: string[];
  category: "tops" | "accessories";
  featured?: boolean;
}

export interface CartLine {
  id: string;
  productId: string;
  garmentName: string;
  design: GarmentDesign;
  size: string;
  quantity: number;
  unitPrice: number;
  addedAt: number;
}
