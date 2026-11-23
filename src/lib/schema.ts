import { siteConfig } from "@/config/site";
import type { Service } from "@/content/services";
import { testimonials, hasRealTestimonials } from "@/content/testimonials";

const orgId = `${siteConfig.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneHref,
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.x, siteConfig.social.youtube],
  };
}

export function localBusinessSchema() {
  const a = siteConfig.contact.address;
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}/opengraph-image`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneHref,
    email: siteConfig.contact.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    areaServed: ["IN", "US"],
    parentOrganization: { "@id": orgId },
  };

  // Only emit ratings when they come from REAL reviews (Google's guidelines + honesty).
  if (hasRealTestimonials) {
    const avg = testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length;
    base.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: testimonials.length,
    };
    base.review = testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.quote,
    }));
  }
  return base;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": orgId },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: { "@id": orgId },
    areaServed: ["IN", "US"],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": orgId },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    // Per-post OG images are served from a hashed route; use the site OG image here
    image: `${siteConfig.url}/opengraph-image`,
  };
}
