import { parseYouTubeId } from "./video";

/**
 * Turns a social-media video link into something the site can play in place.
 * Supported: YouTube (videos, Shorts, live), TikTok, Facebook (videos, reels, live)
 * and Instagram (posts, reels). Anything else becomes a plain "open link" card.
 */
export type VideoEmbed = {
  kind: "youtube" | "tiktok" | "facebook" | "instagram" | "link";
  /** Player address for an iframe, or the original link for kind "link". */
  src: string;
  /** Phone-style clips are tall; everything else is 16:9. */
  shape: "wide" | "tall";
  /** Name of the platform, for labels. */
  platform: string;
};

function toUrl(raw: string): URL | null {
  const value = raw.trim();
  if (!value) return null;
  try {
    return new URL(value.startsWith("http") ? value : `https://${value}`);
  } catch {
    return null;
  }
}

export function parseVideoLink(raw: string, opts: { live?: boolean } = {}): VideoEmbed | null {
  const url = toUrl(raw);
  if (!url || !/^https?:$/.test(url.protocol)) return null;
  const host = url.hostname.replace(/^(www|m|web|mobile)\./, "");
  const href = url.href;

  if (host === "youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com" || host === "music.youtube.com") {
    const id = parseYouTubeId(href);
    if (!id) return { kind: "link", src: href, shape: "wide", platform: "YouTube" };
    const params = opts.live ? "autoplay=1&mute=1&rel=0" : "rel=0&modestbranding=1";
    return {
      kind: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${id}?${params}`,
      shape: url.pathname.startsWith("/shorts/") ? "tall" : "wide",
      platform: "YouTube",
    };
  }

  if (host === "tiktok.com" || host.endsWith(".tiktok.com")) {
    const match = url.pathname.match(/\/video\/(\d+)/);
    if (!match) return { kind: "link", src: href, shape: "tall", platform: "TikTok" };
    return { kind: "tiktok", src: `https://www.tiktok.com/embed/v2/${match[1]}`, shape: "tall", platform: "TikTok" };
  }

  if (host === "facebook.com" || host === "fb.watch" || host === "fb.com") {
    const tall = /\/reel\//.test(url.pathname);
    const autoplay = opts.live ? "&autoplay=true" : "";
    return {
      kind: "facebook",
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(href)}&show_text=false${autoplay}`,
      shape: tall ? "tall" : "wide",
      platform: "Facebook",
    };
  }

  if (host === "instagram.com") {
    const match = url.pathname.match(/^\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
    if (!match) return { kind: "link", src: href, shape: "tall", platform: "Instagram" };
    const type = match[1] === "reels" ? "reel" : match[1];
    return { kind: "instagram", src: `https://www.instagram.com/${type}/${match[2]}/embed`, shape: "tall", platform: "Instagram" };
  }

  return { kind: "link", src: href, shape: "wide", platform: host };
}
