import { renderOgImage, ogSize } from "@/lib/og";
import { siteConfig } from "@/config/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${siteConfig.name} — digital marketing agency`;

export default function OgImage() {
  return renderOgImage({
    eyebrow: `Digital marketing agency · ${siteConfig.city}`,
    title: "Content, social, UI/UX & web development that grows revenue.",
  });
}
