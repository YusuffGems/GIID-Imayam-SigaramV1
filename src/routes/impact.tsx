import { createFileRoute, Link } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";

import { PageHeader, Section, SectionHeading } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { impactStats } from "@/data/site";

const pillars = [
  {
    title: "Skill Development",
    body: "Structured training in cutting, stitching, moulding and finishing, taught at a pace that suits each learner.",
  },
  {
    title: "Employment",
    body: "Trainees move into paid production work inside the unit, with earnings tied to real orders.",
  },
  {
    title: "Dignity",
    body: "Makers are named on the products they build. The work speaks first; the story follows.",
  },
  {
    title: "Sustainability",
    body: "Small-batch production, offcuts reused for keychains and tags, and products built to last years.",
  },
];

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Social Impact — Skills, Employment & Dignity | GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "Every purchase funds skill training, paid production work and independent livelihoods for differently abled artisans.",
      },
      { property: "og:title", content: "Our Social Impact" },
      {
        property: "og:description",
        content: "What your order actually pays for: training hours, wages and independence.",
      },
      ogUrl("/impact"),
    ],
    ...pageSeo("/impact", "Impact"),
  }),
  component: ImpactPage,
});

function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Impact"
        title="Every order is a training hour, a wage, a step forward"
        intro="We measure success in skills learned and income earned, not just units sold."
      />

      <Section>
        <dl className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {impactStats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-10 text-center">
              <dt className="eyebrow">{s.label}</dt>
              <dd className="mt-3 font-display text-4xl text-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Four pillars"
          title="How the model works"
          intro="Training, production and sales sit inside one unit, so income returns directly to the people who made the product."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <h2 className="font-display text-2xl text-foreground">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild variant="ink" size="pill">
            <Link to="/products">Support by Shopping</Link>
          </Button>
          <Button asChild variant="quiet" size="pill">
            <Link to="/makers">Meet the Makers</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
