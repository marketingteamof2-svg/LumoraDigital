/**
 * REPLACE: These are SAMPLE case studies with illustrative numbers.
 * Replace with real client work (with client permission) before launch, then set
 * `isPlaceholder: false` on each one so the "Sample" badge disappears.
 */

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  services: string[]; // service slugs
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  /** Tailwind gradient classes used for the cover until real images are added */
  coverGradient: string;
  coverImage?: string; // e.g. "/images/case-studies/brand-cover.jpg"
  results: { label: string; before: string; after: string }[];
  challenge: string[];
  approach: { heading: string; body: string }[];
  outcome: string[];
  testimonialId?: string;
  isPlaceholder: boolean;
  publishedAt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "d2c-skincare-reels-growth",
    client: "[Client: D2C Skincare Brand]",
    industry: "D2C / Beauty",
    services: ["content-creation", "social-media"],
    title: "How a D2C skincare brand turned reels into its #1 sales channel",
    metaTitle: "D2C Skincare Case Study: Reels-Led Growth",
    metaDescription:
      "How a short-form video system and community management turned Instagram into a D2C skincare brand's top-performing acquisition channel.",
    summary:
      "A reels-first content system and daily community management that turned Instagram from an afterthought into the brand's top acquisition channel.",
    coverGradient: "from-rose-400 via-fuchsia-500 to-indigo-500",
    results: [
      { label: "Monthly reach", before: "48K", after: "610K" },
      { label: "Engagement rate", before: "1.1%", after: "4.8%" },
      { label: "Revenue from social", before: "6%", after: "27%" },
    ],
    challenge: [
      "The brand had a strong product and loyal repeat customers, but its Instagram account posted sporadic product shots that rarely reached beyond existing followers. Paid acquisition costs were rising every quarter, and the team had no capacity to produce video.",
    ],
    approach: [
      {
        heading: "Customer-language research",
        body: "We analysed 1,200+ reviews and DMs to find the exact phrases customers used to describe their skin concerns, then built four content pillars around them.",
      },
      {
        heading: "Reels production system",
        body: "Monthly shoot days produced 16 reels at a time: routines, ingredient explainers, before/after stories (with consent) and founder Q&As.",
      },
      {
        heading: "Community-led conversion",
        body: "Community managers answered every comment and DM within four hours and used saved replies with tracked links to route buying questions to product pages.",
      },
    ],
    outcome: [
      "Within five months, reels became the brand's most efficient acquisition channel. The best-performing organic reels were turned into ads, cutting paid cost per purchase significantly while maintaining volume.",
    ],
    testimonialId: "t1",
    isPlaceholder: true,
    publishedAt: "2026-06-12",
  },
  {
    slug: "saas-onboarding-redesign",
    client: "[Client: B2B SaaS Platform]",
    industry: "SaaS",
    services: ["ui-ux-design", "web-development"],
    title: "Redesigning SaaS onboarding to double trial-to-paid conversion",
    metaTitle: "SaaS Onboarding Redesign Case Study",
    metaDescription:
      "UX research, a new onboarding flow and a rebuilt marketing site that helped a B2B SaaS platform double trial-to-paid conversion.",
    summary:
      "UX research, a simplified onboarding flow and a faster marketing site that removed friction at every step from first visit to first value.",
    coverGradient: "from-sky-400 via-indigo-500 to-violet-600",
    results: [
      { label: "Trial-to-paid", before: "7%", after: "15%" },
      { label: "Onboarding completion", before: "38%", after: "71%" },
      { label: "Mobile LCP", before: "4.9s", after: "1.6s" },
    ],
    challenge: [
      "Trial sign-ups were healthy, but most users never reached the product's 'aha' moment. The onboarding flow had grown to eleven steps, and the marketing site was slow and hard for the team to update.",
    ],
    approach: [
      {
        heading: "Find the friction",
        body: "Session recordings, funnel analysis and eight user interviews revealed three steps where users consistently gave up — two of which weren't needed at sign-up at all.",
      },
      {
        heading: "Prototype and test",
        body: "We prototyped a four-step onboarding flow with a pre-filled sample workspace and tested it with users before engineering started.",
      },
      {
        heading: "Rebuild the marketing site",
        body: "A new Next.js site with a headless CMS, structured data and a component library cut load times by two-thirds and let marketing ship pages without developers.",
      },
    ],
    outcome: [
      "Users reached value faster, and trial-to-paid conversion more than doubled over the following two quarters. Organic sign-ups also grew as the faster site began ranking for more commercial keywords.",
    ],
    testimonialId: "t2",
    isPlaceholder: true,
    publishedAt: "2026-04-03",
  },
  {
    slug: "saas-linkedin-pipeline",
    client: "[Client: HR-Tech Startup]",
    industry: "B2B / HR-Tech",
    services: ["content-creation", "social-media"],
    title: "Founder-led LinkedIn content that built a predictable pipeline",
    metaTitle: "Founder-Led LinkedIn Content Case Study",
    metaDescription:
      "How founder-led LinkedIn content and a weekly newsletter helped an HR-tech startup generate qualified demo requests without increasing ad spend.",
    summary:
      "A founder-led LinkedIn programme and weekly newsletter that turned expertise into inbound demo requests from the right buyers.",
    coverGradient: "from-emerald-400 via-teal-500 to-cyan-600",
    results: [
      { label: "Inbound demo requests / mo", before: "9", after: "41" },
      { label: "Newsletter subscribers", before: "0", after: "3,400" },
      { label: "Founder profile views / mo", before: "1.2K", after: "18K" },
    ],
    challenge: [
      "The startup relied on outbound sales and paid search, both of which were becoming more expensive. The founders had deep industry expertise but no time to write consistently.",
    ],
    approach: [
      {
        heading: "Interview-to-content workflow",
        body: "Two 30-minute interviews per month gave us enough raw material for 12 LinkedIn posts, 4 carousels and a weekly newsletter — all in the founders' own voice.",
      },
      {
        heading: "Targeted engagement",
        body: "We built a list of 300 ideal buyers and industry voices and engaged with their posts daily, growing a relevant, high-intent audience.",
      },
      {
        heading: "Conversion paths",
        body: "Every post linked to a useful resource or the newsletter, which in turn featured a low-pressure demo invitation.",
      },
    ],
    outcome: [
      "Within six months, LinkedIn became the company's largest source of qualified demo requests, and sales cycles shortened because prospects arrived already familiar with the founders' thinking.",
    ],
    testimonialId: "t3",
    isPlaceholder: true,
    publishedAt: "2026-02-20",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
