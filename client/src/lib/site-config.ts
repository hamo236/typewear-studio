import type { Locale } from "./types";

export const siteConfig = {
  brandName: "Typewear",
  locale: {
    default: "ar" as Locale,
    supported: ["ar", "en"] as const,
    direction: {
      ar: "rtl",
      en: "ltr",
    } as const,
  },
  currency: {
    code: "EGP",
    localeByLanguage: {
      ar: "ar-EG",
      en: "en-EG",
    } as const,
    maximumFractionDigits: 0,
  },
  admin: {
    pin: "0000",
    notice: "This PIN is a convenience lock, not real security on a static site.",
  },
  whatsapp: {
    number: "201000000000",
    messageTemplate: [
      "مرحبًا، أريد طلب:",
      "{{items}}",
      "الإجمالي: {{total}}",
      "الاسم: {{customerName}}",
      "المنطقة: {{area}}",
    ].join("\n"),
  },
  delivery: {
    textAr: "تفاصيل التوصيل تُحدد مع صاحب المتجر قبل تأكيد الطلب.",
    textEn: "Delivery details are confirmed with the store owner before the order is accepted.",
  },
  returns: {
    textAr: "سياسة الاستبدال والاسترجاع يحددها صاحب المتجر قبل تأكيد الطلب.",
    textEn: "Exchange and return terms are set by the store owner before the order is accepted.",
  },
  socialLinks: {
    instagram: "",
    facebook: "",
    tiktok: "",
    whatsapp: "",
  },
} as const;

export type SiteLocale = (typeof siteConfig.locale.supported)[number];
export type SiteConfig = typeof siteConfig;

export function formatMoney(value: number, locale: SiteLocale = siteConfig.locale.default) {
  return new Intl.NumberFormat(siteConfig.currency.localeByLanguage[locale], {
    style: "currency",
    currency: siteConfig.currency.code,
    maximumFractionDigits: siteConfig.currency.maximumFractionDigits,
  }).format(value);
}
