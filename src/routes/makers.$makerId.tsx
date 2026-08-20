import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Section } from "@/components/shared/Section";
import { ProductCard } from "@/components/products/ProductCard";
import { makerById, makers } from "@/data/makers";
import { productsByMaker } from "@/data/products";
import { breadcrumbJsonLd, canonical } from "@/lib/seo";

export const Route = createFileRoute("/makers/$makerId")({
  loader: ({ params }) => {
    const maker = makers.find(
      (m) => m.makerId.toLowerCase() === params.makerId.toLowerCase(),
    );
    if (!maker) throw notFound();
    return { maker };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Maker not found" }, { name: "robots", content: "noindex" }] };
    }
    const { maker } = loaderData;
    const path = `/makers/${maker.makerId.toLowerCase()}`;
    const url = canonical(path);

    return {
      meta: [
        { title: `${maker.name} — ${maker.role} | GIID Imayam Sigaram` },
        { name: "description", content: maker.story },
        { property: "og:title", content: `${maker.name} — ${maker.role}` },
        { property: "og:description", content: maker.story },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Makers", path: "/makers" },
              { name: maker.name, path },
            ]),
          ),
        },
      ],
    };
  },

  component: MakerPage,
});

function MakerPage() {
  const { maker } = Route.useLoaderData();
  const made = productsByMaker(maker.makerId);

  return (
    <Section>
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        {" / "}
        <Link to="/makers" className="hover:text-foreground">Makers</Link>
        {" / "}
        <span className="text-foreground">{maker.name}</span>
      </nav>

      {/* header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {maker.photo ? (
          <img
            src={maker.photo}
            alt={`${maker.name}, ${maker.role}`}
            className="size-32 shrink-0 rounded-full object-cover"
          />
        ) : null}
        <div>
          <h1 className="font-display text-4xl text-foreground">{maker.name}</h1>
          <p className="mt-1 text-muted-foreground">{maker.role}</p>
          <p className="mt-1 text-sm text-accent">{maker.craftSpecialisation}</p>
        </div>
      </div>

      <p className="mt-8 max-w-3xl leading-relaxed text-muted-foreground">{maker.story}</p>

      {/* facts */}
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Training", maker.training],
          ["Experience", maker.experience],
          ["Impact", maker.socialImpact],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5">
            <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{label}</dt>
            <dd className="mt-2 text-sm text-foreground">{value}</dd>
          </div>
        ))}
      </dl>

      {/* journey */}
      {maker.journey?.length ? (
        <>
          <h2 className="mt-14 font-display text-3xl text-foreground">The journey</h2>
          <ol className="mt-8 border-l border-border pl-8">
            {maker.journey.map((j) => (
              <li key={j.year + j.title} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[2.15rem] mt-1.5 size-3 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="text-sm tracking-[0.16em] text-accent uppercase">{j.year}</p>
                <h3 className="mt-1 font-display text-xl text-foreground">{j.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{j.detail}</p>
              </li>
            ))}
          </ol>
        </>
      ) : null}

      {/* skills */}
      <h2 className="mt-14 font-display text-3xl text-foreground">Skills</h2>
      <ul className="mt-5 flex flex-wrap gap-2">
        {maker.skills.map((s: string) => (
          <li
            key={s}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
          >
            {s}
          </li>
        ))}
      </ul>

      {/* their products */}
      {made.length ? (
        <>
          <h2 className="mt-14 font-display text-3xl text-foreground">
            Products made by {maker.name}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {made.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      ) : null}
    </Section>
  );
}