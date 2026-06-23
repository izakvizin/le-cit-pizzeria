import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Instagram, MapPin, Phone, MessageCircle } from "lucide-react";
import ovenImg from "@/assets/le-cite-oven.jpg";
import ingredientsImg from "@/assets/le-cite-ingredients.jpg";
import barImg from "@/assets/le-cite-bar.jpg";
import lec1 from "@/assets/gallery/lec1.jpg.asset.json";
import lec2 from "@/assets/gallery/lec2.jpg.asset.json";
import lec3 from "@/assets/gallery/lec3.jpg.asset.json";
import lec4 from "@/assets/gallery/lec4.jpg.asset.json";
import lec5 from "@/assets/gallery/lec5.jpg.asset.json";
import lec6 from "@/assets/gallery/lec6.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Le Cité — Pizza napoletana, Nova Gorica" },
      { name: "description", content: "Picerija napoletanskega stila na Bevkovem trgu v Novi Gorici. Ročno izdelane pice, intimno vzdušje, nagrajen interier." },
      { property: "og:title", content: "Le Cité — Pizza napoletana, Nova Gorica" },
      { property: "og:description", content: "Picerija napoletanskega stila na Bevkovem trgu v Novi Gorici." },
    ],
  }),
  component: Page,
});

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Page() {
  const ref = useReveal();
  return (
    <div ref={ref} className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Intro />
      <Menu />
      <Reviews />
      <Ambient />
      <Gallery />
      <DailyMenu />
      <Reservation />
      <LocationMap />

      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 32);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav
      className={
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 " +
        (scrolled
          ? "bg-[color:var(--emerald-deep)]/75 backdrop-blur-md border-b border-white/5"
          : "bg-transparent")
      }
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="serif text-cream text-xl md:text-2xl tracking-display">
          LE CITÉ
        </a>
        <div className="hidden md:flex items-center gap-10 text-[13px] tracking-wide-2 uppercase text-cream/85">
          <a href="#jedilnik" className="hover:text-cream transition-colors">Jedilnik</a>
          <a href="#interier" className="hover:text-cream transition-colors">O nas</a>
          <a href="#galerija" className="hover:text-cream transition-colors">Galerija</a>
          <a href="#lokacija" className="hover:text-cream transition-colors">Lokacija</a>
          <a href="#rezervacija" className="hover:text-cream transition-colors">Kontakt</a>
          <a
            href="#rezervacija"
            className="border border-bronze text-cream px-5 py-2.5 hover:bg-bronze transition-colors"
          >
            Rezerviraj
          </a>
        </div>
        <a
          href="#rezervacija"
          className="md:hidden border border-bronze text-cream px-4 py-2 text-[12px] tracking-wide-2 uppercase"
        >
          Rezerviraj
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 40%, #1B4332 0%, #0F2A20 55%, #07140E 100%)",
      }}
    >
      <div className="absolute inset-0 marble-pattern-cream opacity-40" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 60%, transparent 0%, rgba(7,20,14,0.55) 100%)" }} />

      <div className="relative text-center px-6 max-w-4xl">
        <div className="reveal" style={{ transitionDelay: "100ms" }}>
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] md:text-xs mb-10">
            Bevkov trg · Nova Gorica
          </p>
        </div>
        <div className="reveal" style={{ transitionDelay: "300ms" }}>
          <h1
            className="serif text-cream tracking-display leading-none"
            style={{ fontSize: "clamp(3.5rem, 13vw, 10rem)" }}
          >
            LE CITÉ
          </h1>
        </div>
        <div className="reveal flex justify-center my-10" style={{ transitionDelay: "500ms" }}>
          <span className="block hairline w-20" />
        </div>
        <div className="reveal" style={{ transitionDelay: "650ms" }}>
          <p className="text-cream/70 text-sm md:text-base">
            Pristna neapeljska pica v središču Nove Gorice. Rezervirajte mizo in okusite vrhunske sestavine v Le Cité.
          </p>
        </div>
        <div className="reveal mt-12 flex flex-col sm:flex-row justify-center gap-4" style={{ transitionDelay: "850ms" }}>
          <a
            href="#jedilnik"
            className="border border-cream/80 text-cream px-8 py-4 text-[12px] tracking-wide-2 uppercase hover:bg-cream hover:text-emerald transition-colors"
          >
            Poglej jedilnik
          </a>
          <a
            href="#rezervacija"
            className="bg-bronze text-cream px-8 py-4 text-[12px] tracking-wide-2 uppercase hover:bg-[color:var(--bronze-soft)] transition-colors"
          >
            Rezerviraj mizo
          </a>
        </div>
      </div>

    </section>
  );
}

function Intro() {
  return (
    <section className="bg-cream py-32 md:py-48 px-6">
      <div className="max-w-4xl mx-auto text-center reveal">
        <p
          className="serif italic text-emerald leading-[1.25]"
          style={{ fontSize: "clamp(1.75rem, 4.2vw, 3.25rem)" }}
        >
          „Vsako testo počiva. Vsaka sestavina je izbrana. Vsaka pica je razlog za vrnitev.”
        </p>
      </div>
    </section>
  );
}

type Dish = { name: string; desc?: string; price?: string; gf?: boolean };
const MENU: Record<string, Dish[]> = {
  Pizza: [
    { name: "Margherita", desc: "Paradižnikova omaka San Marzano, fior di latte, sveža bazilika", price: "12 €" },
    { name: "Marinara", desc: "Paradižnik, česen, origano, oljčno olje", price: "11 €" },
    { name: "Diavola", desc: "Salama piccante, paradižnikova omaka, mozzarella", price: "14 €" },
    { name: "Crudo di Parma", desc: "Parška šunka, rukola, parmigiano reggiano", price: "16 €" },
    { name: "Quattro Formaggi", desc: "Štirje siri, kapljica medu", price: "15 €" },
    { name: "Burrata", desc: "Cherry paradižniki, sveža burrata, bazilika, oljčno olje", price: "17 €" },
    { name: "Vegetariana", desc: "Sezonska zelenjava, mozzarella, pesto", price: "14 €", gf: true },
  ],
  Testenine: [
    { name: "Spaghetti aglio e olio", desc: "Česen, oljčno olje, peperoncino, peteršilj", price: "13 €" },
    { name: "Tagliatelle al ragù", desc: "Počasi kuhano meso, paradižnik, rdeče vino", price: "15 €" },
    { name: "Penne all'arrabbiata", desc: "Pikantna paradižnikova omaka, česen", price: "12 €" },
  ],
  Pijače: [
    { name: "Vina", desc: "Bela, rdeča, rosé — po kozarcu ali steklenici" },
    { name: "Piva", desc: "Točeno, steklenica" },
    { name: "Kava", desc: "Espresso, macchiato, cappuccino" },
    { name: "Brezalkoholno", desc: "Sokovi, mineralna voda, limonada" },
  ],
  Sladice: [
    { name: "Tiramisu", price: "6 €" },
    { name: "Panna cotta", price: "5 €" },
  ],
};

function Menu() {
  const tabs = Object.keys(MENU);
  const [active, setActive] = useState(tabs[0]);
  return (
    <section id="jedilnik" className="bg-emerald text-cream py-28 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 marble-pattern-cream opacity-30 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center reveal">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-5">La carta</p>
          <h2 className="serif text-cream" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Jedilnik
          </h2>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 reveal">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={
                "relative pb-2 text-[12px] md:text-sm tracking-wide-2 uppercase transition-colors " +
                (active === t ? "text-cream" : "text-cream/55 hover:text-cream/85")
              }
            >
              {t}
              <span
                className={
                  "absolute left-0 right-0 -bottom-0 h-px bg-bronze transition-transform duration-500 origin-left " +
                  (active === t ? "scale-x-100" : "scale-x-0")
                }
              />
            </button>
          ))}
        </div>

        <ul className="mt-16 divide-y divide-cream/10">
          {MENU[active].map((d) => (
            <li
              key={d.name}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 py-6 transition-colors hover:bg-cream/[0.03] px-2 -mx-2"
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-cream text-base md:text-lg font-medium">{d.name}</h3>
                  {d.gf && (
                    <span className="text-[10px] tracking-wide-2 uppercase text-bronze border border-bronze/40 px-1.5 py-0.5">
                      GF
                    </span>
                  )}
                </div>
                {d.desc && (
                  <p className="serif italic text-cream/55 text-sm md:text-[15px] mt-1.5 leading-snug">
                    {d.desc}
                  </p>
                )}
              </div>
              {d.price && (
                <span className="text-bronze text-base md:text-lg shrink-0 tabular-nums">{d.price}</span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-cream/45 text-[12px] tracking-wide-2 uppercase reveal">
          Brezglutenske različice na zahtevo
        </p>
      </div>
    </section>
  );
}

function Reviews() {
  const Card = ({ quote, author }: { quote: string; author: ReactNode }) => (
    <div className="reveal">
      <p
        className="serif italic text-emerald leading-[1.3]"
        style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)" }}
      >
        „{quote}”
      </p>
      <div className="mt-8 text-sm text-foreground/70">{author}</div>
    </div>
  );
  const Stars = () => (
    <span className="text-bronze tracking-[0.15em]" aria-label="5 zvezdic">★★★★★</span>
  );
  return (
    <section className="bg-cream py-28 md:py-40 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
        <Card
          quote="Svetovno dobre pice. Simfonija okusov."
          author={<>— Lara I., Google &nbsp; <Stars /></>}
        />
        <Card
          quote="One of the best Neapolitan-style pizzas in Slovenia."
          author={<>— Nejc F., Google &nbsp; <Stars /></>}
        />
      </div>
    </section>
  );
}

function Ambient() {
  const cards = [
    { src: ovenImg, label: "Peč", caption: "Ročna 3D keramika" },
    { src: ingredientsImg, label: "Sestavine", caption: "San Marzano · Fior di latte" },
    { src: barImg, label: "Bar", caption: "Smaragdna garnitura" },
  ];
  return (
    <section id="interier" className="grid md:grid-cols-2 min-h-[80vh]">
      <div className="bg-emerald text-cream p-10 md:p-20 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern-cream opacity-25 pointer-events-none" />
        <div className="relative max-w-md reveal">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-6">Atmosfera</p>
          <h2 className="serif text-cream leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Interier
          </h2>
          <span className="block hairline w-16 my-8" />
          <p className="serif italic text-cream/80 text-lg md:text-xl leading-relaxed">
            Ukrivljen kovinski pult. Smaragdna sedežna garnitura. Ročno izdelana 3D keramika ob peči — barve reke Soče.
          </p>
          <p className="mt-6 text-cream/55 text-sm tracking-wide leading-relaxed">
            Nagrajeno arhitekturno delo studia Kreadom, 2020.
          </p>
        </div>
      </div>

      <div className="bg-[color:var(--muted)] p-6 md:p-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 items-stretch">
        {cards.map((c, i) => (
          <figure
            key={c.label}
            className="reveal group relative overflow-hidden bg-emerald-deep"
            style={{ aspectRatio: "4 / 5", transitionDelay: `${i * 120}ms` }}
          >
            <img
              src={c.src}
              alt={c.label}
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/85 via-emerald-deep/15 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-cream">
              <span className="block hairline w-8 mb-3" />
              <p className="serif text-xl leading-tight">{c.label}</p>
              <p className="text-[11px] tracking-wide-2 uppercase text-cream/60 mt-1">{c.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const tiles = [
    { src: lec1.url, span: "md:col-span-2 md:row-span-2", ratio: "4 / 3", label: "Sala", size: "large" },
    { src: lec5.url, span: "", ratio: "3 / 4", label: "Pizza", size: "small" },
    { src: lec4.url, span: "", ratio: "3 / 4", label: "Bar", size: "small" },
    { src: lec3.url, span: "md:row-span-2", ratio: "3 / 4", label: "Sladica", size: "tall" },
    { src: lec2.url, span: "", ratio: "3 / 4", label: "Detajl", size: "small" },
    { src: lec6.url, span: "md:col-span-2", ratio: "16 / 9", label: "Vhod", size: "wide" },
  ];
  return (
    <section id="galerija" className="bg-cream py-28 md:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center reveal mb-16 md:mb-20">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-5">Galleria</p>
          <h2 className="serif text-emerald" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Galerija
          </h2>
          <span className="block hairline w-16 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {tiles.map((t, i) => (
            <figure
              key={i}
              className={
                "reveal relative overflow-hidden bg-emerald/10 group cursor-pointer " +
                t.span
              }
              style={{ aspectRatio: t.ratio, transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={t.src}
                  alt={`Le Cité — ${t.label}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.16,0.84,0.3,1)] group-hover:scale-110 group-hover:brightness-110"
                />
                {/* shine sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms] ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-emerald-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              <figcaption className="absolute left-0 right-0 bottom-0 p-4 md:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,0.84,0.3,1)]">
                <span className="block hairline w-8 mb-2" />
                <span className="serif italic text-cream text-lg md:text-xl">{t.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <section id="lokacija" className="bg-emerald text-cream py-28 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 marble-pattern-cream opacity-20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center reveal mb-14 md:mb-20">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-5">Dove siamo</p>
          <h2 className="serif text-cream" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Kje nas najdete
          </h2>
          <span className="block hairline w-16 mx-auto mt-8" />
          <p className="mt-8 text-cream/75 serif italic text-lg">Bevkov trg, 5000 Nova Gorica</p>
        </div>

        <div className="reveal relative overflow-hidden border border-cream/10 shadow-2xl" style={{ aspectRatio: "16 / 9" }}>
          <iframe
            title="Le Cité — Bevkov trg, Nova Gorica"
            src="https://www.google.com/maps?q=Bevkov+trg+Nova+Gorica&output=embed"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
            allowFullScreen
          />
        </div>

        <div className="reveal mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Bevkov+trg+Nova+Gorica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-bronze text-cream px-8 py-4 text-[12px] tracking-wide-2 uppercase hover:bg-[color:var(--bronze-soft)] transition-colors"
          >
            <MapPin size={16} strokeWidth={1.6} />
            Navodila za pot
          </a>
        </div>
      </div>
    </section>
  );
}


function Reservation() {
  return (
    <section id="rezervacija" className="grid md:grid-cols-2 min-h-[90vh]">
      <div className="bg-emerald text-cream p-10 md:p-20 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern-cream opacity-25 pointer-events-none" />
        <div className="relative max-w-md reveal">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-6">Prenotazione</p>
          <h2 className="serif text-cream leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Rezerviraj mizo
          </h2>
          <span className="block hairline w-16 my-8" />
          <p className="serif italic text-cream/80 text-lg md:text-xl leading-relaxed">
            Pokličite nas — najhitreje in najbolj osebno. Za vikende priporočamo rezervacijo nekaj dni vnaprej.
          </p>
          <ul className="mt-12 space-y-5 text-cream/85">
            <li className="flex items-start gap-4">
              <MapPin size={18} strokeWidth={1.4} className="text-bronze mt-0.5 shrink-0" />
              <span>Bevkov trg, 5000 Nova Gorica</span>
            </li>
            <li className="flex items-start gap-4">
              <Instagram size={18} strokeWidth={1.4} className="text-bronze mt-0.5 shrink-0" />
              <a href="https://instagram.com/le.cite" className="hover:text-cream">@le.cite</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-cream p-10 md:p-20 flex items-center">
        <div className="w-full max-w-md mx-auto reveal text-center md:text-left">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-8">Pokličite</p>

          <a
            href="tel:+38659814129"
            className="serif text-emerald block leading-[0.95] hover:text-bronze transition-colors"
            style={{ fontSize: "clamp(2.25rem, 6.5vw, 4.25rem)" }}
          >
            +386 5 981 4129
          </a>

          <span className="block hairline w-16 my-10 mx-auto md:mx-0" />

          <p className="text-foreground/65 leading-relaxed">
            Odgovorimo med delovnim časom. Povejte število gostov, dan in uro — in vam takoj potrdimo mizo.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+38659814129"
              className="flex-1 inline-flex items-center justify-center gap-3 bg-emerald text-cream py-4 text-[12px] tracking-wide-2 uppercase hover:bg-emerald-deep transition-colors"
            >
              <Phone size={16} strokeWidth={1.6} />
              Pokliči
            </a>
            <a
              href="https://wa.me/38659814129?text=Pozdravljeni%2C%20rad%20bi%20rezerviral%20mizo%20v%20Le%20Cit%C3%A9."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-3 border border-emerald/80 text-emerald py-4 text-[12px] tracking-wide-2 uppercase hover:bg-emerald hover:text-cream transition-colors"
            >
              <MessageCircle size={16} strokeWidth={1.6} />
              WhatsApp
            </a>
          </div>

          <p className="mt-10 text-[11px] tracking-wide-2 uppercase text-foreground/40">
            Pon–Sob · 11:00–23:00
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[color:var(--emerald-deep)] text-cream/70 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 items-center gap-10 text-center md:text-left">
        <p className="text-[11px] tracking-wide-2 uppercase text-cream/45 order-2 md:order-1">© 2025 Le Cité</p>
        <div className="order-1 md:order-2 text-center">
          <p className="serif tracking-display text-cream text-2xl">LE CITÉ</p>
          <p className="mt-3 text-[12px] tracking-wide-2 uppercase text-cream/50">
            Bevkov trg · Nova Gorica · +386 5 981 4129
          </p>
        </div>
        <div className="flex md:justify-end justify-center order-3">
          <a href="https://instagram.com/le.cite" aria-label="Instagram" className="text-cream/60 hover:text-bronze transition-colors">
            <Instagram size={20} strokeWidth={1.4} />
          </a>
        </div>
      </div>
    </footer>
  );
}
