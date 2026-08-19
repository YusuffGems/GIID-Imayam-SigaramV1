import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "leather-accessories",
    name: "Leather Accessories",
    description: "Everyday leather essentials, hand cut and hand finished.",
    useCase: "Everyday",
  },
  {
    slug: "bags",
    name: "Bags",
    description: "Structured, moulded and woven bags built to last.",
    useCase: "Travel",
  },
  {
    slug: "wallets",
    name: "Wallets",
    description: "Slim wallets and card holders with clean edge finishing.",
    useCase: "Everyday",
  },
  {
    slug: "office-accessories",
    name: "Office Accessories",
    description: "Desk and device pieces for a considered workspace.",
    useCase: "Work",
  },
  {
    slug: "travel-accessories",
    name: "Travel Accessories",
    description: "Companions for the road, sized for real journeys.",
    useCase: "Travel",
  },
  {
    slug: "keychains",
    name: "Keychains",
    description: "Small-format craft — ideal for gifting in volume.",
    useCase: "Gifting",
  },
  {
    slug: "pouches",
    name: "Pouches",
    description: "Soft organisers for cables, cosmetics and stationery.",
    useCase: "Everyday",
  },
  {
    slug: "lifestyle-products",
    name: "Lifestyle Products",
    description: "Objects that quietly improve a room or a routine.",
    useCase: "Everyday",
  },
  {
    slug: "handmade-gifts",
    name: "Handmade Gifts",
    description: "Corporate and personal gifting, customisable in bulk.",
    useCase: "Gifting",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);