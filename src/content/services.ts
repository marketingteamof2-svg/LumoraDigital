/**
 * Service pages are generated from this array. To add a service (e.g. SEO, Paid Ads, Branding),
 * append an object below. It automatically gets its own page, sitemap entry, schema and nav links.
 */

export type ServiceIcon = "pen" | "megaphone" | "layout" | "code" | "search" | "target" | "sparkles";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: ServiceIcon;
  /** One-line benefit used on cards */
  benefit: string;
  metaTitle: string; // ≤ 60 chars
  metaDescription: string; // ≤ 155 chars
  h1: string;
  intro: string[];
  deliverables: { title: string; description: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  process: { title: string; description: string }[];
  idealFor: string[];
  faqs: { question: string; answer: string }[];
  relatedCaseStudies: string[];
  relatedPosts: string[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "content-creation",
    name: "Content Creation",
    shortName: "Content",
    icon: "pen",
    benefit: "Scroll-stopping reels, graphics and copy that turn attention into enquiries.",
    metaTitle: "Content Creation Agency | Reels, Video & Copywriting",
    metaDescription:
      "Content creation agency producing reels, short-form video, graphics and conversion copywriting that grows reach and drives qualified leads.",
    h1: "Content creation that earns attention — and converts it",
    intro: [
      "Most brands don't have a content problem. They have a consistency and strategy problem. Posting more doesn't help if every piece starts from a blank page, speaks to nobody in particular and has no job to do once someone stops scrolling. Our content creation team fixes that by building a repeatable system: clear messaging, a library of proven formats and a production rhythm your audience can count on.",
      "We plan, script, shoot, design and edit everything in-house — short-form video and reels, carousels, static graphics, long-form articles, landing-page copy and email. Every piece is mapped to a stage of the buyer journey, so your content doesn't just collect likes. It answers objections, builds trust and moves people toward a conversation with your sales team.",
    ],
    deliverables: [
      {
        title: "Short-form video & reels",
        description:
          "Hook-first scripts, on-location or studio shoots, and fast-paced edits built for Instagram Reels, YouTube Shorts and LinkedIn video.",
      },
      {
        title: "Social graphics & carousels",
        description:
          "On-brand templates and one-off designs that make complex ideas easy to save, share and act on.",
      },
      {
        title: "Conversion copywriting",
        description:
          "Website, landing page, ad and email copy written around your customer's language — not industry jargon.",
      },
      {
        title: "Long-form & SEO content",
        description:
          "Research-backed articles and guides that rank for buying-intent keywords and support your sales conversations.",
      },
      {
        title: "Brand voice & messaging",
        description:
          "A practical voice guide, key message pillars and proof points so every writer and creator sounds like you.",
      },
      {
        title: "Content calendar & repurposing",
        description:
          "One core idea turned into a dozen assets across channels, scheduled in a calendar your team can actually follow.",
      },
    ],
    sections: [
      {
        heading: "Why strategy comes before production",
        paragraphs: [
          "Before we write a caption or set up a camera, we spend time understanding who buys from you, why they hesitate, and what they need to believe before they say yes. We review your sales calls, reviews, support tickets and competitor content to find the gaps nobody in your category is filling. That research becomes a set of content pillars — usually three to five themes — that every piece ladders up to.",
          "This is what separates content that performs from content that simply exists. When each asset has a defined audience, a single takeaway and a clear next step, you can measure what works and do more of it. Our clients typically see their best-performing formats emerge within the first six to eight weeks, and we double down on those rather than guessing.",
        ],
      },
      {
        heading: "Built for platforms, not just repurposed across them",
        paragraphs: [
          "A reel that works on Instagram can fall flat on LinkedIn, and a blog post doesn't become a carousel by pasting paragraphs onto slides. We adapt length, pacing, framing and copy to how people actually consume each platform. Hooks are tested in the first two seconds, captions are written to be read on a phone, and every design passes a quick legibility check at thumbnail size.",
          "We also build reusable templates and shot lists so production gets faster and cheaper over time. That means more output from the same budget, and a consistent look that makes your brand recognisable before anyone reads the handle.",
        ],
      },
      {
        heading: "How we measure content performance",
        paragraphs: [
          "Vanity metrics are easy to inflate and hard to bank. We report on the numbers that connect to revenue: saves and shares (signals of genuine value), profile visits and link clicks, assisted conversions in GA4, and lead volume from content-driven pages. Each month you get a short report that explains what worked, what didn't and what we're changing next — in plain language, not a wall of charts.",
        ],
      },
    ],
    process: [
      { title: "Research", description: "Audience, competitor and keyword research to find the angles worth owning." },
      { title: "Plan", description: "Content pillars, formats and a 30-day calendar agreed with your team." },
      { title: "Produce", description: "Scripting, shooting, design and editing with two rounds of revisions included." },
      { title: "Optimise", description: "Monthly performance review and iteration on what's actually driving results." },
    ],
    idealFor: [
      "Founders who know content matters but don't have time to make it",
      "D2C brands that need a steady stream of product and UGC-style video",
      "B2B and SaaS teams who want thought leadership that generates pipeline",
      "Marketing teams that need extra production capacity without new hires",
    ],
    faqs: [
      {
        question: "How many pieces of content do you produce per month?",
        answer:
          "It depends on your package and goals. A typical engagement includes 8–16 short-form videos, 12–20 graphics or carousels and 2–4 long-form pieces per month. We'll recommend a mix based on where your audience spends time.",
      },
      {
        question: "Do we need to appear on camera?",
        answer:
          "Not necessarily. Founder-led content often performs best, but we also work with creators, product-focused shoots, motion graphics and screen recordings. We'll find a format you're comfortable with.",
      },
      {
        question: "Who owns the content you create?",
        answer:
          "You do. Once invoices are settled, all final files and rights transfer to you. We also hand over raw footage and editable design files on request.",
      },
      {
        question: "Can you match our existing brand guidelines?",
        answer:
          "Yes. We work within your guidelines and, if they're missing or outdated, we can build a lightweight content style guide as part of onboarding.",
      },
      {
        question: "How quickly can you start?",
        answer:
          "Most clients see their first batch of content within two to three weeks of kickoff, after a one-week research and planning sprint.",
      },
    ],
    relatedCaseStudies: ["d2c-skincare-reels-growth", "saas-linkedin-pipeline"],
    relatedPosts: ["short-form-video-strategy-2026", "content-pillars-framework"],
    keywords: ["content creation agency", "reels production", "copywriting services", "video content agency"],
  },
  {
    slug: "social-media",
    name: "Social Media Management",
    shortName: "Social Media",
    icon: "megaphone",
    benefit: "Always-on social presence and community engagement that builds real demand.",
    metaTitle: "Social Media Management Services for Growing Brands",
    metaDescription:
      "Social media management services covering strategy, posting, community engagement and reporting across Instagram, LinkedIn, YouTube and X.",
    h1: "Social media management that builds a community, not just a feed",
    intro: [
      "Your customers are deciding whether to trust you long before they fill in a form. They're checking your Instagram, scrolling your LinkedIn and reading the comments under your posts. A feed that's inactive, inconsistent or off-brand quietly costs you deals. Our social media management service keeps your presence sharp, active and genuinely useful — every single week.",
      "We handle the full workflow: strategy, calendar, design, captions, scheduling, community management and reporting. You approve content in one place, and we take care of everything else, including replying to comments and DMs within agreed response times so no potential customer slips through the cracks.",
    ],
    deliverables: [
      {
        title: "Channel strategy",
        description:
          "A clear plan for which platforms to prioritise, what to post, how often, and what success looks like for each.",
      },
      {
        title: "Monthly content calendar",
        description:
          "Planned posts, stories and campaigns delivered for approval a week ahead, aligned to launches and seasonal moments.",
      },
      {
        title: "Community management",
        description:
          "Daily monitoring and replies to comments, mentions and DMs, with qualified leads routed straight to your team.",
      },
      {
        title: "Engagement & growth",
        description:
          "Proactive engagement with your target audience, partners and creators to grow reach beyond your existing followers.",
      },
      {
        title: "Influencer & creator coordination",
        description:
          "Shortlisting, outreach, briefing and tracking for creator collaborations that fit your brand and budget.",
      },
      {
        title: "Analytics & reporting",
        description:
          "Monthly reports covering reach, engagement, follower quality, traffic and leads — with clear next steps.",
      },
    ],
    sections: [
      {
        heading: "Consistency is the strategy most brands skip",
        paragraphs: [
          "Algorithms reward accounts that show up consistently and spark conversation. Audiences reward the same thing. The brands that win on social aren't always the ones with the biggest budgets — they're the ones that post with a clear point of view, respond quickly and stay recognisable week after week.",
          "We set a sustainable cadence for each channel and protect it. Content is batched and approved in advance, so a busy week on your side never means silence on your feed. When something timely happens in your industry, we have the process in place to react within hours, not days.",
        ],
      },
      {
        heading: "Engagement that turns followers into customers",
        paragraphs: [
          "Posting is only half the job. The real value of social media is two-way conversation: answering questions, joining relevant discussions and making it easy for interested people to take the next step. Our community managers follow a response playbook written with your team, so tone stays on-brand and sales-ready enquiries are flagged and handed over immediately.",
          "We also set up the plumbing that makes social measurable — UTM-tagged links, link-in-bio pages, lead forms and GA4 events — so you can see exactly how many enquiries and sales start on social.",
        ],
      },
      {
        heading: "What the first 90 days look like",
        paragraphs: [
          "Month one is about foundations: we audit your profiles, fix bios, highlights and link-in-bio pages, agree on the voice and response playbook, and publish the first content calendar. You'll see a noticeably sharper, more consistent presence within the first few weeks.",
          "Months two and three are about learning. We test hooks, formats and posting times, watch which topics drive saves, shares and DMs, and shift the mix toward what's working. By the end of the first quarter you'll have a clear picture of which platforms and content types generate enquiries — and a plan to scale them.",
        ],
      },
      {
        heading: "Organic and paid, working together",
        paragraphs: [
          "Organic social builds trust; paid social scales what's already working. When your best organic posts are identified, we can boost them or turn them into ads with proven creative, which typically lowers cost per lead compared with launching cold campaigns. If you run paid media with another partner, we'll share winning creative and insights with them.",
        ],
      },
    ],
    process: [
      { title: "Audit", description: "Review of your current channels, competitors and audience behaviour." },
      { title: "Strategy", description: "Platform priorities, content mix, voice and response playbook." },
      { title: "Manage", description: "Weekly publishing, daily engagement and lead routing to your team." },
      { title: "Report", description: "Monthly insights, wins and changes for the next 30 days." },
    ],
    idealFor: [
      "Brands with inactive or inconsistent social profiles",
      "Teams that get DMs and comments but can't reply fast enough",
      "Businesses launching a new product, location or brand",
      "Companies that want social to contribute measurable leads",
    ],
    faqs: [
      {
        question: "Which platforms do you manage?",
        answer:
          "Instagram, LinkedIn, Facebook, YouTube, X and Threads. We'll recommend focusing on two or three channels where your buyers are most active, rather than spreading thin.",
      },
      {
        question: "Do we approve posts before they go live?",
        answer:
          "Yes. You'll receive the calendar a week ahead in a shared approval board. Once approved, we schedule everything. Urgent or reactive posts follow a faster approval path you define.",
      },
      {
        question: "How fast do you respond to comments and DMs?",
        answer:
          "Standard response time is within four business hours, with extended coverage available. Sales enquiries are forwarded to your team immediately.",
      },
      {
        question: "Can you guarantee a certain number of followers?",
        answer:
          "No honest agency can. We focus on engaged, relevant followers and measurable outcomes like enquiries, rather than numbers that can be gamed.",
      },
      {
        question: "Is there a minimum contract length?",
        answer:
          "We recommend three months to see meaningful trends, after which engagements continue month to month.",
      },
    ],
    relatedCaseStudies: ["d2c-skincare-reels-growth", "saas-linkedin-pipeline"],
    relatedPosts: ["short-form-video-strategy-2026", "content-pillars-framework"],
    keywords: ["social media management services", "social media agency", "community management"],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    shortName: "UI/UX",
    icon: "layout",
    benefit: "Intuitive interfaces that reduce drop-off and make your product easy to love.",
    metaTitle: "UI UX Design Agency | Product & Website Design",
    metaDescription:
      "UI/UX design agency for SaaS and digital products: user research, wireframes, prototypes and design systems that improve conversion and retention.",
    h1: "UI/UX design that makes the right action the obvious one",
    intro: [
      "Every confusing screen costs you something — a sign-up that never finishes, a feature nobody finds, a support ticket that shouldn't exist. Good UI/UX design removes that friction. It makes your product feel effortless, which is exactly why it's so hard to get right.",
      "Our design team combines user research, interaction design and visual craft to create websites, web apps and mobile products that are clear, accessible and on-brand. We work in Figma, test with real users and hand off developer-ready files and design systems so what ships matches what was designed.",
    ],
    deliverables: [
      {
        title: "UX research & audits",
        description:
          "Stakeholder interviews, user interviews, heuristic reviews and analytics analysis to find where users struggle and why.",
      },
      {
        title: "Information architecture",
        description:
          "Sitemaps, user flows and navigation structures that help people find what they need in as few steps as possible.",
      },
      {
        title: "Wireframes & prototypes",
        description:
          "Low- and high-fidelity prototypes you can click through and test before a single line of code is written.",
      },
      {
        title: "Visual UI design",
        description:
          "Polished, on-brand interfaces with thoughtful typography, colour, spacing and micro-interactions.",
      },
      {
        title: "Design systems",
        description:
          "Reusable component libraries and tokens that keep your product consistent and speed up future development.",
      },
      {
        title: "Usability testing",
        description:
          "Moderated and unmoderated tests with your target users, with prioritised recommendations you can act on.",
      },
    ],
    sections: [
      {
        heading: "Design decisions backed by evidence",
        paragraphs: [
          "Opinions are cheap; user behaviour is not. We start every project by understanding the people who'll use what we design — their goals, context and frustrations — and the business outcomes the product needs to drive. Where analytics exist, we use funnel data and session recordings to pinpoint exactly where users drop off.",
          "That evidence shapes every decision, from the order of fields in a sign-up form to the wording on a pricing page. When stakeholders disagree, we prototype both options and test them, so the conversation moves from 'I think' to 'users did'.",
        ],
      },
      {
        heading: "Measuring the impact of design",
        paragraphs: [
          "Good design should show up in your numbers. Before we start, we agree on the metrics that matter for the project — sign-up completion, activation rate, time to first value, checkout conversion or support tickets per user — and record a baseline. After launch, we compare against it so you can see exactly what the redesign achieved.",
          "Where traffic allows, we validate big changes with A/B tests or staged rollouts. Where it doesn't, we use moderated testing and before-and-after task success rates. Either way, you get evidence, not just a nicer-looking interface.",
        ],
      },
      {
        heading: "Accessible by default",
        paragraphs: [
          "Accessibility isn't a box to tick at the end. We design to WCAG 2.1 AA from the first wireframe: sufficient colour contrast, readable type sizes, clear focus states, logical heading structure and touch targets that work for real thumbs. Accessible products are easier for everyone to use, rank better in search and reduce legal risk.",
        ],
      },
      {
        heading: "Handoff that developers actually appreciate",
        paragraphs: [
          "A beautiful design that can't be built on time is a liability. Our designers work closely with engineers — including our own development team — to make sure designs are feasible, responsive and documented. Every handoff includes annotated Figma files, component specs, interaction notes and exportable assets. We stay involved during build to answer questions and review implementation.",
          "If you already have a development team, we slot into your sprint process. If you don't, our web development team can take the design all the way to launch.",
        ],
      },
    ],
    process: [
      { title: "Discover", description: "Research, analytics review and clear success metrics for the project." },
      { title: "Define", description: "User flows, information architecture and wireframes agreed with stakeholders." },
      { title: "Design", description: "High-fidelity UI and clickable prototypes, tested with real users." },
      { title: "Deliver", description: "Design system, annotated handoff and implementation reviews." },
    ],
    idealFor: [
      "SaaS companies with sign-up or onboarding drop-off",
      "Startups preparing an MVP or a fundraising demo",
      "Established products that have grown inconsistent over time",
      "Marketing sites that get traffic but don't convert",
    ],
    faqs: [
      {
        question: "What tools do you design in?",
        answer:
          "We design in Figma and share files with your team so everyone can comment and review in real time. We use Maze or Lyssna for usability testing.",
      },
      {
        question: "How long does a typical UI/UX project take?",
        answer:
          "A marketing website redesign typically takes 3–6 weeks of design. A web application or MVP usually takes 6–12 weeks depending on the number of flows and screens.",
      },
      {
        question: "Can you redesign part of our product instead of all of it?",
        answer:
          "Absolutely. Many projects focus on a single high-impact flow such as onboarding, checkout or pricing, where improvements show up quickly in conversion data.",
      },
      {
        question: "Do you build the designs too?",
        answer:
          "Yes. Our web development team builds in Next.js, React and modern CMS platforms, or we can hand off to your in-house engineers.",
      },
      {
        question: "Will we get a design system?",
        answer:
          "For product work, yes — a component library with tokens and usage guidelines is part of the deliverables. For smaller websites, we provide a lightweight style guide.",
      },
    ],
    relatedCaseStudies: ["saas-onboarding-redesign", "saas-linkedin-pipeline"],
    relatedPosts: ["ux-audit-checklist", "content-pillars-framework"],
    keywords: ["UI UX design agency", "product design agency", "SaaS UX design", "website redesign"],
  },
  {
    slug: "web-development",
    name: "Website & Web App Development",
    shortName: "Web Development",
    icon: "code",
    benefit: "Fast, secure websites and web apps engineered to rank, convert and scale.",
    metaTitle: "Web Application Development Company | Next.js & React",
    metaDescription:
      "Web application development company building fast, SEO-ready websites and scalable web apps with Next.js, React and modern headless CMS platforms.",
    h1: "Websites and web apps engineered for speed, search and scale",
    intro: [
      "Your website is your hardest-working salesperson. It's open around the clock, talks to every prospect and is usually the first real impression of your brand. When it's slow, hard to update or invisible in search, every other marketing channel works harder for less return.",
      "Our development team builds marketing websites, landing pages, customer portals and full web applications using modern, proven technology — Next.js, React, TypeScript and headless CMS platforms. The result is software that loads fast, ranks well, is easy for your team to edit and won't need rebuilding in two years.",
    ],
    deliverables: [
      {
        title: "Marketing websites",
        description:
          "High-performance, SEO-ready websites with a CMS your team can update without calling a developer.",
      },
      {
        title: "Landing pages",
        description:
          "Conversion-focused pages for campaigns and launches, built for fast iteration and A/B testing.",
      },
      {
        title: "Custom web applications",
        description:
          "Dashboards, portals, SaaS products and internal tools with secure authentication, payments and integrations.",
      },
      {
        title: "E-commerce",
        description:
          "Shopify and headless commerce builds optimised for page speed, product discovery and checkout conversion.",
      },
      {
        title: "Integrations & automation",
        description:
          "Connections to your CRM, payment provider, email platform and analytics so data flows without manual work.",
      },
      {
        title: "Care & maintenance",
        description:
          "Monitoring, security updates, backups, performance tuning and small enhancements on a monthly plan.",
      },
    ],
    sections: [
      {
        heading: "Performance is a feature",
        paragraphs: [
          "Speed directly affects revenue. Slow pages lose visitors before they've read a word, and Google uses Core Web Vitals as a ranking signal. We engineer every build to hit Largest Contentful Paint under 2.5 seconds, Cumulative Layout Shift under 0.1 and Interaction to Next Paint under 200 milliseconds on real mobile devices — and we target Lighthouse scores of 90+ across performance, accessibility, best practices and SEO.",
          "That comes from deliberate choices: static generation and server rendering where possible, optimised images in modern formats, minimal client-side JavaScript, and hosting on global edge networks like Vercel.",
        ],
      },
      {
        heading: "SEO built in from day one",
        paragraphs: [
          "Retrofitting SEO onto a finished site is expensive. We build it into the foundation: clean URL structures, one H1 per page, semantic HTML, canonical tags, auto-generated sitemaps, structured data (JSON-LD) for your organisation, services, articles and FAQs, and Open Graph tags so every shared link looks great.",
          "We also plan internal linking between your services, case studies and articles, so authority flows to the pages that matter most for your business.",
        ],
      },
      {
        heading: "Security, reliability and compliance",
        paragraphs: [
          "Every site and application we ship follows security best practices: HTTPS everywhere, secure headers, input validation, spam protection on forms, least-privilege database access and regular dependency updates. For web apps, we add role-based permissions, audit logging and automated backups.",
          "We also set up uptime monitoring and error tracking from day one, so issues are spotted and fixed before your customers notice. If you operate in regulated industries or handle personal data across India and the US, we'll help you put the right consent, data-retention and privacy controls in place.",
        ],
      },
      {
        heading: "Built to grow with you",
        paragraphs: [
          "We write clean, typed, documented code using a component-based architecture, so adding pages, features or integrations later is fast and predictable. You own the code and the hosting accounts. If you ever want to bring development in-house, your engineers will inherit a codebase they're happy to work with.",
          "For web applications, we plan for scale from the start — sensible database design, secure authentication, role-based access, automated testing and CI/CD pipelines that make releases routine rather than risky.",
        ],
      },
    ],
    process: [
      { title: "Scope", description: "Requirements, technical architecture, timeline and fixed-price estimate." },
      { title: "Build", description: "Agile sprints with a staging link so you can review progress every week." },
      { title: "Launch", description: "QA across devices, performance and SEO checks, redirects and go-live." },
      { title: "Support", description: "Monitoring, maintenance and ongoing improvements after launch." },
    ],
    idealFor: [
      "Businesses with a slow, outdated or hard-to-edit website",
      "Startups building an MVP or customer-facing web app",
      "Marketing teams who need landing pages shipped in days, not weeks",
      "Companies replacing spreadsheets with a custom internal tool",
    ],
    faqs: [
      {
        question: "What technology do you build with?",
        answer:
          "Primarily Next.js, React and TypeScript, with headless CMS platforms like Sanity, Contentful or Payload, and Supabase or PostgreSQL for data. For e-commerce we use Shopify. We recommend the stack that fits your goals, not the one that's trendiest.",
      },
      {
        question: "How much does a website cost?",
        answer:
          "Marketing websites typically start from a fixed project fee based on page count and features, while web applications are scoped per project. Share your requirements and we'll send a detailed, fixed-price proposal.",
      },
      {
        question: "Will I be able to edit the website myself?",
        answer:
          "Yes. We set up a CMS tailored to your content, train your team and provide short video guides so you can update pages, blogs and case studies independently.",
      },
      {
        question: "Do you handle hosting and domains?",
        answer:
          "We set up hosting (usually Vercel), domains, SSL and email deliverability records in accounts you own, so you're never locked in.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Every project includes 30 days of post-launch support. After that, you can choose a monthly care plan for maintenance, monitoring and improvements.",
      },
    ],
    relatedCaseStudies: ["saas-onboarding-redesign", "d2c-skincare-reels-growth"],
    relatedPosts: ["ux-audit-checklist", "short-form-video-strategy-2026"],
    keywords: [
      "web application development company",
      "Next.js development agency",
      "website development services",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
