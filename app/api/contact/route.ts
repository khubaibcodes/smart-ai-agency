import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validation/contact";

/** Requests allowed per IP inside the window. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/**
 * In-memory rate limiter.
 *
 * Caveat worth knowing: on serverless this is per-instance and resets on cold
 * start, so it throttles a naive flood but is not a hard guarantee. A real
 * limit needs shared state (Upstash/Redis or Vercel KV). This is the cheap 80%
 * — previously the endpoint had nothing at all.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

/** Drop expired entries so the map can't grow without bound on a warm instance. */
function sweep() {
  const now = Date.now();
  for (const [ip, entry] of hits) {
    if (now > entry.resetAt) hits.delete(ip);
  }
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: a field hidden from humans via CSS and marked aria-hidden.
    // Anything that fills it is automated. Return 200 so the bot logs a
    // success and doesn't retry with a different strategy.
    if (typeof body?.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    sweep();
    if (isRateLimited(clientIp(request))) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again shortly, or email us directly." },
        { status: 429 },
      );
    }

    const validation = validateContactPayload(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: "Contact service is not configured. Please email us directly." },
        { status: 503 },
      );
    }

    const { data } = validation;
    const { error } = await supabase.from("contact_submissions").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      company: data.company || null,
      service: data.service,
      budget: data.budget || null,
      message: data.message,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Unable to save your message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
