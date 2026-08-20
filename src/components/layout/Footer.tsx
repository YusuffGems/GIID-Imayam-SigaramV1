import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { site } from "@/data/site";
import { callLink, generalWhatsAppLink } from "@/lib/whatsapp";

import cardHolderVideo from "@/assets/videos/Card Holder.mp4";
import diaryCoverVideo from "@/assets/videos/Diary Cover.mp4";
import footerVideo from "@/assets/videos/Footer.mp4";
import ipadSleeveVideo from "@/assets/videos/iPad Sleeve Video.mp4";
import keychainVideo from "@/assets/videos/Keychain cum Card Holder Video.mp4";
import laptopSleeveVideo from "@/assets/videos/LAPTOP_SLEEVE.mp4";
import shoulderBagVideo from "@/assets/videos/Shoulder Bag Video.mp4";

const footerVideos = [
  footerVideo,
  cardHolderVideo,
  diaryCoverVideo,
  footerVideo,
  ipadSleeveVideo,
  keychainVideo,
  laptopSleeveVideo,
  shoulderBagVideo,
];

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/products" },
      { label: "Categories", to: "/categories" },
      { label: "Featured", to: "/products" },
      { label: "New Products", to: "/products" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/our-story" },
      { label: "Meet the Makers", to: "/makers" },
      { label: "Making Process", to: "/making-process" },
      { label: "Impact", to: "/impact" },
      { label: "Gallery", to: "/gallery" },
      { label: "Events", to: "/events" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Shipping", to: "/shipping" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
] as const;

export function Footer() {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;

    const play = async () => {
      try {
        await video.play();
      } catch {
        // Browser autoplay restriction
      }
    };

    play();
  }, [activeVideo]);

  const handleVideoEnded = () => {
    setActiveVideo((current) =>
      current === footerVideos.length - 1 ? 0 : current + 1,
    );
  };

  const goPrevious = () => {
    setActiveVideo((current) =>
      current === 0 ? footerVideos.length - 1 : current - 1,
    );
  };

  const goNext = () => {
    setActiveVideo((current) =>
      current === footerVideos.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <footer className="border-t border-border bg-secondary/40 px-5 py-14 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1.3fr]">

          {/* =================================================
              BRAND
          ================================================= */}

          <div>
            <Link
              to="/"
              aria-label="Go to homepage"
              className="inline-block"
            >
              <img
                src={site.logoUrl}
                alt={`${site.name} logo`}
                className="h-12 w-auto"
                loading="lazy"
              />
            </Link>

            <p className="mt-4 font-display text-lg text-foreground">
              GIID IMAYAM SIGARAM
            </p>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.tagline}. {site.supportingLine}
            </p>

            {/* Contact Icons */}

            <div className="mt-5 flex gap-3">

              <a
                href={generalWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="
                  grid size-10 place-items-center rounded-full
                  border border-border bg-card text-foreground
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-accent
                  hover:text-accent
                "
              >
                <MessageCircle className="size-4" />
              </a>

              <a
                href={callLink}
                aria-label="Call"
                title="Call"
                className="
                  grid size-10 place-items-center rounded-full
                  border border-border bg-card text-foreground
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-accent
                  hover:text-accent
                "
              >
                <Phone className="size-4" />
              </a>

              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                title="Email"
                className="
                  grid size-10 place-items-center rounded-full
                  border border-border bg-card text-foreground
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-accent
                  hover:text-accent
                "
              >
                <Mail className="size-4" />
              </a>

            </div>
          </div>

          {/* =================================================
              FOOTER LINK COLUMNS
          ================================================= */}

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow">
                {col.title}
              </p>

              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="
                        text-muted-foreground
                        transition-colors
                        hover:text-foreground
                      "
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* =================================================
              VIDEO SLIDER
          ================================================= */}

          <div className="lg:pl-2">

            <p className="eyebrow">
              Crafted with purpose
            </p>

            <div
              className="
                mt-4
                overflow-hidden
                rounded-2xl
                border border-border
                bg-card
                shadow-soft
              "
            >

              {/* Video */}

              <video
                key={footerVideos[activeVideo]}
                ref={videoRef}
                src={footerVideos[activeVideo]}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
                className="
                  aspect-[4/3]
                  w-full
                  object-cover
                "
                aria-label="GIID Imayam Sigaram leather craftsmanship"
              />

              {/* =================================================
                  PREVIOUS / NEXT
              ================================================= */}

              <div className="flex items-center justify-center gap-2 border-t border-border px-3 py-2">

                <button
                  type="button"
                  onClick={goPrevious}
                  aria-label="Previous video"
                  className="
                    grid size-7 place-items-center
                    rounded-full
                    text-muted-foreground
                    transition-colors
                    hover:bg-accent/20
                    hover:text-foreground
                  "
                >
                  ‹
                </button>

                {/* =================================================
                    DOTS
                ================================================= */}

                <div className="flex items-center justify-center gap-1.5">
                  {footerVideos.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveVideo(index)}
                      aria-label={`Play video ${index + 1}`}
                      aria-current={
                        activeVideo === index ? "true" : undefined
                      }
                      className={`
                        h-1.5 rounded-full
                        transition-all duration-300
                        ${
                          activeVideo === index
                            ? "w-6 bg-foreground"
                            : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                        }
                      `}
                    />
                  ))}
                </div>

                {/* =================================================
                    NEXT
                ================================================= */}

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next video"
                  className="
                    grid size-7 place-items-center
                    rounded-full
                    text-muted-foreground
                    transition-colors
                    hover:bg-accent/20
                    hover:text-foreground
                  "
                >
                  ›
                </button>

              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Handmade leather products crafted with skill,
              care and purpose.
            </p>

          </div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ====================================================== */}

        <div
          className="
            mx-auto mt-12 flex w-full flex-col gap-3
            border-t border-border pt-6
            text-xs text-muted-foreground
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p>
            © 2026 GIID Imayam Sigaram. All Rights Reserved.
          </p>

          <p>
            {site.displayPhone} · {site.email}
          </p>
        </div>

        {/* =====================================================
            DEVELOPER CREDIT
        ====================================================== */}

        <div
          className="
            mx-auto mt-4 flex w-full justify-center
            border-t border-border/60 pt-4
            text-xs text-muted-foreground
          "
        >
          <div className="mt-5 flex justify-center">
  <a
    href="https://www.yusuffux.com"
    target="_blank"
    rel="noopener noreferrer"
    className="
      group inline-flex items-center gap-3
      rounded-full
      border border-border
      bg-card/70
      px-4 py-2
      shadow-sm
      transition-all duration-300
      hover:-translate-y-0.5
      hover:border-accent
      hover:shadow-md
    "
    aria-label="YusuffGems Portfolio"
  >
    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      Designed &amp; Developed by{" "}
    </span>

    <span className="h-4 w-px bg-border" />

    <span className="font-display text-sm text-foreground transition-colors group-hover:text-accent">
      YusuffGems
    </span>

    <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
      ↗
    </span>
  </a>
</div>
        </div>

      </div>
    </footer>
  );
}