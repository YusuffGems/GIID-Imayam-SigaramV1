import { z } from "zod";

/**
 * Upper bound for free-text messages. Google Sheets stores up to 50,000
 * characters per cell, so this is a friendly UI guard rather than a backend
 * limit — long enquiries are forwarded in full and never silently truncated.
 */
export const MESSAGE_MAX = 5000;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  mobile: z
    .string()
    .trim()
    .regex(/^[+0-9][0-9\s-]{7,17}$/, "Enter a valid mobile number"),
  email: z.string().trim().email("Enter a valid email").max(160).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  productId: z.string().trim().max(40),
  serialNumber: z.string().trim().max(10),
  productName: z.string().trim().max(120),
  category: z.string().trim().max(80),
  priceLabel: z.string().trim().max(40),
  quantity: z.number().int().min(1).max(999),
  colour: z.string().trim().max(60).optional().or(z.literal("")),
  customization: z
    .string()
    .trim()
    .max(500, "Please keep customisation notes under 500 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(
      MESSAGE_MAX,
      `Please keep your message under ${MESSAGE_MAX.toLocaleString("en-IN")} characters`,
    )
    .optional()
    .or(z.literal("")),
  pageUrl: z.string().trim().max(400).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  mobile: z
    .string()
    .trim()
    .regex(/^[+0-9][0-9\s-]{7,17}$/, "Enter a valid mobile number"),
  email: z.string().trim().email("Enter a valid email").max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(5, "Please add a short message")
    .max(
      MESSAGE_MAX,
      `That message is a little long — please keep it under ${MESSAGE_MAX.toLocaleString("en-IN")} characters`,
    ),
});

export type ContactInput = z.infer<typeof contactSchema>;
