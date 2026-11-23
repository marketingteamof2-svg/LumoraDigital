# What to replace before launch

Everything below is placeholder or sample content. Most of it is in a few files.

## 1. Agency details: `src/config/site.ts`
- [ ] Agency name, legal name and tagline (currently the sample name **"Lumora Digital"**)
- [ ] City and region (currently **Bengaluru**). These feed the "[city] digital marketing agency" title, schema and copy.
- [ ] Email, phone (display and `tel:` formats), WhatsApp number, office address and hours
- [ ] Social profile URLs and X/Twitter handle
- [ ] Founding year
- [ ] **Stats** (120+ projects, 3.2x engagement, 50+ brands, years). Use real, verifiable numbers only.
- [ ] Set `showPlaceholderNotices: false` **only after** the testimonials and case studies below are real

## 2. Brand assets
- [ ] Logo: `src/components/layout/logo.tsx` (inline SVG mark and wordmark) and `src/app/icon.svg` (favicon)
- [ ] Colours: CSS variables in `src/app/globals.css` (`--primary`, `--accent`, light and dark)
- [ ] OG image design (optional): `src/lib/og.tsx`

## 3. Social proof (needs client permission)
- [ ] **Client logos:** `src/components/sections/logo-strip.tsx`. Add SVGs to `/public/logos/`.
- [ ] **Testimonials:** `src/content/testimonials.ts`. Use real quotes, names, roles and companies, plus optional photos in `/public/images/testimonials/`. Set `isPlaceholder: false`. Review/AggregateRating schema turns on automatically once **all** testimonials are real.
- [ ] **Case studies:** `src/content/case-studies.ts`. Use real clients, real numbers and cover images (`coverImage`). Set `isPlaceholder: false`.
- [ ] Hero trust line ("Trusted by 50+ brands"): `src/components/sections/hero.tsx`

## 4. Copy and offers
- [ ] **Pricing** (₹45K / ₹95K / Custom): `src/content/home.ts → pricingPlans`. You can also remove the prices and keep "Get custom quote".
- [ ] Budget ranges in the form: `src/lib/validation.ts → budgetOptions`
- [ ] Exit-intent offer ("free audit worth ₹15,000"): `src/components/layout/exit-intent.tsx`
- [ ] About page story, values and **team members and photos**: `src/app/(site)/about/page.tsx`
- [ ] Review service copy and FAQs so they match what you actually offer: `src/content/services.ts`
- [ ] Home FAQs: `src/content/home.ts → homeFaqs`
- [ ] Blog posts: `content/blog/*.mdx`. Edit the authors and add your own posts.

## 5. Legal
- [ ] Privacy Policy and Terms: `src/app/(site)/privacy` and `src/app/(site)/terms`. Fill in `[DATE]` and have a lawyer review them.

## 6. Accounts and keys (`.env.local` / Vercel)
- [ ] Supabase project and run `supabase/schema.sql`
- [ ] Resend API key and verified sending domain
- [ ] Cal.com or Calendly booking link
- [ ] GA4 ID, Meta Pixel ID (and Turnstile keys if you want a captcha)
- [ ] Strong `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`
- [ ] `NEXT_PUBLIC_SITE_URL` set to your real domain
