import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Instagram, MapPin, Phone, Clock, ArrowUpRight, ArrowRight } from "lucide-react";

import hero from "@/assets/hero.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import atelier from "@/assets/atelier.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amine la Cantine — Mode Premium · Hydra, Alger" },
      {
        name: "description",
        content:
          "Boutique de vêtements de mode premium à Hydra, Alger. Pièces sélectionnées, esthétique éditoriale, ouvert tous les jours jusqu'à minuit.",
      },
      { property: "og:title", content: "Amine la Cantine — Mode Premium" },
      {
        property: "og:description",
        content: "Boutique de mode premium à Hydra, Alger. Pièces sélectionnées avec soin.",
      },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Index,
});

const products = [
  { src: p1, name: "Overshirt Olive", price: "18 500 DA", span: "md:col-span-5 md:row-span-2", h: "h-[70vh]" },
  { src: p2, name: "Manteau Atelier", price: "42 000 DA", span: "md:col-span-3", h: "h-[45vh] md:mt-32" },
  { src: p3, name: "Ensemble Knit", price: "27 900 DA", span: "md:col-span-4 md:row-span-2", h: "h-[80vh]" },
  { src: p4, name: "Accessoires Cuir", price: "—", span: "md:col-span-4", h: "h-[45vh]" },
  { src: p5, name: "Chemise Lin", price: "14 200 DA", span: "md:col-span-4 md:mt-20", h: "h-[55vh]" },
  { src: p6, name: "Tissage Laine", price: "—", span: "md:col-span-4", h: "h-[45vh]" },
];

function Index() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Collection />
      <Atelier />
      <Info />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white">
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <a href="#top" className="text-xs tracking-[0.3em] font-medium uppercase">
          A·L·C
        </a>
        <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase font-medium">
          <a href="#collection" className="hover-accent">Collection</a>
          <a href="#atelier" className="hover-accent">Atelier</a>
          <a href="#visit" className="hover-accent">Visiter</a>
        </nav>
        <a
          href="tel:+213662206536"
          className="text-xs tracking-[0.25em] uppercase font-medium hover-accent hidden md:inline"
        >
          +213 662 20 65 36
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-black">
      <motion.div style={{ y: imageY, scale }} className="absolute inset-0 will-change-transform">
        <img
          src={hero}
          alt="Mannequin Amine la Cantine dans les rues d'Hydra, Alger"
          className="h-full w-full object-cover"
          width={1536}
          height={1920}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="eyebrow text-white/70 mb-6"
        >
          Hydra · Alger · Depuis 2019
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3.5rem,12vw,11rem)] font-bold leading-[0.85] tracking-tight text-balance"
        >
          Amine
          <br />
          <em className="italic font-normal">la Cantine</em>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12"
        >
          <a href="#collection" className="btn-line text-white">
            Découvrir la Collection
            <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-6 md:px-10 text-white text-[10px] tracking-[0.3em] uppercase">
        <span>Automne / Hiver 26</span>
        <span className="hidden md:inline">Scroll ↓</span>
        <span>N° 04</span>
      </div>
    </section>
  );
}

function ProductCard({
  src,
  name,
  price,
  className,
  imgClass,
  index,
}: {
  src: string;
  name: string;
  price: string;
  className?: string;
  imgClass?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : index % 2 === 0 ? ["8%", "-8%"] : ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.92, 1, 1.05]);

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden ${className ?? ""}`}
    >
      <motion.div style={{ y, scale }} className={`relative w-full overflow-hidden ${imgClass ?? "h-[60vh]"}`}>
        <img
          src={src}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-90"
        />
      </motion.div>
      <figcaption className="mt-4 flex items-baseline justify-between text-xs uppercase tracking-[0.2em]">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{price}</span>
      </figcaption>
      <div className="pointer-events-none absolute top-4 left-4 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="bg-background/90 backdrop-blur px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase font-medium">
          N° {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.figure>
  );
}

function Collection() {
  return (
    <section id="collection" className="relative py-32 md:py-48 px-6 md:px-10">
      <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="max-w-2xl">
          <span className="eyebrow">— Édition Courante</span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.95] text-balance">
            Une garde-robe<br />
            <em className="italic font-normal">pensée pièce par pièce.</em>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Six pièces de la saison — matières naturelles, coupes calmes, fabrication soignée. Disponibles en boutique à Hydra.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {products.map((p, i) => (
          <ProductCard
            key={p.name}
            src={p.src}
            name={p.name}
            price={p.price}
            className={p.span}
            imgClass={p.h}
            index={i}
          />
        ))}
      </div>

      <div className="mt-24 text-center">
        <a href="#visit" className="btn-line">
          Voir en boutique
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}

function Atelier() {
  return (
    <section id="atelier" className="relative bg-foreground text-background">
      <div className="grid md:grid-cols-2">
        <div className="relative md:sticky md:top-0 md:h-screen">
          <img
            src={atelier}
            alt="L'atelier Amine la Cantine"
            loading="lazy"
            className="h-[60vh] md:h-screen w-full object-cover"
          />
        </div>
        <div className="px-6 md:px-16 py-24 md:py-40 space-y-32 md:space-y-48">
          {[
            {
              eye: "— Philosophie",
              h: "La mode, comme une conversation discrète.",
              p: "Amine la Cantine n'est pas une enseigne. C'est un lieu, une sélection, un regard. Chaque pièce y arrive parce qu'elle mérite d'y être — pas parce qu'une saison l'a décidé.",
            },
            {
              eye: "— Sélection",
              h: "Matières d'abord. Le reste suit.",
              p: "Laine peignée, lin lavé, coton long, cuir tanné en Méditerranée. On choisit la matière avant la marque, la coupe avant la signature, le geste avant l'étiquette.",
            },
            {
              eye: "— Hydra",
              h: "Un atelier au cœur d'Alger.",
              p: "Au 38 Chemin de la Madeleine, derrière une porte sans enseigne, l'espace s'ouvre comme un appartement. On y vient pour essayer, pour parler, pour ne rien acheter aussi.",
            },
          ].map((b) => (
            <motion.div
              key={b.h}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow text-background/60">{b.eye}</span>
              <h3 className="mt-6 font-display text-4xl md:text-5xl font-bold leading-[1.05] text-balance">{b.h}</h3>
              <p className="mt-8 text-base md:text-lg leading-relaxed text-background/70 max-w-md">{b.p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Info() {
  const blocks = [
    {
      icon: MapPin,
      label: "Adresse",
      value: "38 Chemin de la Madeleine\nHydra, Alger",
      cta: { label: "Ouvrir Google Maps", href: "https://www.google.com/maps/search/?api=1&query=38+Chemin+de+la+Madeleine+Hydra+Alger" },
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Ouvert tous les jours\njusqu'à 00:00",
    },
    {
      icon: Phone,
      label: "Contact",
      value: "+213 662 20 65 36",
      cta: { label: "Appeler la boutique", href: "tel:+213662206536" },
    },
  ];

  return (
    <section id="visit" className="relative py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-20 md:mb-28"
        >
          <span className="eyebrow">— Visiter</span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.95] text-balance max-w-3xl">
            Passez nous voir, <em className="italic font-normal">on vous attend.</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {blocks.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-background p-10 md:p-14 min-h-[320px] flex flex-col justify-between"
            >
              <div>
                <b.icon className="h-5 w-5" strokeWidth={1.25} />
                <span className="eyebrow mt-8 block">{b.label}</span>
                <p className="mt-4 font-display text-2xl md:text-3xl leading-tight whitespace-pre-line">
                  {b.value}
                </p>
              </div>
              {b.cta && (
                <a
                  href={b.cta.href}
                  target={b.cta.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-medium hover-accent"
                >
                  {b.cta.label}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-12">
        <div>
          <h3 className="font-display text-5xl md:text-7xl font-bold leading-[0.9]">
            Amine<br />
            <em className="italic font-normal">la Cantine.</em>
          </h3>
          <p className="mt-6 text-xs tracking-[0.25em] uppercase text-background/60">
            Mode premium · Hydra, Alger
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover-accent inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.25} />
              Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="hover-accent text-xs tracking-[0.25em] uppercase"
            >
              TikTok
            </a>
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-background/50">
            © {new Date().getFullYear()} Amine la Cantine · Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
