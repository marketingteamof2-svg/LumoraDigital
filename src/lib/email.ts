import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { budgetOptions, labelFor, serviceOptions, timelineOptions, type LeadInput } from "@/lib/validation";

function getResend() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function wrap(content: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f6fb;font-family:Arial,Helvetica,sans-serif;color:#15151f">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
  <table width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;padding:32px" cellpadding="0" cellspacing="0"><tr><td>
  ${content}
  </td></tr></table>
  <p style="font-size:12px;color:#6b6b80;margin-top:16px">${esc(siteConfig.name)} · ${esc(siteConfig.contact.email)}</p>
  </td></tr></table></body></html>`;
}

export async function sendLeadEmails(lead: LeadInput) {
  const resend = getResend();
  const from = process.env.EMAIL_FROM;
  const to = process.env.LEAD_NOTIFICATION_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean);

  if (!resend || !from) {
    console.warn("[email] RESEND_API_KEY or EMAIL_FROM missing — skipping emails. Lead:", lead.email);
    return;
  }

  const services = lead.services.map((s) => labelFor(serviceOptions, s)).join(", ");
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone / WhatsApp", lead.phone],
    ["Company", lead.company],
    ["Website", lead.website || "—"],
    ["Services", services],
    ["Budget", labelFor(budgetOptions, lead.budget)],
    ["Timeline", labelFor(timelineOptions, lead.timeline)],
    ["Message", lead.message || "—"],
    ["Source page", lead.source || "—"],
    ["UTM", lead.utm ? Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join(", ") : "—"],
  ];

  const alertHtml = wrap(`
    <h1 style="font-size:20px;margin:0 0 16px">New lead: ${esc(lead.name)} (${esc(lead.company)})</h1>
    <table cellpadding="6" cellspacing="0" style="font-size:14px;width:100%">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="color:#6b6b80;vertical-align:top;white-space:nowrap">${k}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`
        )
        .join("")}
    </table>
    <p style="margin-top:24px"><a href="${siteConfig.url}/admin" style="background:#5b4bff;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Open in admin</a></p>
  `);

  const firstName = lead.name.split(" ")[0];
  const replyHtml = wrap(`
    <h1 style="font-size:20px;margin:0 0 16px">Thanks, ${esc(firstName)} — we've got your request</h1>
    <p style="font-size:15px;line-height:1.6">We've received your enquiry about <strong>${esc(services)}</strong>. A strategist from our team will review your details and get back to you within one business day with initial thoughts and next steps.</p>
    ${
      siteConfig.bookingUrl
        ? `<p style="font-size:15px;line-height:1.6">Want to skip the back-and-forth? Book a free 30-minute discovery call at a time that suits you:</p>
           <p><a href="${siteConfig.bookingUrl}" style="background:#5b4bff;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;display:inline-block">Book your discovery call</a></p>`
        : ""
    }
    <p style="font-size:15px;line-height:1.6">In the meantime, you can see some of our work at <a href="${siteConfig.url}/case-studies">${siteConfig.url.replace(/^https?:\/\//, "")}/case-studies</a>.</p>
    <p style="font-size:15px;line-height:1.6">Talk soon,<br>The ${esc(siteConfig.name)} team</p>
  `);

  const results = await Promise.allSettled([
    to?.length
      ? resend.emails.send({
          from,
          to,
          replyTo: lead.email,
          subject: `New lead: ${lead.name} — ${services}`,
          html: alertHtml,
        })
      : Promise.resolve(null),
    resend.emails.send({
      from,
      to: lead.email,
      replyTo: siteConfig.contact.email,
      subject: `We've received your request — ${siteConfig.name}`,
      html: replyHtml,
    }),
  ]);

  results.forEach((r) => {
    if (r.status === "rejected") console.error("[email] send failed:", r.reason);
  });
}
