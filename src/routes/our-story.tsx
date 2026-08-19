import { createFileRoute, Link } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";

import { PageHeader, Section, SectionHeading } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import workshop from "@/assets/workshop.jpg";
import texture from "@/assets/texture-leather.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "How a government skill initiative became a working leather unit where differently abled artisans build products, income and independence.",
      },
      { property: "og:title", content: "Our Story — GIID Imayam Sigaram" },
      {
        property: "og:description",
        content: "Skill training, production and livelihood, built in one workshop.",
      },
      ogUrl("/our-story"),
    ],
    ...pageSeo("/our-story", "Our Story"),
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A workshop where skill becomes livelihood"
        intro="GIID Imayam Sigaram grew out of a simple idea: give people real craft skills, real production work and a real market, and independence follows."
      />

      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src={workshop}
            alt="The leather craft training workshop with worktables and hand tools"
            width={1600}
            height={1000}
            loading="lazy"
            className="rounded-3xl object-cover shadow-soft"
          />
          <div className="space-y-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            <h2 className="font-display text-3xl text-foreground">GIID</h2>
            <p>
              The Government Institute for Intellectually Differently Abled has worked for decades
              on education, therapy and vocational training. The leather unit is where that training
              becomes something you can hold.
            </p>
            <h2 className="font-display text-3xl text-foreground">Imayam Sigaram</h2>
            <p>
              Imayam Sigaram is the production and enterprise arm — a structured programme of skill
              development, batch production, quality control and market access. Trainees learn
              cutting, stitching, moulding and finishing, then join paid production work.
            </p>
            <p>
              We do not ask customers to buy out of sympathy. We ask them to buy because the work is
              good, and to know that behind every piece is a person who earned the skill to make it.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="What we build"
              title="Craft first. Story second. Both true."
              intro="Materials are chosen for longevity, patterns are refined in-house, and every piece passes a final quality check before it carries our label."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="ink" size="pill">
                <Link to="/products">Explore Collection</Link>
              </Button>
              <Button asChild variant="quiet" size="pill">
                <Link to="/makers">Meet the Makers</Link>
              </Button>
            </div>
          </div>
          <img
            src={texture}
            alt="Close-up of hand-stitched leather grain and edge finishing"
            width={1200}
            height={1200}
            loading="lazy"
            className="aspect-square rounded-3xl object-cover shadow-soft"
          />
        </div>
      </Section>
    </>
  );
}
