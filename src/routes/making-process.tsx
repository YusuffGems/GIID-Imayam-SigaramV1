import { createFileRoute } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";

import { PageHeader, Section } from "@/components/shared/Section";
import workshop from "@/assets/workshop.jpg";

const steps = [
  {
    n: "01",
    title: "Material Selection",
    body: "Hides are inspected for grain, thickness and consistency, then matched across a batch.",
  },
  {
    n: "02",
    title: "Design",
    body: "Sketches become working patterns, tested in paper and scrap before any hide is cut.",
  },
  {
    n: "03",
    title: "Cutting",
    body: "Every panel is hand cut against the pattern, following the natural stretch of the leather.",
  },
  {
    n: "04",
    title: "Stitching",
    body: "Saddle stitching and machine stitching, held to even spacing and consistent tension.",
  },
  {
    n: "05",
    title: "Assembly",
    body: "Linings, gussets, zips and hardware are set and aligned by hand.",
  },
  {
    n: "06",
    title: "Finishing",
    body: "Edges are sanded, painted or burnished until they are smooth to the touch.",
  },
  {
    n: "07",
    title: "Quality Check",
    body: "Each piece is checked against a fixed list: stitch line, edge, hardware, symmetry.",
  },
  {
    n: "08",
    title: "Final Product",
    body: "Cleaned, conditioned, labelled and packed for the customer.",
  },
];

export const Route = createFileRoute("/making-process")({
  head: () => ({
    meta: [
      { title: "Making Process — From Hide to Finished Piece | GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "The eight stages behind every product: material selection, design, cutting, stitching, assembly, finishing, quality check and dispatch.",
      },
      { property: "og:title", content: "The Making Process" },
      {
        property: "og:description",
        content: "Eight hand-worked stages between a hide and a finished leather product.",
      },
      ogUrl("/making-process"),
    ],
    ...pageSeo("/making-process", "Making Process"),
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Craft"
        title="How a piece is made"
        intro="Nothing here is pressed out in a single machine pass. Each stage is taught, practised and checked."
      />

      <Section>
        <img
          src={workshop}
          alt="Worktables, cutting mats and hand tools inside the leather workshop"
          width={1600}
          height={1000}
          loading="lazy"
          className="mb-14 w-full rounded-3xl object-cover shadow-soft"
        />

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
          {steps.map((s) => (
            <li key={s.n} className="bg-card p-8 transition-colors hover:bg-secondary/40">
              <span className="font-display text-4xl text-accent">{s.n}</span>
              <h2 className="mt-3 font-display text-xl text-foreground">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
