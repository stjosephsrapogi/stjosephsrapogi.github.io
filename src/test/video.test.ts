import { describe, expect, it } from "vitest";

import { school } from "@/lib/school";
import {
  parseYouTubeId,
  videoId,
  youtubeEmbedUrl,
  youtubeThumbnail,
} from "@/lib/video";

describe("school documentary video", () => {
  it("reads the video ID from every YouTube link form the school might paste", () => {
    const id = "dQw4w9WgXcQ";
    expect(parseYouTubeId(`https://www.youtube.com/watch?v=${id}`)).toBe(id);
    expect(parseYouTubeId(`https://youtu.be/${id}?t=30`)).toBe(id);
    expect(parseYouTubeId(`https://m.youtube.com/watch?v=${id}`)).toBe(id);
    expect(parseYouTubeId(`https://www.youtube.com/embed/${id}`)).toBe(id);
    expect(parseYouTubeId(`https://www.youtube.com/shorts/${id}`)).toBe(id);
    expect(parseYouTubeId(`https://www.youtube.com/live/${id}`)).toBe(id);
    expect(parseYouTubeId(`youtube.com/watch?v=${id}`)).toBe(id);
    expect(parseYouTubeId(id)).toBe(id);
  });

  it("refuses anything that is not a YouTube video", () => {
    expect(parseYouTubeId("")).toBe("");
    expect(parseYouTubeId("   ")).toBe("");
    expect(parseYouTubeId("https://vimeo.com/12345")).toBe("");
    expect(parseYouTubeId("not a link")).toBe("");
    expect(parseYouTubeId("https://example.com/watch?v=dQw4w9WgXcQ")).toBe("");
  });

  it("plays the film without YouTube tracking cookies", () => {
    expect(youtubeEmbedUrl("dQw4w9WgXcQ")).toBe(
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&autoplay=1",
    );
  });

  it("plays the documentary the school published", () => {
    expect(videoId()).toBe("1pTxGrx8JBU");
    expect(school.video.title).toBe("St. Joseph's School, Rapogi — 2024 Documentary");
  });

  it("records the day the documentary was published on YouTube", () => {
    expect(school.video.uploadDate).toBe("2024-11-19");
  });

  it("builds the picture shown before play", () => {
    expect(youtubeThumbnail("dQw4w9WgXcQ")).toBe(
      "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    );
    expect(youtubeThumbnail("dQw4w9WgXcQ", "hq")).toBe(
      "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    );
  });
});
