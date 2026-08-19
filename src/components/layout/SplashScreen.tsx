import { useEffect, useState } from "react";

import { site } from "@/data/site";

/**
 * Brand splash. Shows on every page entry and every refresh.
 *
 * - Renders nothing during SSR, so page content and SEO are untouched.
 * - Overlays only; the real page is already rendered behind it.
 * - Respects prefers-reduced-motion (skipped entirely).
 * - Set `once` to true if you ever want it one-per-session instead.
 */
export function SplashScreen({
  duration = 1600,
  once = false,
}: {
  duration?: number;
  once?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (once) {
      try {
        if (sessionStorage.getItem("giid-splash-seen") === "1") return;
        sessionStorage.setItem("giid-splash-seen", "1");
      } catch {
        /* private mode — just show it */
      }
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const leaveTimer = setTimeout(() => setLeaving(true), duration);
    const doneTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, duration + 700);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [duration, once]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden transition-all duration-700 ${
        leaving ? "pointer-events-none -translate-y-full" : "translate-y-0"
      }`}
    >
      {/* warm leather backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,var(--color-secondary)_0%,var(--color-background)_55%)]" />

      {/* slow drifting glow */}
      <div className="absolute top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 animate-[splash-glow_4s_ease-in-out_infinite] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="animate-[splash-logo_1000ms_cubic-bezier(0.22,1,0.36,1)_both]">
          <img src={site.logoUrl} alt="" className="h-20 w-auto sm:h-24" />
        </div>

        <h1 className="mt-7 animate-[splash-up_800ms_ease-out_250ms_both] font-display text-3xl tracking-tight text-foreground sm:text-4xl">
          {site.name}
        </h1>

        <span className="mt-5 block h-px w-0 animate-[splash-line_1100ms_ease-out_500ms_both] bg-accent" />

        <p className="mt-5 animate-[splash-up_800ms_ease-out_650ms_both] text-[0.7rem] tracking-[0.28em] text-muted-foreground uppercase sm:text-xs">
          {site.tagline}
        </p>

        <p className="mt-2 animate-[splash-up_800ms_ease-out_850ms_both] text-[0.65rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
          {site.supportingLine}
        </p>
      </div>
    </div>
  );
}