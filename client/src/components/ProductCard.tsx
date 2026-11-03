import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpLeft, ArrowUpRight, Plus } from "lucide-react";
import { Link } from "wouter";
import { useStudio } from "@/lib/StudioContext";
import { GARMENT_COLORS } from "@/lib/catalog";
import type { GarmentDesign, Product } from "@/lib/types";
import { GarmentMockup } from "./GarmentMockup";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { locale, t, design, setDesign } = useStudio();
  const [color, setColor] = useState(product.colors[0]);
  const [showBack, setShowBack] = useState(false);
  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const description = locale === "ar" ? product.descriptionAr : product.descriptionEn;
  const currentViewLabel = locale === "ar" ? (showBack ? "عرض خلفي" : "عرض أمامي") : (showBack ? "Back view" : "Front view");
  const toggleViewLabel = locale === "ar" ? (showBack ? "عرض أمامي" : "عرض خلفي") : (showBack ? "Show front view" : "Show back view");

  const configure = () => {
    setDesign({ ...design, garmentType: product.type, garmentColor: color, side: "front" } satisfies GarmentDesign);
  };

  return (
      <article className={`product-tile product-tile-${index % 3}`} onPointerEnter={(event) => { if (event.pointerType === "mouse") setShowBack(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setShowBack(false); }}>
      <div className="product-tile-art">
        <span className="demo-chip">{t("demoOnly")}</span>
        <button className="product-view-toggle" type="button" aria-label={toggleViewLabel} aria-pressed={showBack} onClick={() => setShowBack((value) => !value)}>
          {locale === "ar" ? <ArrowUpRight size={16} aria-hidden="true" /> : <ArrowUpLeft size={16} aria-hidden="true" />}
        </button>
        <GarmentMockup type={product.type} color={color} side={showBack ? "back" : "front"} label={`${name}, ${currentViewLabel}`} designText={index === 0 ? "TYPE" : undefined} className={showBack ? "garment-flip" : ""} />
        <Link className="tile-quick-edit" href="/editor" onClick={configure}><Plus size={15} aria-hidden="true" />{t("customize")}</Link>
      </div>
      <div className="product-tile-info">
        <div className="product-info-head"><div><p className="product-number">0{index + 1} / {t("pieceCount")}</p><h3>{name}</h3></div><span className="product-price">{new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(product.price)}</span></div>
        <p className="product-description">{description}</p>
        <div className="product-tile-bottom"><div className="swatch-row" role="group" aria-label={t("colors")}>
          {product.colors.map((swatch) => {
            const colorName = GARMENT_COLORS.find((item) => item.hex === swatch);
            return <button key={swatch} type="button" className={`color-swatch ${color === swatch ? "is-selected" : ""}`} style={{ "--swatch": swatch } as CSSProperties} aria-label={locale === "ar" ? colorName?.nameAr ?? swatch : colorName?.name ?? swatch} aria-pressed={color === swatch} onClick={() => setColor(swatch)} />;
          })}
        </div><span className="sample-price-note">{t("startingAt")}</span></div>
      </div>
    </article>
  );
}
