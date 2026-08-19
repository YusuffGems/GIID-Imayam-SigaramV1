import { createFileRoute } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader, Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { callLink, generalWhatsAppLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Order on WhatsApp | GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "Message us on WhatsApp, call, or email to order handcrafted leather goods, arrange bulk gifting or visit the workshop in Chennai.",
      },
      { property: "og:title", content: "Contact GIID Imayam Sigaram" },
      {
        property: "og:description",
        content: "WhatsApp, call, email or visit the workshop in Chennai.",
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
      <PageHeader
        eyebrow="Contact"
        title="Talk to us directly"
        intro="No checkout, no waiting queue. Message us and a person replies."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <a
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <MessageCircle className="mt-0.5 size-5 text-whatsapp" aria-hidden="true" />
              <span>
                <span className="block font-display text-lg text-foreground">WhatsApp</span>
                <span className="text-sm text-muted-foreground">{site.displayPhone}</span>
              </span>
            </a>

            <a
              href={callLink}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <Phone className="mt-0.5 size-5 text-accent" aria-hidden="true" />
              <span>
                <span className="block font-display text-lg text-foreground">Call</span>
                <span className="text-sm text-muted-foreground">{site.displayPhone}</span>
              </span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <Mail className="mt-0.5 size-5 text-accent" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block font-display text-lg text-foreground">Email</span>
                <span className="block truncate text-sm text-muted-foreground">{site.email}</span>
              </span>
            </a>

            <a
              href={site.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <MapPin className="mt-0.5 size-5 text-accent" aria-hidden="true" />
              <span>
                <span className="block font-display text-lg text-foreground">Visit</span>
                <span className="text-sm text-muted-foreground">{site.address}</span>
              </span>
            </a>

            <Button asChild variant="whatsapp" size="xl" className="w-full">
              <a href={generalWhatsAppLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                Message us on WhatsApp
              </a>
            </Button>
          </div>

          <div className="space-y-10">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-2xl text-foreground">Send us a message</h2>
              <p className="mt-2 mb-6 text-sm text-muted-foreground">
                Prefer to write? Leave your details and we will reply on WhatsApp or email.
              </p>
              <ContactForm />
            </div>

            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                src={site.mapEmbed}
                title="Map to the GIID Imayam Sigaram workshop in Chennai"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
