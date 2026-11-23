import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { LeadStatus } from "@/lib/validation";

let client: SupabaseClient | null = null;

export function isDbConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Server-only Supabase client using the service role key (bypasses RLS). */
export function getDb() {
  if (!isDbConfigured()) return null;
  if (!client) {
    client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  }
  return client;
}

export type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string | null;
  services: string[];
  budget: string;
  timeline: string;
  message: string | null;
  source: string | null;
  utm: Record<string, string> | null;
  status: LeadStatus;
  notes: string | null;
};
