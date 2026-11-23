import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { getDb } from "@/lib/supabase";
import { sendLeadEmails } from "@/lib/email";

export const runtime = "nodejs";

async function verifyTurnstile(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not enabled
  if (typeof token !== "string" || !token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);

  const limit = rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a few minutes or contact us on WhatsApp." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success so they don't retry.
  if (typeof body.company_fax === "string" && body.company_fax.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return NextResponse.json({ error: "Security check failed. Please refresh and try again." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  const lead = parsed.data;
  const db = getDb();

  if (db) {
    const { error } = await db.from("leads").insert({
      name: lead.name,
      email: lead.email.toLowerCase(),
      phone: lead.phone,
      company: lead.company,
      website: lead.website || null,
      services: lead.services,
      budget: lead.budget,
      timeline: lead.timeline,
      message: lead.message || null,
      source: lead.source || null,
      utm: lead.utm || null,
      status: "new",
    });
    if (error) {
      console.error("[leads] DB insert failed:", error.message);
      // Still try to email so the lead isn't lost
      await sendLeadEmails(lead);
      return NextResponse.json({ ok: true, stored: false });
    }
  } else {
    console.warn("[leads] Supabase not configured — lead not stored. Configure SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.");
  }

  await sendLeadEmails(lead);
  return NextResponse.json({ ok: true });
}
