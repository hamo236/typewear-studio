import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { GarmentMockup } from "@/components/GarmentMockup";
import MiniDesignPreview from "@/components/MiniDesignPreview";
import { useStudio } from "@/lib/StudioContext";
import { garmentLabel } from "@/lib/editor-utils";
import { GARMENT_COLORS } from "@/lib/catalog";
import { formatMoney, siteConfig } from "@/lib/site-config";

export default function Cart() {
  const { cart, removeCartLine, updateCartQuantity, setDesign, cartSubtotal, locale, t } = useStudio();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="cart-page page-container section-space">
      <div className="page-title-row">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" />{siteConfig.brandName.toUpperCase()} / {locale === "ar" ? "الحقيبة" : "BAG"}</p>
          <h1>{t("cartTitle")}</h1>
        </div>
        <span className="cart-count-label">{cart.reduce((sum, line) => sum + line.quantity, 0)} / {t("pieceCount")}</span>
      </div>

      {!cart.length ? (
        <div className="empty-state cart-empty">
          <div className="empty-garment">
            <GarmentMockup type="tshirt" color="#E9E1D3" label={locale === "ar" ? "قطعة تجريبية فارغة" : "Blank sample garment"} />
          </div>
          <h2>{t("emptyCart")}</h2>
          <Link className="button button-primary" href="/products">{t("continueDesigning")} <Arrow size={16} aria-hidden="true" /></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {cart.map((line) => {
              const label = garmentLabel(line.design.garmentType, locale);
              const color = GARMENT_COLORS.find((item) => item.hex.toLowerCase() === line.design.garmentColor.toLowerCase());
              const colorLabel = color ? (locale === "ar" ? color.nameAr : color.name) : line.design.garmentColor;

              return (
                <article className="cart-line" key={line.id}>
                  <div className="cart-thumb">
                    <MiniDesignPreview design={line.design} label={`${label} · ${t("sampleDesign")}`} />
                  </div>
                  <div className="cart-line-info">
                    <span className="product-number">{t("sampleDesign")}</span>
                    <h2>{label}</h2>
                    <p>
                      {t("size")}: {line.size} · {t("colors")}: {" "}
                      <span className="cart-color-value">
                        <span className="inline-swatch" style={{ "--swatch": line.design.garmentColor } as CSSProperties} aria-hidden="true" />
                        {colorLabel}
                      </span>
                    </p>
                    <p className="line-price">{formatMoney(line.unitPrice, locale)} <small>· {locale === "ar" ? "للقطعة" : "each"}</small></p>
                    <Link className="cart-edit-link" href="/editor" onClick={() => setDesign(line.design)}>{t("customize")}</Link>
                  </div>
                  <div className="cart-line-actions">
                    <div className="quantity-control" role="group" aria-label={t("quantity")}>
                      <button type="button" aria-label={locale === "ar" ? "تقليل الكمية" : "Decrease quantity"} onClick={() => updateCartQuantity(line.id, Math.max(1, line.quantity - 1))}><Minus size={14} /></button>
                      <span>{line.quantity}</span>
                      <button type="button" aria-label={locale === "ar" ? "زيادة الكمية" : "Increase quantity"} onClick={() => updateCartQuantity(line.id, line.quantity + 1)}><Plus size={14} /></button>
                    </div>
                    <button className="remove-line" type="button" onClick={() => removeCartLine(line.id)}><Trash2 size={15} aria-hidden="true" />{t("remove")}</button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="cart-summary">
            <span className="product-number">{siteConfig.brandName.toUpperCase()} / DEMO BAG</span>
            <h2>{t("subtotal")}</h2>
            <div className="summary-total"><span>{t("subtotal")}</span><strong>{formatMoney(cartSubtotal, locale)}</strong></div>
            <button className="button button-primary button-full" type="button" disabled>{t("checkout")}</button>
            <p className="cart-warning"><span aria-hidden="true">!</span>{t("checkoutNotice")}</p>
            <p className="tiny-note">{t("cartDemo")}</p>
          </aside>
        </div>
      )}
    </div>
  );
}
