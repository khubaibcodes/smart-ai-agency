import { AGENCY } from "@/lib/constants";
import WhatsAppIcon from "@/components/ui/whatsapp-icon";

/**
 * Persistent WhatsApp button, pinned to the right edge.
 *
 * Notes on the choices here:
 * - It expands to show a label on hover/focus at `sm`+, and stays a plain
 *   circle on small screens where horizontal room is scarce.
 * - `bottom-5` rather than vertically centred: centre-right collides with
 *   content on short viewports, and thumb reach on a phone is bottom-corner.
 * - 56px target, comfortably past the 44px minimum.
 * - Deliberately static — no entrance animation, no pulse. It sits on top of
 *   every page including the hero, and the motion budget there is already
 *   spent on the shader and the console.
 * - `z-40` keeps it under the navbar (`z-50`) so the open mobile menu wins.
 */
export default function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Hi — I'd like to know what AI could take off my plate.",
  );

  return (
    <a
      href={`${AGENCY.whatsapp.url}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message us on ${AGENCY.whatsapp.label}`}
      className="group fixed bottom-5 right-4 z-40 inline-flex h-14 items-center gap-3 rounded-full border border-brand-primary/25 bg-brand-elevated/90 px-4 text-brand-primary shadow-lg shadow-black/30 backdrop-blur-md transition-colors duration-300 hover:border-brand-primary/50 hover:bg-brand-primary hover:text-black focus-visible:border-brand-primary/50 sm:right-6"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100 group-focus-visible:max-w-[10rem] group-focus-visible:opacity-100 sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}
