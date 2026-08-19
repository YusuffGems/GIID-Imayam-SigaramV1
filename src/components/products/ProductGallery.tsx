import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import type { Product } from "@/types";

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [product.slug]);

  const images = product.images ?? [];
  const videos = product.videos ?? [];

  const totalSlides = images.length + videos.length;

  if (totalSlides === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-secondary/70">
        <div className="text-center">
          <p className="font-display text-4xl text-muted-foreground">{product.serialNumber}</p>
          <p className="mt-2 text-sm text-muted-foreground">Product photograph coming soon</p>
        </div>
      </div>
    );
  }

  const isVideo = activeIndex >= images.length;

  const activeImage = !isVideo ? images[activeIndex] : undefined;

  const activeVideo = isVideo ? videos[activeIndex - images.length] : undefined;

  const goNext = () => {
    setActiveIndex((current) => (current >= totalSlides - 1 ? 0 : current + 1));
  };

  const goPrevious = () => {
    setActiveIndex((current) => (current <= 0 ? totalSlides - 1 : current - 1));
  };

  return (
    <div className="w-full">
      {/* MAIN MEDIA */}

      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary/50">
        {/* IMAGE */}

        {activeImage && (
          <img src={activeImage.url} alt={activeImage.alt} className="size-full object-cover" />
        )}

        {/* VIDEO */}

        {/*
          preload="metadata" rather than "auto": the visitor sees the poster
          frame and playback starts on demand, instead of every product page
          pulling a ~2 MB file on load (costly on mobile data).
        */}
        {activeVideo && (
          <video
            key={activeVideo.src}
            src={activeVideo.src}
            poster={activeVideo.poster}
            controls
            muted
            playsInline
            preload="metadata"
            className="size-full bg-black object-contain"
            aria-label={activeVideo.title ?? `${product.name} product video`}
          />
        )}

        {/* PREVIOUS */}

        {totalSlides > 1 && (
          <button
            type="button"
            onClick={goPrevious}
            aria-label="Previous product media"
            className="
              absolute
              left-3
              top-1/2
              z-20
              flex
              size-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white/90
              text-black
              shadow-lg
              transition
              hover:scale-105
            "
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
        )}

        {/* NEXT */}

        {totalSlides > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next product media"
            className="
              absolute
              right-3
              top-1/2
              z-20
              flex
              size-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white/90
              text-black
              shadow-lg
              transition
              hover:scale-105
            "
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        )}

        {/* VIDEO LABEL */}

        {isVideo && activeVideo && (
          <div
            className="
              pointer-events-none
              absolute
              left-3
              top-3
              z-10
              flex
              items-center
              gap-1.5
              rounded-full
              bg-black/70
              px-3
              py-1.5
              text-xs
              font-medium
              text-white
            "
          >
            <Play className="size-3 fill-current" aria-hidden="true" />
            Product Video
          </div>
        )}
      </div>

      {/* THUMBNAILS */}

      {totalSlides > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {/* IMAGE THUMBNAILS */}

          {images.map((image, index) => (
            <button
              key={`image-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View product image ${index + 1}`}
              aria-current={activeIndex === index}
              className={`
                relative
                h-20
                w-20
                shrink-0
                overflow-hidden
                rounded-xl
                border-2
                ${activeIndex === index ? "border-foreground" : "border-transparent"}
              `}
            >
              <img src={image.url} alt="" className="size-full object-cover" />
            </button>
          ))}

          {/* VIDEO THUMBNAIL */}

          {videos.map((video, index) => {
            const slideIndex = images.length + index;

            return (
              <button
                key={`video-${index}`}
                type="button"
                onClick={() => setActiveIndex(slideIndex)}
                aria-label="Play product video"
                aria-current={activeIndex === slideIndex}
                className={`
                  relative
                  h-20
                  w-20
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  border-2
                  ${activeIndex === slideIndex ? "border-foreground" : "border-transparent"}
                `}
              >
                <img
                  src={video.poster ?? images[0]?.url ?? ""}
                  alt=""
                  className="size-full object-cover"
                />

                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white text-black">
                    <Play className="size-4 fill-current" aria-hidden="true" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* COUNTER */}

      {totalSlides > 1 && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {activeIndex + 1} / {totalSlides}
        </p>
      )}
    </div>
  );
}
