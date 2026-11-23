/**
 * REPLACE: These testimonials are PLACEHOLDERS, not real reviews.
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
    name: "[Client Name]",
    role: "Founder",
    company: "[D2C Brand]",
    quote:
      "Placeholder testimonial — replace with a real client quote. Ideally it mentions a specific result, e.g. how reels became your top sales channel within a few months.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t2",
    name: "[Client Name]",
    role: "Head of Product",
    company: "[SaaS Company]",
    quote:
      "Placeholder testimonial — replace with a real client quote about the onboarding redesign and the measurable lift in trial-to-paid conversion.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t3",
    name: "[Client Name]",
    role: "Co-founder & CEO",
    company: "[HR-Tech Startup]",
    quote:
      "Placeholder testimonial — replace with a real client quote about founder-led content and the inbound pipeline it created.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t4",
    name: "[Client Name]",
    role: "Marketing Manager",
    company: "[SMB Client]",
    quote:
      "Placeholder testimonial — replace with a real client quote about communication, reliability and what it's like to work with your team day to day.",
    rating: 5,
    isPlaceholder: true,
  },
];

export const hasRealTestimonials = testimonials.length > 0 && testimonials.every((t) => !t.isPlaceholder);
