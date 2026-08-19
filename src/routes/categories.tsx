import { createFileRoute, Link } from "@tanstack/react-router";

import { breadcrumbJsonLd, canonical, ogUrl } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/shared/Section";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Leather Bags, Wallets & Gifts | GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "Browse handcrafted leather categories: bags, wallets, office and travel accessories, keychains, pouches and handmade gifts.",
      },
      { property: "og:title", content: "Shop by Category — GIID Imayam Sigaram" },
      {
        property: "og:description",
        content: "Find the right handmade leather piece for work, travel, everyday or gifting.",
      },
      { property: "og:type", content: "website" },
      ogUrl("/categories"),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shop by Category — GIID Imayam Sigaram" },
      {
        name: "twitter:description",
        content: "Find the right handmade leather piece for work, travel, everyday or gifting.",
      },
    ],
    links: [{ rel: "canonical", href: canonical("/categories") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Categories", path: "/categories" },
          ]),
        ),
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Categories"
        intro="Nine collections, all cut and stitched in the same workshop."
      />
      <div className="mx-auto grid w-full max-w-7xl gap-5 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.categories.includes(c.slug)).length;
          return (
            <Link
              key={c.slug}
              to="/products"
              search={{ category: c.slug }}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div>
                <p className="eyebrow">{c.useCase}</p>
                <h2 className="mt-3 font-display text-2xl text-foreground">{c.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase text-foreground">
                {count} products
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
