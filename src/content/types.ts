export type NavigationItem = Readonly<{
  href: `/${string}`;
  label: string;
  index: `${number}${number}`;
}>;

export type FocusArea = Readonly<{
  emoji: string;
  title: string;
  description: string;
  signal: "cyan" | "lime" | "violet" | "amber";
}>;

export type SocialLink = Readonly<{
  label: string;
  href: `https://${string}` | `mailto:${string}`;
}>;

export type Profile = Readonly<{
  name: string;
  shortName: string;
  role: string;
  introduction: string;
  biography: readonly string[];
  email: string;
  socialLinks: readonly SocialLink[];
  focusAreas: readonly FocusArea[];
}>;

export type ExperienceEntry = Readonly<{
  organization: string;
  role: string;
  startDate: string;
  endDate: string | "present";
  summary: string;
  highlights: readonly string[];
}>;

export type EducationEntry = Readonly<{
  institution: string;
  credential: string;
  field: string;
  startDate?: string;
  endDate?: string;
}>;
