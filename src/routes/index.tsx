import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared/Section";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { impactStats, site } from "@/data/site";
import { canonical, ogUrl } from "@/lib/seo";
import { generalWhatsAppLink } from "@/lib/whatsapp";

import hero from "@/assets/hero-workbench.jpg";
import workshop from "@/assets/workshop.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Handcrafted Leather by Differently Abled Artisans",
      },
      {
        name: "description",
        content:
          "Premium handmade leather bags, wallets and gifts crafted by trained differently abled artisans. Order directly on WhatsApp — no account needed.",
      },
      {
        property: "og:title",
        content: "Handcrafted Leather, Crafted by Ability",
      },
      {
        property: "og:description",
        content:
          "Premium handmade leather bags, wallets and gifts crafted by trained differently abled artisans. Order directly on WhatsApp — no account needed.",
      },
      ogUrl("/"),
    ],
    links: [
      {
        rel: "canonical",
        href: canonical("/"),
      },
    ],
  }),

  component: Index,
});

function Index() {
  const featured = products
    .filter((p) => p.featured)
    .slice(0, 4);

  const bestsellers = products
    .filter((p) => p.bestseller)
    .slice(0, 4);

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img
          src={hero}
          alt="A leather craftsperson's workbench with hand tools and finished goods"
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
        />

        {/* Hero overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/20" />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-32 sm:px-8">
          <div className="max-w-2xl animate-rise">

            <p className="text-[0.7rem] font-medium tracking-[0.28em] text-background/70 uppercase">
              {site.supportingLine}
            </p>

            <h1 className="mt-5 text-5xl leading-[1.02] text-background md:text-7xl">
              {site.tagline}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/80">
              Premium leather goods cut, stitched and finished by hand at
              the Government Institute for Intellectually Differently Abled.
              Every purchase funds training, wages and independence.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              {/* WhatsApp */}
              <Button
                asChild
                size="xl"
                variant="whatsapp"
              >
                <a
                  href={generalWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden="true" />
                  Order on WhatsApp
                </a>
              </Button>

              {/* Collection */}
              <Button
                asChild
                size="xl"
                variant="quiet"
              >
                <Link to="/products">
                  Explore the Collection
                </Link>
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPACT STATS
      ====================================================== */}

      <Section className="border-b border-border">
        <dl className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {impactStats.map((s) => (
            <div key={s.label}>
              <dt className="eyebrow">
                {s.label}
              </dt>

              <dd className="mt-2 font-display text-4xl text-foreground">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* =====================================================
          FEATURED PRODUCTS
      ====================================================== */}

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">

          <SectionHeading
            eyebrow="Featured"
            title="Signature pieces"
            intro="A short list of what our makers are proudest of this season."
          />

          <Button
            asChild
            variant="quiet"
            size="pill"
          >
            <Link to="/products">
              View all 24
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>

        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
            />
          ))}
        </div>
      </Section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Categories"
          title="Find what you need"
          intro="Work, travel, everyday carry and gifting — all made in the same workshop."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/products"
              search={{ category: c.slug }}
              className="
                group
                rounded-2xl
                border
                border-border
                bg-card
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lift
              "
            >
              <p className="eyebrow">
                {c.useCase}
              </p>

              <h3
                className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  font-display
                  text-xl
                  text-foreground
                "
              >
                {c.name}

                <ArrowRight
                  className="
                    size-4
                    transition-transform
                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                />
              </h3>
            </Link>
          ))}
        </div>
      </Section>

      {/* =====================================================
          OUR STORY
      ====================================================== */}

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">

          <img
            src={workshop}
            alt="Artisans at work inside the leather craft workshop"
            width={1600}
            height={1000}
            loading="lazy"
            className="
              rounded-3xl
              object-cover
              shadow-soft
            "
          />

          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Skill first. Sympathy never."
              intro="Imayam Sigaram is the production arm of a government institute where differently abled trainees learn leather craft, join paid production work and are named on the products they build."
            />

            <div className="mt-8 flex flex-wrap gap-3">

              <Button
                asChild
                variant="ink"
                size="pill"
              >
                <Link to="/our-story">
                  Read our story
                </Link>
              </Button>

              <Button
                asChild
                variant="quiet"
                size="pill"
              >
                <Link to="/making-process">
                  See the process
                </Link>
              </Button>

            </div>
          </div>

        </div>
      </Section>

      {/* =====================================================
          BESTSELLERS
      ====================================================== */}

      {bestsellers.length > 0 ? (
        <Section className="bg-secondary/40">

          <SectionHeading
            eyebrow="Bestsellers"
            title="Most ordered"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
              />
            ))}
          </div>

        </Section>
      ) : null}

      {/* =====================================================
          FINAL CTA
          
          Theme-safe:
          Light  → dark section + light text
          Dark   → light section + dark text
      ====================================================== */}

      <Section
        className="
          bg-foreground
          text-background
          dark:bg-background
          dark:text-foreground
        "
      >
        <div className="mx-auto max-w-2xl text-center">

          <h2
            className="
              text-3xl
              leading-tight
              text-background
              md:text-5xl
              dark:text-foreground
            "
          >
            Ready to order? A person replies, not a bot.
          </h2>

          <p
            className="
              mt-4
              text-background/75
              dark:text-foreground/70
            "
          >
            Tell us the product, quantity and any customisation.
            We confirm price and timeline on WhatsApp.
          </p>

          {/* CTA BUTTONS */}

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {/* WhatsApp */}
            <Button
              asChild
              size="xl"
              variant="whatsapp"
            >
              <a
                href={generalWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                Message us
              </a>
            </Button>

            {/* Contact */}
            <Button
              asChild
              size="xl"
              className="
                rounded-full
                border
                border-background/30
                bg-background
                text-foreground
                hover:bg-background/90

                dark:border-foreground/30
                dark:bg-foreground
                dark:text-background
                dark:hover:bg-foreground/90
              "
            >
              <Link to="/contact">
                Contact details
              </Link>
            </Button>

          </div>
        </div>
      </Section>
    </>
  );
}