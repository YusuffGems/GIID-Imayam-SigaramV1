/**
 * One place to define the production origin. Canonicals, Open Graph URLs,
 * JSON-LD `item`/`image` values and sitemap.xml all read from here, so the
 * domain can never drift between them.
 *
 * Override per-environment with VITE_SITE_URL (e.g. a custom domain) without
 * touching any route file. Never point this at localhost.
 */
const RAW_SITE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.["VITE_SITE_URL"]) ||
  "https://crafted-opportunity.lovable.app";

export const SITE_URL = String(RAW_SITE_URL).replace(/\/+$/, "");

/** Absolute, trailing-slash-normalised canonical for a route path. */
export function canonical(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}

/** Turns a bundled asset path (/assets/x-hash.jpg) into an absolute URL. */
export function absoluteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

/** Escapes the five XML entities — used when building sitemap.xml. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Standard Home → Shop → … breadcrumb JSON-LD builder. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: canonical(t.path),
    })),
  };
}

/** The `og:url` meta entry for a route, always absolute and canonical. */
export const ogUrl = (path: string) => ({
  property: "og:url",
  content: canonical(path),
});

/**
 * Self-referencing canonical link plus a Home → Page BreadcrumbList for a
 * simple content route. Every route in sitemap.xml uses either this helper or
 * its own richer equivalent, so no sitemap URL is missing a canonical tag and
 * no page emits two breadcrumb blocks.
 */
export function pageSeo(path: string, name: string) {
  return {
    links: [{ rel: "canonical", href: canonical(path) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name, path },
          ]),
        ),
      },
    ],
  };
}
