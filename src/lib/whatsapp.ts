import { site } from "@/data/site";
import type { EnquiryPayload } from "@/types";

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const callLink = `tel:+${site.whatsappNumber}`;

interface QuickEnquiry {
  productName: string;
  serialNumber: string;
  productId: string;
  /** Display price, e.g. "₹460" or "Enquire for Price". */
  priceLabel: string;
  quantity?: number;
  colour?: string;
  customization?: string;
}

export function buildProductMessage(p: QuickEnquiry): string {
  return [
    `Hello ${site.name},`,
    "",
    "I am interested in purchasing this product.",
    "",
    `Product: ${p.productName}`,
    `SL. No: ${p.serialNumber}`,
    `Product ID: ${p.productId}`,
    `Price: ${p.priceLabel}`,
    `Quantity: ${p.quantity ?? 1}`,
    `Colour: ${p.colour ?? "Not specified"}`,
    `Customization: ${p.customization?.trim() ? p.customization : "No"}`,
    "",
    "Please share availability, price and order details.",
    "",
    "Thank you.",
  ].join("\n");
}

export function buildEnquiryMessage(e: EnquiryPayload, enquiryId: string): string {
  const lines = [
    `Hello ${site.name},`,
    "",
    "I would like to enquire about the following product.",
    "",
    `Enquiry ID: ${enquiryId}`,
    `Product: ${e.productName}`,
    `SL. No: ${e.serialNumber}`,
    `Product ID: ${e.productId}`,
    `Price: ${e.priceLabel}`,
    `Quantity: ${e.quantity}`,
    `Colour: ${e.colour || "Not specified"}`,
    `Customization: ${e.customization?.trim() ? e.customization : "No"}`,
    "",
    `Customer Name: ${e.name}`,
    `Mobile: ${e.mobile}`,
  ];
  if (e.email) lines.push(`Email: ${e.email}`);
  if (e.city) lines.push(`City: ${e.city}`);
  if (e.state) lines.push(`State: ${e.state}`);
  if (e.country) lines.push(`Country: ${e.country}`);
  if (e.message?.trim()) lines.push("", `Message: ${e.message.trim()}`);
  lines.push("", "Please share the availability, price and order details.", "", "Thank you.");
  return lines.join("\n");
}

export const generalWhatsAppLink = whatsappLink(
  `Hello ${site.name}, I would like to know more about your handcrafted products.`,
);
