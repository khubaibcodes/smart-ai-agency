"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import {
  AGENCY,
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
} from "@/lib/constants";
import { validateContactPayload } from "@/lib/validation/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(event.currentTarget);
    // Honeypot — humans never see this field, so anything in it means a bot.
    const honeypot = String(formData.get("website") ?? "");
    const payload = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      service,
      budget,
      message: String(formData.get("message") ?? "").trim(),
    };

    const validation = validateContactPayload(payload);
    if (!validation.success) {
      setStatus("error");
      setError(validation.error);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validation.data, website: honeypot }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send message");

      setStatus("success");
      event.currentTarget.reset();
      setService("");
      setBudget("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to send message");
    }
  }

  if (status === "success") {
    return (
      <Card className="border-brand-primary/30">
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary">
            <Send className="size-6" />
          </div>
          <h3 className="text-xl font-semibold">Message sent!</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you for reaching out. We&apos;ll be in touch {AGENCY.responseTime}.
          </p>
          <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
        <CardDescription>Fill in the form and we&apos;ll get back to you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot. Positioned off-screen rather than display:none — some
              bots skip hidden inputs — and kept out of the tab order and the
              accessibility tree so no real user can reach it. */}
          <div className="absolute left-[-9999px] top-auto size-px overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" name="firstName" placeholder="John" required minLength={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" name="lastName" placeholder="Smith" required minLength={2} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email *</Label>
            <Input id="email" name="email" type="email" placeholder="john@company.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company / Organisation</Label>
            <Input id="company" name="company" placeholder="Acme Corp" />
          </div>

          <div className="space-y-2">
            <Label>Service You&apos;re Interested In *</Label>
            <Select value={service} onValueChange={setService} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a service..." />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Estimated Budget</Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger>
                <SelectValue placeholder="Select a range..." />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Tell us about your project *</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              required
              minLength={10}
              placeholder="Describe the problem you're trying to solve or the workflow you'd like to automate..."
            />
          </div>

          {status === "error" ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}

          <Button type="submit" disabled={status === "loading" || !service} className="w-full sm:w-auto">
            {status === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
