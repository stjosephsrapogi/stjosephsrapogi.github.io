import { createFileRoute } from "@tanstack/react-router";

import { LivePlayer } from "@/components/news/LiveNow";
import { NewsFeed } from "@/components/news/NewsFeed";
import { PageHero } from "@/components/site/PageHero";
import { photos } from "@/lib/photos";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/news")({
  head: () =>
    pageHead({
      path: "/news",
      title: "News & Live — St. Joseph's National School, Rapogi",
      description:
        "The latest news, photos and videos from St. Joseph's Rapogi, plus live streams of school concerts and events.",
      ogTitle: "News & live from St. Joseph's Rapogi",
      ogDescription: "What's happening at school right now: updates, photos, videos and live events.",
      ogImage: "/og/student-life.jpg",
      ogImageAlt: "Students of St. Joseph's Rapogi celebrating on the school field",
    }),
  component: News,
});

function News() {
  return (
    <>
      <PageHero
        eyebrow="News & live"
        title="What's happening at Rapogi"
        intro="Updates, photos and videos from school life — and live streams when there's a concert or big event."
        image={photos.celebrating}
      />
      <div className="mx-auto max-w-2xl space-y-8 px-5 py-14 md:py-20">
        <LivePlayer />
        <NewsFeed limit={30} />
      </div>
    </>
  );
}
