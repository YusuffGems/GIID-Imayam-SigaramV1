import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { enquirySchema } from "@/lib/validation";
import { buildEnquiryMessage, whatsappLink } from "@/lib/whatsapp";
import type { Product } from "@/types";

interface Props {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultQuantity?: number;
  defaultColour?: string;
  defaultCustomization?: string;
}

export function EnquiryModal({
  product,
  open,
  onOpenChange,
  defaultQuantity = 1,
  defaultColour,
  defaultCustomization,
}: Props) {
  const send = useServerFn(submitEnquiry);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      mobile: String(fd.get("mobile") ?? ""),
      email: String(fd.get("email") ?? ""),
      city: String(fd.get("city") ?? ""),
      state: String(fd.get("state") ?? ""),
      country: String(fd.get("country") ?? ""),
      productId: product.id,
      serialNumber: product.serialNumber,
      productName: product.name,
      category: product.category,
      priceLabel: product.priceLabel,
      quantity: Number(fd.get("quantity") ?? 1),
      colour: String(fd.get("colour") ?? ""),
      customization: String(fd.get("customization") ?? ""),
      message: String(fd.get("message") ?? ""),
      pageUrl: typeof window === "undefined" ? "" : window.location.href,
    };

    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setPending(true);
    let enquiryId = `GIS-ENQ-${Date.now().toString(36).toUpperCase()}`;
    try {
      const result = await send({ data: parsed.data });
      enquiryId = result.enquiryId;
      if (!result.stored) {
        toast.message("Continuing to WhatsApp", {
          description: "We could not save the enquiry record, but your message is ready.",
        });
      }
    } catch {
      toast.error("Something went wrong saving your details.", {
        description: "You can still continue the order on WhatsApp.",
      });
    } finally {
      setPending(false);
    }

    const url = whatsappLink(buildEnquiryMessage(parsed.data, enquiryId));
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    onOpenChange(false);
  }

  const err = (k: string) =>
    errors[k] ? (
      <p className="mt-1 text-xs text-destructive" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Complete Your Enquiry</DialogTitle>
          <DialogDescription>
            SL. No. {product.serialNumber} · {product.name} · No account needed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="enq-name">Full Name *</Label>
              <Input id="enq-name" name="name" required maxLength={80} className="mt-1.5" />
              {err("name")}
            </div>
            <div>
              <Label htmlFor="enq-mobile">Mobile Number *</Label>
              <Input id="enq-mobile" name="mobile" inputMode="tel" required className="mt-1.5" />
              {err("mobile")}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="enq-email">Email</Label>
              <Input id="enq-email" name="email" type="email" className="mt-1.5" />
              {err("email")}
            </div>
            <div>
              <Label htmlFor="enq-city">City</Label>
              <Input id="enq-city" name="city" className="mt-1.5" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="enq-state">State</Label>
              <Input id="enq-state" name="state" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="enq-country">Country</Label>
              <Input id="enq-country" name="country" defaultValue="India" className="mt-1.5" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="enq-qty">Quantity</Label>
              <Input
                id="enq-qty"
                name="quantity"
                type="number"
                min={1}
                max={999}
                defaultValue={defaultQuantity}
                className="mt-1.5"
              />
              {err("quantity")}
            </div>
            <div>
              <Label htmlFor="enq-colour">Colour</Label>
              <Input
                id="enq-colour"
                name="colour"
                defaultValue={defaultColour ?? product.colors[0]}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="enq-custom">Customization</Label>
              <Input
                id="enq-custom"
                name="customization"
                defaultValue={defaultCustomization ?? ""}
                placeholder="e.g. initials"
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="enq-message">Additional Message</Label>
            <Textarea id="enq-message" name="message" rows={3} className="mt-1.5" />
          </div>

          <DialogFooter className="gap-2 sm:justify-between">
            <Button type="button" variant="quiet" size="pill" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="whatsapp" size="pill" disabled={pending}>
              {pending ? <Loader2 className="animate-spin" /> : null}
              Continue to WhatsApp
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
