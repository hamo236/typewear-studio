import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import { useStudio } from "@/lib/StudioContext";

export default function About() {
  const { t, notify } = useStudio();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    notify(t("messageReady"));
  };

  return <div className="about-page">
    <section className="about-hero page-container section-space"><div className="about-mark" aria-hidden="true"><span>T</span><i>W</i></div><div className="about-copy"><p className="eyebrow"><span className="eyebrow-dot" />{t("aboutEyebrow")}</p><h1>{t("aboutTitle")}</h1><p className="page-intro">{t("aboutBody")}</p><Link className="text-link" href="/editor">{t("startDesigning")} <MoveUpRight size={17} aria-hidden="true" /></Link></div></section>
    <section className="about-values page-container"><article><span>01</span><h2>{t("valueForm")}</h2><p>{t("valueFormBody")}</p></article><article><span>02</span><h2>{t("valueOwnership")}</h2><p>{t("valueOwnershipBody")}</p></article><article><span>03</span><h2>{t("valueHonesty")}</h2><p>{t("valueHonestyBody")}</p></article></section>
    <section className="contact-section page-container section-space"><div className="contact-intro"><p className="eyebrow"><span className="eyebrow-dot" />{t("contactEyebrow")}</p><h2>{t("contactTitle")}</h2><p>{t("contactBody")}</p><div className="contact-demo-note"><Check size={16} aria-hidden="true" />{t("contactDemo")}</div></div><form className="contact-form" onSubmit={handleSubmit}>
      <label>{t("name")}<input type="text" name="name" required minLength={2} placeholder={t("namePlaceholder")} autoComplete="name" /></label>
      <label>{t("email")}<input type="email" name="email" required placeholder="name@example.com" autoComplete="email" /></label>
      <label>{t("message")}<textarea name="message" required minLength={5} rows={4} placeholder={t("messagePlaceholder")} /></label>
      <button className="button button-primary" type="submit">{submitted ? t("contactChecked") : t("send")} <ArrowUpRight size={16} aria-hidden="true" /></button>
      <p className="tiny-note">{t("contactDemo")}</p>
    </form></section>
  </div>;
}
