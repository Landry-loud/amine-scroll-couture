import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, X } from "lucide-react";

import { catalogue, categories, formatPrice, type Category, type Product } from "@/lib/catalogue";
import catalogueHero from "@/assets/catalogue-hero.jpg";

export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Catalogue — Amine la Cantine" },
      {
        name: "description",
        content:
          "Découvrez l'intégralité du catalogue Amine la Cantine — manteaux, maille, pantalons, accessoires. Disponible en boutique à Hydra, Alger.",
      },
    ],
  }),
  component: CataloguePage,
});

function CataloguePage() {
  const [filter, setFilter] = useState<Category | "Tout">("Tout");
  const [sort, setSort] = useState<"new" | "asc" | "desc">("new");
  const [selected, setSelected] = useState<Product | null>(null);

  const items = useMemo(() => {
    let list = filter === "Tout" ? catalogue : catalogue.filter((p) => p.category === filter);
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <header className="border-b border-border">
        <div className="px-6 md:px-10 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-medium hover-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Retour
          </Link>
          <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            Amine <em className="italic font-normal">la Cantine</em>
          </Link>
          <a
            href="tel:+213662206536"
            className="hidden md:inline text-xs tracking-[0.25em] uppercase font-medium hover-accent"
          >
            +213 662 20 65 36
          </a>
          <span className="md:hidden text-xs tracking-[0.25em] uppercase font-medium">
            {items.length}
          </span>
        </div>
      </header>

      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-16 max-w-7xl mx-auto">
        <span className="eyebrow">— Catalogue · Saison Courante</span>
        <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.95] text-balance max-w-4xl">
          Toute la sélection, <em className="italic font-normal">pièce par pièce.</em>
        </h1>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          Disponible en boutique à Hydra. Pour vérifier les tailles et la disponibilité, appelez-nous ou passez nous voir.
        </p>
      </section>

      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-y border-border">
        <div className="px-6 md:px-10 py-4 max-w-7xl mx-auto flex items-center gap-2 md:gap-6 overflow-x-auto">
          <div className="flex items-center gap-2 md:gap-3 flex-1 overflow-x-auto scrollbar-none">
            <FilterChip active={filter === "Tout"} onClick={() => setFilter("Tout")}>
              Tout · {catalogue.length}
            </FilterChip>
            {categories.map((c) => {
              const count = catalogue.filter((p) => p.category === c).length;
              return (
                <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
                  {c} · {count}
                </FilterChip>
              );
            })}
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <span className="eyebrow">Trier</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent border-b border-foreground text-xs tracking-[0.2em] uppercase font-medium py-1 pr-6 focus:outline-none cursor-pointer"
            >
              <option value="new">Nouveautés</option>
              <option value="asc">Prix ↑</option>
              <option value="desc">Prix ↓</option>
            </select>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-10 py-12 md:py-20 max-w-7xl mx-auto">
        {items.length === 0 ? (
          <p className="text-center py-32 text-muted-foreground">Aucune pièce dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-20">
            {items.map((p, i) => (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group text-left"
              >
                <div className="relative overflow-hidden bg-muted aspect-[4/5]">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  {p.isNew && (
                    <span className="absolute top-3 left-3 bg-background px-2.5 py-1 text-[10px] tracking-[0.25em] uppercase font-medium">
                      Nouveau
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase font-medium">
                    Voir
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      {p.category}
                    </p>
                    <p className="mt-1 font-display text-lg md:text-xl leading-tight truncate">
                      {p.name}
                    </p>
                  </div>
                  <p className="text-xs tracking-[0.1em] font-medium shrink-0">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-border px-6 md:px-10 py-12 text-center">
        <p className="eyebrow">Visiter la boutique</p>
        <p className="mt-3 font-display text-2xl">38 Chemin de la Madeleine · Hydra, Alger</p>
        <Link to="/" className="mt-8 btn-line inline-flex">Retour à l'accueil</Link>
      </footer>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 px-4 py-2 text-[11px] tracking-[0.2em] uppercase font-medium border transition-colors ${
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border hover:border-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="fixed top-6 right-6 z-10 p-3 hover-accent"
      >
        <X className="h-5 w-5" strokeWidth={1.25} />
      </button>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="min-h-screen grid md:grid-cols-2 max-w-6xl mx-auto"
      >
        <div className="relative bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[60vh] md:h-screen md:sticky md:top-0 object-cover"
          />
        </div>
        <div className="px-6 md:px-12 py-16 md:py-24 flex flex-col justify-center">
          <span className="eyebrow">N° {product.id} · {product.category}</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[0.95] text-balance">
            {product.name}
          </h2>
          <p className="mt-8 text-2xl font-display">{formatPrice(product.price)}</p>

          <dl className="mt-10 space-y-4 text-sm border-t border-border pt-8">
            <div className="flex justify-between gap-6">
              <dt className="eyebrow">Matière</dt>
              <dd className="text-right">{product.material}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="eyebrow">Disponibilité</dt>
              <dd className="text-right">En boutique · Hydra</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="eyebrow">Réservation</dt>
              <dd className="text-right">Sur appel</dd>
            </div>
          </dl>

          <p className="mt-10 text-sm leading-relaxed text-muted-foreground max-w-md">
            Pièce sélectionnée par Amine pour la saison. Pour essayer, réserver une taille ou poser
            une question, contactez la boutique directement.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="tel:+213662206536" className="btn-line justify-center">
              Réserver — Appeler
            </a>
            <a
              href={`https://wa.me/213662206536?text=${encodeURIComponent(
                `Bonjour, je suis intéressé(e) par ${product.name} (N° ${product.id}).`,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-line justify-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
