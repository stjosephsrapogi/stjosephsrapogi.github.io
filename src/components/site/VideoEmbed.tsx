import { useState } from "react";
import { Play } from "lucide-react";

import { youtubeEmbedUrl, youtubeThumbnail } from "@/lib/video";

/**
 * A YouTube player that only contacts YouTube once someone presses play.
 *
 * Until then the page shows a picture and a button, and nothing is downloaded from
 * YouTube — so the page stays fast for people who never watch the film.
 */
export function VideoEmbed({
  id,
  title,
  poster,
}: {
  id: string;
  title: string;
  /** Picture of our own shown behind YouTube's, in case YouTube's is unavailable. */
  poster: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-forest-deep shadow-soft">
        <iframe
          src={youtubeEmbedUrl(id)}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-forest-deep shadow-soft">
      <img
        src={poster}
        alt=""
        width={1280}
        height={720}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={youtubeThumbnail(id)}
        alt=""
        width={1280}
        height={720}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(event) => {
          const image = event.currentTarget;
          if (image.dataset["fallback"] === "1") {
            image.style.display = "none";
          } else {
            image.dataset["fallback"] = "1";
            image.src = youtubeThumbnail(id, "hq");
          }
        }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play the documentary: ${title}`}
        className="group absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-crest transition-transform group-hover:scale-110 md:h-24 md:w-24">
          <Play className="h-8 w-8 translate-x-0.5 md:h-10 md:w-10" fill="currentColor" />
        </span>
      </button>
      <p className="absolute inset-x-4 bottom-4 text-sm font-medium text-forest-deep-foreground md:text-base">
        {title}
      </p>
    </div>
  );
}
