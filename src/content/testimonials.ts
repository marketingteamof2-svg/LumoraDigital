/**
 * REPLACE: These testimonials are PLACEHOLDERS, not real reviews. The people and
 * companies are fictional and match the sample case studies.
 * Only publish real testimonials you have written permission to use.
 * After replacing, set `isPlaceholder: false`. Review/AggregateRating schema is
 * ONLY emitted when every testimonial is real (see src/lib/schema.ts).
 */

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  photo?: string; // e.g. "/images/testimonials/jane.jpg"
  isPlaceholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya Rao",
    role: "Founder",
    company: "Glowveda Skincare",
    quote:
      "We went from posting whenever we remembered to having reels that actually sell. Within five months Instagram became our biggest sales channel, and the team handles every comment and DM so we don't have to.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t2",
    name: "Daniel Mehta",
    role: "Head of Product",
    company: "Ledgerly",
    quote:
      "They found problems in our onboarding we'd stopped noticing. The new flow is four steps instead of eleven, our trial-to-paid rate has more than doubled, and marketing can finally update the website on their own.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Co-founder & CEO",
    company: "TalentLoop",
    quote:
      "Two short calls a month and they turn it into content that sounds exactly like us. LinkedIn is now our number one source of demo requests, and prospects show up already knowing what we stand for.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t13",
    name: "Arvin",
    role: "Founder & Lead Teacher",
    company: "Arvin Yoga",
    quote:
      "Our reels show exactly what we teach, and booking a trial class now takes seconds instead of a phone call. The studio is full in the mornings, and our online batches have students joining from all over India and abroad.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t7",
    name: "Jess Whitfield",
    role: "Founder",
    company: "Saltbush Swimwear",
    quote:
      "Winter used to be the scariest time of year for us. Now our creator content keeps sales coming in every month, and social is our biggest channel. They feel like part of our team.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t8",
    name: "Dr. Liam O'Connor",
    role: "Clinical Director",
    company: "Harbourline Physio",
    quote:
      "Patients can book in seconds, even at 10pm, and our receptionists aren't stuck on the phone all day. New patient bookings have nearly tripled across our four clinics.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t9",
    name: "Mia Thompson",
    role: "CEO",
    company: "TradieHub",
    quote:
      "They spent days on job sites with our customers before designing anything. The new app is so much faster, people actually use it every day, and our churn has dropped by more than half.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t10",
    name: "Freja Lindqvist",
    role: "Head of E-commerce",
    company: "Nordlys Home",
    quote:
      "Selling in five countries felt impossible for a team our size. Now almost half our revenue comes from outside Denmark, and customers trust us enough to order sofas online.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t11",
    name: "Sander de Vries",
    role: "Head of Growth",
    company: "Velomint",
    quote:
      "Every new city launch now has real local content behind it. Our subscribers have tripled, we pay far less for each new rider, and the referral programme just keeps working.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t12",
    name: "Markus Brandt",
    role: "Managing Director",
    company: "Kernwerk Security",
    quote:
      "They made our expertise understandable to the people who actually sign contracts. Our NIS2 hub brings in serious enterprise leads every week, and our deals are bigger than ever.",
    rating: 5,
    isPlaceholder: true,
  },
];

export const hasRealTestimonials = testimonials.length > 0 && testimonials.every((t) => !t.isPlaceholder);
