import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Instagram, Facebook, Flame, Bike, Clock, Smile, MapPin, Menu, X, ArrowUpRight, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DICT, LANGS, type Lang } from "@/lib/i18n";
import logo from "@/assets/logo.jpg.asset.json";
import carving from "@/assets/shawarma-carving.jpg.asset.json";
import wrap from "@/assets/shawarma-wrap.jpg.asset.json";
import chicken from "@/assets/grilled-chicken.jpg.asset.json";
import burger from "@/assets/cheeseburger.jpg.asset.json";
import pasta from "@/assets/cheesy-pasta.jpg.asset.json";
import plate from "@/assets/chicken-plate.jpg.asset.json";
import team from "@/assets/team.jpg.asset.json";
import interior from "@/assets/interior.jpg.asset.json";

const TEL = "tel:+9647728004848";
const IG = "https://instagram.com/malik_al_sham";
const FB = "https://www.facebook.com/malikalshamSuly";
const MAP_Q = encodeURIComponent("HC53+M3P Sulaymaniyah");

const schema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Malik Al-Sham",
  alternateName: "ملك الشام",
  servesCuisine: ["Shawarma", "Middle Eastern", "Grill", "Fast Food"],
  telephone: "+964 772 800 4848",
  address: { "@type": "PostalAddress", streetAddress: "HC53+M3P", addressLocality: "Sulaymaniyah", addressCountry: "IQ" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "03:00" }],
  sameAs: [IG, FB],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Malik Al-Sham | Best Shawarma & Grill in Sulaymaniyah" },
      { name: "description", content: "Authentic Levantine shawarma, charcoal-grilled chicken, burgers, pasta & pizza in Sulaymaniyah. Open daily 9 AM – 3 AM with delivery." },
      { property: "og:title", content: "Malik Al-Sham | Best Shawarma & Grill in Sulaymaniyah" },
      { property: "og:description", content: "Taste the best shawarma in Sulaymaniyah. Open until 3 AM with delivery." },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  component: Index,
});

const dishImgs = [wrap, chicken, burger, pasta, plate];
const gallery = [carving, wrap, chicken, burger, pasta, plate, team, interior, logo];
const whyIcons = [Flame, Bike, Clock, Smile];

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const t = DICT[lang];
  const rtl = lang !== "en";

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && DICT[saved]) setLang(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "ku" ? "ckb" : lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [lang, rtl]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  useEffect(() => {
    if (!lightbox) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setLightbox(null); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", close); };
  }, [lightbox]);

  const links = [
    ["home", t.nav.home], ["popular", t.nav.popular], ["about", t.nav.about],
    ["gallery", t.nav.gallery], ["visit", t.nav.visit], ["contact", t.nav.contact],
  ] as const;

  const heading = "font-display text-4xl sm:text-5xl text-foreground";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4">
          <a href="#home" className="flex shrink-0 items-center gap-2">
            <img src={logo.url} alt="Malik Al-Sham logo" className="h-12 w-12 rounded-xl" />
            <span className="hidden font-display text-xl text-foreground sm:inline">Malik Al-Sham</span>
          </a>
          <nav className="hidden items-center gap-5 text-sm lg:flex">
            {links.map(([id, l]) => <a key={id} href={`#${id}`} className="hover:text-primary">{l}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-border p-0.5 text-xs">
              {LANGS.map((l) => (
                <Button variant="ghost" key={l.code} onClick={() => setLang(l.code)} aria-pressed={lang === l.code}
                  className={`min-h-8 rounded-md px-2.5 py-1.5 text-xs ${lang === l.code ? "bg-primary text-primary-foreground hover:bg-primary" : "text-muted-foreground"}`}>{l.label}</Button>
              ))}
            </div>
            <Button asChild className="hidden sm:inline-flex"><a href={TEL}><Phone size={16} />{t.call}</a></Button>
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="lg:hidden">{open ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col border-t border-border bg-background px-4 pb-4 lg:hidden">
            {links.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="py-3 text-lg">{l}</a>)}
            <div className="flex gap-4 pt-2"><Social /></div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="hero-section relative overflow-hidden">
        <div className="hero-layout mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2 lg:gap-16">
          <div className="relative z-10 py-4">
            <div className="mb-6 flex items-center gap-3 text-sm text-sage-ink"><span className="h-px w-8 bg-primary" /><span>{t.heroEyebrow}</span></div>
            <h1 className="font-display text-5xl leading-[1.12] text-foreground lg:text-7xl">{lang === "en" ? "Malik Al-Sham" : "ملك الشام"}</h1>
            <p className="mt-5 max-w-lg font-display text-2xl leading-relaxed text-sage-ink">{t.tagline}</p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">{t.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><a href={TEL}><Phone size={18} />{t.orderCall}</a></Button>
              <Button asChild variant="outline"><a href="#popular">{t.viewDishes}<ArrowRight size={18} className="rtl:rotate-180" /></a></Button>
            </div>
            <div className="mt-9 flex items-center gap-2 text-sm text-muted-foreground"><Clock size={16} className="text-sage-ink" />{t.hoursVal}</div>
          </div>
          <div className="hero-photo-wrap relative">
            <img src={carving.url} alt="Chef carving shawarma at Malik Al-Sham" className="hero-photo h-full w-full object-cover" fetchPriority="high" />
            <span className="botanical-accent" aria-hidden="true"><Leaf strokeWidth={0.7} /></span>
            <div className="hero-photo-label flex items-center gap-3 bg-background px-5 py-4 shadow-natural"><Leaf className="text-sage-ink" size={24} /><span className="font-display text-lg">{t.freshLabel}</span></div>
          </div>
        </div>
      </section>

      {/* Popular */}
      <section id="popular" className="mx-auto max-w-7xl px-6 py-20">
        <div className="reveal text-center"><h2 className={heading}>{t.popularTitle}</h2><p className="mt-2 text-muted-foreground">{t.popularSub}</p></div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.dishes.map(([name, desc], i) => (
            <article key={i} className="reveal group overflow-hidden rounded-xl border border-border/60 bg-card shadow-natural">
              <div className="aspect-[4/3] overflow-hidden"><img loading="lazy" src={dishImgs[i]?.url} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /></div>
              <div className="p-6"><span className="mb-3 inline-block rounded-md bg-primary/15 px-2.5 py-1 text-xs font-semibold text-sage-ink">{i === 0 ? t.chefFavorite : t.freshLabel}</span><h3 className="font-display text-2xl text-foreground">{name}</h3><p className="mt-1 text-muted-foreground">{desc}</p></div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-muted py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
          <div className="reveal"><h2 className={heading}>{t.aboutTitle}</h2><p className="mt-5 text-lg">{t.about1}</p><p className="mt-4 text-lg text-muted-foreground">{t.about2}</p></div>
          <div className="reveal grid grid-cols-2 gap-4">
            <img loading="lazy" src={carving.url} alt="Malik Al-Sham kitchen" className="aspect-[3/4] w-full rounded-t-[8rem] rounded-b-xl object-cover" />
            <img loading="lazy" src={team.url} alt="Malik Al-Sham team" className="mt-8 aspect-[3/4] w-full rounded-t-[8rem] rounded-b-xl object-cover" />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className={`reveal text-center ${heading}`}>{t.whyTitle}</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {t.why.map((w, i) => { const I = whyIcons[i] ?? Flame; return (
            <div key={i} className="reveal p-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/20 text-sage-ink"><I /></div>
              <p className="mt-4 font-bold">{w}</p>
            </div>); })}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className={`reveal text-center ${heading}`}>{t.galleryTitle}</h2>
        <div className="mt-10 columns-2 gap-3 md:columns-3">
          {gallery.map((g, i) => (
            <Button variant="ghost" key={i} onClick={() => setLightbox(g.url)} aria-label={`${t.galleryTitle}: ${i + 1}`} className="reveal mb-3 block h-auto w-full overflow-hidden rounded-xl p-0">
              <img loading="lazy" src={g.url} alt={`Malik Al-Sham photo ${i + 1}`} className="w-full transition-transform duration-500 hover:scale-105" />
            </Button>
          ))}
        </div>
      </section>
      {lightbox && (
        <div role="dialog" aria-modal="true" aria-label={t.galleryTitle} onClick={() => setLightbox(null)} className="fixed inset-0 z-50 grid place-items-center bg-background/95 p-4">
          <Button variant="ghost" size="icon" aria-label="Close" className="absolute end-4 top-4" onClick={() => setLightbox(null)}><X /></Button>
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-xl" />
        </div>
      )}

      {/* Visit */}
      <section id="visit" className="bg-muted">
        <div className="relative h-56 sm:h-80"><img loading="lazy" src={interior.url} alt="Malik Al-Sham dining room" className="h-full w-full object-cover" /></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2">
          <div className="reveal space-y-6">
            <h2 className={heading}>{t.visitTitle}</h2>
            <div className="flex gap-3"><MapPin className="shrink-0 text-primary" /><div><p className="font-bold">{t.address}</p><p className="text-muted-foreground" dir="ltr">HC53+M3P, Sulaymaniyah, Iraq</p></div></div>
            <div className="flex gap-3"><Clock className="shrink-0 text-primary" /><div><p className="font-bold">{t.hours}</p><p className="text-muted-foreground">{t.hoursVal}</p></div></div>
            <Button asChild><a href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_Q}`} target="_blank" rel="noopener noreferrer"><MapPin size={18} />{t.directions}<ArrowUpRight size={16} /></a></Button>
          </div>
          <iframe title="Map" loading="lazy" src={`https://maps.google.com/maps?q=${MAP_Q}&z=16&output=embed`} className="reveal h-80 w-full rounded-2xl border-0" />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className={`reveal ${heading}`}>{t.contactTitle}</h2>
        <p className="reveal mt-3 text-lg text-muted-foreground">{t.contactSub}</p>
        <a href={TEL} className="reveal mt-8 block font-display text-3xl text-secondary sm:text-4xl" dir="ltr">+964 772 800 4848</a>
        <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild><a href={TEL}><Phone size={18} />{t.orderCall}</a></Button>
        </div>
        <p className="reveal mt-6 text-muted-foreground">{t.delivery}</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted px-4 pb-28 pt-12 sm:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <img src={logo.url} alt="Malik Al-Sham logo" className="h-20 w-20 rounded-xl" loading="lazy" />
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">{links.map(([id, l]) => <a key={id} href={`#${id}`} className="hover:text-primary">{l}</a>)}</nav>
          <div className="flex gap-4"><Social /></div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Malik Al-Sham · ملك الشام. {t.rights}</p>
        </div>
      </footer>

      {/* Floating buttons */}
      <div className="fixed bottom-5 end-4 z-40 flex flex-col gap-3">
        <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card"><Instagram /></a>
        <a href={TEL} aria-label={t.call} className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-natural sm:hidden"><Phone /></a>
      </div>
    </div>
  );
}

function Social() {
  return (
    <>
      <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:text-primary"><Instagram /></a>
      <a href={FB} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:text-primary"><Facebook /></a>
    </>
  );
}
