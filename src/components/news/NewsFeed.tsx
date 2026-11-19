import { useQuery } from "@tanstack/react-query";
import { Newspaper } from "lucide-react";

import { NewsPostCard } from "@/components/news/NewsPostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { newsQuery } from "@/lib/news";

/** Latest school updates. Loaded in the browser so the static GitHub site always shows new posts. */
export function NewsFeed({ limit }: { limit: number }) {
  const { data, isPending, isError } = useQuery(newsQuery(limit));

  if (isPending) {
    return (
      <div className="space-y-6" aria-label="Loading updates">
        {[0, 1].map((i) => (
          <Skeleton key={i} className="h-56 w-full rounded-lg" />
        ))}
      </div>
    );
  }
  if (isError) {
    return <p className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">Updates couldn't load right now. Please refresh the page.</p>;
  }
  if (!data.length) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
        <Newspaper className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 font-semibold text-primary">No updates yet</p>
        <p className="mt-1 text-sm text-muted-foreground">News, photos and videos from the school will appear here.</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {data.map((post) => (
        <NewsPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
