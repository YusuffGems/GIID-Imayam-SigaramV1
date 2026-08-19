import type { ProductVideo as ProductVideoType } from "@/types";

export function ProductVideoPlayer({
  video,
  productName,
}: {
  video: ProductVideoType;
  productName: string;
}) {
  const title = video.title ?? `${productName} product video`;

  return (
    <div className="size-full bg-black">
      <video
        key={video.src}
        muted
        controls
        playsInline
        preload="metadata"
        poster={video.poster}
        title={title}
        aria-label={title}
        className="size-full bg-black object-contain"
      >
        <source src={video.src} type={video.type ?? "video/mp4"} />
        Your browser does not support the video element.
      </video>
    </div>
  );
}
