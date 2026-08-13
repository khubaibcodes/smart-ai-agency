import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Base surface for every section card.
 *
 * Uses the shared `.panel` treatment — hairline border, inner top highlight,
 * backdrop blur, no drop shadow — so Pricing, Testimonials, Team, Mission and
 * Resources all pick up the new depth language from one place.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("panel text-card-foreground", className)} {...props} />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-xl font-semibold tracking-tight", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
