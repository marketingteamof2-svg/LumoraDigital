# Agency Website: Lead Generation Site

This is a fast, SEO-optimized lead generation website for a digital marketing agency. It's built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, shadcn-style components and **Framer Motion**. Leads are stored in **Supabase**, and **Resend** sends the email notifications.

> All agency details (name, contact, city, socials, stats) live in **`src/config/site.ts`**. See **[REPLACE-ME.md](./REPLACE-ME.md)** for everything you need to swap before launch.

## Features

- **Pages:** Home, Services overview and 4 service pages, Case studies (grid and detail), About, Blog (MDX), Contact, Thank-you (with a Cal.com/Calendly embed), Privacy, Terms, 404, and an Admin page.
- **Lead capture:**
  - 3-step form (services → budget/timeline → details) with inline validation, a progress bar and focus management
  - Spam protection with a honeypot, per-IP rate limiting and optional Cloudflare Turnstile
  - Each lead is saved to Supabase. The agency gets an email alert and the lead gets an auto-reply.
  - After submitting, the visitor lands on the Thank-you page with a booking calendar
  - Floating WhatsApp button, sticky mobile CTA bar, exit-intent popup (free audit offer, desktop only, once per session)
  - First-touch UTM / referrer capture, saved with each lead
  - GA4 `generate_lead` and Meta Pixel `Lead` conversion events, plus CTA, call, WhatsApp and form-step events
- **Admin (`/admin`):**
  - Password protected (HMAC-signed httpOnly cookie, middleware-guarded)
  - Lead list with status (New / Contacted / Proposal Sent / Won / Lost), filters, search and internal notes
  - CSV export (Excel-safe)
- **SEO:**
  - Every page has its own title and meta description, and one H1
  - Canonical URLs, Open Graph and Twitter cards with generated OG images
  - `sitemap.xml` and `robots.txt`
  - JSON-LD for Organization, ProfessionalService (LocalBusiness), WebSite, Service, FAQPage, BreadcrumbList and Article
  - Review/AggregateRating schema is added **only** once every testimonial is marked real
- **UX / a11y:**
  - Light theme by default, with a dark-mode toggle
  - Fluid type and 8px spacing; tap targets of at least 44px
  - Skip link, visible focus states and ARIA labels; zoom is allowed
  - Animations respect `prefers-reduced-motion`

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

The site runs **without any keys**. Leads are validated and logged to the console, and emails are skipped with a warning. Add keys as you go.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ✅ prod | Canonical domain, e.g. `https://www.youragency.com` |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | ✅ prod | Lead + newsletter storage (server-only key) |
| `RESEND_API_KEY` / `EMAIL_FROM` | ✅ prod | Lead alert + auto-reply emails. `EMAIL_FROM` must use a domain verified in Resend |
| `LEAD_NOTIFICATION_EMAIL` | ✅ prod | Who receives new-lead alerts (comma-separated) |
| `NEXT_PUBLIC_BOOKING_URL` | recommended | Cal.com or Calendly link embedded on `/thank-you` |
| `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` | ✅ for admin | Admin login + cookie signing (use long random values) |
| `NEXT_PUBLIC_GA_ID` | optional | GA4 measurement ID (`G-…`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | optional | Meta Pixel ID |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | optional | Cloudflare Turnstile captcha on the lead form |

## Setting up services

### Supabase (database)
1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) and run it.
3. Go to **Project Settings → API**, then copy the **Project URL** into `SUPABASE_URL` and the **service_role** key into `SUPABASE_SERVICE_ROLE_KEY`.
   RLS is enabled with no public policies, so the tables are only reachable from the server.

### Resend (email)
1. Create an account at [resend.com](https://resend.com) and **verify your sending domain** (add the DNS records it gives you).
2. Create an API key and put it in `RESEND_API_KEY`.
3. Set `EMAIL_FROM`, e.g. `"Your Agency <hello@youragency.com>"`.

### Booking calendar
Paste your Cal.com (`https://cal.com/you/discovery-call`) or Calendly (`https://calendly.com/you/30min`) link into `NEXT_PUBLIC_BOOKING_URL`. The Thank-you page embeds it automatically.

### Analytics and conversions
- **GA4:** set `NEXT_PUBLIC_GA_ID`. Then, in GA4 → Admin → Events, mark `generate_lead` as a **key event**.
- **Meta Pixel:** set `NEXT_PUBLIC_META_PIXEL_ID`. The standard `Lead` event fires on every successful form submission.
- Other custom events: `cta_click`, `click_call`, `click_whatsapp`, `lead_form_start`, `lead_form_step`, `exit_intent_shown`, `exit_intent_click`, `newsletter_signup`.
- If you serve EU/UK visitors, add a cookie-consent banner before loading these scripts.

## Deploy to Vercel

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. In [vercel.com/new](https://vercel.com/new), import the repo. The framework is auto-detected as Next.js.
3. Add every variable from `.env.example` under **Settings → Environment Variables**, and set `NEXT_PUBLIC_SITE_URL` to your production domain.
4. Deploy, then add your custom domain under **Settings → Domains**.
5. After go-live:
   - Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
   - Test a form submission end-to-end (database row, both emails, redirect, GA4 DebugView).
   - Run Lighthouse / PageSpeed Insights on the home, a service page and the contact page.

## Project structure

```
content/blog/*.mdx          Blog posts (frontmatter + MDX)
supabase/schema.sql         Database tables
src/
  app/
    (site)/                 Public pages (share header/footer layout)
    admin/                  Password-protected lead dashboard
    api/leads               Lead submission endpoint
    api/newsletter          Newsletter signup
    api/admin/*             Admin login/logout, lead update, CSV export
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/
    ui/                     Button, Input, Badge, Accordion, icons
    layout/                 Header, Footer, floating CTAs, exit-intent, theme
    sections/               Hero, services grid, stats, testimonials, FAQ, CTA bands…
    forms/                  Multi-step lead form, newsletter form
  config/site.ts            ⭐ Agency details & stats: edit this first
  content/                  Services (800+ words each), case studies, testimonials, home copy
  lib/                      SEO, JSON-LD schema, validation, email, DB, auth, rate limit
  middleware.ts             Protects /admin and /api/admin
```

## Common tasks

- **Add a service:** add an object to `src/content/services.ts`. The page, sitemap entry, schema, nav and footer links are generated automatically. Add the same slug to `serviceOptions` in `src/lib/validation.ts` so it appears in the form.
- **Add a case study:** add an object to `src/content/case-studies.ts`. Put the cover image in `/public/images/case-studies/` and set `coverImage`.
- **Write a blog post:** add `content/blog/my-post.mdx` with the same frontmatter fields as the existing posts.
- **Move the blog to a CMS:** re-implement `getAllPosts()` and `getPost()` in `src/lib/blog.ts`. The templates don't need to change.
- **Change colours:** edit the CSS variables in `src/app/globals.css` (`--primary`, `--accent`, …), in both the light and `.dark` blocks.
- **Change fonts:** edit `src/app/layout.tsx` (currently Bricolage Grotesque for display and Inter for body).

## Notes and limitations

- **Rate limiting** is in-memory per server instance. That's fine for most agency traffic, but on Vercel each instance has its own memory. For strict limits, swap `src/lib/rate-limit.ts` for [`@upstash/ratelimit`](https://github.com/upstash/ratelimit) or turn on Turnstile.
- **Admin auth** is a single shared password, which suits a small team. For per-user logins, move to Supabase Auth.
- `/contact` and `/thank-you` are server-rendered on demand because they read query params. Every other marketing page is statically generated.
- **Legal pages** are starting templates, not legal advice. Have them reviewed (e.g. for India's DPDP Act 2023 and US state privacy laws).
