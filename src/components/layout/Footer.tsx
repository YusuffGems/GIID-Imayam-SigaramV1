import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { site } from "@/data/site";
import { callLink, generalWhatsAppLink } from "@/lib/whatsapp";

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
  return (
    <footer className="border-t border-border bg-secondary/40 px-5 py-14 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" aria-label="Go to homepage" className="inline-block">
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

          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {site.tagline}. {site.supportingLine}
          </p>

          {/* Social / Contact Icons */}
          <div className="mt-5 flex gap-3">
            <a
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors hover:border-accent hover:text-accent"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
            </a>

            <a
              href={callLink}
              aria-label="Call"
              title="Call"
              className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors hover:border-accent hover:text-accent"
            >
              <Phone className="size-4" aria-hidden="true" />
            </a>

            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              title="Email"
              className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Footer Columns */}
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="eyebrow">{col.title}</p>

            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom Footer */}
      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 GIID Imayam Sigaram. All Rights Reserved.
        </p>

        <p>
          {site.displayPhone} · {site.email}
        </p>
      </div>

      {/* Developer Credit */}
      <div className="mx-auto mt-4 flex w-full max-w-7xl justify-center border-t border-border/60 pt-4 text-xs text-muted-foreground">
        <p>
          Crafted &amp; Developed by{" "}
          <a
            href="https://www.yusuffux.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
            aria-label="YusuffGems website"
            title="Visit YusuffGems"
          >
            YusuffGems
          </a>
        </p>
      </div>
    </footer>
  );
}