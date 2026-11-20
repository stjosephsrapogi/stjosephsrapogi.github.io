import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { AdminApp } from "@/components/admin/AdminApp";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Staff admin — St. Joseph's Rapogi" },
      { name: "description", content: "Staff area for posting school news, photos, videos and live streams." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Staff admin — St. Joseph's Rapogi" },
      { property: "og:description", content: "Staff area for posting school news and live streams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/admin") }],
  }),
  component: Admin,
});

function Admin() {
  return (
    <section className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <p className="eyebrow text-accent">Staff area</p>
        <h1 className="mt-2 text-3xl font-semibold text-primary md:text-4xl">News & live admin</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">Post what's happening at school and stream live events to the website.</p>
        <div className="mt-8">
          <ClientOnly
            fallback={
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" />
              </div>
            }
          >
            <AdminApp />
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
