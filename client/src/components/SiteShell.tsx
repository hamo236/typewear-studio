import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useStudio } from "@/lib/StudioContext";

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
        <Link href="/" className="brand-lockup" aria-label={locale === "ar" ? "Typewear — الرئيسية" : "Typewear — home"} onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">T<span>W</span></span>
          <span className="brand-copy"><strong>TYPEWEAR</strong><small>{t("brandSlogan")}</small></span>
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
        <div className="footer-brand"><span className="brand-mark" aria-hidden="true">T<span>W</span></span><span>Typewear / {locale === "ar" ? "استوديو تصميم تجريبي" : "A clothing design concept"}</span></div>
        <p className="footer-demo"><span className="status-dot" />{locale === "ar" ? "نموذج واجهة فقط · لا توجد طلبات حقيقية" : "Frontend concept only · no real orders"}</p>
        <span className="footer-year">© 2026 TYPEWEAR</span>
      </div>
    </footer>
  );
}
