"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/input";
import {
  budgetOptions,
  serviceOptions,
  stepOneSchema,
  stepThreeSchema,
  stepTwoSchema,
  timelineOptions,
} from "@/lib/validation";
import { trackEvent, trackLeadConversion } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type FormState = {
  services: string[];
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState | "form", string>>;

const STEPS = ["Services", "Budget & timeline", "Your details"] as const;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

export function LeadForm({
  initialServices = [],
  idPrefix = "lead",
  className,
}: {
  initialServices?: string[];
  idPrefix?: string;
  className?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [data, setData] = useState<FormState>({
    services: initialServices.filter((s) => serviceOptions.some((o) => o.value === s)),
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
  });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const id = (name: string) => `${idPrefix}-${name}`;

  // Move focus to the step heading for screen-reader + keyboard users
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  // Optional Cloudflare Turnstile (explicit render on the final step)
  useEffect(() => {
    if (!siteKey || step !== 2 || !turnstileRef.current) return;
    let widgetId: string | undefined;
    const render = () => {
      if (window.turnstile && turnstileRef.current && !widgetId) {
        widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (t: string) => setTurnstileToken(t),
          "expired-callback": () => setTurnstileToken(""),
        });
      }
    };
    if (window.turnstile) render();
    else {
      const existing = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
      const script = existing ?? document.createElement("script");
      if (!existing) {
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.dataset.turnstile = "1";
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    }
    return () => {
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, [siteKey, step]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("lead_form_start");
    }
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleService(value: string) {
    update(
      "services",
      data.services.includes(value) ? data.services.filter((s) => s !== value) : [...data.services, value]
    );
  }

  function validateStep(s: number) {
    const schema = [stepOneSchema, stepTwoSchema, stepThreeSchema][s];
    const result = schema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: Errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof FormState;
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    // Focus the first invalid field
    const firstKey = Object.keys(next)[0];
    requestAnimationFrame(() => {
      const el = document.getElementById(id(firstKey)) ?? document.querySelector<HTMLElement>(`[data-field="${id(firstKey)}"] input`);
      el?.focus();
    });
    return false;
  }

  function validateField(key: keyof FormState) {
    const shape = stepThreeSchema.shape as Record<string, (typeof stepThreeSchema.shape)[keyof typeof stepThreeSchema.shape]>;
    const fieldSchema = shape[key];
    if (!fieldSchema) return;
    const r = fieldSchema.safeParse(data[key]);
    setErrors((e) => ({ ...e, [key]: r.success ? undefined : r.error.issues[0]?.message }));
  }

  function next() {
    if (!validateStep(step)) return;
    trackEvent("lead_form_step", { step: step + 2 });
    setStep((s) => Math.min(s + 1, 2));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 2) return next();
    if (!validateStep(2)) return;
    if (siteKey && !turnstileToken) {
      setErrors({ form: "Please complete the security check above." });
      return;
    }

    setSubmitting(true);
    setErrors({});
    const fd = new FormData(e.currentTarget);
    let utm: Record<string, string> | undefined;
    try {
      const raw = sessionStorage.getItem("utm");
      if (raw) utm = JSON.parse(raw);
    } catch {}

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: window.location.pathname + window.location.search,
          utm,
          company_fax: fd.get("company_fax"), // honeypot
          turnstileToken,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        throw new Error(json.error || "We couldn't send your request. Please try again.");
      }
      trackLeadConversion({ services: data.services, budget: data.budget });
      const first = encodeURIComponent(data.name.split(" ")[0]);
      router.push(`/thank-you?name=${first}`);
    } catch (err) {
      setErrors((e) => ({
        ...e,
        form: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      }));
      if (siteKey) window.turnstile?.reset();
      setSubmitting(false);
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form onSubmit={onSubmit} noValidate className={cn("card-base relative p-6 sm:p-8", className)} aria-label="Request a free proposal">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-muted-foreground">{STEPS[step]}</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Form progress"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
        >
          <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Honeypot — hidden from humans and assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={id("company_fax")}>Company fax</label>
        <input id={id("company_fax")} name="company_fax" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {step === 0 && (
        <fieldset>
          <legend className="sr-only">Which services do you need?</legend>
          <h3 ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold outline-none">
            What can we help you with?
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">Select all that apply.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2" data-field={id("services")}>
            {serviceOptions.map((o) => {
              const checked = data.services.includes(o.value);
              return (
                <label
                  key={o.value}
                  className={cn(
                    "relative flex min-h-[64px] cursor-pointer items-start gap-3 rounded-md border p-4 transition-all",
                    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                    checked ? "border-primary bg-primary/5" : "hover:border-foreground/30",
                    o.value === "other" && "sm:col-span-2"
                  )}
                >
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => toggleService(o.value)}
                    aria-describedby={errors.services ? id("services-error") : undefined}
                  />
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                      checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card"
                    )}
                    aria-hidden
                  >
                    {checked && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span>
                    <span className="block font-semibold">{o.label}</span>
                    <span className="block text-sm text-muted-foreground">{o.hint}</span>
                  </span>
                </label>
              );
            })}
          </div>
          <FieldError id={id("services-error")} message={errors.services} />
        </fieldset>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <h3 ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold outline-none">
            What budget and timeline are you working with?
          </h3>
          <RadioGroup
            legend="Monthly budget"
            name={id("budget")}
            options={budgetOptions}
            value={data.budget}
            onChange={(v) => update("budget", v)}
            error={errors.budget}
          />
          <RadioGroup
            legend="When would you like to start?"
            name={id("timeline")}
            options={timelineOptions}
            value={data.timeline}
            onChange={(v) => update("timeline", v)}
            error={errors.timeline}
            columns
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold outline-none">
            Where should we send your growth plan?
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" required id={id} errors={errors}>
              <Input
                id={id("name")}
                autoComplete="name"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                onBlur={() => data.name && validateField("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? id("name-error") : undefined}
                aria-required
              />
            </Field>
            <Field label="Work email" name="email" required id={id} errors={errors}>
              <Input
                id={id("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                onBlur={() => data.email && validateField("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? id("email-error") : undefined}
                aria-required
              />
            </Field>
            <Field label="Phone / WhatsApp" name="phone" required id={id} errors={errors}>
              <Input
                id={id("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                onBlur={() => data.phone && validateField("phone")}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? id("phone-error") : undefined}
                aria-required
              />
            </Field>
            <Field label="Company / brand" name="company" required id={id} errors={errors}>
              <Input
                id={id("company")}
                autoComplete="organization"
                value={data.company}
                onChange={(e) => update("company", e.target.value)}
                onBlur={() => data.company && validateField("company")}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? id("company-error") : undefined}
                aria-required
              />
            </Field>
            <Field label="Website (optional)" name="website" id={id} errors={errors} className="sm:col-span-2">
              <Input
                id={id("website")}
                inputMode="url"
                autoComplete="url"
                placeholder="yourbrand.com"
                value={data.website}
                onChange={(e) => update("website", e.target.value)}
                onBlur={() => data.website && validateField("website")}
                aria-invalid={!!errors.website}
                aria-describedby={errors.website ? id("website-error") : undefined}
              />
            </Field>
            <Field label="Tell us about your goals (optional)" name="message" id={id} errors={errors} className="sm:col-span-2">
              <Textarea
                id={id("message")}
                placeholder="E.g. We want to double our Instagram leads before our product launch in March."
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? id("message-error") : undefined}
              />
            </Field>
          </div>
          {siteKey && <div ref={turnstileRef} className="mt-4" />}
        </div>
      )}

      {errors.form && (
        <p role="alert" className="mt-5 rounded-md bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {errors.form}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={submitting}>
            <ArrowLeft aria-hidden /> Back
          </Button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <Button type="button" onClick={next}>
            Continue <ArrowRight aria-hidden />
          </Button>
        ) : (
          <Button type="submit" disabled={submitting} className="min-w-[200px]">
            {submitting ? (
              <>
                <Loader2 className="animate-spin" aria-hidden /> Sending…
              </>
            ) : (
              <>
                Get my free growth plan <ArrowRight aria-hidden />
              </>
            )}
          </Button>
        )}
      </div>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5" aria-hidden /> No spam. We reply within one business day.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  id,
  errors,
  className,
  children,
}: {
  label: string;
  name: keyof FormState;
  required?: boolean;
  id: (n: string) => string;
  errors: Errors;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id(name)}>
        {label}
        {required && (
          <span className="text-destructive" aria-hidden>
            {" "}
            *
          </span>
        )}
      </Label>
      {children}
      <FieldError id={id(`${name}-error`)} message={errors[name]} />
    </div>
  );
}

function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  columns,
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  columns?: boolean;
}) {
  return (
    <fieldset data-field={name} aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-3 text-sm font-semibold">
        {legend} <span className="text-destructive" aria-hidden>*</span>
      </legend>
      <div className={cn("grid gap-2", columns && "sm:grid-cols-2")}>
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "flex min-h-[48px] cursor-pointer items-center gap-3 rounded-md border px-4 py-2 text-sm transition-colors",
              "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
              value === o.value ? "border-primary bg-primary/5 font-semibold" : "hover:border-foreground/30"
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="h-4 w-4 accent-[hsl(var(--primary))]"
            />
            {o.label}
          </label>
        ))}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}
