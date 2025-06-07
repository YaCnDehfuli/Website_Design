export type ProjectSeed = Readonly<{
  slug: string;
  title: string;
  summary: string;
  body: string;
  projectType: "research" | "software" | "academic" | "dataset" | "embedded";
  role: string;
  status: "published-research" | "maintained" | "completed" | "prototype" | "archived";
  organization: string | null;
  startedAt: string | null;
  endedAt: string | null;
  heroImagePath: string | null;
  repositoryUrl: string;
  liveUrl: string | null;
  featured: boolean;
  sortOrder: number;
  publishedAt: Date | null;
  tagSlugs: readonly string[];
}>;

export type PublicationSeed = Readonly<{
  slug: string;
  title: string;
  summary: string;
  body: string;
  publicationType: "journal" | "conference" | "thesis" | "report" | "article";
  authors: readonly string[];
  doi: string;
  venue: string;
  externalUrl: string;
  publishedAt: Date;
}>;

export type TagSeed = Readonly<{
  name: string;
  slug: string;
}>;
