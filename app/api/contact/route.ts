import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validation/contact";

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
