import { createFileRoute } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader } from "@/components/shared/Section";

const faqs = [
  {
    q: "Do I need an account to order?",
    a: "No. There is no login, no signup and no password. Browse, choose a product, share a few details and the order continues on WhatsApp.",
  },
  {
    q: "How do I place an order?",
    a: "Open any product, choose quantity and colour, then tap Buy on WhatsApp. Fill the short enquiry form and your message opens in WhatsApp, pre-filled with the product details.",
  },
  {
    q: "Can products be customised?",
    a: "Yes. Name or initials embossing, colour selection and bulk corporate gifting are available on most products. Mention it in the customisation field.",
  },
  {
    q: "Who makes the products?",
    a: "Trained artisans at the institute, including differently abled makers who have completed structured skill training in leather craft. Each product page names the maker.",
  },
  {
    q: "Is the price on the site final?",
    a: "Prices are indicative. Final pricing depends on customisation, quantity and delivery, and is confirmed on WhatsApp before you pay anything.",
  },
  {
    q: "Do you ship outside India?",
    a: "Yes, on request. Share your destination on WhatsApp and we will quote shipping before confirming.",
  },
  {
    q: "How long will my order take?",
    a: "Small goods take 3–5 working days, sleeves and wallets 5–8 days, and bags 10–15 days, since each piece is made to order.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Ordering Handmade Leather Goods | GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "Answers on WhatsApp ordering, customisation, pricing, delivery timelines and who makes our handcrafted leather products.",
      },
      { property: "og:title", content: "Frequently Asked Questions" },
      {
        property: "og:description",
        content: "Everything you need before placing a handmade leather order.",
      },
      ogUrl("/faq"),
    ],
    ...pageSeo("/faq", "FAQ"),
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Frequently Asked Questions"
        intro="Ordering is deliberately simple. Here is how it works."
      />
      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
