import { createFileRoute, Link } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";

import { PageHeader, Section } from "@/components/shared/Section";
import { makers } from "@/data/makers";
import { productsByMaker } from "@/data/products";

export const Route = createFileRoute("/makers")({
  head: () => ({
    meta: [
      { title: "Meet the Makers — Artisans Behind Every Piece | GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "The trained artisans who cut, stitch and finish every product — their skills, training and the pieces they make.",
      },
      { property: "og:title", content: "Meet the Makers" },
      {
        property: "og:description",
        content: "Skilled artisans, named on the products they build.",
      },
      ogUrl("/makers"),
    ],
    ...pageSeo("/makers", "Makers"),
  }),
  component: MakersPage,
});

function MakersPage() {
  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Meet the makers"
        intro="Every product page names the person who made it. These are their profiles."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {makers.map((m) => {
            const made = productsByMaker(m.makerId);
            return (
              <article
                key={m.makerId}
                className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-lg text-accent"
                    aria-hidden="true"
                  >
                    {m.makerId}
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-2xl text-foreground">{m.name}</h2>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{m.story}</p>

                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="shrink-0 text-muted-foreground">Specialisation:</dt>
                    <dd className="text-foreground">{m.craftSpecialisation}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 text-muted-foreground">Training:</dt>
                    <dd className="text-foreground">{m.training}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 text-muted-foreground">Experience:</dt>
                    <dd className="text-foreground">{m.experience}</dd>
                  </div>
                </dl>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {m.skills.map((s: string) => (
                    <li
                      key={s}
                      className="rounded-full border border-border px-3 py-1 text-[0.7rem] tracking-wide text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                {made.length > 0 ? (
                  <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
                    Makes{" "}
                    {made.slice(0, 3).map((p, i) => (
                      <span key={p.id}>
                        {i > 0 ? ", " : ""}
                        <Link
                          to="/products/$slug"
                          params={{ slug: p.slug }}
                          className="text-foreground underline underline-offset-4 hover:text-accent"
                        >
                          {p.name}
                        </Link>
                      </span>
                    ))}
                    {made.length > 3 ? ` and ${made.length - 3} more.` : "."}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}
