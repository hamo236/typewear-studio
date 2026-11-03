import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowDownRight, ArrowUpRight as ExternalIcon, Check, MoveUpRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { GarmentMockup } from "@/components/GarmentMockup";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, GARMENT_COLORS } from "@/lib/catalog";
import { useStudio } from "@/lib/StudioContext";

export default function Home() {
  const { locale, t, design, setDesign } = useStudio();
  const [colorIndex, setColorIndex] = useState(0);
  const colors = [GARMENT_COLORS[0].hex, GARMENT_COLORS[2].hex, GARMENT_COLORS[3].hex, GARMENT_COLORS[4].hex];
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowDownLeft : ArrowDownRight;

  useEffect(() => {
    const timer = window.setInterval(() => setColorIndex((index) => (index + 1) % colors.length), 2600);
    return () => window.clearInterval(timer);
  }, [colors.length]);

  const start = () => setDesign({ ...design, garmentType: "tshirt", garmentColor: colors[colorIndex], side: "front" });

  return (
    <div className="page-home">
      <section className="home-hero page-container">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" />{t("collectionTag")}</span>
          <h1>{t("heroTitle")}</h1>
          <p className="hero-lede">{t("heroBody")}</p>
          <div className="hero-actions">
            <Link href="/editor" className="button button-primary" onClick={start}>{t("startDesigning")} <MoveUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/products" className="text-link">{t("exploreCollection")} <ArrowIcon size={16} aria-hidden="true" /></Link>
          </div>
          <p className="hero-disclaimer"><span className="demo-chip">{t("demoOnly")}</span> {t("sampleLabel")}</p>
          <div className="hero-stat"><span className="stat-rule" /><span>{isArabic ? "قطعة واحدة · احتمالاتك" : "ONE PIECE · YOUR POSSIBILITIES"}</span><Sparkles size={15} aria-hidden="true" /></div>
        </div>
        <div className="hero-stage-wrap">
          <div className="hero-stage-backdrop" aria-hidden="true"><span className="hero-orbit hero-orbit-one" /><span className="hero-orbit hero-orbit-two" /></div>
          <div className="hero-index hero-index-top"><span>01</span> / 03</div>
          <GarmentMockup type="tshirt" color={colors[colorIndex]} side="front" designText="TYPE" label={`${isArabic ? "تيشيرت" : "T-shirt"}, ${isArabic ? "عرض أمامي" : "front view"}`} className="hero-garment" />
          <div className="hero-stage-tag"><span className="status-dot" />{isArabic ? "خامة نموذجية" : "SAMPLE BLANK"}</div>
          <div className="hero-side-note" dir="ltr">T / W<br /><small>{isArabic ? "دراسة تصميم رقم ٠١" : "DESIGN STUDY Nº 01"}</small></div>
          <div className="hero-color-dots" role="group" aria-label={t("garmentColor")}>
            {colors.map((color, index) => <button key={color} type="button" aria-label={`${t("color")} ${index + 1}`} aria-pressed={index === colorIndex} className={`color-swatch ${index === colorIndex ? "is-selected" : ""}`} style={{ "--swatch": color } as React.CSSProperties} onClick={() => setColorIndex(index)} />)}
          </div>
        </div>
      </section>

      <section className="marquee-strip" aria-label={t("editorialNote")}><div className="marquee-inner"><span>{t("brandSlogan")}</span><span className="marquee-star" aria-hidden="true">✳</span><span>{t("brandSlogan")}</span><span className="marquee-star" aria-hidden="true">✳</span><span>{t("brandSlogan")}</span></div></section>

      <section className="steps-section page-container section-space">
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-dot" />{isArabic ? "كيف تعمل الفكرة" : "HOW IT WORKS"}</p><h2>{t("howTitle")}</h2></div><p className="section-heading-note">{isArabic ? "من الفكرة إلى قطعة تعبّر عنك." : "From first thought to your own piece."}</p></div>
        <div className="steps-grid">
          {[{number:"01",title:t("choose"),body:t("chooseBody"),icon:<span className="step-icon-shirt">TW</span>},{number:"02",title:t("make"),body:t("makeBody"),icon:<span className="step-icon-type">Aa</span>},{number:"03",title:t("wear"),body:t("wearBody"),icon:<Check size={22} />}].map((step) => <article className="step-card" key={step.number}><span className="step-number">{step.number}</span><div className="step-icon">{step.icon}</div><h3>{step.title}</h3><p>{step.body}</p></article>)}
        </div>
      </section>

      <section className="featured-section section-space">
        <div className="page-container">
          <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-dot" />{isArabic ? "الإصدار الأول / ٢٠٢٦" : "THE FIRST DROP / 2026"}</p><h2>{t("featuredTitle")}</h2></div><Link href="/products" className="text-link">{t("viewAll")} <ExternalIcon size={16} aria-hidden="true" /></Link></div>
          <div className="product-grid">{PRODUCTS.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
          <p className="tiny-note">* {t("demoProducts")}</p>
        </div>
      </section>

      <section className="studio-samples page-container section-space">
        <div className="samples-copy"><p className="eyebrow"><span className="eyebrow-dot" />{isArabic ? "كتابة / لون / أنت" : "TYPE / COLOR / YOU"}</p><h2>{t("examplesTitle")}</h2><p>{isArabic ? "أمثلة بصرية بسيطة توضح كيف تتحول القطعة الفارغة إلى فكرتك." : "A few visual studies show how a blank can carry your idea."}</p><Link href="/editor" className="button button-secondary" onClick={start}>{t("startDesigning")} <MoveUpRight size={16} aria-hidden="true" /></Link></div>
        <div className="example-board">
          <div className="example-art example-art-coral"><span className="example-label">{isArabic ? "أ / دراسة كتابة" : "A / TYPE STUDY"}</span><GarmentMockup type="hoodie" color="#E66B4E" label={isArabic ? "نموذج هودي مرجاني" : "Coral sample hoodie mockup"} designText="MAKE" /><span className="example-stamp">{isArabic ? "رقم ٠١" : "NO. 01"}</span></div>
          <div className="example-art example-art-sage"><span className="example-label">{isArabic ? "ب / دراسة لون" : "B / COLOR STUDY"}</span><GarmentMockup type="cap" color="#A8B6A2" label={isArabic ? "نموذج قبعة بلون المريمية" : "Sage sample cap mockup"} designText="TW" /><span className="example-stamp">{isArabic ? "رقم ٠٢" : "NO. 02"}</span></div>
        </div>
      </section>

      <section className="trust-section page-container section-space"><div className="trust-heading"><p className="eyebrow"><span className="eyebrow-dot" />{isArabic ? "فكرة Typewear" : "THE TYPEWEAR IDEA"}</p><h2>{t("trustTitle")}</h2></div><div className="trust-grid">{[{title:t("qualityLabel"),body:t("qualityBody"),mark:"01"},{title:t("egyptLabel"),body:t("egyptBody"),mark:"02"},{title:t("returnLabel"),body:t("returnBody"),mark:"03"}].map((item)=><article key={item.mark} className="trust-card"><span>{item.mark}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>

      <section className="newsletter-section"><div className="page-container newsletter-inner"><div><p className="eyebrow">{isArabic ? "رسالة من الاستوديو" : "A NOTE FROM THE STUDIO"}</p><h2>{t("newsletterTitle")}</h2><p>{t("newsletterBody")}</p></div><form className="newsletter-demo" onSubmit={(event)=>event.preventDefault()}><label className="sr-only" htmlFor="newsletter-email">{t("email")}</label><input id="newsletter-email" type="email" placeholder={t("email")} disabled /><button type="button" className="button button-primary" disabled>{isArabic ? "قريبًا" : "Coming soon"}</button><span>{isArabic ? "نموذج تجريبي · غير متصل" : "Sample form · not connected"}</span></form></div></section>
    </div>
  );
}
