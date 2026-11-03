import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createDefaultDesign } from "./catalog";
import { translate, type CopyKey } from "./i18n";
import { siteConfig } from "./site-config";
import type { CartLine, GarmentDesign, Locale } from "./types";

type StudioContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
  t: (key: CopyKey) => string;
  design: GarmentDesign;
  setDesign: (design: GarmentDesign) => void;
  cart: CartLine[];
  setCart: (cart: CartLine[]) => void;
  addDesignToCart: (design: GarmentDesign, unitPrice: number) => void;
  removeCartLine: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  cartCount: number;
  cartSubtotal: number;
  toast: string;
  notify: (message: string) => void;
};

const StudioContext = createContext<StudioContextValue | null>(null);

function loadJson<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function initialLocale(): Locale {
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "en" || param === "ar") return param;
  try {
    const saved = localStorage.getItem("typewear-locale");
    return saved === "en" || saved === "ar" ? saved : siteConfig.locale.default;
  } catch {
    return siteConfig.locale.default;
  }
}

export function StudioProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [design, setDesign] = useState<GarmentDesign>(() => loadJson("typewear-design", createDefaultDesign()));
  const [cart, setCart] = useState<CartLine[]>(() => loadJson("typewear-cart", []));
  const [toast, setToast] = useState("");
  const timer = useRef<number | undefined>(undefined);

  const notify = (message: string) => {
    setToast(message);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(""), 2800);
  };
  const storageError = () => locale === "ar"
    ? "تعذّر حفظ التغيير؛ مساحة المتصفح غير متاحة أو ممتلئة."
    : "Could not save this change; browser storage is unavailable or full.";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = siteConfig.locale.direction[locale];
    document.title = locale === "ar" ? `${siteConfig.brandName} — استوديو تصميم الملابس` : `${siteConfig.brandName} — Clothing Design Studio`;
    try { localStorage.setItem("typewear-locale", locale); } catch { notify(storageError()); }
  }, [locale]);

  useEffect(() => {
    try { localStorage.setItem("typewear-design", JSON.stringify(design)); }
    catch { notify(storageError()); }
  }, [design]);
  useEffect(() => {
    try { localStorage.setItem("typewear-cart", JSON.stringify(cart)); }
    catch { notify(storageError()); }
  }, [cart]);

  const addDesignToCart = (currentDesign: GarmentDesign, unitPrice: number) => {
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `cart-${Date.now()}`;
    const name = currentDesign.garmentType;
    setCart((current) => [...current, {
      id,
      productId: name,
      garmentName: name,
      design: structuredClone(currentDesign),
      size: currentDesign.size,
      quantity: currentDesign.quantity,
      unitPrice,
      addedAt: Date.now(),
    }]);
  };

  const removeCartLine = (id: string) => setCart((current) => current.filter((line) => line.id !== id));
  const updateCartQuantity = (id: string, quantity: number) => setCart((current) => current.map((line) => line.id === id ? { ...line, quantity: Math.max(1, Math.min(50, quantity)) } : line));
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartSubtotal = cart.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const value = useMemo<StudioContextValue>(() => ({
    locale, setLocale, dir: siteConfig.locale.direction[locale], t: (key) => translate(locale, key),
    design, setDesign, cart, setCart, addDesignToCart, removeCartLine, updateCartQuantity,
    cartCount, cartSubtotal, toast, notify,
  }), [locale, design, cart, cartCount, cartSubtotal, toast]);

  return <StudioContext.Provider value={value}>{children}{toast && <div className="toast-message" role="status" aria-live="polite">{toast}</div>}</StudioContext.Provider>;
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) throw new Error("useStudio must be used inside StudioProvider");
  return context;
}
