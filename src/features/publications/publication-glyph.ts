import type { SecurityGlyphName } from "@/components/visuals/security-glyphs";

export function getPublicationGlyph(slug: string): SecurityGlyphName {
  return slug.includes("vadvit") ? "attention-rank" : "doi-record";
}
