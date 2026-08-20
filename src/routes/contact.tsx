import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { ogUrl, pageSeo } from "@/lib/seo";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { callLink, generalWhatsAppLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact | GIID Imayam Sigaram",
      },
      {
        name: "description",
        content:
          "Connect with GIID Imayam Sigaram for handcrafted leather products, bulk orders, gifting and workshop enquiries.",
      },
      {
        property: "og:title",
        content: "Contact | GIID Imayam Sigaram",
      },
      {
        property: "og:description",
        content:
          "Connect with our team for handcrafted leather products and enquiries.",
      },
      ogUrl("/contact"),
    ],
    ...pageSeo("/contact", "Contact"),
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="px-5 pb-14 pt-32 sm:px-8 sm:pt-36 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow">Get in touch</p>

              <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Let&apos;s talk about
                <br />
                <span className="text-leather">your next piece.</span>
              </h1>
            </div>

            <div className="max-w-md lg:pb-2">
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                Looking for a handcrafted leather product, planning a bulk
                order or interested in our work? Our team is ready to help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT STRIP
      ====================================================== */}

      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-3">
            {/* WhatsApp */}

            <a
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                border-b
                border-border
                p-7
                transition-colors
                hover:bg-secondary/40
                md:border-b-0
                md:border-r
              "
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-whatsapp/10 text-whatsapp">
                  <MessageCircle className="size-5" />
                </span>

                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>

              <p className="mt-8 font-display text-xl text-foreground">
                WhatsApp
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {site.displayPhone}
              </p>
            </a>

            {/* Phone */}

            <a
              href={callLink}
              className="
                group
                border-b
                border-border
                p-7
                transition-colors
                hover:bg-secondary/40
                md:border-b-0
                md:border-r
              "
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-accent/10 text-accent">
                  <Phone className="size-5" />
                </span>

                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>

              <p className="mt-8 font-display text-xl text-foreground">
                Call us
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {site.displayPhone}
              </p>
            </a>

            {/* Email */}

            <a
              href={`mailto:${site.email}`}
              className="
                group
                p-7
                transition-colors
                hover:bg-secondary/40
              "
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-accent/10 text-accent">
                  <Mail className="size-5" />
                </span>

                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>

              <p className="mt-8 font-display text-xl text-foreground">
                Email
              </p>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                {site.email}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          ENQUIRY SECTION
      ====================================================== */}

      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* LEFT */}

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Enquiry</p>

            <h2 className="mt-4 max-w-md font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Tell us what you have in mind.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              Share a few details about the product, quantity or requirement.
              We&apos;ll get back to you with the information you need.
            </p>

            <div className="mt-10 border-l-2 border-accent pl-5">
              <p className="font-display text-lg text-foreground">
                Handmade. Purposeful. Personal.
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Every product carries the skill and effort of the person who
                made it.
              </p>
            </div>
          </div>

          {/* FORM */}

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* =====================================================
          WORKSHOP
      ====================================================== */}

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          {/* MAP */}

          <div className="min-h-[380px] lg:min-h-[520px]">
            <iframe
              src={site.mapEmbed}
              title="GIID Imayam Sigaram workshop location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[380px] w-full border-0 lg:min-h-[520px]"
            />
          </div>

          {/* CONTENT */}

          <div className="flex items-center px-5 py-16 sm:px-10 lg:px-16">
            <div className="max-w-lg">
              <p className="eyebrow">Our workshop</p>

              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                Come closer to the craft.
              </h2>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                Our workshop is where leather is transformed into useful,
                beautiful products through patience, training and skilled
                hands.
              </p>

              <div className="mt-8 flex items-start gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-accent" />

                <p className="text-sm leading-6 text-muted-foreground">
                  {site.address}
                </p>
              </div>

              <Button
                asChild
                variant="quiet"
                size="pill"
                className="mt-8"
              >
                <a
                  href={site.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Start a conversation</p>

          <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-6xl">
            Have something in mind?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
            From one handcrafted piece to a larger requirement, we&apos;re
            happy to hear from you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="whatsapp" size="xl">
              <a
                href={generalWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle />
                WhatsApp us
              </a>
            </Button>

            <Button asChild variant="quiet" size="xl">
              <a href={`mailto:${site.email}`}>
                <Mail />
                Send an email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}