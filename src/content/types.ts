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
  href: `https://${string}`;
}>;

export type Profile = Readonly<{
  name: string;
  shortName: string;
  professionalHeadline: string;
  location: string;
  introduction: string;
  biography: readonly string[];
  githubUrl: `https://${string}`;
  linkedInUrl: `https://${string}`;
  image: Readonly<{
    src: `/${string}`;
    alt: string;
  }>;
  socialLinks: readonly SocialLink[];
  focusAreas: readonly FocusArea[];
}>;

export type TeachingAssignment = Readonly<{
  startDate: string;
  endDate: string;
  title: string;
  topics: string;
}>;

export type ExperienceEntry = Readonly<{
  organization: string;
  role: string;
  startDate: string;
  endDate: string | "present";
  summary: string;
  highlights: readonly string[];
  assignments?: readonly TeachingAssignment[];
}>;

export type EducationEntry = Readonly<{
  institution: string;
  credential: string;
  field?: string;
  startDate: string;
  endDate: string;
  gpa: string;
}>;
