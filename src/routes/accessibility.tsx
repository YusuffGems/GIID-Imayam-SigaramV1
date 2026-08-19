import { createFileRoute } from "@tanstack/react-router";

import { ogUrl, pageSeo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/Section";
import { Prose } from "@/components/shared/Prose";
import { site } from "@/data/site";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — GIID Imayam Sigaram" },
      {
        name: "description",
        content:
          "Our accessibility commitments: keyboard navigation, contrast, reduced motion, labelled icons and screen-reader support.",
      },
      { property: "og:title", content: "Accessibility — GIID Imayam Sigaram" },
      {
        property: "og:description",
        content: "Accessibility is part of who we are, not an afterthought.",
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
      <PageHeader
        eyebrow="Commitment"
        title="Accessibility"
        intro="This site is built by and for an organisation working with differently abled people. Access is a design requirement here."
      />
      <Prose>
        <h2>What we implement</h2>
        <ul>
          <li>Semantic HTML with a single main landmark per page</li>
          <li>Full keyboard navigation and visible focus states</li>
          <li>ARIA labels and hover tooltips on every icon control</li>
          <li>Alt text on images and labelled form fields</li>
          <li>Contrast levels that meet WCAG AA</li>
          <li>Respect for the reduced-motion system preference</li>
          <li>Large touch targets and thumb-friendly mobile navigation</li>
        </ul>
        <h2>Found a barrier?</h2>
        <p>
          Tell us and we will fix it. Email <strong>{site.email}</strong> or message{" "}
          <strong>{site.displayPhone}</strong>.
        </p>
      </Prose>
    </>
  );
}
