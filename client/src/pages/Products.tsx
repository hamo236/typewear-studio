import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/catalog";
import { useStudio } from "@/lib/StudioContext";

type Category = "all" | "tops" | "accessories";
type SortMode = "featured" | "low" | "high";

export default function Products() {
  const { t, locale } = useStudio();
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortMode>("featured");
  const products = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => category === "all" || product.category === category);
    if (sort === "low") filtered.sort((a,b) => a.price-b.price);
    if (sort === "high") filtered.sort((a,b) => b.price-a.price);
    if (sort === "featured") filtered.sort((a,b) => Number(Boolean(b.featured))-Number(Boolean(a.featured)));
    return filtered;
  }, [category, sort]);

  return <div className="products-page page-container section-space">
    <div className="page-title-row"><div><p className="eyebrow"><span className="eyebrow-dot" />{locale === "ar" ? "التشكيلة / ٢٠٢٦" : "COLLECTION / 2026"}</p><h1>{t("productsTitle")}</h1><p className="page-intro">{t("productsBody")}</p></div><span className="demo-chip">{t("demoProducts")}</span></div>
    <div className="catalog-controls"><div className="filter-group" role="group" aria-label={t("filters")}><Filter size={17} aria-hidden="true" />{(["all","tops","accessories"] as Category[]).map((value)=><button key={value} type="button" aria-pressed={category===value} className={`filter-chip ${category===value?"is-active":""}`} onClick={()=>setCategory(value)}>{value==="all"?t("all"):value==="tops"?t("tops"):t("accessories")}</button>)}</div><label className="sort-control"><SlidersHorizontal size={16} aria-hidden="true"/><span>{t("sort")}</span><select value={sort} onChange={(event)=>setSort(event.target.value as SortMode)} aria-label={t("sort")}><option value="featured">{t("featured")}</option><option value="low">{t("priceLow")}</option><option value="high">{t("priceHigh")}</option></select></label></div>
    {products.length ? <div className="product-grid">{products.map((product,index)=><ProductCard key={product.id} product={product} index={index}/>)}</div>:<div className="empty-state"><span>—</span><h2>{t("noProducts")}</h2></div>}
    <p className="tiny-note">{locale === "ar" ? "جميع المنتجات والأسعار المعروضة أمثلة غير حقيقية." : "All products and prices shown are sample content, not live inventory."}</p>
  </div>;
}
