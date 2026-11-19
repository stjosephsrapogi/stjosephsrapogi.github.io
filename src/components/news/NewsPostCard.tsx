import { format } from "date-fns";
import type { ReactNode } from "react";

import crest from "@/assets/rapogi_crest.png";
import { SocialVideo } from "@/components/news/SocialVideo";
import type { NewsPost } from "@/lib/news";
import { school } from "@/lib/school";
import { cn } from "@/lib/utils";

export function NewsPostCard({ post, actions }: { post: NewsPost; actions?: ReactNode }) {
  const count = post.images.length;
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
      <header className="flex items-center gap-3 px-5 pt-5">
        <img src={crest} alt="" width={40} height={40} className="h-10 w-10 rounded-full bg-background object-contain p-0.5" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-primary">{school.shortName}</p>
          <time dateTime={post.createdAt} className="text-xs text-muted-foreground">
            {format(new Date(post.createdAt), "d MMM yyyy · h:mm a")}
          </time>
        </div>
        {actions}
      </header>

      {post.body && <p className="whitespace-pre-line px-5 pt-4 text-[0.95rem] leading-relaxed">{post.body}</p>}

      {count > 0 && (
        <div className={cn("mt-4 grid gap-1", count === 1 ? "grid-cols-1" : count === 2 || count === 4 ? "grid-cols-2" : "grid-cols-3")}>
          {post.images.map((src, i) => (
            <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="block bg-muted">
              <img
                src={src}
                alt={`Photo ${i + 1} from this update`}
                loading="lazy"
                className={cn("w-full object-cover", count === 1 ? "max-h-[32rem]" : "aspect-square")}
              />
            </a>
          ))}
        </div>
      )}

      {post.videoSrc && (
        <div className="mt-4 bg-forest-deep">
          <video src={post.videoSrc} controls playsInline preload="metadata" className="max-h-[36rem] w-full" />
        </div>
      )}

      {post.videoUrl && (
        <div className="mt-4 px-5">
          <SocialVideo url={post.videoUrl} />
        </div>
      )}

      <div className="h-5" />
    </article>
  );
}
