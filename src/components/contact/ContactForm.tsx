import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/enquiry.functions";
import { contactSchema, MESSAGE_MAX } from "@/lib/validation";

/**
 * General enquiry form. Writes a row to the Google Sheet through the existing
 * Apps Script web app (server-side — the endpoint and token never reach the
 * browser).
 *
 * Email is genuinely optional: leaving it blank submits cleanly. The message
 * field accepts up to MESSAGE_MAX characters and is forwarded in full.
 */
export function ContactForm() {
  const send = useServerFn(submitContact);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [messageLength, setMessageLength] = useState(0);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") ?? ""),
      mobile: String(fd.get("mobile") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = document.getElementById(`contact-${Object.keys(next)[0]}`);
      first?.focus();
      return;
    }

    setErrors({});
    setPending(true);
    try {
      const result = await send({ data: parsed.data });
      if (result.stored) {
        setSent(result.enquiryId);
        form.reset();
        setMessageLength(0);
        toast.success("Message sent", {
          description: `We have your enquiry — reference ${result.enquiryId}.`,
        });
      } else {
        toast.error("We could not save your message just now.", {
          description: "Please try again, or reach us on WhatsApp and we'll reply straight away.",
        });
      }
    } catch {
      toast.error("Something went wrong sending your message.", {
        description: "Please try again, or reach us on WhatsApp.",
      });
    } finally {
      setPending(false);
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`contact-${k}-error`} className="mt-1 text-xs text-destructive" role="alert">
        {errors[k]}
      </p>
    ) : null;

  const nearLimit = messageLength > MESSAGE_MAX * 0.9;

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate aria-describedby="contact-intro">
      <p id="contact-intro" className="text-sm text-muted-foreground">
        Fields marked * are required. Everything else is optional.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Full Name *</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            aria-invalid={Boolean(errors["name"])}
            aria-describedby={errors["name"] ? "contact-name-error" : undefined}
            className="mt-1.5"
          />
          {err("name")}
        </div>
        <div>
          <Label htmlFor="contact-mobile">Mobile Number *</Label>
          <Input
            id="contact-mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors["mobile"])}
            aria-describedby={errors["mobile"] ? "contact-mobile-error" : undefined}
            className="mt-1.5"
          />
          {err("mobile")}
        </div>
      </div>

      <div>
        <Label htmlFor="contact-email">
          Email <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={160}
          aria-invalid={Boolean(errors["email"])}
          aria-describedby={errors["email"] ? "contact-email-error" : undefined}
          className="mt-1.5"
        />
        {err("email")}
      </div>

      <div>
        <Label htmlFor="contact-message">Your Message *</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          maxLength={MESSAGE_MAX}
          onChange={(e) => setMessageLength(e.target.value.length)}
          placeholder="Tell us what you are looking for — product, quantity, colours, delivery timeline, bulk or corporate gifting…"
          aria-invalid={Boolean(errors["message"])}
          aria-describedby={
            errors["message"]
              ? "contact-message-error contact-message-count"
              : "contact-message-count"
          }
          className="mt-1.5 max-w-full resize-y break-words"
        />
        <p
          id="contact-message-count"
          className={`mt-1 text-xs ${nearLimit ? "text-destructive" : "text-muted-foreground"}`}
          aria-live="polite"
        >
          {messageLength.toLocaleString("en-IN")} / {MESSAGE_MAX.toLocaleString("en-IN")} characters
        </p>
        {err("message")}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="whatsapp" size="xl" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
          {pending ? "Sending…" : "Send Message"}
        </Button>
        {sent ? (
          <p className="text-sm text-muted-foreground" role="status">
            Sent — your reference is <span className="text-foreground">{sent}</span>.
          </p>
        ) : null}
      </div>
    </form>
  );
}
