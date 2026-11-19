import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Radio } from "lucide-react";

import { SocialVideo } from "@/components/news/SocialVideo";
import { liveQuery } from "@/lib/news";

function LiveDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-foreground opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-foreground" />
    </span>
  );
}

/** Red strip across the top of every page while the school is streaming live. */
export function LiveBanner() {
  const { data } = useQuery(liveQuery);
  if (!data?.isLive) return null;
  return (
    <Link
      to="/news"
      hash="live"
      className="block bg-accent text-accent-foreground transition-colors hover:bg-accent/90"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-5 py-2 text-sm font-semibold">
        <LiveDot />
        <span className="eyebrow text-[0.7rem]">Live now</span>
        <span className="truncate">{data.title || "Watch the school live"}</span>
        <span className="hidden underline sm:inline">Watch</span>
      </div>
    </Link>
  );
}

/** The live player, shown only while a stream is on. */
export function LivePlayer() {
  const { data } = useQuery(liveQuery);
  if (!data?.isLive) return null;
  return (
    <section id="live" className="scroll-mt-28 rounded-lg border border-accent/40 bg-card p-4 shadow-soft md:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
          <LiveDot /> Live
        </span>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-primary md:text-xl">
          <Radio className="h-5 w-5 text-accent" /> {data.title || "Live from St. Joseph's"}
        </h2>
      </div>
      <SocialVideo url={data.streamUrl} live title={data.title || "Live stream"} />
    </section>
  );
}
