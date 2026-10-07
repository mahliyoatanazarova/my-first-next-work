// jsonplaceholder sarlavhalari kichik harfda keladi — chiroyli ko'rinish uchun
export const title = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

export const excerpt = (body: string, n = 120): string => {
  const t = body.replace(/\n/g, " ");
  return t.length > n ? t.slice(0, n).trimEnd() + "…" : t;
};

export const readTime = (body: string): string =>
  Math.max(2, Math.round(body.length / 60)) + " min read";

// API'da sana yo'q, shuning uchun id asosida barqaror sana yasaymiz
export const postDate = (id: number): string => {
  const d = new Date(Date.UTC(2026, 8, 30));
  d.setUTCDate(d.getUTCDate() - id * 2);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
};

export const claps = (id: number): number => ((id * 137) % 940) + 12;
export const replies = (id: number): number => (id * 7) % 38;

const TOPICS = ["React", "Next.js", "JavaScript", "Programming", "Design", "AI", "Career"] as const;
export const topic = (id: number): string => TOPICS[id % TOPICS.length];
