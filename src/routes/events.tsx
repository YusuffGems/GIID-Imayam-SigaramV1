import { createFileRoute } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";
import { CalendarDays, MapPin } from "lucide-react";

import { PageHeader, Section } from "@/components/shared/Section";
import { events } from "@/data/events";

const statusLabel: Record<string, string> = {
  upcoming: "Upcoming",
  current: "Happening now",
  past: "Past",
};

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Exhibitions — GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "Craft fairs, exhibitions and corporate gifting previews where our makers show and sell their handmade leather work.",
      },
      { property: "og:title", content: "Events & Exhibitions" },
      {
        property: "og:description",
        content: "Where to meet our makers and see the collection in person.",
      },
      ogUrl("/events"),
    ],
    ...pageSeo("/events", "Events"),
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calendar"
        title="Events & exhibitions"
        intro="Meet the makers, see the process and buy directly at these showcases."
      />

      <Section>
        <ol className="space-y-5">
          {events.map((e) => (
            <li
              key={e.id}
              className="rounded-3xl border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent/15 px-3 py-1 text-[0.65rem] font-medium tracking-[0.16em] text-accent uppercase">
                  {statusLabel[e.status]}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {e.date}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {e.location}
                </span>
              </div>

              <h2 className="mt-4 font-display text-2xl text-foreground">{e.name}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {e.description}
              </p>

              <div className="mt-6 grid gap-5 border-t border-border pt-5 text-sm sm:grid-cols-3">
                <div>
                  <p className="eyebrow">Showcased</p>
                  <p className="mt-2 text-muted-foreground">{e.productsShowcased.join(", ")}</p>
                </div>
                <div>
                  <p className="eyebrow">Makers</p>
                  <p className="mt-2 text-muted-foreground">{e.makerParticipation.join(", ")}</p>
                </div>
                <div>
                  <p className="eyebrow">Impact</p>
                  <p className="mt-2 text-muted-foreground">{e.impactSummary}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
