import { siteConfig } from "@/config/site";

export const processSteps = [
  {
    title: "Discover",
    description:
      "A free 30-minute call and audit of your current marketing to understand your goals, audience and what's holding growth back.",
  },
  {
    title: "Strategy",
    description:
      "A clear, prioritised growth plan with channels, content pillars, timelines and the metrics we'll be accountable for.",
  },
  {
    title: "Create",
    description:
      "Our in-house team produces content, designs and builds — with weekly check-ins and a shared board so you always know what's next.",
  },
  {
    title: "Grow",
    description:
      "We measure what matters, double down on what works and report monthly in plain language with next steps.",
  },
];

export const differentiators = [
  {
    title: "Results over vanity metrics",
    description: "We report on leads, pipeline and revenue — not just likes and impressions.",
    icon: "trending",
  },
  {
    title: "One team, every skill",
    description: "Strategists, creators, designers and developers under one roof. No hand-offs between agencies.",
    icon: "users",
  },
  {
    title: "Senior people on your account",
    description: "Your work is led by experienced specialists, not passed down to the most junior person.",
    icon: "award",
  },
  {
    title: "Fast, transparent communication",
    description: "A dedicated Slack or WhatsApp channel, weekly updates and replies within one business day.",
    icon: "message",
  },
  {
    title: "No long lock-ins",
    description: "Month-to-month retainers after an initial term. We keep clients by delivering, not by contracts.",
    icon: "unlock",
  },
  {
    title: "You own everything",
    description: "Content, designs, code and ad accounts belong to you. Always.",
    icon: "shield",
  },
] as const;

export const pricingPlans = [
  {
    name: "Starter",
    price: "From ₹45,000/mo", // REPLACE with your real pricing (or remove prices entirely)
    priceNote: "≈ $550/mo",
    description: "For early-stage brands that need a consistent, professional presence.",
    features: [
      "2 social platforms managed",
      "12 posts + 4 reels per month",
      "Community management (business hours)",
      "Monthly performance report",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "From ₹95,000/mo", // REPLACE
    priceNote: "≈ $1,150/mo",
    description: "For growing brands ready to turn content into a reliable lead engine.",
    features: [
      "3 social platforms managed",
      "16 posts + 10 reels per month",
      "2 blog articles or landing pages",
      "Creative for paid campaigns",
      "Bi-weekly strategy calls",
    ],
    cta: "Get your growth plan",
    highlighted: true,
  },
  {
    name: "Scale",
    price: "Custom",
    priceNote: "Tailored scope",
    description: "Full-funnel content, design and development for ambitious teams.",
    features: [
      "Everything in Growth",
      "UI/UX design & web development",
      "Dedicated account team",
      "Quarterly growth workshops",
    ],
    cta: "Get custom quote",
    highlighted: false,
  },
];

export const homeFaqs = [
  {
    question: `What does a digital marketing agency in ${siteConfig.city} do?`,
    answer: `We help businesses attract, engage and convert customers online. At ${siteConfig.name}, that means content creation, social media management, UI/UX design and website development — planned together so every channel supports the same growth goals.`,
  },
  {
    question: "Do you work with clients outside India?",
    answer: `Yes. We work with clients across ${siteConfig.markets}, with overlapping working hours for US teams and communication over Slack, email, WhatsApp and video calls.`,
  },
  {
    question: "How much do your services cost?",
    answer:
      "Monthly retainers start from our Starter package, and project work such as websites is quoted at a fixed price after a short discovery call. Share your requirements through our form and we'll send a tailored proposal within two business days.",
  },
  {
    question: "How soon will we see results?",
    answer:
      "Most clients see early signals — improved engagement, traffic and enquiries — within 6–8 weeks. Compounding results like organic rankings and a predictable lead flow typically build over 3–6 months.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "Retainers have an initial three-month term so we have time to test, learn and show results. After that, they continue month to month.",
  },
  {
    question: "Who will we be working with?",
    answer:
      "You'll have a dedicated account lead plus specialists for content, design and development as needed. You'll always know who's responsible for what.",
  },
  {
    question: "Can you work with our in-house team?",
    answer:
      "Absolutely. Many clients use us to extend their in-house marketing or product team. We adapt to your tools, approval processes and brand guidelines.",
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "A 30-minute discovery call, access to your existing channels and analytics, and any brand assets you have. We handle the rest, including a detailed onboarding checklist.",
  },
];
