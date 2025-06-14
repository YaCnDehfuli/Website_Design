import "server-only";
import { profile } from "@/content/profile";
import { env } from "./env";

export const site = {
  name: profile.name,
  title: `${profile.name} · Security Engineering and Memory Forensics`,
  description: profile.introduction,
  url: new URL(env.SITE_URL),
} as const;

export function absoluteUrl(pathname: `/${string}`) {
  return new URL(pathname, site.url).toString();
}
