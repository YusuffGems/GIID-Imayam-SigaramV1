import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { products } from "@/data/products";
import { absoluteUrl, canonical, escapeXml } from "@/lib/seo";

interface SitemapImage {
  loc: string;
  caption?: string;
}

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
  images?: SitemapImage[];
}

/**
 * Only routes that exist and return 200 belong here. Every path below has a
 * matching file in src/routes and a self-referencing <link rel="canonical">,
 * so no entry redirects. URLs are built from the shared canonical() helper —
 * the sitemap can never drift from the canonical tags or point at localhost.
 */
const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/products", changefreq: "weekly", priority: "0.9" },
  { path: "/categories", changefreq: "monthly", priority: "0.7" },
  { path: "/our-story", changefreq: "monthly", priority: "0.7" },
  { path: "/makers", changefreq: "monthly", priority: "0.7" },
  { path: "/gallery", changefreq: "monthly", priority: "0.6" },
  { path: "/events", changefreq: "weekly", priority: "0.7" },
  { path: "/impact", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/making-process", changefreq: "monthly", priority: "0.6" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/shipping", changefreq: "yearly", priority: "0.3" },
  { path: "/accessibility", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);

        const productEntries: SitemapEntry[] = products.map((p) => ({
          path: `/products/${p.slug}`,
          changefreq: "weekly" as const,
          priority: "0.8",
          lastmod: p.createdAt.slice(0, 10),
          // Image entries are emitted only for photographs that resolve to a
          // bundled asset, so the sitemap never lists an image that 404s.
          images: p.images
            .map((img) => {
              const loc = absoluteUrl(img.url);
              return loc ? { loc, caption: img.alt } : null;
            })
            .filter((v): v is { loc: string; caption: string } => v !== null),
        }));

        const entries: SitemapEntry[] = [
          ...staticEntries.map((e) => ({ ...e, lastmod: e.lastmod ?? today })),
          ...productEntries,
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${escapeXml(canonical(e.path))}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            ...(e.images ?? []).map((img) =>
              [
                `    <image:image>`,
                `      <image:loc>${escapeXml(img.loc)}</image:loc>`,
                img.caption
                  ? `      <image:caption>${escapeXml(img.caption)}</image:caption>`
                  : null,
                `    </image:image>`,
              ]
                .filter(Boolean)
                .join("\n"),
            ),
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
