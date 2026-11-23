"use client";

import { Fragment, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { LeadRow } from "@/lib/supabase";
import {
  budgetOptions,
  labelFor,
  leadStatuses,
  leadStatusLabels,
  serviceOptions,
  timelineOptions,
  type LeadStatus,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-sky-100 text-sky-900 dark:bg-sky-400/15 dark:text-sky-200",
  proposal_sent: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200",
  won: "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-200",
  lost: "bg-muted text-muted-foreground",
};

export function LeadsTable({ initialLeads }: { initialLeads: LeadRow[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length };
    leads.forEach((l) => (c[l.status] = (c[l.status] || 0) + 1));
    return c;
  }, [leads]);

  const visible = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (!q) return true;
    const hay = `${l.name} ${l.email} ${l.company} ${l.phone}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  async function patch(id: string, body: Partial<Pick<LeadRow, "status" | "notes">>) {
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...body } : l)));
    setSaving(id);
    setError("");
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(null);
    if (!res.ok) {
      setLeads(prev);
      setError("Couldn't save the change. Please try again.");
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
          {(["all", ...leadStatuses] as const).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={filter === s}
              onClick={() => setFilter(s)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium",
                filter === s ? "border-foreground bg-foreground text-background" : "bg-card hover:bg-muted"
              )}
            >
              {s === "all" ? "All" : leadStatusLabels[s]}
              <span className="text-xs opacity-70">{counts[s] || 0}</span>
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Search leads</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, company…"
            className="h-10 w-full rounded-full border bg-card pl-9 pr-4 text-sm"
          />
        </label>
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="card-base mt-6 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Lead</th>
              <th className="px-4 py-3 font-semibold">Services</th>
              <th className="px-4 py-3 font-semibold">Budget</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3"><span className="sr-only">Details</span></th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  No leads {filter !== "all" ? `with status “${leadStatusLabels[filter]}”` : "yet"}.
                </td>
              </tr>
            )}
            {visible.map((l) => (
              <Fragment key={l.id}>
                <tr className="border-b last:border-0 hover:bg-muted/30">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {new Date(l.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{l.name}</div>
                    <div className="text-muted-foreground">{l.company}</div>
                    <div className="mt-1 flex flex-wrap gap-x-3 text-xs">
                      <a href={`mailto:${l.email}`} className="text-primary hover:underline">{l.email}</a>
                      <a href={`https://wa.me/${l.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {l.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">{l.services.map((s) => labelFor(serviceOptions, s)).join(", ")}</td>
                  <td className="px-4 py-3">{labelFor(budgetOptions, l.budget)}</td>
                  <td className="px-4 py-3">
                    <label className="sr-only" htmlFor={`status-${l.id}`}>Status for {l.name}</label>
                    <select
                      id={`status-${l.id}`}
                      value={l.status}
                      onChange={(e) => patch(l.id, { status: e.target.value as LeadStatus })}
                      disabled={saving === l.id}
                      className={cn("h-9 rounded-full border-0 px-3 text-xs font-semibold", statusStyles[l.status])}
                    >
                      {leadStatuses.map((s) => (
                        <option key={s} value={s}>{leadStatusLabels[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setExpanded(expanded === l.id ? null : l.id)}
                      aria-expanded={expanded === l.id}
                      aria-label={`Toggle details for ${l.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
                    >
                      <ChevronDown className={cn("h-4 w-4 transition-transform", expanded === l.id && "rotate-180")} aria-hidden />
                    </button>
                  </td>
                </tr>
                {expanded === l.id && (
                  <tr className="border-b bg-muted/20">
                    <td colSpan={6} className="px-4 py-5">
                      <div className="grid gap-6 md:grid-cols-2">
                        <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-2">
                          <dt className="text-muted-foreground">Timeline</dt>
                          <dd>{labelFor(timelineOptions, l.timeline)}</dd>
                          <dt className="text-muted-foreground">Website</dt>
                          <dd>{l.website || "—"}</dd>
                          <dt className="text-muted-foreground">Source</dt>
                          <dd>{l.source || "—"}</dd>
                          <dt className="text-muted-foreground">UTM</dt>
                          <dd className="break-all">{l.utm ? Object.entries(l.utm).map(([k, v]) => `${k}=${v}`).join(", ") : "—"}</dd>
                          <dt className="text-muted-foreground">Message</dt>
                          <dd className="whitespace-pre-wrap">{l.message || "—"}</dd>
                        </dl>
                        <div>
                          <label htmlFor={`notes-${l.id}`} className="mb-2 block font-medium">Internal notes</label>
                          <textarea
                            id={`notes-${l.id}`}
                            defaultValue={l.notes ?? ""}
                            onBlur={(e) => e.target.value !== (l.notes ?? "") && patch(l.id, { notes: e.target.value })}
                            className="min-h-[120px] w-full rounded-md border bg-card p-3"
                            placeholder="Call notes, next steps… (saves when you click away)"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
