import { createFileRoute, Link } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";

import { PageHeader, Section } from "@/components/shared/Section";
import { ProductImage } from "@/components/products/ProductImage";
import { products } from "@/data/products";
import workshop from "@/assets/workshop.jpg";
import texture from "@/assets/texture-leather.jpg";
import hero from "@/assets/hero-workbench.jpg";

const workshopShots = [
  { src: workshop, alt: "The leather workshop with worktables and hand tools" },
  { src: texture, alt: "Close-up of leather grain and hand stitching" },
  { src: hero, alt: "A craftsperson's workbench with leather goods in progress" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Products & Workshop | GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "A visual walk through the collection and the workshop where every handmade leather product is cut, stitched and finished.",
      },
      { property: "og:title", content: "Gallery — Products & Workshop" },
      {
        property: "og:description",
        content: "The collection and the workshop behind it, in pictures.",
      },
      ogUrl("/gallery"),
    ],
    ...pageSeo("/gallery", "Gallery"),
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="The work, up close"
        intro="Products, materials and the workshop where everything is made."
      />

      <Section>
        <h2 className="eyebrow">Workshop</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {workshopShots.map((s) => (
            <img
              key={s.alt}
              src={s.src}
              alt={s.alt}
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-4/3 w-full rounded-2xl object-cover shadow-soft"
            />
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40 pt-0 md:pt-0">
        <h2 className="eyebrow">Collection</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <Link
              key={p.id}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="aspect-square overflow-hidden bg-secondary/50">
                <div className="size-full transition-transform duration-500 group-hover:scale-105">
                  <ProductImage product={p} />
                </div>
              </div>
              <p className="px-4 py-3 text-xs text-muted-foreground">
                <span className="block font-display text-sm text-foreground">{p.name}</span>
                SL. No. {p.serialNumber}
              </p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
