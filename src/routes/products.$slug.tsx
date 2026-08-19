import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";

import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductCard } from "@/components/products/ProductCard";
import { EnquiryModal } from "@/components/products/EnquiryModal";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { categoryBySlug } from "@/data/categories";
import { makerById } from "@/data/makers";
import { productBySlug, products } from "@/data/products";
import { absoluteUrl, breadcrumbJsonLd, canonical } from "@/lib/seo";
import { callLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);

    if (!product) {
      throw notFound();
    }

    return {
      product,
    };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          {
            title: "Product not found",
          },
          {
            name: "robots",
            content: "noindex",
          },
        ],
      };
    }

    const { product } = loaderData;

    const url = canonical(`/products/${product.slug}`);

    const image = product.images[0];
    const imageUrl = absoluteUrl(image?.url);

    return {
      meta: [
        {
          title: product.seoTitle,
        },
        {
          name: "description",
          content: product.seoDescription,
        },
        {
          property: "og:title",
          content: product.seoTitle,
        },
        {
          property: "og:description",
          content: product.seoDescription,
        },
        {
          property: "og:type",
          content: "product",
        },
        {
          property: "og:url",
          content: url,
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: product.seoTitle,
        },
        {
          name: "twitter:description",
          content: product.seoDescription,
        },
        ...(imageUrl
          ? [
              {
                property: "og:image",
                content: imageUrl,
              },
              {
                property: "og:image:alt",
                content: image?.alt ?? product.name,
              },
              {
                name: "twitter:image",
                content: imageUrl,
              },
            ]
          : []),
      ],

      links: [
        {
          rel: "canonical",
          href: url,
        },
      ],

      scripts: [
        {
          type: "application/ld+json",

          children: JSON.stringify({
            "@context": "https://schema.org",

            "@type": "Product",

            name: product.name,

            description: product.seoDescription,

            url,

            sku: product.serialNumber,

            brand: {
              "@type": "Brand",
              name: "GIID Imayam Sigaram",
            },

            ...(imageUrl ? { image: imageUrl } : {}),

            ...(product.materials?.length
              ? {
                  material: product.materials.join(", "),
                }
              : {}),

            ...(product.videos?.length
              ? {
                  video: product.videos.map((video) => ({
                    "@type": "VideoObject",

                    name: video.title ?? `${product.name} product video`,

                    description: product.seoDescription,

                    contentUrl: absoluteUrl(video.src) ?? video.src,

                    ...(absoluteUrl(video.poster)
                      ? {
                          thumbnailUrl: absoluteUrl(video.poster),
                        }
                      : {}),

                    uploadDate: product.createdAt,
                  })),
                }
              : {}),

            ...(product.price !== null
              ? {
                  offers: {
                    "@type": "Offer",

                    price: String(product.price),

                    priceCurrency: "INR",

                    availability: "https://schema.org/InStock",

                    url,
                  },
                }
              : {}),
          }),
        },

        {
          type: "application/ld+json",

          // Home → Shop → Product. The category level was removed because its
          // item URL (/products?category=…) canonicalises back to /products,
          // which made the trail point at a non-canonical URL.
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Shop", path: "/products" },
              {
                name: product.name,
                path: `/products/${product.slug}`,
              },
            ]),
          ),
        },
      ],
    };
  },

  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();

  const [quantity, setQuantity] = useState(1);

  const [colour, setColour] = useState(product.colors[0] ?? "");

  const [customization, setCustomization] = useState("");

  const [open, setOpen] = useState(false);

  const category = categoryBySlug(product.category);

  const maker = makerById(product.makerId);

  const related = products
    .filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)))
    .slice(0, 4);

  return (
    <>
      {/* =========================================
          BREADCRUMB
      ========================================= */}

      <div className="mx-auto w-full max-w-7xl px-5 pb-6 pt-28 sm:px-8 md:pt-36">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>

          <span aria-hidden="true"> / </span>

          <Link to="/products" className="hover:text-foreground">
            Shop
          </Link>

          <span aria-hidden="true"> / </span>

          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* =========================================
          PRODUCT
      ========================================= */}

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-2">
        {/* =======================================
            PRODUCT GALLERY

            PHOTO → VIDEO
        ======================================= */}

        <ProductGallery product={product} />

        {/* =======================================
            PRODUCT INFORMATION
        ======================================= */}

        <div>
          <p className="eyebrow">
            {category?.name ?? product.category}
            {" · "}
            SL. No. {product.serialNumber}
          </p>

          <h1 className="mt-3 text-4xl leading-[1.05] text-foreground md:text-5xl">
            {product.name}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <p className="mt-6 font-display text-3xl text-foreground">{product.priceLabel}</p>

          <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
            {product.stockStatus}
            {" · "}
            Handcrafted to order
          </p>

          {/* =====================================
              QUANTITY + COLOUR
          ===================================== */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="quantity">Quantity</Label>

              <Input
                id="quantity"
                type="number"
                min={1}
                max={500}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="colour">Colour</Label>

              <select
                id="colour"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {product.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* =====================================
              CUSTOMIZATION
          ===================================== */}

          <div className="mt-4">
            <Label htmlFor="customization">Customisation (optional)</Label>

            <Textarea
              id="customization"
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              placeholder="Initials to emboss, colour notes, gifting requirements…"
              maxLength={500}
              className="mt-2"
            />
          </div>

          {/* =====================================
              ACTION BUTTONS
          ===================================== */}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="whatsapp" size="xl" onClick={() => setOpen(true)}>
              <MessageCircle aria-hidden="true" />
              Buy on WhatsApp
            </Button>

            <Button asChild variant="quiet" size="xl">
              <a href={callLink}>
                <Phone aria-hidden="true" />
                Call us
              </a>
            </Button>
          </div>

          {/* =====================================
              ACCORDION
          ===================================== */}

          <Accordion type="single" collapsible className="mt-10">
            {/* DESCRIPTION */}

            <AccordionItem value="details">
              <AccordionTrigger>Description</AccordionTrigger>

              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {product.fullDescription}
              </AccordionContent>
            </AccordionItem>

            {/* SPECIFICATIONS */}

            <AccordionItem value="specs">
              <AccordionTrigger>Specifications</AccordionTrigger>

              <AccordionContent>
                <dl className="space-y-2 text-sm">
                  <Spec label="Materials" value={product.materials.join(", ")} />

                  <Spec label="Dimensions" value={product.dimensions} />

                  <Spec label="Weight" value={product.weight} />

                  <Spec label="Colours" value={product.colors.join(", ")} />

                  <Spec label="Customisation" value={product.customizationDetails} />
                </dl>
              </AccordionContent>
            </AccordionItem>

            {/* CARE */}

            <AccordionItem value="care">
              <AccordionTrigger>Care instructions</AccordionTrigger>

              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {product.careInstructions}
              </AccordionContent>
            </AccordionItem>

            {/* PROCESS */}

            <AccordionItem value="process">
              <AccordionTrigger>How it is made</AccordionTrigger>

              <AccordionContent>
                <ol className="space-y-1 text-sm text-muted-foreground">
                  {product.productionProcess.map((step, index) => (
                    <li key={step}>
                      {String(index + 1).padStart(2, "0")}

                      {" — "}

                      {step}
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>

            {/* MAKER */}

            {maker ? (
              <AccordionItem value="maker">
                <AccordionTrigger>Made by {maker.name}</AccordionTrigger>

                <AccordionContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>{maker.story}</p>

                  <p>{product.impactStory}</p>

                  <Link
                    to="/makers"
                    className="inline-block text-foreground underline underline-offset-4 hover:text-accent"
                  >
                    Meet all makers
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ) : null}
          </Accordion>
        </div>
      </div>

      {/* =========================================
          RELATED PRODUCTS
      ========================================= */}

      {related.length > 0 ? (
        <Section className="bg-secondary/40">
          <h2 className="font-display text-3xl text-foreground">You may also like</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* =========================================
          ENQUIRY MODAL
      ========================================= */}

      <EnquiryModal
        product={product}
        open={open}
        onOpenChange={setOpen}
        defaultQuantity={quantity}
        defaultColour={colour}
        defaultCustomization={customization}
      />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-32 shrink-0 text-muted-foreground">{label}</dt>

      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
