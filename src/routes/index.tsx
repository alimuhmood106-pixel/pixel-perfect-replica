import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Phone, Instagram, Facebook, Flame, Bike, Clock, Smile, MapPin, Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DICT, LANGS, type Lang } from "@/lib/i18n";
import logo from "@/assets/logo.jpg.asset.json";
import carving from "@/assets/shawarma-carving.jpg.asset.json";
import meatCarving from "@/assets/meat-carving.jpg.asset.json";
import chickenBurger from "@/assets/chicken-burger.jpg.asset.json";
import cheesyBake from "@/assets/cheesy-bake.jpg.asset.json";
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

// Raw HTML so the muted/autoplay/playsinline attributes are in the server-rendered markup (React drops `muted` there, and iOS then blocks autoplay).
const HERO_VIDEO_HTML = '<video autoplay muted loop playsinline webkit-playsinline preload="auto" disablepictureinpicture disableremoteplayback tabindex="-1" poster="/hero-poster.jpg"><source src="/hero-loop.mp4" type="video/mp4"></video>';

const dishImgs = [wrap, chicken, burger, pasta, plate];
const gallery = [carving, meatCarving, wrap, chicken, burger, chickenBurger, pasta, plate, cheesyBake, team, interior];
const whyIcons = [Flame, Bike, Clock, Smile];

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const heroVideoWrap = useRef<HTMLDivElement>(null);
  const t = DICT[lang];
  const rtl = lang !== "en";

  useEffect(() => {
    const v = heroVideoWrap.current?.querySelector("video");
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().then(() => true, () => false);
    // Some phones (Low Power Mode, in-app browsers) refuse autoplay: retry on the first touch, click or scroll.
    const events = ["touchstart", "pointerdown", "click", "keydown", "scroll"] as const;
    const stop = () => events.forEach((e) => window.removeEventListener(e, onGesture));
    const onGesture = () => { tryPlay().then((ok) => ok && stop()); };
    tryPlay().then((ok) => { if (!ok) events.forEach((e) => window.addEventListener(e, onGesture, { passive: true })); });
    const onVisible = () => { if (!document.hidden && v.paused) tryPlay(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { stop(); document.removeEventListener("visibilitychange", onVisible); };
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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

  const heading = "heading-glow font-display text-4xl sm:text-5xl text-foreground";

  return (
    <div className="page-root relative isolate min-h-screen bg-background text-foreground">
      <div aria-hidden className="wrapper-pattern" />
      {/* Navbar */}
      <header className={`fixed inset-x-0 top-0 z-40 border-b-2 text-coal-foreground transition-[background-color,border-color,backdrop-filter] duration-300 ${scrolled || open ? "border-primary bg-coal/90 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4">
          <a href="#home" className="flex shrink-0 items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-foreground ring-1 ring-primary/60">
              <img src={logo.url} alt="Malik Al-Sham logo" className="h-full w-full object-cover" />
            </span>
            <span className="hidden font-display text-xl text-coal-foreground sm:inline">Malik Al-Sham</span>
          </a>
          <nav className="hidden items-center gap-5 text-sm lg:flex">
            {links.map(([id, l]) => <a key={id} href={`#${id}`} className="hover:text-primary">{l}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-coal-foreground/25 p-0.5 text-xs">
              {LANGS.map((l) => (
                <Button variant="ghost" key={l.code} onClick={() => setLang(l.code)} aria-pressed={lang === l.code}
                  className={`min-h-8 rounded-md px-2.5 py-1.5 text-xs ${lang === l.code ? "bg-primary text-primary-foreground hover:bg-primary" : "text-coal-foreground/70 hover:bg-coal-foreground/10 hover:text-coal-foreground"}`}>{l.label}</Button>
              ))}
            </div>
            <Button asChild variant="mustard" className="hidden sm:inline-flex"><a href={TEL}><Phone size={16} />{t.call}</a></Button>
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="text-coal-foreground hover:bg-coal-foreground/10 hover:text-coal-foreground lg:hidden">{open ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col border-t border-coal-foreground/15 bg-coal px-4 pb-4 lg:hidden">
            {links.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="py-3 text-lg hover:text-primary">{l}</a>)}
            <div className="flex gap-4 pt-2"><Social dark /></div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="hero-section relative isolate flex min-h-svh flex-col overflow-hidden text-coal-foreground">
        <div ref={heroVideoWrap} aria-hidden className="hero-video" dangerouslySetInnerHTML={{ __html: HERO_VIDEO_HTML }} />
        <div aria-hidden className="hero-scrim" />
        <div className="hero-content relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="hero-pill inline-flex items-center gap-2 rounded-full border border-primary/60 bg-coal/50 px-4 py-1.5 text-sm text-coal-foreground/90 backdrop-blur-sm"><Clock size={15} className="text-primary" />{t.hoursVal}</span>
          <h1 className="mt-7">
            <img src="/logo-wordmark.png" alt={lang === "en" ? "Malik Al-Sham" : "ملك الشام"} width={1908} height={504} fetchPriority="high" className="block h-auto w-full max-w-xs sm:max-w-lg" />
          </h1>
          <p className="mt-6 max-w-xl font-display text-2xl leading-snug text-coal-foreground sm:text-4xl">{t.tagline}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild variant="mustard" size="lg"><a href={TEL}><Phone size={18} />{t.orderCall}</a></Button>
            <Button asChild variant="outline" size="lg" className="border-primary bg-transparent text-primary hover:bg-primary/10 hover:text-primary"><a href="#popular">{t.viewDishes}<ArrowRight size={18} className="rtl:rotate-180" /></a></Button>
          </div>
        </div>
      </section>

      {/* Popular */}
      <section id="popular" className="mx-auto max-w-7xl px-6 py-20">
        <div className="reveal text-center">
          <Flame className="flame-flicker mx-auto mb-3 text-secondary" size={28} />
          <h2 className={heading}>{t.popularTitle}</h2>
          <p className="mt-2 text-muted-foreground">{t.popularSub}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.dishes.map(([name, desc], i) => (
            <article key={i} className="reveal group overflow-hidden rounded-xl border border-border/60 border-t-4 border-t-primary bg-card shadow-warm">
              <div className="aspect-[4/3] overflow-hidden"><img loading="lazy" src={dishImgs[i]?.url} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /></div>
              <div className="p-6">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground"><Flame size={12} className="flame-flicker" />{i === 0 ? t.chefFavorite : t.freshLabel}</span>
                <h3 className="font-display text-2xl text-foreground">{name}</h3>
                <p className="mt-1 text-muted-foreground">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="grain bg-muted/85 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
          <div className="reveal">
            <Flame className="flame-flicker mb-3 text-secondary" size={28} />
            <h2 className={heading}>{t.aboutTitle}</h2>
            <p className="mt-5 text-lg">{t.about1}</p>
            <p className="mt-4 text-lg text-muted-foreground">{t.about2}</p>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            <img loading="lazy" src={carving.url} alt="Malik Al-Sham kitchen" className="arch-mask aspect-[3/4] w-full object-cover shadow-warm" />
            <img loading="lazy" src={team.url} alt="Malik Al-Sham team" className="arch-mask mt-8 aspect-[3/4] w-full object-cover shadow-warm" />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Flame className="flame-flicker reveal mx-auto mb-3 text-secondary" size={28} />
        <h2 className={`reveal text-center ${heading}`}>{t.whyTitle}</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {t.why.map((w, i) => { const I = whyIcons[i] ?? Flame; return (
            <div key={i} className="reveal rounded-xl border border-wood/30 bg-card p-6 text-center shadow-warm">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/60 text-secondary"><I /></div>
              <p className="mt-4 font-bold">{w}</p>
            </div>); })}
        </div>
      </section>

      <FlameDivider />

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
        <div role="dialog" aria-modal="true" aria-label={t.galleryTitle} onClick={() => setLightbox(null)} className="fixed inset-0 z-50 grid place-items-center bg-coal/95 p-4">
          <Button variant="ghost" size="icon" aria-label="Close" className="absolute end-4 top-4 text-coal-foreground hover:bg-coal-foreground/10 hover:text-coal-foreground" onClick={() => setLightbox(null)}><X /></Button>
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-xl" />
        </div>
      )}

      {/* Visit */}
      <section id="visit" className="grain bg-muted/85">
        <div className="relative h-56 sm:h-80"><img loading="lazy" src={interior.url} alt="Malik Al-Sham dining room" className="h-full w-full object-cover" /></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2">
          <div className="reveal space-y-6">
            <Flame className="flame-flicker text-secondary" size={28} />
            <h2 className={heading}>{t.visitTitle}</h2>
            <div className="flex gap-3"><MapPin className="shrink-0 text-secondary" /><div><p className="font-bold">{t.address}</p><p className="text-muted-foreground" dir="ltr">HC53+M3P, Sulaymaniyah, Iraq</p></div></div>
            <div className="flex gap-3"><Clock className="shrink-0 text-secondary" /><div><p className="font-bold">{t.hours}</p><p className="text-muted-foreground">{t.hoursVal}</p></div></div>
            <Button asChild><a href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_Q}`} target="_blank" rel="noopener noreferrer"><MapPin size={18} />{t.directions}<ArrowUpRight size={16} /></a></Button>
          </div>
          <iframe title="Map" loading="lazy" src={`https://maps.google.com/maps?q=${MAP_Q}&z=16&output=embed`} className="reveal h-80 w-full rounded-2xl border-0 shadow-warm" />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-4 py-20">
        <div className="reveal relative isolate overflow-hidden rounded-3xl border border-border/60 border-t-8 border-t-primary bg-card px-6 py-12 text-center shadow-warm sm:px-12">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-primary/60 text-secondary"><Phone size={28} /></div>
          <h2 className="inline-block max-w-full rounded-2xl border-2 border-primary px-5 py-2 font-display text-3xl text-foreground sm:px-8 sm:text-5xl">{t.contactTitle}</h2>
          <p className="mx-auto mt-3 max-w-md text-lg text-muted-foreground">{t.contactSub}</p>
          <a href={TEL} dir="ltr" className="mt-8 inline-block rounded-2xl border-2 border-primary bg-primary/15 px-4 py-4 text-2xl font-bold text-secondary transition-colors hover:bg-primary/35 sm:px-8 sm:text-4xl">+964 772 800 4848</a>
          <div className="mt-6 flex justify-center">
            <Button asChild variant="mustard" size="lg" className="glow-warm w-full sm:w-auto"><a href={TEL}><Phone size={18} />{t.orderCall}</a></Button>
          </div>
          <div className="mt-10 grid gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center justify-center gap-2"><Clock size={16} className="shrink-0 text-secondary" />{t.hoursVal}</div>
            <div className="flex items-center justify-center gap-2"><MapPin size={16} className="shrink-0 text-secondary" />{t.delivery}</div>
          </div>
          <div className="mt-6 flex justify-center gap-4"><Social /></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-primary bg-coal px-4 pb-28 pt-12 text-coal-foreground sm:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-xl bg-foreground ring-1 ring-primary/60">
            <img src={logo.url} alt="Malik Al-Sham logo" className="h-full w-full object-cover" loading="lazy" />
          </span>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">{links.map(([id, l]) => <a key={id} href={`#${id}`} className="hover:text-primary">{l}</a>)}</nav>
          <div className="flex gap-4"><Social dark /></div>
          <p className="text-sm text-coal-foreground/70">© {new Date().getFullYear()} Malik Al-Sham · ملك الشام. {t.rights}</p>
        </div>
      </footer>

      {/* Floating buttons */}
      <div className="fixed bottom-5 end-4 z-40 flex flex-col gap-3">
        <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card shadow-warm hover:text-secondary"><Instagram /></a>
        <a href={TEL} aria-label={t.call} className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground glow-warm sm:hidden"><Phone /></a>
      </div>
    </div>
  );
}

function FlameDivider() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden="true">
      <span className="h-0.5 w-16 rounded-full bg-primary" />
      <Flame size={20} className="flame-flicker text-primary" fill="currentColor" />
      <span className="h-0.5 w-16 rounded-full bg-primary" />
    </div>
  );
}

function Social({ dark = false }: { dark?: boolean }) {
  const cls = dark
    ? "grid h-11 w-11 place-items-center rounded-full border border-coal-foreground/25 hover:text-primary"
    : "grid h-11 w-11 place-items-center rounded-full border border-border hover:text-secondary";
  return (
    <>
      <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={cls}><Instagram /></a>
      <a href={FB} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={cls}><Facebook /></a>
    </>
  );
}
