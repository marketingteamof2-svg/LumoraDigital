/**
 * REPLACE: These are SAMPLE case studies. The company names are fictional and the
 * numbers are illustrative. Replace them with real client work (with client
 * permission) before launch, then set `isPlaceholder: false` on each one so the
 * "Sample" badge disappears.
 */

export type CaseStudy = {
  slug: string;
  client: string;
  /** City and country, shown on cards and the case study page */
  location: string;
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
    client: "Glowveda Skincare",
    location: "Mumbai, India",
    industry: "D2C / Beauty",
    services: ["content-creation", "social-media"],
    title: "How Glowveda turned Instagram reels into its #1 sales channel",
    metaTitle: "Glowveda Case Study: Reels-Led D2C Growth",
    metaDescription:
      "How a short-form video system and community management turned Instagram into Glowveda Skincare's top-performing acquisition channel.",
    summary:
      "A reels-first content system and daily community management that turned Instagram from an afterthought into Glowveda's top acquisition channel.",
    coverGradient: "from-rose-400 via-fuchsia-500 to-indigo-500",
    results: [
      { label: "Monthly reach", before: "48K", after: "610K" },
      { label: "Engagement rate", before: "1.1%", after: "4.8%" },
      { label: "Revenue from social", before: "6%", after: "27%" },
    ],
    challenge: [
      "Glowveda had a strong product and loyal repeat customers, but its Instagram account posted sporadic product shots that rarely reached beyond existing followers. Paid acquisition costs were rising every quarter, and the team had no capacity to produce video.",
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
      "Within five months, reels became Glowveda's most efficient acquisition channel. The best-performing organic reels were turned into ads, cutting paid cost per purchase significantly while maintaining volume.",
    ],
    testimonialId: "t1",
    isPlaceholder: true,
    publishedAt: "2026-06-12",
  },
  {
    slug: "saas-onboarding-redesign",
    client: "Ledgerly",
    location: "Bengaluru, India",
    industry: "SaaS / Fintech",
    services: ["ui-ux-design", "web-development"],
    title: "Redesigning Ledgerly's onboarding to double trial-to-paid conversion",
    metaTitle: "Ledgerly Case Study: SaaS Onboarding Redesign",
    metaDescription:
      "UX research, a new onboarding flow and a rebuilt marketing site that helped Ledgerly, a B2B accounting platform, double trial-to-paid conversion.",
    summary:
      "UX research, a simplified onboarding flow and a faster marketing site that removed friction at every step from first visit to first value.",
    coverGradient: "from-sky-400 via-indigo-500 to-violet-600",
    results: [
      { label: "Trial-to-paid", before: "7%", after: "15%" },
      { label: "Onboarding completion", before: "38%", after: "71%" },
      { label: "Mobile LCP", before: "4.9s", after: "1.6s" },
    ],
    challenge: [
      "Ledgerly's trial sign-ups were healthy, but most users never reached the product's 'aha' moment. The onboarding flow had grown to eleven steps, and the marketing site was slow and hard for the team to update.",
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
    client: "TalentLoop",
    location: "Gurugram, India",
    industry: "B2B / HR-Tech",
    services: ["content-creation", "social-media"],
    title: "Founder-led LinkedIn content that built TalentLoop a predictable pipeline",
    metaTitle: "TalentLoop Case Study: Founder-Led LinkedIn Content",
    metaDescription:
      "How founder-led LinkedIn content and a weekly newsletter helped TalentLoop, an HR-tech startup, generate qualified demo requests without increasing ad spend.",
    summary:
      "A founder-led LinkedIn programme and weekly newsletter that turned expertise into inbound demo requests from the right buyers.",
    coverGradient: "from-emerald-400 via-teal-500 to-cyan-600",
    results: [
      { label: "Inbound demo requests / mo", before: "9", after: "41" },
      { label: "Newsletter subscribers", before: "0", after: "3,400" },
      { label: "Founder profile views / mo", before: "1.2K", after: "18K" },
    ],
    challenge: [
      "TalentLoop relied on outbound sales and paid search, both of which were becoming more expensive. The founders had deep industry expertise but no time to write consistently.",
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
      "Within six months, LinkedIn became TalentLoop's largest source of qualified demo requests, and sales cycles shortened because prospects arrived already familiar with the founders' thinking.",
    ],
    testimonialId: "t3",
    isPlaceholder: true,
    publishedAt: "2026-02-20",
  },
  {
    slug: "yoga-studio-hyderabad",
    client: "Arvin Yoga",
    location: "Hyderabad, India",
    industry: "Wellness / Yoga",
    services: ["social-media", "content-creation", "web-development"],
    title: "How Arvin Yoga grew its studio and online classes across Hyderabad",
    metaTitle: "Arvin Yoga Case Study: Yoga Studio Growth in Hyderabad",
    metaDescription:
      "How calming reels, a simple class-booking website and online batches helped Hyderabad yoga studio Arvin Yoga grow memberships in the studio and online.",
    summary:
      "Calm, practical yoga content, an easy class-booking website and live online batches that brought new students into the studio and reached learners beyond Hyderabad.",
    coverGradient: "from-orange-300 via-rose-400 to-purple-500",
    results: [
      { label: "Monthly members", before: "85", after: "310" },
      { label: "Trial class bookings / mo", before: "20", after: "140" },
      { label: "Online students", before: "0", after: "450" },
    ],
    challenge: [
      "Arvin Yoga had experienced teachers and loyal regular students, but almost all new members came through word of mouth. Bookings were handled over phone calls and WhatsApp, and the studio had no way to reach people who couldn't attend classes in person.",
    ],
    approach: [
      {
        heading: "Content that feels like the studio",
        body: "We filmed short reels of breathing techniques, beginner poses, morning routines and student stories, in English and Telugu, so people could see what a class at Arvin Yoga feels like.",
      },
      {
        heading: "Book a class in seconds",
        body: "A new mobile-first website lists every batch and teacher, with a free trial class, online booking and UPI payments, plus automatic WhatsApp reminders before each class.",
      },
      {
        heading: "Take classes online",
        body: "We launched live online morning and evening batches and promoted them to people across India and to Indians living abroad who wanted a teacher they could trust.",
      },
    ],
    outcome: [
      "Monthly memberships grew more than threefold in six months. Morning batches at the studio now run at full capacity, and the online batches have become a second income stream that reaches students far beyond Hyderabad.",
    ],
    testimonialId: "t13",
    isPlaceholder: true,
    publishedAt: "2026-11-10",
  },

  // ---------- Australia ----------
  {
    slug: "swimwear-ugc-social-growth",
    client: "Saltbush Swimwear",
    location: "Byron Bay, Australia",
    industry: "D2C / Fashion",
    services: ["content-creation", "social-media"],
    title: "How Saltbush Swimwear made summer sales last all year with creator content",
    metaTitle: "Saltbush Swimwear Case Study: Creator-Led Social Growth",
    metaDescription:
      "How a creator content programme and always-on social strategy helped Australian swimwear brand Saltbush grow revenue from social and smooth out seasonal sales.",
    summary:
      "A network of 40 local creators, a year-round content calendar and shoppable posts that turned a seasonal swimwear brand into a year-round seller.",
    coverGradient: "from-teal-300 via-cyan-500 to-blue-600",
    results: [
      { label: "Revenue from social", before: "9%", after: "31%" },
      { label: "Off-season monthly sales", before: "A$38K", after: "A$112K" },
      { label: "Creator videos / mo", before: "2", after: "45" },
    ],
    challenge: [
      "Saltbush made more than 70% of its revenue between November and February. Outside summer, its social accounts went quiet, and paid ads were too expensive to keep sales steady through the cooler months.",
    ],
    approach: [
      {
        heading: "Build a creator network",
        body: "We recruited 40 creators along the east coast and set up a simple gifting and affiliate programme, giving the brand a steady flow of authentic try-on videos.",
      },
      {
        heading: "Sell beyond summer",
        body: "We planned content around travel, resort holidays and Northern Hemisphere summer, and introduced cover-ups and activewear stories for the cooler months.",
      },
      {
        heading: "Shoppable everything",
        body: "Every post and reel was tagged to products with Afterpay messaging, and the best creator videos were turned into always-on ads.",
      },
    ],
    outcome: [
      "Off-season sales nearly tripled and social became Saltbush's largest revenue channel. The business now has steady cash flow all year instead of relying on four busy months.",
    ],
    testimonialId: "t7",
    isPlaceholder: true,
    publishedAt: "2026-07-14",
  },
  {
    slug: "physio-clinic-online-booking",
    client: "Harbourline Physio",
    location: "Sydney, Australia",
    industry: "Healthcare / Clinics",
    services: ["web-development", "ui-ux-design"],
    title: "A new website and online booking that filled Harbourline Physio's diary",
    metaTitle: "Harbourline Physio Case Study: Clinic Website & Online Booking",
    metaDescription:
      "How a faster, locally optimised website with real-time online booking helped Sydney clinic group Harbourline Physio increase new patient bookings.",
    summary:
      "A fast, mobile-first website for four clinics, with real-time online booking and local search pages for every suburb they serve.",
    coverGradient: "from-sky-300 via-blue-500 to-indigo-600",
    results: [
      { label: "New patient bookings / mo", before: "140", after: "390" },
      { label: "Bookings made online", before: "12%", after: "64%" },
      { label: "Google Maps calls & visits / mo", before: "310", after: "980" },
    ],
    challenge: [
      "Harbourline's four clinics took almost every booking by phone, so reception was overloaded and calls after hours went unanswered. The old website was slow and didn't show up when people searched for a physio nearby.",
    ],
    approach: [
      {
        heading: "Book in under a minute",
        body: "We connected the clinics' practice management system to a simple booking flow: pick a clinic, a practitioner and a time, with no account needed.",
      },
      {
        heading: "Win local search",
        body: "Each clinic got its own page with suburbs served, parking details, practitioner profiles and reviews, plus fully updated Google Business Profiles.",
      },
      {
        heading: "Accessible and fast",
        body: "The new site meets WCAG 2.2 AA, loads in under 1.5 seconds on mobile and makes Medicare, private health and NDIS information easy to find.",
      },
    ],
    outcome: [
      "New patient bookings almost tripled in five months. Most bookings now happen online — many outside business hours — freeing reception staff to look after patients in the clinic.",
    ],
    testimonialId: "t8",
    isPlaceholder: true,
    publishedAt: "2026-05-22",
  },
  {
    slug: "trades-app-product-design",
    client: "TradieHub",
    location: "Melbourne, Australia",
    industry: "SaaS / Construction",
    services: ["ui-ux-design", "web-development"],
    title: "Designing a job app that TradieHub's customers actually use on site",
    metaTitle: "TradieHub Case Study: Mobile App UX for Tradespeople",
    metaDescription:
      "How field research and a mobile-first redesign helped Melbourne SaaS company TradieHub increase daily active users and cut customer churn.",
    summary:
      "Field research with plumbers and electricians and a redesigned mobile app for quoting, scheduling and invoicing that works with one hand, on a ladder.",
    coverGradient: "from-yellow-300 via-amber-500 to-orange-600",
    results: [
      { label: "Weekly active users", before: "41%", after: "78%" },
      { label: "Time to send a quote", before: "11 min", after: "3 min" },
      { label: "Monthly churn", before: "6.2%", after: "2.4%" },
    ],
    challenge: [
      "TradieHub's software had every feature tradespeople needed, but it was designed for a desktop. On site, users found it too slow and fiddly, so they went back to paper and many cancelled within three months.",
    ],
    approach: [
      {
        heading: "Research on the job",
        body: "We spent four days on job sites with 12 tradies, watching how they quoted, scheduled and invoiced between jobs and in their vans.",
      },
      {
        heading: "Design for one hand",
        body: "We redesigned the core flows with large tap targets, saved quote templates, photo-to-line-item and offline mode for sites with poor reception.",
      },
      {
        heading: "Ship and measure",
        body: "We released the redesign in stages to small groups of customers, measuring task time and retention at each step before rolling it out to everyone.",
      },
    ],
    outcome: [
      "Quoting became almost four times faster and weekly active use nearly doubled. Monthly churn fell by more than half, adding significantly to TradieHub's annual recurring revenue.",
    ],
    testimonialId: "t9",
    isPlaceholder: true,
    publishedAt: "2026-03-11",
  },

  // ---------- Europe ----------
  {
    slug: "furniture-ecommerce-europe",
    client: "Nordlys Home",
    location: "Copenhagen, Denmark",
    industry: "E-commerce / Home & Furniture",
    services: ["web-development", "ui-ux-design"],
    title: "Helping Nordlys Home sell Scandinavian furniture across Europe",
    metaTitle: "Nordlys Home Case Study: Multi-Country E-commerce Store",
    metaDescription:
      "How a rebuilt, multi-language e-commerce store helped Danish furniture brand Nordlys Home expand into five European markets and grow international revenue.",
    summary:
      "A rebuilt store in five languages and currencies, with local payment methods, clear delivery costs and room-planning tools that gave buyers confidence to order big pieces online.",
    coverGradient: "from-slate-300 via-stone-400 to-zinc-600",
    results: [
      { label: "International revenue share", before: "8%", after: "46%" },
      { label: "Average order value", before: "€410", after: "€640" },
      { label: "Markets served", before: "1", after: "5" },
    ],
    challenge: [
      "Nordlys Home's store was only in Danish and took card payments in kroner. Customers in Germany, Sweden and the Netherlands found the brand on Instagram but left when they couldn't see delivery costs or pay the way they normally do.",
    ],
    approach: [
      {
        heading: "Local in every market",
        body: "We launched the store in Danish, English, German, Swedish and Dutch, with local currencies and payment methods like Klarna, iDEAL and MobilePay.",
      },
      {
        heading: "Remove the doubt",
        body: "Product pages now show real room photos, exact dimensions, delivery costs by country and a 30-day return promise before customers reach checkout.",
      },
      {
        heading: "Privacy and performance",
        body: "A GDPR-compliant consent setup, server-side analytics and fast image delivery kept the site quick across Europe while respecting customers' privacy choices.",
      },
    ],
    outcome: [
      "Within eight months, almost half of Nordlys Home's revenue came from outside Denmark. Customers also bought larger pieces online, raising the average order value by more than 50%.",
    ],
    testimonialId: "t10",
    isPlaceholder: true,
    publishedAt: "2026-09-02",
  },
  {
    slug: "ebike-subscription-social",
    client: "Velomint",
    location: "Amsterdam, Netherlands",
    industry: "Mobility / Subscription",
    services: ["social-media", "content-creation"],
    title: "How Velomint grew its e-bike subscriptions with city-by-city social content",
    metaTitle: "Velomint Case Study: Social Media for an E-bike Subscription",
    metaDescription:
      "How local social content and a referral programme helped Amsterdam e-bike subscription service Velomint grow subscribers as it launched in new cities.",
    summary:
      "City-specific content, rider stories and a referral programme that helped an e-bike subscription brand launch successfully in three new cities.",
    coverGradient: "from-green-300 via-emerald-500 to-teal-700",
    results: [
      { label: "Active subscribers", before: "2,800", after: "9,600" },
      { label: "Cost per new subscriber", before: "€62", after: "€24" },
      { label: "Subscribers from referrals", before: "4%", after: "29%" },
    ],
    challenge: [
      "Velomint was growing well in Amsterdam, but launches in Rotterdam, Utrecht and Antwerp were slow. The same ads were running everywhere and paid costs were climbing in a market crowded with competitors.",
    ],
    approach: [
      {
        heading: "Content for each city",
        body: "We created separate content for every city: local commute routes, cafés worth cycling to and real riders from each neighbourhood, in Dutch and English.",
      },
      {
        heading: "Riders as the stars",
        body: "Monthly rider spotlights and a 'show us your ride' challenge produced hundreds of videos that we shared and used in ads.",
      },
      {
        heading: "Reward referrals",
        body: "We designed a 'give a month, get a month' referral programme and promoted it across social, email and inside the Velomint app.",
      },
    ],
    outcome: [
      "Subscribers more than tripled in nine months and the cost of each new subscriber fell by over 60%. Referrals now bring in nearly a third of all new riders.",
    ],
    testimonialId: "t11",
    isPlaceholder: true,
    publishedAt: "2026-10-08",
  },
  {
    slug: "cybersecurity-b2b-content",
    client: "Kernwerk Security",
    location: "Berlin, Germany",
    industry: "B2B / Cybersecurity",
    services: ["content-creation", "web-development"],
    title: "Turning Kernwerk Security's expertise into a steady stream of enterprise leads",
    metaTitle: "Kernwerk Security Case Study: B2B Content & Website",
    metaDescription:
      "How expert-led content, a NIS2 compliance hub and a rebuilt website helped Berlin cybersecurity firm Kernwerk Security generate qualified enterprise leads.",
    summary:
      "A NIS2 compliance resource hub, expert LinkedIn content and a rebuilt website that made a technical security company easy for enterprise buyers to understand and trust.",
    coverGradient: "from-violet-400 via-purple-600 to-slate-800",
    results: [
      { label: "Qualified leads / mo", before: "6", after: "34" },
      { label: "Organic traffic / mo", before: "3.5K", after: "21K" },
      { label: "Average deal size", before: "€48K", after: "€85K" },
    ],
    challenge: [
      "Kernwerk's engineers were respected experts, but their website was full of jargon and they were almost invisible to the compliance and IT leaders making buying decisions. Most new business came from a few personal contacts.",
    ],
    approach: [
      {
        heading: "Own a timely topic",
        body: "We built a German and English resource hub on the EU's NIS2 cybersecurity rules, with checklists, guides and a readiness self-assessment.",
      },
      {
        heading: "Experts on LinkedIn",
        body: "We interviewed Kernwerk's engineers each month and turned their insights into clear posts and short videos for security and compliance leaders.",
      },
      {
        heading: "A website buyers understand",
        body: "We rewrote and rebuilt the website around business outcomes, added certifications and case studies, and made booking a consultation simple.",
      },
    ],
    outcome: [
      "Qualified leads grew more than five-fold and Kernwerk began winning larger enterprise contracts. The NIS2 hub now ranks on the first page of Google in Germany and Austria for its main topics.",
    ],
    testimonialId: "t12",
    isPlaceholder: true,
    publishedAt: "2026-08-04",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
