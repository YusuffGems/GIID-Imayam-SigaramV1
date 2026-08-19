import { createFileRoute } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/Section";
import { Prose } from "@/components/shared/Prose";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "How GIID Imayam Sigaram collects, uses and protects the details you share through the enquiry form.",
      },
      { property: "og:title", content: "Privacy Policy — GIID Imayam Sigaram" },
      {
        property: "og:description",
        content: "Our approach to enquiry data, WhatsApp orders and record keeping.",
      },
      ogUrl("/privacy"),
    ],
    ...pageSeo("/privacy", "Privacy Policy"),
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Prose>
        <p>
          We collect only what we need to answer your enquiry and prepare your order: your name,
          mobile number and, optionally, your email and location.
        </p>
        <h2>How your details are used</h2>
        <p>
          Enquiry details are recorded in our internal order sheet and used to respond on WhatsApp,
          confirm availability and arrange delivery. We do not sell or rent your details.
        </p>
        <h2>No accounts, no tracking profiles</h2>
        <p>The site has no customer login, no password storage and no advertising trackers.</p>
        <h2>Requests</h2>
        <p>
          To review or delete the details we hold, write to <strong>{site.email}</strong> or message
          us on {site.displayPhone}.
        </p>
      </Prose>
    </>
  );
}
