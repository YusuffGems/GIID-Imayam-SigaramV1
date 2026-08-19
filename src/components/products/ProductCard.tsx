import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/products/ProductImage";
import { EnquiryModal } from "@/components/products/EnquiryModal";
import { categoryBySlug } from "@/data/categories";
import { makerById } from "@/data/makers";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const category = categoryBySlug(product.category);
  const maker = makerById(product.makerId);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-4/5 overflow-hidden bg-secondary/50"
        aria-label={`View ${product.name}`}
      >
        <div className="size-full transition-transform duration-500 group-hover:scale-[1.04]">
          <ProductImage product={product} />
        </div>
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-foreground uppercase">
          SL. No. {product.serialNumber}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-accent/90 px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.16em] text-accent-foreground uppercase">
          Handcrafted
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="eyebrow">{category?.name ?? product.category}</p>
        <h3 className="font-display text-lg leading-snug text-foreground">
          <Link to="/products/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        {maker ? (
          <p className="text-xs text-muted-foreground">Made by {maker.name}</p>
        ) : null}
        <p className="mt-1 text-base font-semibold text-foreground">{product.priceLabel}</p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Button asChild variant="quiet" size="sm" className="rounded-full">
            <Link to="/products/$slug" params={{ slug: product.slug }}>
              View Product
            </Link>
          </Button>
          <Button
            variant="whatsapp"
            size="sm"
            className="rounded-full"
            onClick={() => setOpen(true)}
          >
            <MessageCircle aria-hidden="true" />
            WhatsApp
          </Button>
        </div>
      </div>

      <EnquiryModal product={product} open={open} onOpenChange={setOpen} />
    </article>
  );
}