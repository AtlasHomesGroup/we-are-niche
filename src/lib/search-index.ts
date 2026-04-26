import { pages, type PageMeta } from "./pages";

export interface SearchEntry extends PageMeta {
  haystack: string;
}

export const searchIndex: SearchEntry[] = pages.map((p) => ({
  ...p,
  haystack: [p.title, p.category, p.description, p.keywords.join(" ")]
    .join(" ")
    .toLowerCase(),
}));

export function searchPages(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = searchIndex
    .map((entry) => {
      let score = 0;
      const title = entry.title.toLowerCase();
      if (title === q) score += 100;
      if (title.startsWith(q)) score += 25;
      if (title.includes(q)) score += 10;
      for (const t of tokens) {
        if (entry.haystack.includes(t)) score += 4;
        if (title.includes(t)) score += 2;
      }
      return { entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);

  return scored;
}
