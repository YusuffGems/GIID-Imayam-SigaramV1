import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Play, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/products/ProductImage";
import { EnquiryModal } from "@/components/products/EnquiryModal";
import { categoryBySlug } from "@/data/categories";
import { makerById } from "@/data/makers";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const category = categoryBySlug(product.category);
  const maker = makerById(product.makerId);

  const hasVideo = Boolean(product.videos?.length);
  const video = product.videos?.[0];

  return (
    <>
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

          {/* Serial Number */}
          <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-foreground uppercase">
            SL. No. {product.serialNumber}
          </span>

          {/* Handcrafted Badge */}
          <span className="absolute top-3 right-3 rounded-full bg-accent/90 px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.16em] text-accent-foreground uppercase">
            Handcrafted
          </span>

          {/* Small Video Button */}
          {hasVideo && video && (
            <button
              type="button"
              className="absolute bottom-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black"
              title="Play product video"
              aria-label={`Play video for ${product.name}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setVideoOpen(true);
              }}
            >
              <Play
                aria-hidden="true"
                className="h-3.5 w-3.5 fill-current"
              />
            </button>
          )}
        </Link>

        {/* Product Details */}
        <div className="flex flex-1 flex-col gap-2 p-5">
          <p className="eyebrow">
            {category?.name ?? product.category}
          </p>

          <h3 className="font-display text-lg leading-snug text-foreground">
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
            >
              {product.name}
            </Link>
          </h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.shortDescription}
          </p>

          {maker ? (
            <p className="text-xs text-muted-foreground">
              Made by {maker.name}
            </p>
          ) : null}

          <p className="mt-1 text-base font-semibold text-foreground">
            {product.priceLabel}
          </p>

          {/* Buttons */}
          <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
            <Button
              asChild
              variant="quiet"
              size="sm"
              className="rounded-full"
            >
              <Link
                to="/products/$slug"
                params={{ slug: product.slug }}
              >
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

        <EnquiryModal
          product={product}
          open={open}
          onOpenChange={setOpen}
        />
      </article>

      {/* Video Modal */}
      {videoOpen && video && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} product video`}
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
              aria-label="Close video"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Product Video */}
            <video
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}