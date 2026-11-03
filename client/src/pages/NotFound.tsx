import { MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import { useStudio } from "@/lib/StudioContext";

export default function NotFound() {
  const { t } = useStudio();
  return <div className="not-found page-container"><span className="not-found-code">404 / TW</span><div className="not-found-glyph" aria-hidden="true">?</div><h1>{t("notFoundTitle")}</h1><p>{t("notFoundBody")}</p><Link href="/" className="button button-primary">{t("backHome")} <MoveUpRight size={16}/></Link></div>;
}
