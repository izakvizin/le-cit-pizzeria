import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Instagram, MapPin, Phone, MessageCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGS, LangProvider, useLang, type Text } from "@/lib/i18n";
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
  component: LocalizedPage,
});

// The provider sits above Page so a language change re-renders only the sections
// that read it — Page itself never re-renders, so revealed (.reveal.in) blocks stay visible.
function LocalizedPage() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}

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
      <DailyMenu />
      <Reviews />
      <Ambient />
      <Gallery />
      <Reservation />
      <LocationMap />
      <Footer />
    </div>
  );
}

function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label="Jezik · Lingua · Language"
        className="inline-flex items-center gap-1.5 uppercase tracking-wide-2 outline-none hover:text-cream focus-visible:text-cream transition-colors"
      >
        {lang}
        <ChevronDown size={14} strokeWidth={1.6} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={14}
        className="min-w-[10rem] rounded-none border-white/10 bg-[color:var(--emerald-deep)] p-1 shadow-2xl"
      >
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLang(l.code)}
            className={
              "rounded-none px-3 py-2.5 text-[12px] tracking-wide-2 uppercase cursor-pointer " +
              (lang === l.code ? "text-bronze" : "text-cream/80")
            }
          >
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Nav() {
  const { t } = useLang();
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
          <a href="#jedilnik" className="hover:text-cream transition-colors">
            {t({ sl: "Jedilnik", it: "Menu", en: "Menu" })}
          </a>
          <a href="#interier" className="hover:text-cream transition-colors">
            {t({ sl: "O nas", it: "Chi siamo", en: "About" })}
          </a>
          <a href="#galerija" className="hover:text-cream transition-colors">
            {t({ sl: "Galerija", it: "Galleria", en: "Gallery" })}
          </a>
          <a href="#lokacija" className="hover:text-cream transition-colors">
            {t({ sl: "Lokacija", it: "Posizione", en: "Location" })}
          </a>
          <a href="#rezervacija" className="hover:text-cream transition-colors">
            {t({ sl: "Kontakt", it: "Contatti", en: "Contact" })}
          </a>
          <a
            href="#rezervacija"
            className="border border-bronze text-cream px-5 py-2.5 hover:bg-bronze transition-colors"
          >
            {t({ sl: "Rezerviraj", it: "Prenota", en: "Book" })}
          </a>
          <LanguageSwitcher />
        </div>
        <div className="md:hidden flex items-center gap-5 text-[12px] text-cream/85">
          <LanguageSwitcher />
          <a
            href="#rezervacija"
            className="border border-bronze text-cream px-4 py-2 text-[12px] tracking-wide-2 uppercase"
          >
            {t({ sl: "Rezerviraj", it: "Prenota", en: "Book" })}
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const { t } = useLang();
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
            {t({
              sl: "Pristna neapeljska pica v središču Nove Gorice. Rezervirajte mizo in okusite vrhunske sestavine v Le Cité.",
              it: "Autentica pizza napoletana nel cuore di Nova Gorica. Prenotate un tavolo e assaporate ingredienti di prima qualità da Le Cité.",
              en: "Authentic Neapolitan pizza in the heart of Nova Gorica. Book a table and taste premium ingredients at Le Cité.",
            })}
          </p>
        </div>
        <div className="reveal mt-12 flex flex-col sm:flex-row justify-center gap-4" style={{ transitionDelay: "850ms" }}>
          <a
            href="#jedilnik"
            className="border border-cream/80 text-cream px-8 py-4 text-[12px] tracking-wide-2 uppercase hover:bg-cream hover:text-emerald transition-colors"
          >
            {t({ sl: "Poglej jedilnik", it: "Vedi il menu", en: "View menu" })}
          </a>
          <a
            href="#rezervacija"
            className="bg-bronze text-cream px-8 py-4 text-[12px] tracking-wide-2 uppercase hover:bg-[color:var(--bronze-soft)] transition-colors"
          >
            {t({ sl: "Rezerviraj mizo", it: "Prenota un tavolo", en: "Book a table" })}
          </a>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const { t } = useLang();
  return (
    <section className="bg-cream py-32 md:py-48 px-6">
      <div className="max-w-4xl mx-auto text-center reveal">
        <p
          className="serif italic text-emerald leading-[1.25]"
          style={{ fontSize: "clamp(1.75rem, 4.2vw, 3.25rem)" }}
        >
          {t({
            sl: "„Vsako testo počiva. Vsaka sestavina je izbrana. Vsaka pica je razlog za vrnitev.\"",
            it: "“Ogni impasto riposa. Ogni ingrediente è scelto. Ogni pizza è un motivo per tornare.”",
            en: "“Every dough rests. Every ingredient is chosen. Every pizza is a reason to come back.”",
          })}
        </p>
      </div>
    </section>
  );
}

type Dish = { name: string | Text; desc?: string | Text; price?: string; gf?: boolean };
type MenuCategory = { id: string; label: Text; dishes: Dish[] };
const MENU: MenuCategory[] = [
  {
    id: "pizza",
    label: { sl: "Pizza", it: "Pizza", en: "Pizza" },
    dishes: [
      {
        name: "Margherita",
        desc: {
          sl: "Paradižnikova omaka San Marzano, fior di latte, sveža bazilika",
          it: "Salsa di pomodoro San Marzano, fior di latte, basilico fresco",
          en: "San Marzano tomato sauce, fior di latte, fresh basil",
        },
        price: "12 €",
      },
      {
        name: "Marinara",
        desc: {
          sl: "Paradižnik, česen, origano, oljčno olje",
          it: "Pomodoro, aglio, origano, olio d'oliva",
          en: "Tomato, garlic, oregano, olive oil",
        },
        price: "11 €",
      },
      {
        name: "Diavola",
        desc: {
          sl: "Salama piccante, paradižnikova omaka, mozzarella",
          it: "Salame piccante, salsa di pomodoro, mozzarella",
          en: "Spicy salami, tomato sauce, mozzarella",
        },
        price: "14 €",
      },
      {
        name: "Crudo di Parma",
        desc: {
          sl: "Parška šunka, rukola, parmigiano reggiano",
          it: "Prosciutto di Parma, rucola, parmigiano reggiano",
          en: "Parma ham, rocket, parmigiano reggiano",
        },
        price: "16 €",
      },
      {
        name: "Quattro Formaggi",
        desc: {
          sl: "Štirje siri, kapljica medu",
          it: "Quattro formaggi, un filo di miele",
          en: "Four cheeses, a drizzle of honey",
        },
        price: "15 €",
      },
      {
        name: "Burrata",
        desc: {
          sl: "Cherry paradižniki, sveža burrata, bazilika, oljčno olje",
          it: "Pomodorini ciliegino, burrata fresca, basilico, olio d'oliva",
          en: "Cherry tomatoes, fresh burrata, basil, olive oil",
        },
        price: "17 €",
      },
      {
        name: "Vegetariana",
        desc: {
          sl: "Sezonska zelenjava, mozzarella, pesto",
          it: "Verdure di stagione, mozzarella, pesto",
          en: "Seasonal vegetables, mozzarella, pesto",
        },
        price: "14 €",
        gf: true,
      },
    ],
  },
  {
    id: "pasta",
    label: { sl: "Testenine", it: "Pasta", en: "Pasta" },
    dishes: [
      {
        name: "Spaghetti aglio e olio",
        desc: {
          sl: "Česen, oljčno olje, peperoncino, peteršilj",
          it: "Aglio, olio d'oliva, peperoncino, prezzemolo",
          en: "Garlic, olive oil, chilli, parsley",
        },
        price: "13 €",
      },
      {
        name: "Tagliatelle al ragù",
        desc: {
          sl: "Počasi kuhano meso, paradižnik, rdeče vino",
          it: "Carne cotta lentamente, pomodoro, vino rosso",
          en: "Slow-cooked meat, tomato, red wine",
        },
        price: "15 €",
      },
      {
        name: "Penne all'arrabbiata",
        desc: {
          sl: "Pikantna paradižnikova omaka, česen",
          it: "Salsa di pomodoro piccante, aglio",
          en: "Spicy tomato sauce, garlic",
        },
        price: "12 €",
      },
    ],
  },
  {
    id: "drinks",
    label: { sl: "Pijače", it: "Bevande", en: "Drinks" },
    dishes: [
      {
        name: { sl: "Vina", it: "Vini", en: "Wines" },
        desc: {
          sl: "Bela, rdeča, rosé — po kozarcu ali steklenici",
          it: "Bianchi, rossi, rosé — al calice o in bottiglia",
          en: "White, red, rosé — by the glass or bottle",
        },
      },
      {
        name: { sl: "Piva", it: "Birre", en: "Beers" },
        desc: { sl: "Točeno, steklenica", it: "Alla spina, in bottiglia", en: "Draught, bottled" },
      },
      {
        name: { sl: "Kava", it: "Caffè", en: "Coffee" },
        desc: "Espresso, macchiato, cappuccino",
      },
      {
        name: { sl: "Brezalkoholno", it: "Analcolici", en: "Soft drinks" },
        desc: {
          sl: "Sokovi, mineralna voda, limonada",
          it: "Succhi, acqua minerale, limonata",
          en: "Juices, mineral water, lemonade",
        },
      },
    ],
  },
  {
    id: "desserts",
    label: { sl: "Sladice", it: "Dolci", en: "Desserts" },
    dishes: [
      { name: "Tiramisu", price: "6 €" },
      { name: "Panna cotta", price: "5 €" },
    ],
  },
];

function Menu() {
  const { t } = useLang();
  const [active, setActive] = useState(MENU[0].id);
  const dishes = MENU.find((c) => c.id === active)?.dishes ?? [];
  return (
    <section id="jedilnik" className="bg-emerald text-cream py-28 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 marble-pattern-cream opacity-30 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center reveal">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-5">La carta</p>
          <h2 className="serif text-cream" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            {t({ sl: "Jedilnik", it: "Menu", en: "Menu" })}
          </h2>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 reveal">
          {MENU.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={
                "relative pb-2 text-[12px] md:text-sm tracking-wide-2 uppercase transition-colors " +
                (active === c.id ? "text-cream" : "text-cream/55 hover:text-cream/85")
              }
            >
              {t(c.label)}
              <span
                className={
                  "absolute left-0 right-0 -bottom-0 h-px bg-bronze transition-transform duration-500 origin-left " +
                  (active === c.id ? "scale-x-100" : "scale-x-0")
                }
              />
            </button>
          ))}
        </div>
        <ul className="mt-16 divide-y divide-cream/10">
          {dishes.map((d, i) => (
            <li
              key={`${active}-${i}`}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 py-6 transition-colors hover:bg-cream/[0.03] px-2 -mx-2"
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-cream text-base md:text-lg font-medium">{t(d.name)}</h3>
                  {d.gf && (
                    <span className="text-[10px] tracking-wide-2 uppercase text-bronze border border-bronze/40 px-1.5 py-0.5">
                      GF
                    </span>
                  )}
                </div>
                {d.desc && (
                  <p className="serif italic text-cream/55 text-sm md:text-[15px] mt-1.5 leading-snug">
                    {t(d.desc)}
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
          {t({
            sl: "Brezglutenske različice na zahtevo",
            it: "Versioni senza glutine su richiesta",
            en: "Gluten-free versions on request",
          })}
        </p>
      </div>
    </section>
  );
}

// Google Sheets quotes cells that contain commas ("Juha, solata"), so a plain split(",") is not enough.
function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      cells.push(cell);
      cell = "";
    } else {
      cell += ch;
    }
  }
  cells.push(cell);
  return cells;
}

function DailyMenu() {
  // Tab "za-splet" of the Google Sheet "Le Cité – dnevni meni" (shared as "anyone with the link can view").
  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/1cOAhHjLshG1Un32UQbC2mPVQhjTtF_hQYpMc2DUd0yw/gviz/tq?tqx=out:csv&headers=1&sheet=za-splet";

  // Optional sheet columns "kosilo_it" / "kosilo_en" translate the dish; empty cells fall back to "kosilo".
  type Row = { datum: string; kosilo: Text; cena: string };
  const { lang, t } = useLang();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState(false);

  const today = new Date();
  // Compared without leading zeros, so "08.10.2026", "8.10.2026" and "8. 10. 2026" all match.
  const todayStr = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
  const locale = LANGS.find((l) => l.code === lang)?.locale ?? "sl-SI";
  const todayLabel = today.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    let cancelled = false;
    fetch(`${CSV_URL}&_=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.text())
      .then((text) => {
        const [header = "", ...lines] = text.trim().split(/\r?\n/);
        const cols = splitCsvLine(header).map((h) => h.toLowerCase().replace(/[^a-z_]/g, ""));
        const col = (name: string, fallback: number) => {
          const i = cols.indexOf(name);
          return i === -1 ? fallback : i;
        };
        const iDatum = col("datum", 0);
        const iKosilo = col("kosilo", 1);
        const iCena = col("cena", 2);
        const iIt = col("kosilo_it", -1);
        const iEn = col("kosilo_en", -1);
        const parsed: Row[] = lines
          .map((l) => {
            const cells = splitCsvLine(l);
            const cell = (i: number) => (i < 0 ? "" : (cells[i] ?? "").trim());
            const sl = cell(iKosilo);
            return {
              datum: cell(iDatum)
                .split(".")
                .map((p) => p.replace(/\D/g, ""))
                .filter(Boolean)
                .map(Number)
                .join("."),
              kosilo: { sl, it: cell(iIt) || sl, en: cell(iEn) || sl },
              cena: cell(iCena).replace(/€/g, "").trim(), // the site adds "€" itself
            };
          })
          .filter((r) => r.datum && r.kosilo.sl);
        if (!cancelled) setRows(parsed);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const todays = (rows ?? []).filter((r) => r.datum === todayStr);

  return (
    <section id="dnevni-meni" className="bg-cream py-28 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center reveal mb-14 md:mb-20">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-5">
            Menu del giorno
          </p>
          <h2
            className="serif text-emerald"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {t({ sl: "Dnevni meni", it: "Pranzo del giorno", en: "Daily menu" })}
          </h2>
          <span className="block hairline w-16 mx-auto mt-8" />
          <p className="mt-6 serif italic text-emerald/70 text-lg capitalize">
            {todayLabel}
          </p>
        </div>

        {rows === null && !error && (
          <p className="text-center text-emerald/60 serif italic">
            {t({ sl: "Nalagam…", it: "Caricamento…", en: "Loading…" })}
          </p>
        )}

        {(error || (rows !== null && todays.length === 0)) && (
          <p className="text-center text-emerald/70 serif italic text-lg md:text-xl">
            {t({
              sl: "Dnevni meni bo kmalu objavljen.",
              it: "Il menu del giorno sarà pubblicato a breve.",
              en: "Today's menu will be published soon.",
            })}
          </p>
        )}

        {todays.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {todays.map((r, i) => (
              <article
                key={i}
                className="relative border border-emerald/15 bg-emerald p-8 md:p-10 hover:border-bronze/60 transition-colors group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-4">
                  {t({ sl: "Ponudba", it: "Proposta", en: "Option" })} {i + 1}
                </p>
                <h3 className="serif text-cream text-2xl md:text-3xl leading-tight">
                  {t(r.kosilo)}
                </h3>
                <span className="block hairline w-10 my-6" />
                {r.cena && (
                  <p className="text-bronze text-lg tabular-nums">
                    {r.cena} €
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
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
        „{quote}"
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
  const { t } = useLang();
  const cards: { src: string; label: Text; caption: string | Text }[] = [
    {
      src: ovenImg,
      label: { sl: "Peč", it: "Forno", en: "Oven" },
      caption: { sl: "Ročna 3D keramika", it: "Ceramica 3D fatta a mano", en: "Handmade 3D ceramics" },
    },
    {
      src: ingredientsImg,
      label: { sl: "Sestavine", it: "Ingredienti", en: "Ingredients" },
      caption: "San Marzano · Fior di latte",
    },
    {
      src: barImg,
      label: { sl: "Bar", it: "Bar", en: "Bar" },
      caption: { sl: "Smaragdna garnitura", it: "Divani color smeraldo", en: "Emerald seating" },
    },
  ];
  return (
    <section id="interier" className="grid md:grid-cols-2 min-h-[80vh]">
      <div className="bg-emerald text-cream p-10 md:p-20 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern-cream opacity-25 pointer-events-none" />
        <div className="relative max-w-md reveal">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-6">Atmosfera</p>
          <h2 className="serif text-cream leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {t({ sl: "Interier", it: "Interni", en: "Interior" })}
          </h2>
          <span className="block hairline w-16 my-8" />
          <p className="serif italic text-cream/80 text-lg md:text-xl leading-relaxed">
            {t({
              sl: "Ukrivljen kovinski pult. Smaragdna sedežna garnitura. Ročno izdelana 3D keramika ob peči — barve reke Soče.",
              it: "Un bancone curvo in metallo. Divani color smeraldo. Ceramica 3D fatta a mano accanto al forno — i colori dell'Isonzo.",
              en: "A curved metal counter. Emerald seating. Handmade 3D ceramics by the oven — the colours of the Soča river.",
            })}
          </p>
          <p className="mt-6 text-cream/55 text-sm tracking-wide leading-relaxed">
            {t({
              sl: "Nagrajeno arhitekturno delo studia Kreadom, 2020.",
              it: "Progetto architettonico premiato dello studio Kreadom, 2020.",
              en: "Award-winning architecture by studio Kreadom, 2020.",
            })}
          </p>
        </div>
      </div>
      <div className="bg-[color:var(--muted)] p-6 md:p-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 items-stretch">
        {cards.map((c, i) => (
          <figure
            key={c.label.sl}
            className="reveal group relative overflow-hidden bg-emerald-deep"
            style={{ aspectRatio: "4 / 5", transitionDelay: `${i * 120}ms` }}
          >
            <img
              src={c.src}
              alt={t(c.label)}
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/85 via-emerald-deep/15 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-cream">
              <span className="block hairline w-8 mb-3" />
              <p className="serif text-xl leading-tight">{t(c.label)}</p>
              <p className="text-[11px] tracking-wide-2 uppercase text-cream/60 mt-1">{t(c.caption)}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useLang();
  const tiles: { src: string; span: string; ratio: string; label: Text; size: string }[] = [
    { src: lec1.url, span: "md:col-span-2 md:row-span-2", ratio: "4 / 3", label: { sl: "Sala", it: "Sala", en: "Dining room" }, size: "large" },
    { src: lec5.url, span: "", ratio: "3 / 4", label: { sl: "Pizza", it: "Pizza", en: "Pizza" }, size: "small" },
    { src: lec4.url, span: "", ratio: "3 / 4", label: { sl: "Bar", it: "Bar", en: "Bar" }, size: "small" },
    { src: lec3.url, span: "md:row-span-2", ratio: "3 / 4", label: { sl: "Sladica", it: "Dolce", en: "Dessert" }, size: "tall" },
    { src: lec2.url, span: "", ratio: "3 / 4", label: { sl: "Detajl", it: "Dettaglio", en: "Detail" }, size: "small" },
    { src: lec6.url, span: "md:col-span-2", ratio: "16 / 9", label: { sl: "Vhod", it: "Ingresso", en: "Entrance" }, size: "wide" },
  ];
  return (
    <section id="galerija" className="bg-cream py-28 md:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center reveal mb-16 md:mb-20">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-5">
            {t({ sl: "Galleria", it: "Immagini", en: "Galleria" })}
          </p>
          <h2 className="serif text-emerald" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            {t({ sl: "Galerija", it: "Galleria", en: "Gallery" })}
          </h2>
          <span className="block hairline w-16 mx-auto mt-8" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {tiles.map((tile, i) => (
            <figure
              key={i}
              className={
                "reveal relative overflow-hidden bg-emerald/10 group cursor-pointer " +
                tile.span
              }
              style={{ aspectRatio: tile.ratio, transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={tile.src}
                  alt={`Le Cité — ${t(tile.label)}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.16,0.84,0.3,1)] group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms] ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-emerald-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              <figcaption className="absolute left-0 right-0 bottom-0 p-4 md:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,0.84,0.3,1)]">
                <span className="block hairline w-8 mb-2" />
                <span className="serif italic text-cream text-lg md:text-xl">{t(tile.label)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationMap() {
  const { t } = useLang();
  return (
    <section id="lokacija" className="bg-emerald text-cream py-28 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 marble-pattern-cream opacity-20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center reveal mb-14 md:mb-20">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-5">Dove siamo</p>
          <h2 className="serif text-cream" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            {t({ sl: "Kje nas najdete", it: "Dove trovarci", en: "Find us" })}
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
            {t({ sl: "Navodila za pot", it: "Indicazioni stradali", en: "Get directions" })}
          </a>
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  const { t } = useLang();
  const whatsappText = t({
    sl: "Pozdravljeni, rad bi rezerviral mizo v Le Cité.",
    it: "Buongiorno, vorrei prenotare un tavolo da Le Cité.",
    en: "Hello, I would like to book a table at Le Cité.",
  });
  return (
    <section id="rezervacija" className="grid md:grid-cols-2 min-h-[90vh]">
      <div className="bg-emerald text-cream p-10 md:p-20 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern-cream opacity-25 pointer-events-none" />
        <div className="relative max-w-md reveal">
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-6">Prenotazione</p>
          <h2 className="serif text-cream leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {t({ sl: "Rezerviraj mizo", it: "Prenota un tavolo", en: "Book a table" })}
          </h2>
          <span className="block hairline w-16 my-8" />
          <p className="serif italic text-cream/80 text-lg md:text-xl leading-relaxed">
            {t({
              sl: "Pokličite nas — najhitreje in najbolj osebno. Za vikende priporočamo rezervacijo nekaj dni vnaprej.",
              it: "Chiamateci — è il modo più rapido e personale. Per il fine settimana consigliamo di prenotare qualche giorno prima.",
              en: "Give us a call — it's the quickest and most personal way. For weekends we recommend booking a few days ahead.",
            })}
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
          <p className="text-bronze tracking-wide-2 uppercase text-[11px] mb-8">
            {t({ sl: "Pokličite", it: "Chiamateci", en: "Call us" })}
          </p>
          <a
            href="tel:+38659814129"
            className="serif text-emerald block leading-[0.95] hover:text-bronze transition-colors"
            style={{ fontSize: "clamp(2.25rem, 6.5vw, 4.25rem)" }}
          >
            +386 5 981 4129
          </a>
          <span className="block hairline w-16 my-10 mx-auto md:mx-0" />
          <p className="text-foreground/65 leading-relaxed">
            {t({
              sl: "Odgovorimo med delovnim časom. Povejte število gostov, dan in uro — in vam takoj potrdimo mizo.",
              it: "Rispondiamo durante l'orario di apertura. Diteci il numero di ospiti, il giorno e l'ora — e vi confermiamo subito il tavolo.",
              en: "We answer during opening hours. Tell us the number of guests, the day and the time — and we'll confirm your table right away.",
            })}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+38659814129"
              className="flex-1 inline-flex items-center justify-center gap-3 bg-emerald text-cream py-4 text-[12px] tracking-wide-2 uppercase hover:bg-emerald-deep transition-colors"
            >
              <Phone size={16} strokeWidth={1.6} />
              {t({ sl: "Pokliči", it: "Chiama", en: "Call" })}
            </a>
            <a
              href={`https://wa.me/38659814129?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-3 border border-emerald/80 text-emerald py-4 text-[12px] tracking-wide-2 uppercase hover:bg-emerald hover:text-cream transition-colors"
            >
              <MessageCircle size={16} strokeWidth={1.6} />
              WhatsApp
            </a>
          </div>
          <p className="mt-10 text-[11px] tracking-wide-2 uppercase text-foreground/40">
            {t({ sl: "Pon–Sob", it: "Lun–Sab", en: "Mon–Sat" })} · 11:00–23:00
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