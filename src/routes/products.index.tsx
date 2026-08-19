import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/shared/Section";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { breadcrumbJsonLd, canonical, ogUrl } from "@/lib/seo";

interface ProductSearch {
  category?: string;
}

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const sorts: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch =>
    typeof search["category"] === "string"
      ? { category: search["category"] }
      : {},

  head: () => ({
    meta: [
      {
        title: "Shop Handcrafted Leather Goods — GIID Imayam Sigaram",
      },
      {
        name: "description",
        content:
          "Browse handmade leather products — bags, wallets, sleeves, pouches, keychains and gifts, made to order by trained artisans.",
      },
      {
        property: "og:title",
        content: "Shop Handcrafted Leather Goods",
      },
      {
        property: "og:description",
        content:
          "Bags, wallets, sleeves and gifts, each made by hand and ordered on WhatsApp.",
      },
      ogUrl("/products"),
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Shop Handcrafted Leather Goods",
      },
      {
        name: "twitter:description",
        content:
          "Bags, wallets, sleeves and gifts, each made by hand and ordered on WhatsApp.",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: canonical("/products"),
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Shop Handcrafted Leather Goods",
          url: canonical("/products"),
          description:
            "Handmade leather bags, wallets, sleeves, pouches, keychains and gifts made to order by trained artisans.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: products.length,
            itemListElement: products.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: canonical(`/products/${p.slug}`),
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/products" },
          ]),
        ),
      },
    ],
  }),

  component: ProductsPage,
});

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  /*
   * Calculate price limits from the actual products.
   */
  const priceLimits = useMemo(() => {
    const prices = products
      .map((product) => product.price)
      .filter((price): price is number => typeof price === "number");

    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 5000,
    };
  }, []);

  const [minPrice, setMinPrice] = useState(priceLimits.min);
  const [maxPrice, setMaxPrice] = useState(priceLimits.max);

  /*
   * Filter + Sort
   */
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = products.filter((p) => {
      const inCategory =
        !category || p.categories.includes(category);

      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.serialNumber.includes(q) ||
        p.tags.some((t) =>
          t.toLowerCase().includes(q),
        );

      const productPrice = p.price ?? 0;

      const matchesPrice =
        productPrice >= minPrice &&
        productPrice <= maxPrice;

      return (
        inCategory &&
        matchesSearch &&
        matchesPrice
      );
    });

    /*
     * Apply old sort options
     */
    const sorted = [...filtered];

    sorted.sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sort === "price-asc") {
        return (
          (a.price ?? Infinity) -
          (b.price ?? Infinity)
        );
      }

      if (sort === "price-desc") {
        return (
          (b.price ?? 0) -
          (a.price ?? 0)
        );
      }

      // Featured
      return b.popularity - a.popularity;
    });

    return sorted;
  }, [
    category,
    query,
    minPrice,
    maxPrice,
    sort,
  ]);

  /*
   * Slider percentage positions
   */
  const minPercent =
    ((minPrice - priceLimits.min) /
      (priceLimits.max - priceLimits.min || 1)) *
    100;

  const maxPercent =
    ((maxPrice - priceLimits.min) /
      (priceLimits.max - priceLimits.min || 1)) *
    100;

  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title="Handcrafted leather goods"
        intro="Every product is made to order in our workshop. Choose a piece and continue on WhatsApp."
      />

      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">

        {/* Search + Price + Sort */}
        <div className="grid gap-5 rounded-2xl border border-border bg-card p-5 lg:grid-cols-[1fr_1.4fr_auto] lg:items-center">

          {/* Search */}
          <div>
            <Input
              type="search"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search products, tags or serial number"
              aria-label="Search products"
              className="h-11 rounded-full"
            />
          </div>

          {/* Price Range */}
          <div className="w-full">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Price Range
              </span>

              <span className="text-sm font-semibold text-foreground">
                ₹{minPrice.toLocaleString("en-IN")} – ₹
                {maxPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="relative h-6 px-2">

              {/* Base Track */}
              <div className="absolute top-1/2 right-2 left-2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />

              {/* Selected Range */}
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-foreground"
                style={{
                  left: `calc(${minPercent}% + 8px)`,
                  right: `calc(${100 - maxPercent}% + 8px)`,
                }}
              />

              {/* Minimum */}
              <input
                type="range"
                min={priceLimits.min}
                max={priceLimits.max}
                value={minPrice}
                step="1"
                onChange={(e) => {
                  const value = Number(
                    e.target.value,
                  );

                  if (value <= maxPrice) {
                    setMinPrice(value);
                  }
                }}
                className="price-range-input absolute inset-0 z-20 h-6 w-full cursor-pointer appearance-none bg-transparent"
                aria-label="Minimum price"
              />

              {/* Maximum */}
              <input
                type="range"
                min={priceLimits.min}
                max={priceLimits.max}
                value={maxPrice}
                step="1"
                onChange={(e) => {
                  const value = Number(
                    e.target.value,
                  );

                  if (value >= minPrice) {
                    setMaxPrice(value);
                  }
                }}
                className="price-range-input absolute inset-0 z-30 h-6 w-full cursor-pointer appearance-none bg-transparent"
                aria-label="Maximum price"
              />
            </div>

            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>
                ₹
                {priceLimits.min.toLocaleString(
                  "en-IN",
                )}
              </span>

              <span>
                ₹
                {priceLimits.max.toLocaleString(
                  "en-IN",
                )}
              </span>
            </div>
          </div>

          {/* Sort */}
          <label className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="shrink-0">
              Sort
            </span>

            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value as Sort,
                )
              }
              className="h-11 rounded-full border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
            >
              {sorts.map((s) => (
                <option
                  key={s.value}
                  value={s.value}
                >
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Category Filters */}
        <div
          className="mt-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          <FilterChip
            active={!category}
            onClick={() =>
              navigate({ search: {} })
            }
          >
            All ({products.length})
          </FilterChip>

          {categories.map((c) => (
            <FilterChip
              key={c.slug}
              active={category === c.slug}
              onClick={() =>
                navigate({
                  search: {
                    category: c.slug,
                  },
                })
              }
            >
              {c.name}
            </FilterChip>
          ))}
        </div>

        {/* Result Count */}
        <p
          className="mt-6 text-sm text-muted-foreground"
          aria-live="polite"
        >
          Showing {list.length}{" "}
          {list.length === 1
            ? "product"
            : "products"}
        </p>

        {/* Products */}
        {list.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            Nothing matched those filters.
            Try a different price range or
            search.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-full bg-ink px-4 py-2 text-xs tracking-[0.1em] text-background uppercase"
          : "rounded-full border border-border px-4 py-2 text-xs tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:border-accent hover:text-foreground"
      }
    >
      {children}
    </button>
  );
}