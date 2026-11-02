import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, MessageCircle, Instagram, Facebook, Flame, Bike, Clock, Smile, MapPin, Menu, X } from "lucide-react";
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
const WA = "https://wa.me/9647728004848";
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

  const links = [
    ["home", t.nav.home], ["popular", t.nav.popular], ["about", t.nav.about],
    ["gallery", t.nav.gallery], ["visit", t.nav.visit], ["contact", t.nav.contact],
  ] as const;

  const heading = "font-display text-4xl sm:text-5xl text-primary";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <a href="#home" className="flex shrink-0 items-center gap-2">
            <img src={logo.url} alt="Malik Al-Sham logo" className="h-11 w-11 rounded-full" />
            <span className="hidden font-display text-xl text-primary sm:inline">ملك الشام</span>
          </a>
          <nav className="hidden items-center gap-5 text-sm lg:flex">
            {links.map(([id, l]) => <a key={id} href={`#${id}`} className="hover:text-primary">{l}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-border p-0.5 text-xs">
              {LANGS.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)} aria-pressed={lang === l.code}
                  className={`rounded-full px-2.5 py-1.5 ${lang === l.code ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{l.label}</button>
              ))}
            </div>
            <a href={TEL} className="hidden items-center gap-2 rounded-full bg-fire px-4 py-2 text-sm font-bold text-primary-foreground sm:flex"><Phone size={16} />{t.call}</a>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="grid h-10 w-10 place-items-center lg:hidden">{open ? <X /> : <Menu />}</button>
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
      <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <img src={carving.url} alt="Chef carving shawarma at Malik Al-Sham" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} className="ember" style={{ left: `${(i * 37) % 100}%`, width: 2 + (i % 3) * 2, height: 2 + (i % 3) * 2, animationDuration: `${6 + (i % 5) * 2}s`, animationDelay: `${(i * 0.7) % 8}s`, ["--drift" as string]: `${(i % 2 ? 1 : -1) * (10 + i * 3)}px` }} />
          ))}
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-5 pt-16 text-center">
          <img src={logo.url} alt="" className="mx-auto mb-6 h-32 w-32 rounded-full shadow-glow sm:h-40 sm:w-40" />
          <h1 className="font-display text-4xl leading-tight text-primary sm:text-6xl">{t.tagline}</h1>
          <p className="mt-4 text-lg text-foreground/90">{t.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={TEL} className="flex items-center justify-center gap-2 rounded-full bg-fire px-7 py-4 text-lg font-bold text-primary-foreground shadow-glow"><Phone />{t.orderCall}</a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-lg font-bold text-primary-foreground"><MessageCircle />{t.orderWa}</a>
          </div>
        </div>
      </section>

      {/* Popular */}
      <section id="popular" className="mx-auto max-w-6xl px-4 py-20">
        <div className="reveal text-center"><h2 className={heading}>{t.popularTitle}</h2><p className="mt-2 text-muted-foreground">{t.popularSub}</p></div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.dishes.map(([name, desc], i) => (
            <article key={i} className="reveal group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden"><img loading="lazy" src={dishImgs[i]?.url} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /></div>
              <div className="p-5"><h3 className="font-display text-2xl text-primary">{name}</h3><p className="mt-1 text-muted-foreground">{desc}</p></div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-card py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div className="reveal"><h2 className={heading}>{t.aboutTitle}</h2><p className="mt-5 text-lg">{t.about1}</p><p className="mt-4 text-lg text-muted-foreground">{t.about2}</p></div>
          <div className="reveal grid grid-cols-2 gap-4">
            <img loading="lazy" src={carving.url} alt="Malik Al-Sham kitchen" className="aspect-[3/4] w-full rounded-2xl object-cover" />
            <img loading="lazy" src={team.url} alt="Malik Al-Sham team" className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className={`reveal text-center ${heading}`}>{t.whyTitle}</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {t.why.map((w, i) => { const I = whyIcons[i] ?? Flame; return (
            <div key={i} className="reveal rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-fire text-primary-foreground"><I /></div>
              <p className="mt-4 font-bold">{w}</p>
            </div>); })}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className={`reveal text-center ${heading}`}>{t.galleryTitle}</h2>
        <div className="mt-10 columns-2 gap-3 md:columns-3">
          {gallery.map((g, i) => (
            <button key={i} onClick={() => setLightbox(g.url)} className="reveal mb-3 block w-full overflow-hidden rounded-xl">
              <img loading="lazy" src={g.url} alt={`Malik Al-Sham photo ${i + 1}`} className="w-full transition-transform duration-500 hover:scale-105" />
            </button>
          ))}
        </div>
      </section>
      {lightbox && (
        <div role="dialog" onClick={() => setLightbox(null)} className="fixed inset-0 z-50 grid place-items-center bg-background/95 p-4">
          <button aria-label="Close" className="absolute end-4 top-4 grid h-12 w-12 place-items-center"><X /></button>
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-xl" />
        </div>
      )}

      {/* Visit */}
      <section id="visit" className="bg-card">
        <div className="relative h-56 sm:h-80"><img loading="lazy" src={interior.url} alt="Malik Al-Sham dining room" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-hero-overlay" /></div>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
          <div className="reveal space-y-6">
            <h2 className={heading}>{t.visitTitle}</h2>
            <div className="flex gap-3"><MapPin className="shrink-0 text-primary" /><div><p className="font-bold">{t.address}</p><p className="text-muted-foreground" dir="ltr">HC53+M3P, Sulaymaniyah, Iraq</p></div></div>
            <div className="flex gap-3"><Clock className="shrink-0 text-primary" /><div><p className="font-bold">{t.hours}</p><p className="text-muted-foreground">{t.hoursVal}</p></div></div>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_Q}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"><MapPin size={18} />{t.directions}</a>
          </div>
          <iframe title="Map" loading="lazy" src={`https://maps.google.com/maps?q=${MAP_Q}&z=16&output=embed`} className="reveal h-80 w-full rounded-2xl border-0" />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className={`reveal ${heading}`}>{t.contactTitle}</h2>
        <p className="reveal mt-3 text-lg text-muted-foreground">{t.contactSub}</p>
        <a href={TEL} className="reveal mt-8 block font-display text-3xl text-fire sm:text-4xl" dir="ltr">+964 772 800 4848</a>
        <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={TEL} className="flex items-center justify-center gap-2 rounded-full bg-fire px-7 py-4 font-bold text-primary-foreground"><Phone />{t.call}</a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-4 font-bold text-primary-foreground"><MessageCircle />{t.orderWa}</a>
        </div>
        <p className="reveal mt-6 text-muted-foreground">{t.delivery}</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 pb-28 pt-12 sm:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <img src={logo.url} alt="Malik Al-Sham logo" className="h-20 w-20 rounded-full" loading="lazy" />
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">{links.map(([id, l]) => <a key={id} href={`#${id}`} className="hover:text-primary">{l}</a>)}</nav>
          <div className="flex gap-4"><Social /></div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Malik Al-Sham · ملك الشام. {t.rights}</p>
        </div>
      </footer>

      {/* Floating buttons */}
      <div className="fixed bottom-5 end-4 z-40 flex flex-col gap-3">
        <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card"><Instagram /></a>
        <a href={TEL} aria-label={t.call} className="grid h-14 w-14 place-items-center rounded-full bg-fire text-primary-foreground shadow-glow sm:hidden"><Phone /></a>
        <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-glow"><MessageCircle /></a>
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
