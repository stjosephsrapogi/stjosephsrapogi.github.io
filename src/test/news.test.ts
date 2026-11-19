import { describe, expect, it } from "vitest";

import { parseVideoLink } from "@/lib/embeds";
import { checkMediaFile, liveSchema, postSchema } from "@/lib/news";

const post = { body: "Sports day today!", videoUrl: "", photoCount: 0, hasVideoFile: false };
const MB = 1024 * 1024;

describe("news posts", () => {
  it("accepts a text-only post", () => {
    expect(postSchema.safeParse(post).success).toBe(true);
  });
  it("accepts a photo-only post with no text", () => {
    expect(postSchema.safeParse({ ...post, body: "", photoCount: 2 }).success).toBe(true);
  });
  it("rejects an empty post", () => {
    expect(postSchema.safeParse({ ...post, body: "  " }).success).toBe(false);
  });
  it("allows at most 6 photos", () => {
    expect(postSchema.safeParse({ ...post, photoCount: 7 }).success).toBe(false);
  });
  it("limits text to 3,000 characters", () => {
    expect(postSchema.safeParse({ ...post, body: "a".repeat(3001) }).success).toBe(false);
  });
  it("takes an uploaded video or a link, not both", () => {
    expect(postSchema.safeParse({ ...post, hasVideoFile: true, videoUrl: "https://youtu.be/1pTxGrx8JBU" }).success).toBe(false);
  });
  it("rejects uploaded videos over 50 MB and photos over 10 MB", () => {
    expect(checkMediaFile({ name: "clip.mp4", type: "video/mp4", size: 51 * MB }, "video")).not.toBeNull();
    expect(checkMediaFile({ name: "clip.mp4", type: "video/mp4", size: 49 * MB }, "video")).toBeNull();
    expect(checkMediaFile({ name: "p.jpg", type: "image/jpeg", size: 11 * MB }, "photo")).not.toBeNull();
  });
});

describe("social video links", () => {
  it("plays YouTube, Shorts and YouTube Live links on the site", () => {
    expect(parseVideoLink("https://youtu.be/1pTxGrx8JBU")?.src).toContain("youtube-nocookie.com/embed/1pTxGrx8JBU");
    expect(parseVideoLink("https://www.youtube.com/shorts/1pTxGrx8JBU")?.shape).toBe("tall");
    expect(parseVideoLink("https://www.youtube.com/live/1pTxGrx8JBU", { live: true })?.src).toContain("autoplay=1");
  });
  it("plays TikTok, Facebook and Instagram links", () => {
    expect(parseVideoLink("https://www.tiktok.com/@school/video/7301234567890123456")?.src).toBe(
      "https://www.tiktok.com/embed/v2/7301234567890123456",
    );
    expect(parseVideoLink("https://www.facebook.com/school/videos/123456")?.kind).toBe("facebook");
    expect(parseVideoLink("https://www.instagram.com/reel/Cabc123/")?.src).toBe("https://www.instagram.com/reel/Cabc123/embed");
  });
  it("shows other links as a plain link", () => {
    expect(parseVideoLink("https://example.com/video")?.kind).toBe("link");
    expect(parseVideoLink("not a link at all")).toBeNull();
  });
});

describe("live stream", () => {
  it("needs a link before going live", () => {
    expect(liveSchema.safeParse({ title: "Concert", streamUrl: "" }).success).toBe(false);
    expect(liveSchema.safeParse({ title: "Concert", streamUrl: "https://youtube.com/live/1pTxGrx8JBU" }).success).toBe(true);
  });
});
