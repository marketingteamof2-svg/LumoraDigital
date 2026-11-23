import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { getDb } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  if (!rateLimit(`newsletter:${ip}`, 5, 10 * 60 * 1000).ok) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  if (body.nickname) return NextResponse.json({ ok: true }); // honeypot

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 422 });
  }

  const db = getDb();
  if (db) {
    const { error } = await db
      .from("newsletter_subscribers")
      .upsert({ email: parsed.data.email.toLowerCase() }, { onConflict: "email", ignoreDuplicates: true });
    if (error) {
      console.error("[newsletter] insert failed:", error.message);
      return NextResponse.json({ error: "Couldn't subscribe right now. Please try again." }, { status: 500 });
    }
  }
  // Optional: also add the contact to a Resend audience or your ESP here.
  return NextResponse.json({ ok: true });
}
