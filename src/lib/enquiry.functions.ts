import { createServerFn } from "@tanstack/react-start";
import { contactSchema, enquirySchema } from "@/lib/validation";

/**
 * Forwards a validated enquiry to a Google Apps Script web app which appends a
 * row to the connected Google Sheet. The script URL and shared token live in
 * server-side environment variables and are never exposed to the browser.
 * Failures are reported but must never block the WhatsApp handoff.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const enquiryId = `GIS-ENQ-${Date.now().toString(36).toUpperCase()}`;
    const endpoint = process.env["GOOGLE_APPS_SCRIPT_URL"];
    const token = process.env["GOOGLE_APPS_SCRIPT_TOKEN"] ?? "";

    if (!endpoint) {
      return { enquiryId, stored: false, reason: "sheet-not-configured" as const };
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          timestamp: new Date().toISOString(),
          enquiryId,
          customerName: data.name,
          mobile: data.mobile,
          email: data.email ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          country: data.country ?? "",
          productId: data.productId,
          serialNumber: data.serialNumber,
          productName: data.productName,
          category: data.category,
          priceLabel: data.priceLabel,
          quantity: data.quantity,
          colour: data.colour ?? "",
          customization: data.customization ?? "",
          message: data.message ?? "",
          whatsappStatus: "Opened",
          source: "Website",
          pageUrl: data.pageUrl ?? "",
        }),
      });
      if (!res.ok) {
        console.error(`Apps Script responded ${res.status}: ${await res.text()}`);
        return { enquiryId, stored: false, reason: "sheet-error" as const };
      }
      return { enquiryId, stored: true, reason: null };
    } catch (error) {
      console.error("Enquiry storage failed", error);
      return { enquiryId, stored: false, reason: "network-error" as const };
    }
  });
/**
 * Forwards a general contact message to the same Google Apps Script web app,
 * tagged `formType: "Contact"` so the script can route it to the contact
 * sheet/tab. Uses the identical endpoint and token as product enquiries — the
 * integration is not duplicated.
 *
 * Email is optional and may be blank; only name, mobile and message are
 * required. The message is forwarded in full and never truncated.
 */
export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const enquiryId = `GIS-MSG-${Date.now().toString(36).toUpperCase()}`;
    const endpoint = process.env["GOOGLE_APPS_SCRIPT_URL"];
    const token = process.env["GOOGLE_APPS_SCRIPT_TOKEN"] ?? "";

    if (!endpoint) {
      return { enquiryId, stored: false, reason: "sheet-not-configured" as const };
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          formType: "Contact",
          timestamp: new Date().toISOString(),
          enquiryId,
          customerName: data.name,
          mobile: data.mobile,
          email: data.email ?? "",
          message: data.message,
          messageLength: data.message.length,
          source: "Website — Contact Page",
        }),
      });
      if (!res.ok) {
        console.error(`Apps Script responded ${res.status}: ${await res.text()}`);
        return { enquiryId, stored: false, reason: "sheet-error" as const };
      }
      return { enquiryId, stored: true, reason: null };
    } catch (error) {
      console.error("Contact message storage failed", error);
      return { enquiryId, stored: false, reason: "network-error" as const };
    }
  });
