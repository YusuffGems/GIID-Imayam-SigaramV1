import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductImage({
  product,
  index = 0,
  className,
  priority = false,
}: {
  product: Product;
  index?: number;
  className?: string;
  priority?: boolean;
}) {
  const image =
    product.images[index] ??
    product.images[0];

  if (image) {
    return (
      <img
        src={image.url}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "size-full object-cover",
          className,
        )}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${product.name} — photograph coming soon`}
      className={cn(
        "flex size-full flex-col items-center justify-center gap-3",
        "bg-secondary/70 text-center",
        className,
      )}
    >
      <span className="font-display text-4xl text-leather/60">
        {product.serialNumber}
      </span>

      <span className="eyebrow px-6 text-[0.6rem]">
        Photograph coming soon
      </span>
    </div>
  );
}