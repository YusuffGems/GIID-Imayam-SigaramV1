import { createFileRoute } from "@tanstack/react-router";
import {
  Accessibility,
  ArrowRight,
  Check,
  Eye,
  Hand,
  Keyboard,
  MessageCircle,
  MoveUpRight,
  Smartphone,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/Section";
import { site } from "@/data/site";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { ogUrl, pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      {
        title: "Accessibility — GIID Imayam Sigaram",
      },
      {
        name: "description",
        content:
          "Accessibility and inclusion are at the heart of GIID Imayam Sigaram. Learn how we make our digital experience easier and more welcoming for everyone.",
      },
      {
        property: "og:title",
        content: "Accessibility — GIID Imayam Sigaram",
      },
      {
        property: "og:description",
        content:
          "A more inclusive digital experience, designed with people in mind.",
      },
      ogUrl("/accessibility"),
    ],
    ...pageSeo("/accessibility", "Accessibility"),
  }),

  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}

      <PageHeader
        eyebrow="Everyone Belongs"
        title="Made to be accessible."
        intro="Accessibility is more than a checklist for us. It is about creating an experience where more people can explore our work, understand our story and connect with us independently."
      />

      {/* =====================================================
          HUMAN MESSAGE
      ====================================================== */}

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

            {/* Large statement */}

            <div>
              <p className="eyebrow">
                Our approach
              </p>

              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
                Ability should never be a barrier to participation.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
                GIID Imayam Sigaram is built around the belief that people
                should have opportunities to learn, create, contribute and
                grow. Our website follows the same principle.
              </p>
            </div>

            {/* Highlight card */}

            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-background sm:p-10">
              <div className="absolute -right-20 -top-20 size-56 rounded-full bg-background/5" />

              <Accessibility
                className="relative size-10 text-background"
                aria-hidden="true"
              />

              <p className="relative mt-8 max-w-lg font-display text-2xl leading-relaxed text-background md:text-3xl">
                "A good digital experience should welcome people before it
                asks them to do anything."
              </p>

              <div className="relative mt-8 h-px w-20 bg-background/30" />

              <p className="relative mt-4 text-sm text-background/60">
                GIID Imayam Sigaram
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOUR PRINCIPLES
      ====================================================== */}

      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">

          <div className="max-w-2xl">
            <p className="eyebrow">
              What accessibility means here
            </p>

            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
              Simple principles guide our digital experience.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">

            {/* Card 1 */}

            <article className="bg-card p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <div className="grid size-12 place-items-center rounded-2xl bg-secondary">
                  <Eye
                    className="size-5 text-foreground"
                    aria-hidden="true"
                  />
                </div>

                <span className="font-display text-4xl text-muted-foreground/30">
                  01
                </span>
              </div>

              <h3 className="mt-7 font-display text-2xl text-card-foreground">
                Easy to understand
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                Clear headings, readable text, meaningful labels and a
                straightforward layout help visitors find information
                without unnecessary complexity.
              </p>
            </article>

            {/* Card 2 */}

            <article className="bg-card p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <div className="grid size-12 place-items-center rounded-2xl bg-secondary">
                  <Hand
                    className="size-5 text-foreground"
                    aria-hidden="true"
                  />
                </div>

                <span className="font-display text-4xl text-muted-foreground/30">
                  02
                </span>
              </div>

              <h3 className="mt-7 font-display text-2xl text-card-foreground">
                Easy to interact with
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                Buttons, links and controls are designed with comfortable
                touch targets and clear interaction states across devices.
              </p>
            </article>

            {/* Card 3 */}

            <article className="bg-card p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <div className="grid size-12 place-items-center rounded-2xl bg-secondary">
                  <Keyboard
                    className="size-5 text-foreground"
                    aria-hidden="true"
                  />
                </div>

                <span className="font-display text-4xl text-muted-foreground/30">
                  03
                </span>
              </div>

              <h3 className="mt-7 font-display text-2xl text-card-foreground">
                More ways to navigate
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                We aim to support keyboard navigation, assistive
                technologies and different ways of interacting with the
                website.
              </p>
            </article>

            {/* Card 4 */}

            <article className="bg-card p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <div className="grid size-12 place-items-center rounded-2xl bg-secondary">
                  <Smartphone
                    className="size-5 text-foreground"
                    aria-hidden="true"
                  />
                </div>

                <span className="font-display text-4xl text-muted-foreground/30">
                  04
                </span>
              </div>

              <h3 className="mt-7 font-display text-2xl text-card-foreground">
                Designed for different screens
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                The experience adapts to phones, tablets and desktop
                computers so visitors can access our content wherever they
                are.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACCESSIBILITY CHECKLIST
      ====================================================== */}

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">

          <div className="grid gap-12 lg:grid-cols-2">

            {/* Left */}

            <div>
              <p className="eyebrow">
                Built into the details
              </p>

              <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
                Accessibility is part of the build.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                We consider accessibility throughout the design and
                development process rather than treating it as something
                added at the end.
              </p>
            </div>

            {/* Right */}

            <div className="space-y-3">
              {[
                "Meaningful alternative text for important images",
                "Clear labels for forms and interactive controls",
                "Visible keyboard focus states",
                "Readable colour contrast",
                "Responsive layouts across screen sizes",
                "Support for reduced-motion preferences",
                "Simple and consistent navigation",
                "Accessible icon controls and buttons",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary">
                    <Check
                      className="size-4 text-foreground"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-sm text-card-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PEOPLE FIRST
      ====================================================== */}

      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-card p-7 md:col-span-2 md:p-10">
              <Users
                className="size-8 text-foreground"
                aria-hidden="true"
              />

              <p className="mt-7 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                People first
              </p>

              <h2 className="mt-3 max-w-2xl font-display text-3xl text-card-foreground md:text-4xl">
                Inclusion is part of our everyday work.
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
                Our organisation supports differently abled people through
                training, skill development and meaningful production work.
                Creating an accessible digital presence is another way of
                extending that spirit of inclusion.
              </p>

              <Button
                asChild
                variant="quiet"
                size="pill"
                className="mt-7"
              >
                <a href="/our-story">
                  Learn about our story
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-ink p-7 text-background md:p-8">
              <MoveUpRight
                className="size-7 text-background"
                aria-hidden="true"
              />

              <div>
                <p className="font-display text-2xl leading-relaxed text-background">
                  "Everyone should have the opportunity to discover,
                  connect and participate."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEEDBACK
      ====================================================== */}

      <section className="bg-ink text-background">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">

          <MessageCircle
            className="mx-auto size-9 text-background"
            aria-hidden="true"
          />

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-background/50">
            Help us improve
          </p>

          <h2 className="mt-4 font-display text-3xl leading-tight text-background md:text-5xl">
            Something isn't working for you?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-background/70">
            We want to know. If you encounter an accessibility barrier,
            difficulty navigating the website or anything that makes the
            experience harder to use, please contact us.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="xl"
              variant="whatsapp"
            >
              <a
                href={generalWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                Message us
              </a>
            </Button>

            <Button
              asChild
              size="xl"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <a href={`mailto:${site.email}`}>
                Email us
              </a>
            </Button>
          </div>

          <p className="mt-6 text-xs text-background/50">
            {site.email}
          </p>
        </div>
      </section>
    </>
  );
}