import type { SiteEvent } from "@/types";

export const events: SiteEvent[] = [
  {
    id: "E-05",
    slug: "craft-showcase-chennai",
    name: "Craft Showcase — Chennai",
    status: "upcoming",
    date: "12–14 September 2026",
    location: "Chennai Trade Centre, Chennai",
    description:
      "A three-day showcase of the full leather collection with live stitching demonstrations by our makers.",
    productsShowcased: ["Moulded Bag", "Weaving Bag", "Men's Wallet"],
    makerParticipation: ["Maker Profile 01", "Maker Profile 03"],
    impactSummary: "Direct buyer meetings and corporate gifting orders.",
  },
  {
    id: "E-04",
    slug: "corporate-gifting-preview",
    name: "Corporate Gifting Preview",
    status: "current",
    date: "Ongoing through 2026",
    location: "By appointment — institute workshop",
    description:
      "A rolling preview for companies sourcing handmade gifts in volume, with customisation samples on display.",
    productsShowcased: ["Keychain cum Card Holder", "Card Holder — Type 01", "Tag Keychain"],
    makerParticipation: ["Maker Profile 02", "Maker Profile 05"],
    impactSummary: "Repeat bulk orders keep the unit working year-round.",
  },
  {
    id: "E-03",
    slug: "state-skill-exhibition",
    name: "State Skill Exhibition",
    status: "past",
    date: "March 2026",
    location: "Chennai",
    description:
      "Our makers demonstrated cutting and saddle stitching to visiting students and trainers.",
    productsShowcased: ["Laptop Sleeve", "Sling Bag"],
    makerParticipation: ["Maker Profile 01", "Maker Profile 04"],
    impactSummary: "Two makers recognised for craftsmanship.",
  },
  {
    id: "E-02",
    slug: "artisan-market",
    name: "Artisan Market",
    status: "past",
    date: "December 2025",
    location: "Chennai",
    description:
      "A weekend market stall introducing the small leather goods range to the public.",
    productsShowcased: ["Leaf Keychain", "AirPods Case", "Multipurpose Pouch"],
    makerParticipation: ["Maker Profile 05"],
    impactSummary: "Highest single-weekend sales for the unit.",
  },
  {
    id: "E-01",
    slug: "workshop-open-day",
    name: "Workshop Open Day",
    status: "past",
    date: "August 2025",
    location: "Institute workshop, Chennai",
    description:
      "Families and partners visited the unit to see the making process end to end.",
    productsShowcased: ["Belt", "Mouse Pad"],
    makerParticipation: ["Maker Profile 04", "Maker Profile 06"],
    impactSummary: "Six new trainees enrolled after the open day.",
  },
];

export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);