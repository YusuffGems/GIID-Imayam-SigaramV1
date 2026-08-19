import { Phone, MessageCircle } from "lucide-react";
import { Tip } from "@/components/shared/Tip";
import { callLink, generalWhatsAppLink } from "@/lib/whatsapp";

export function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-20 z-40 flex flex-col gap-3 md:bottom-6">
      <Tip label="WhatsApp" side="left">
        <a
          href={generalWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="grid size-12 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform duration-200 hover:scale-105"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
        </a>
      </Tip>
      <Tip label="Call" side="left">
        <a
          href={callLink}
          aria-label="Call"
          className="grid size-12 place-items-center rounded-full bg-ink text-background shadow-lift transition-transform duration-200 hover:scale-105"
        >
          <Phone className="size-5" aria-hidden="true" />
        </a>
      </Tip>
    </div>
  );
}