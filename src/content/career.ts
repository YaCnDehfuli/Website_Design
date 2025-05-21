import type { EducationEntry, ExperienceEntry } from "./types";

// Add entries only when the public wording and dates have been verified.
export const experience = [] as const satisfies readonly ExperienceEntry[];

// Education remains source-controlled content rather than database data.
export const education = [] as const satisfies readonly EducationEntry[];
