import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Heart, Home as HomeIcon, Menu, Moon, ShoppingBag, Store, Sun, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useStudio } from "@/lib/StudioContext";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const { locale, setLocale, t, cartCount } = useStudio();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: "/", key: "home" as const },
    { href: "/products", key: "shop" as const },
    { href: "/editor", key: "editor" as const },
    { href: "/about", key: "about" as const },
  ];

  return (
    <header className="site-header">
      <div className="header-inner page-container">
        <Link href="/" className="brand-lockup" aria-label={locale === "ar" ? `${siteConfig.brandName} — الرئيسية` : `${siteConfig.brandName} — home`} onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">T<span>W</span></span>
          <span className="brand-copy"><strong>{siteConfig.brandName.toUpperCase()}</strong><small>{t("brandSlogan")}</small></span>
        </Link>

        <nav id="main-navigation" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"} className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => {
            const active = location === item.href || (item.href === "/products" && location.startsWith("/products"));
            return <Link href={item.href} key={item.href} className={`nav-item ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)}>{t(item.key)}</Link>;
          })}
        </nav>

        <div className="header-actions">
          <button className="icon-action language-action" onClick={() => setLocale(locale === "ar" ? "en" : "ar")} type="button" aria-label={t("switchLanguage")}>
            {t("switchLanguage")}
          </button>
          <button className="icon-action theme-action" onClick={toggleTheme} type="button" aria-label={t("switchTheme")} title={t("switchTheme")} aria-pressed={theme === "dark"}>
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <Link className="bag-link" href="/cart" aria-label={`${t("bag")}, ${cartCount}`}>
            <ShoppingBag size={18} aria-hidden="true" />
            <span className="bag-label">{t("bag")}</span>
            <span className="bag-count" aria-live="polite">{cartCount}</span>
          </Link>
          <button className="icon-action mobile-menu-button" type="button" aria-label={menuOpen ? t("closeMenu") : t("openMenu")} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t, locale } = useStudio();
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <div className="footer-brand"><span className="brand-mark" aria-hidden="true">T<span>W</span></span><span>{siteConfig.brandName} / {locale === "ar" ? "استوديو تصميم تجريبي" : "A clothing design concept"}</span></div>
        <p className="footer-demo"><span className="status-dot" />{locale === "ar" ? "نموذج واجهة فقط · لا توجد طلبات حقيقية" : "Frontend concept only · no real orders"}</p>
        <nav className="footer-links" aria-label={locale === "ar" ? "روابط الموقع" : "Site links"}>
          <Link href="/">{t("home")}</Link><Link href="/products">{t("shop")}</Link><Link href="/about">{t("about")}</Link>
        </nav>
        <span className="footer-year">© 2026 {siteConfig.brandName.toUpperCase()}</span>
      </div>
    </footer>
  );
}

export function MobileNav() {
  const { locale, t, cartCount } = useStudio();
  const [location] = useLocation();
  const favoritesHref = "/products?view=favorites";
  const items = [
    { href: "/", label: locale === "ar" ? "الرئيسية" : "Home", icon: HomeIcon, active: location === "/" },
    { href: "/products", label: t("shop"), icon: Store, active: location.startsWith("/products") && !location.includes("view=favorites") },
    { href: favoritesHref, label: locale === "ar" ? "المفضلة" : "Favorites", icon: Heart, active: location.includes("view=favorites") },
    { href: "/cart", label: t("bag"), icon: ShoppingBag, active: location.startsWith("/cart"), count: cartCount },
  ];
  return <nav className="mobile-nav glass-ink" aria-label={locale === "ar" ? "التنقل السفلي" : "Bottom navigation"}>
    {items.map(({ href, label, icon: Icon, active, count }) => <Link href={href} key={href} className={`mobile-nav-item ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}>
      <span className="mobile-nav-icon"><Icon size={18} strokeWidth={active ? 2.4 : 2} aria-hidden="true" />{count !== undefined && count > 0 ? <span className="mobile-nav-count" aria-live="polite">{count}</span> : null}</span><span>{label}</span>
    </Link>)}
  </nav>;
}
