import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Download, LogOut } from "lucide-react";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { getDb, isDbConfigured, type LeadRow } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { LeadsTable } from "./leads-table";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Defense in depth: middleware already guards this route.
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifySessionToken(token))) redirect("/admin/login");

  let leads: LeadRow[] = [];
  let error: string | null = null;
  const db = getDb();
  if (db) {
    const res = await db.from("leads").select("*").order("created_at", { ascending: false }).limit(1000);
    if (res.error) error = res.error.message;
    else leads = res.data as LeadRow[];
  }

  return (
    <div className="container py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{siteConfig.name}</p>
          <h1 className="text-2xl font-bold">Leads</h1>
        </div>
        <div className="flex gap-2">
          <a
            href="/api/admin/export"
            className="inline-flex h-11 items-center gap-2 rounded-full border bg-card px-4 text-sm font-semibold hover:bg-muted"
          >
            <Download className="h-4 w-4" aria-hidden /> Export CSV
          </a>
          <form action="/api/admin/logout" method="post">
            <button className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold hover:bg-muted">
              <LogOut className="h-4 w-4" aria-hidden /> Log out
            </button>
          </form>
        </div>
      </header>

      {!isDbConfigured() && (
        <p className="mt-6 rounded-md bg-amber-100 p-4 text-sm text-amber-900">
          Supabase isn&apos;t configured. Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> and run{" "}
          <code>supabase/schema.sql</code> to start storing leads.
        </p>
      )}
      {error && <p className="mt-6 rounded-md bg-destructive/10 p-4 text-sm text-destructive">Error loading leads: {error}</p>}

      <LeadsTable initialLeads={leads} />
    </div>
  );
}
