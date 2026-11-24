/**
 * ───────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR AGENCY DETAILS
 *  Everything marked  // REPLACE  is placeholder content.
 *  Change it here and it updates across the whole site, schema and emails.
 * ───────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Nexora",
  legalName: "Nexora", // REPLACE: registered company name
  tagline: "We grow brands that people remember.", // REPLACE
  description:
    "Nexora is a full-service digital marketing agency for startups, D2C brands and SaaS companies — content, social media, UI/UX design and web development built to drive revenue.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_IN",

  // Used in titles/keywords like "[city] digital marketing agency"
  city: "Bengaluru", // REPLACE
  region: "Karnataka", // REPLACE
  country: "IN", // REPLACE (ISO code)
  markets: "India & the US", // REPLACE
  targetClients: "startups, D2C brands, SMBs and SaaS companies",

  contact: {
    email: "marketing.teamof2@gmail.com",
    phone: "+91 70367 94914",
    phoneHref: "+917036794914",
    whatsapp: "917036794914",
    whatsappMessage: "Hi! I'd like to discuss a project with your team.",
    address: {
      street: "Your Street Address, Floor", // REPLACE
      city: "Bengaluru",
      region: "Karnataka",
      postalCode: "560001",
      country: "IN",
    },
    hours: "Mon–Fri, 10:00–19:00 IST",
  },

  social: {
    instagram: "https://instagram.com/youragency", // REPLACE
    linkedin: "https://linkedin.com/company/youragency", // REPLACE
    x: "https://x.com/youragency", // REPLACE
    youtube: "https://youtube.com/@youragency", // REPLACE
    twitterHandle: "@youragency", // REPLACE
  },

  foundingYear: 2019, // REPLACE

  /**
   * Shows a small "Placeholder" badge on sample testimonials and case studies.
   * Set to false ONLY after replacing them with real, permission-cleared content.
   */
  showPlaceholderNotices: true,

  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
} as const;

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/** REPLACE: these numbers are placeholders — use real, verifiable figures. */
export const stats = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 3.2, suffix: "x", decimals: 1, label: "Avg. engagement growth" },
  { value: 50, suffix: "+", label: "Brands served" },
  { value: new Date().getFullYear() - 2019, suffix: "", label: "Years in business" },
] as const;

export const whatsappLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
  siteConfig.contact.whatsappMessage
)}`;
