import { createFileRoute } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/Section";
import { Prose } from "@/components/shared/Prose";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Order Information — GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "Production timelines, shipping within India and abroad, bulk gifting orders and returns.",
      },
      { property: "og:title", content: "Shipping & Order Information" },
      {
        property: "og:description",
        content: "How long a handmade order takes and how it reaches you.",
      },
      ogUrl("/shipping"),
    ],
    ...pageSeo("/shipping", "Shipping & Orders"),
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Orders"
        title="Shipping & Order Information"
        intro="Every piece is made to order, so timelines reflect real production work rather than warehouse dispatch."
      />
      <Prose>
        <h2>Production time</h2>
        <ul>
          <li>Small goods (keychains, card holders): 3–5 working days</li>
          <li>Sleeves, pouches and wallets: 5–8 working days</li>
          <li>Bags and moulded pieces: 10–15 working days</li>
          <li>Bulk gifting orders: quoted at the time of confirmation</li>
        </ul>
        <h2>Delivery</h2>
        <p>
          We ship across India through trusted courier partners. International delivery is arranged
          on request; charges are shared before confirmation.
        </p>
        <h2>Payment</h2>
        <p>
          Payment details are shared on WhatsApp once the order is confirmed. There is no checkout
          or card entry on this website.
        </p>
        <h2>Returns</h2>
        <p>
          If a piece arrives damaged, message us within 7 days with photographs and we will repair
          or replace it. Customised and embossed pieces cannot be returned.
        </p>
      </Prose>
    </>
  );
}
