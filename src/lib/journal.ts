import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content", "journal");

export type JournalFrontmatter = {
  title: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  category: string;
  tags?: string[];
  author: { name: string; bio?: string; avatar?: string };
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
};

export type JournalPost = JournalFrontmatter & {
  slug: string;
  body: string;
  readingTime: string;
};

export type JournalPreview = Omit<JournalPost, "body">;

export type TocItem = {
  id: string;
  text: string;
  depth: number;
};

function fileToSlug(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

export function getAllPosts(): JournalPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as JournalFrontmatter;
    return {
      ...fm,
      slug: fileToSlug(file),
      body: content,
      readingTime: readingTime(content).text,
    } satisfies JournalPost;
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getAllJournalPreviews(): JournalPreview[] {
  return getAllPosts().map(({ body: _body, ...rest }) => rest);
}

export function getJournalPreview(n = 3): JournalPreview[] {
  return getAllJournalPreviews().slice(0, n);
}

export function getPost(slug: string): JournalPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, n = 3): JournalPreview[] {
  const current = getPost(slug);
  if (!current) return getAllJournalPreviews().slice(0, n);
  return getAllJournalPreviews()
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 2;
      const tags = new Set(current.tags ?? []);
      for (const t of p.tags ?? []) if (tags.has(t)) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ p }) => p)
    .slice(0, n);
}

export function getAllCategories(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts()) set.add(p.category);
  return Array.from(set).sort();
}

// Extract TOC from raw MDX body — picks up ## and ### headings.
export function extractToc(body: string): TocItem[] {
  const lines = body.split("\n");
  const toc: TocItem[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const depth = m[1].length;
    const text = m[2].replace(/[*_`]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    toc.push({ id, text, depth });
  }
  return toc;
}
