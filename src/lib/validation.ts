import { z } from "zod";

export const serviceOptions = [
  { value: "content-creation", label: "Content Creation", hint: "Reels, video, graphics, copy" },
  { value: "social-media", label: "Social Media Management", hint: "Posting, engagement, growth" },
  { value: "ui-ux-design", label: "UI/UX Design", hint: "Websites, apps, product design" },
  { value: "web-development", label: "Web Development", hint: "Websites & web applications" },
  { value: "other", label: "Not sure yet", hint: "Help me figure it out" },
] as const;

export const budgetOptions = [
  { value: "under-50k", label: "Under ₹50K / $600 per month" },
  { value: "50k-1l", label: "₹50K–₹1L / $600–$1,200 per month" },
  { value: "1l-3l", label: "₹1L–₹3L / $1,200–$3,600 per month" },
  { value: "3l-plus", label: "₹3L+ / $3,600+ per month" },
  { value: "project", label: "One-time project" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const leadStatuses = ["new", "contacted", "proposal_sent", "won", "lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  proposal_sent: "Proposal Sent",
  won: "Won",
  lost: "Lost",
};

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];
const budgetValues = budgetOptions.map((o) => o.value) as [string, ...string[]];
const timelineValues = timelineOptions.map((o) => o.value) as [string, ...string[]];

export const stepOneSchema = z.object({
  services: z.array(z.enum(serviceValues)).min(1, "Pick at least one service so we can route you to the right expert."),
});

export const stepTwoSchema = z.object({
  budget: z.enum(budgetValues, { errorMap: () => ({ message: "Please choose a budget range." }) }),
  timeline: z.enum(timelineValues, { errorMap: () => ({ message: "Please choose a timeline." }) }),
});

const optionalUrl = z
  .string()
  .trim()
  .max(200)
  .optional()
  .or(z.literal(""))
  .refine((v) => !v || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v), "Enter a valid website, e.g. yourbrand.com");

export const stepThreeSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address, e.g. you@company.com").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone or WhatsApp number with country code.")
    .max(20)
    .regex(/^\+?[\d\s()-]{7,20}$/, "Use digits only, e.g. +91 98765 43210"),
  company: z.string().trim().min(1, "Please enter your company or brand name.").max(120),
  website: optionalUrl,
  message: z.string().trim().max(2000, "Please keep your message under 2,000 characters.").optional().or(z.literal("")),
});

export const leadSchema = stepOneSchema.merge(stepTwoSchema).merge(stepThreeSchema).extend({
  source: z.string().max(200).optional(),
  utm: z.record(z.string().max(200)).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export function labelFor<T extends readonly { value: string; label: string }[]>(options: T, value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}
