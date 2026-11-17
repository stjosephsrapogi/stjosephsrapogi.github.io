import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { SITE_URL, pageHead, sitePages, websiteJsonLd } from "@/lib/seo";

describe("SEO setup", () => {
  it("targets the GitHub Pages address", () => {
    expect(SITE_URL).toBe("https://stjosephsrapogi.github.io");
  });

  it("gives each page a canonical link and absolute share image on the live address", () => {
    const head = pageHead({
      path: "/about",
      title: "t",
      description: "d",
      ogTitle: "ot",
      ogDescription: "od",
      ogImage: "/og/about.jpg",
      ogImageAlt: "a",
    });
    expect(head.links).toContainEqual({ rel: "canonical", href: "https://stjosephsrapogi.github.io/about" });
    expect(head.meta).toContainEqual({
      property: "og:image",
      content: "https://stjosephsrapogi.github.io/og/about.jpg",
    });
  });

  it("asks Google to show \"St Joseph's Rapogi\" as the site name", () => {
    expect(websiteJsonLd().name).toBe("St Joseph's Rapogi");
    expect(websiteJsonLd().url).toBe("https://stjosephsrapogi.github.io/");
  });

  it("lists every page in the sitemap", () => {
    const xml = readFileSync("public/sitemap.xml", "utf8");
    for (const path of sitePages) expect(xml).toContain(`<loc>${SITE_URL}${path}</loc>`);
  });

  it("points crawlers to the sitemap", () => {
    expect(readFileSync("public/robots.txt", "utf8")).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});
