import { Globe, Mail, MapPin } from "lucide-react";
import { AGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ContactDetailsProps = {
  variant?: "stack" | "list";
  className?: string;
};

export default function ContactDetails({ variant = "stack", className }: ContactDetailsProps) {
  if (variant === "list") {
    return (
      <ul className={cn("space-y-3 text-sm text-muted-foreground", className)}>
        <li className="flex items-start justify-center gap-2 sm:justify-start">
          <Mail className="mt-0.5 size-4 shrink-0 text-brand-primary" />
          <a href={`mailto:${AGENCY.email}`} className="hover:text-brand-primary">
            {AGENCY.email}
          </a>
        </li>
        <li className="flex items-start justify-center gap-2 sm:justify-start">
          <Globe className="mt-0.5 size-4 shrink-0 text-brand-primary" />
          {AGENCY.availability}
        </li>
        <li className="flex items-start justify-center gap-2 sm:justify-start">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-primary" />
          {AGENCY.location.full}
        </li>
      </ul>
    );
  }

  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex justify-center gap-4 lg:justify-start">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
          <Mail className="size-5" />
        </div>
        <div>
          <h4 className="font-semibold">Email Us</h4>
          <a href={`mailto:${AGENCY.email}`} className="text-sm text-muted-foreground hover:text-brand-primary">
            {AGENCY.email}
          </a>
        </div>
      </div>
      <div className="flex justify-center gap-4 lg:justify-start">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
          <Globe className="size-5" />
        </div>
        <div>
          <h4 className="font-semibold">Availability</h4>
          <p className="text-sm text-muted-foreground">{AGENCY.availability}</p>
        </div>
      </div>
      <div className="flex justify-center gap-4 lg:justify-start">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
          <MapPin className="size-5" />
        </div>
        <div>
          <h4 className="font-semibold">Location</h4>
          <p className="text-sm text-muted-foreground">{AGENCY.location.full}</p>
        </div>
      </div>
    </div>
  );
}
