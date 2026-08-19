import { createFileRoute } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/Section";
import { Prose } from "@/components/shared/Prose";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "Terms covering enquiries, handmade variation, pricing and orders placed through WhatsApp.",
      },
      { property: "og:title", content: "Terms & Conditions — GIID Imayam Sigaram" },
      {
        property: "og:description",
        content: "The terms that apply to enquiries and orders placed with us.",
      },
      ogUrl("/terms"),
    ],
    ...pageSeo("/terms", "Terms & Conditions"),
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" />
      <Prose>
        <h2>Enquiries and orders</h2>
        <p>
          Submitting an enquiry does not create an order. An order is confirmed only after we agree
          price, quantity, customisation and delivery over WhatsApp, call or email.
        </p>
        <h2>Handmade variation</h2>
        <p>
          Products are made by hand in small batches. Grain, tone and finish vary slightly between
          pieces. This is a characteristic of the material and craft, not a defect.
        </p>
        <h2>Pricing</h2>
        <p>
          Prices shown are indicative and exclude shipping unless stated. Bulk and corporate gifting
          pricing is quoted separately.
        </p>
        <h2>Intellectual property</h2>
        <p>
          All product designs, photographs and written content on this site belong to GIID Imayam
          Sigaram and may not be reproduced without permission.
        </p>
      </Prose>
    </>
  );
}
