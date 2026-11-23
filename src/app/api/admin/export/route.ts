import { getDb, type LeadRow } from "@/lib/supabase";
import { budgetOptions, labelFor, leadStatusLabels, serviceOptions, timelineOptions } from "@/lib/validation";

// Protected by middleware (src/middleware.ts).

function csvCell(value: unknown) {
  let s = value == null ? "" : String(value);
  // Prevent CSV/formula injection when opened in Excel/Sheets
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  const db = getDb();
  if (!db) return new Response("Database not configured", { status: 500 });

  const status = new URL(req.url).searchParams.get("status");
  let query = db.from("leads").select("*").order("created_at", { ascending: false }).limit(10000);
  if (status && status !== "all") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return new Response(error.message, { status: 500 });

  const headers = ["Date", "Name", "Email", "Phone", "Company", "Website", "Services", "Budget", "Timeline", "Message", "Status", "Notes", "Source", "UTM"];
  const rows = (data as LeadRow[]).map((l) =>
    [
      new Date(l.created_at).toISOString(),
      l.name,
      l.email,
      l.phone,
      l.company,
      l.website,
      l.services.map((s) => labelFor(serviceOptions, s)).join("; "),
      labelFor(budgetOptions, l.budget),
      labelFor(timelineOptions, l.timeline),
      l.message,
      leadStatusLabels[l.status] ?? l.status,
      l.notes,
      l.source,
      l.utm ? JSON.stringify(l.utm) : "",
    ]
      .map(csvCell)
      .join(",")
  );

  const csv = "﻿" + [headers.map(csvCell).join(","), ...rows].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
