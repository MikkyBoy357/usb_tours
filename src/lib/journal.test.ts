import { describe, expect, it } from "vitest";
import { extractToc, getAllPosts, getRelatedPosts } from "./journal";

describe("extractToc", () => {
  it("extracts ## and ### headings with deterministic ids", () => {
    const body = `Intro paragraph.

## First Section

Some content.

### A subsection

More content.

## Second Section
`;
    const toc = extractToc(body);
    expect(toc).toEqual([
      { id: "first-section", text: "First Section", depth: 2 },
      { id: "a-subsection", text: "A subsection", depth: 3 },
      { id: "second-section", text: "Second Section", depth: 2 },
    ]);
  });

  it("ignores headings inside fenced code blocks", () => {
    const body = `## Real heading

\`\`\`md
## Not a heading
### Also not a heading
\`\`\`

## Another real heading`;
    const toc = extractToc(body);
    expect(toc.map((t) => t.text)).toEqual([
      "Real heading",
      "Another real heading",
    ]);
  });

  it("strips inline markdown formatting from heading text", () => {
    const toc = extractToc("## **Bold** and *italic*");
    expect(toc[0]).toEqual({
      id: "bold-and-italic",
      text: "Bold and italic",
      depth: 2,
    });
  });
});

describe("journal posts on disk", () => {
  const posts = getAllPosts();

  it("loads the seeded MDX articles", () => {
    expect(posts.length).toBeGreaterThanOrEqual(3);
  });

  it("sorts posts newest-first", () => {
    for (let i = 1; i < posts.length; i++) {
      const prev = new Date(posts[i - 1].publishedAt).getTime();
      const curr = new Date(posts[i].publishedAt).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("every post has required frontmatter", () => {
    for (const p of posts) {
      expect(p.title).toBeTruthy();
      expect(p.excerpt).toBeTruthy();
      expect(p.cover).toMatch(/^\/photos\/.+\.jpg$/);
      expect(p.author.name).toBeTruthy();
      expect(p.readingTime).toMatch(/\d+\s*min read/);
    }
  });
});

describe("getRelatedPosts", () => {
  it("excludes the source post", () => {
    const slug = getAllPosts()[0]?.slug;
    if (!slug) return;
    const related = getRelatedPosts(slug, 5);
    expect(related.find((p) => p.slug === slug)).toBeUndefined();
  });
});
