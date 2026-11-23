import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/supabase";
import { leadStatuses } from "@/lib/validation";

// Protected by middleware (src/middleware.ts) — requires a valid admin session cookie.

const patchSchema = z.object({
  status: z.enum(leadStatuses).optional(),
  notes: z.string().max(5000).optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const parsed = patchSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: "Invalid update" }, { status: 422 });
  }

  const db = getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });

  const { error } = await db.from("leads").update(parsed.data).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
