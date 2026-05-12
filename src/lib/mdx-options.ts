import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Pluggable } from "unified";

export const mdxOptions = {
  remarkPlugins: [remarkGfm] as Pluggable[],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        properties: { className: ["heading-anchor"] },
      },
    ],
    [
      rehypePrettyCode,
      {
        theme: "github-dark-dimmed",
        keepBackground: false,
        defaultLang: "plaintext",
      },
    ],
  ] as Pluggable[],
};
