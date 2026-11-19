import { ExternalLink } from "lucide-react";

import { parseVideoLink } from "@/lib/embeds";
import { cn } from "@/lib/utils";

/** Plays a YouTube / TikTok / Facebook / Instagram link in place, or shows it as a link. */
export function SocialVideo({ url, live = false, title }: { url: string; live?: boolean; title?: string }) {
  const embed = parseVideoLink(url, { live });
  if (!embed) return null;

  if (embed.kind === "link") {
    return (
      <a
        href={embed.src}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-md border border-border bg-secondary/60 p-4 text-sm font-semibold text-primary hover:underline"
      >
        <ExternalLink className="h-4 w-4 shrink-0" /> Watch on {embed.platform}
      </a>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md bg-forest-deep",
        embed.shape === "tall" ? "mx-auto aspect-[9/16] w-full max-w-sm" : "aspect-video w-full",
      )}
    >
      <iframe
        src={embed.src}
        title={title || `${embed.platform} video`}
        className="h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
