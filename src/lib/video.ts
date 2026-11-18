import { school } from "./school";

/**
 * YouTube helpers for the school documentary.
 *
 * The film itself lives on YouTube — nothing is stored on this site, the page only
 * plays it. `school.video.youtubeUrl` may hold any YouTube link, or just the bare
 * video ID; everything below accepts either form.
 */

const ID = /^[A-Za-z0-9_-]{11}$/;

/** Pulls the video ID out of any YouTube link, or returns "" if this is not one. */
export function parseYouTubeId(input: string): string {
  const value = input.trim();
  if (!value) return "";
  if (ID.test(value)) return value;

  let url: URL;
  try {
    url = new URL(value.startsWith("http") ? value : `https://${value}`);
  } catch {
    return "";
  }

  const host = url.hostname.replace(/^(www|m)\./, "");

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return ID.test(id) ? id : "";
  }

  if (host !== "youtube.com" && host !== "youtube-nocookie.com") return "";

  const queryId = url.searchParams.get("v") ?? "";
  if (ID.test(queryId)) return queryId;

  const parts = url.pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1] ?? "";
  return ID.test(last) ? last : "";
}

/** The documentary's YouTube ID, or "" when the school has not supplied a link yet. */
export const videoId = () => parseYouTubeId(school.video.youtubeUrl);

/** Picture shown before play. "max" is sharpest but not always available; "hq" always is. */
export const youtubeThumbnail = (id: string, size: "max" | "hq" = "max") =>
  `https://i.ytimg.com/vi/${id}/${size === "max" ? "maxresdefault" : "hqdefault"}.jpg`;

/** The player address. youtube-nocookie keeps YouTube from setting tracking cookies. */
export const youtubeEmbedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`;
