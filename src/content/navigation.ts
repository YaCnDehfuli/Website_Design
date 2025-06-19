import type { NavigationItem } from "./types";

export const primaryNavigation = [
  { href: "/about", label: "about", index: "01" },
  { href: "/projects", label: "projects", index: "02" },
  { href: "/publications", label: "writing", index: "03" },
  { href: "/engineering", label: "engineering", index: "04" },
  { href: "/contact", label: "contact", index: "05" },
] as const satisfies readonly NavigationItem[];
